'use server';
import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

export async function getFoldersCloudinary(): Promise<any[]> {

    try {

        const resources = await cloudinary.api.sub_folders(`lookbook`, {max_results: 50, })
        
        const folders: any[] = resources.folders.map((resource: any) => {
          return {
            name: resource.name,
            path: resource.path,
            external_id: resource.external_id
          }
        });

        return folders.reverse();
      } catch (error) {
        console.error('Error fetching Cloudinary folders:', error);
        return [];
      }
};