import Replicate from 'replicate'
 
interface Env {
  REPLICATE_API_TOKEN: string
}
 
export async function generateImage(prompt: string, env: Env) {
  const replicate = new Replicate({auth: env.REPLICATE_API_TOKEN})
  const model = 'black-forest-labs/flux-schnell'  
  const output = await replicate.run(model, {
    input: {
      prompt,
      image_format: 'webp',
    }
  })
    
  // Some image models return an array of output files, others just a single file.
  const imageUrl = Array.isArray(output) ? output[0].url() : output.url()
 
  console.log({imageUrl})
  
  return imageUrl
} 