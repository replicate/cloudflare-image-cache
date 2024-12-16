import { homepage } from './homepage'
import { uploadToCloudflareImages } from './image-uploader'
import { generateImage } from './image-generator'
 
export interface Env {
  REPLICATE_API_TOKEN: string
  CLOUDFLARE_ACCOUNT_ID: string
  CLOUDFLARE_API_TOKEN: string
  CLOUDFLARE_IMAGE_ACCOUNT_HASH: string
  IMAGE_CACHE_2: KVNamespace
}
 
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url)
 
    // Example: /800x600/sunglasses-sloth
    const [dimensions, animal] = url.pathname.split('/').filter(Boolean)
 
    // Render the homepage if the path is invalid
    if (!dimensions || !animal) return homepage()
 
    // Turn `/800x600/sunglasses-sloth` into a text prompt
    const [targetWidth, targetHeight] = dimensions.toLowerCase().split('x').map(n => Number.parseInt(n, 10))
    const prompt = `A high-quality image of a ${animal} holding up a sign with the words "${targetWidth} by ${targetHeight}"`
 
    // Check for a cached image id that matches this request URL
    const cacheKey = url.pathname
 
    // If the request has a `?redo` query param, we'll bypass the cache
    const shouldBypassCache = url.searchParams.has('redo')
    const cachedImageId = shouldBypassCache ? null : await env.IMAGE_CACHE.get(cacheKey)
    let cloudflareImageId: string
 
    if (cachedImageId) {
      console.log('Cache hit for:', cacheKey)
      cloudflareImageId = cachedImageId
    } else {
      console.log(shouldBypassCache ? 'Bypassing cache due to redo parameter' : 'Cache miss for:', cacheKey)
 
      // Generate the image
      const replicateImageUrl = await generateImage(prompt, env)
      console.log('Generated image URL:', replicateImageUrl)
 
      // Upload the image to Cloudflare Images
      cloudflareImageId = await uploadToCloudflareImages(replicateImageUrl, env)
      console.log('Cloudflare Images ID:', cloudflareImageId)
 
      // Cache the image ID
      await env.IMAGE_CACHE.put(cacheKey, cloudflareImageId)
      console.log('Stored in cache:', cacheKey, cloudflareImageId)
    }
 
    const transformations = {
      width: targetWidth,
      height: targetHeight,
      fit: "cover"
    }
 
    const transformationsString = Object.entries(transformations).map(([k,v]) => `${k}=${v}`).join(',')
 
    const transformedImageUrl = `https://imagedelivery.net/${env.CLOUDFLARE_IMAGE_ACCOUNT_HASH}/${cloudflareImageId}/${transformationsString}`;
    console.log({transformedImageUrl})
        
    // Fetch the image and return it
    const imageResponse = await fetch(transformedImageUrl)
    return new Response(imageResponse.body, {
      headers: {
        'content-type': 'image/webp',
      }
    })
  }
}