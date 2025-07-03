'use server';
import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

interface CloudinaryImage {
    secure_url: string;
    public_id: string;
    width: number;
    height: number;
    signed_url: string;
}

export async function getImagesCloudinary(tag: string): Promise<CloudinaryImage[]> {

    try {

        const resources = await cloudinary.api.resources_by_asset_folder(`lookbook/${tag}`, {max_results: 50, })
        
        const cloudinaryPass: CloudinaryImage[] = resources.resources.map((resource: any) => {
          // Generate signed URL for each image
          const signed_url = cloudinary.url(resource.public_id, {
            sign_url: true,
            secure: true,
          });
    
          return {
            secure_url: resource.secure_url,
            public_id: resource.public_id,
            width: resource.width,
            height: resource.height,
            signed_url, // Return the signed URL
            d_name: resource.display_name,
            quality: 100,
          };
        });
        // console.log(cloudinaryPass.sort())
        return cloudinaryPass.sort((a, b) => (a['public_id'] > b['public_id'] ? 1 : -1));
      } catch (error) {
        console.error('Error fetching Cloudinary images:', error);
        return [];
      }
};