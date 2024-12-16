interface CloudflareEnv {
    CLOUDFLARE_ACCOUNT_ID: string
    CLOUDFLARE_API_TOKEN: string
  }
   
  interface UploadResponse {
    result: {
      id: string
      variants: string[]
    }
  }
   
  export async function uploadToCloudflareImages (imageUrl: string, env: CloudflareEnv): Promise<string> {
    console.log('Uploading image to Cloudflare Images:', imageUrl)
   
    const imageResponse = await fetch(imageUrl)
    const imageBlob = await imageResponse.blob()
    const formData = new FormData()
    formData.append('file', imageBlob)
    const uploadResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/images/v1`, 
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}`
        },
        body: formData
      }
    )
   
    const result = (await uploadResponse.json()) as UploadResponse
    
    if (!uploadResponse.ok) {
      console.error('Failed to upload to Cloudflare Images:', result)
      throw new Error('Failed to upload image')
    }
   
    console.log('Successfully uploaded to Cloudflare Images:', result)
   
    return result.result.id
  } 