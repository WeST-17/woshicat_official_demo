"use server"

import { cookies } from 'next/headers';
import Client from 'shopify-buy';

const shopify_domain = process.env.SHOPIFY_STORE_DOMAIN;
const shopify_token = process.env.SHOPIFY_TOKEN;

const client = Client.buildClient({
  domain: shopify_domain!,
  storefrontAccessToken: shopify_token!,
  apiVersion: '2024-01'
});

async function getProducts(client: Client): Promise<any[]> {
  try {
    const products = await client.product.fetchAll();

    // Extract necessary information from each product
    const serializedProducts = products.map((product) => {
      const image = product.images[0];

      const plainImage = {
        url: image?.src || '',
        altText: image?.altText || '',
        // Add other image properties as needed
      };
      return {
        id: product.id,
        handle: product.handle,
        name: product.title,
        price: product.variants[0]?.price.amount || 0, // Adjust this based on your product structure
        image: plainImage,
        // add more properties as needed
      };
    });

    return serializedProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

async function getProductByHandle(productHandle: string) {
  try {
    // Images and Video function: Could just add the video directly to website instead of through shopify?

    const item = await client.product.fetchByHandle(productHandle);
    // Map each image to an object containing URL and altText
    const images = item.images.map(image => ({
      url: image?.src || '',
      altText: image.altText || ''
      // Add other image properties as needed
    }));   

    const options = item.options.map(option => ({
      id: option.id,
      name: option.name,
      values: option.values,
    }))

    const sizes: string[] = [];
    const colors: string[] = [];

    // Iterate over the options
    for (const option of options) {
      // Check if the option is for size
      if (option.name.toLowerCase() === 'size') {
          // Iterate over the values and add them to the sizes array
          for (const value of option.values as unknown as { value: string }[]) {
              sizes.push(value.value);
          }
      } else if (option.name.toLowerCase() === 'color') {
          // Iterate over the values and add them to the colors array
          for (const value of option.values as unknown as { value: string }[]) {
              colors.push(value.value);
          }
      }
    }
    
    // Map each variant to an object containing its details
    const variants = item.variants.map(variant => ({
      id: variant.id,
      title: variant.title,
      price: variant.price.amount,
      available: (variant as any).available, 
      // TS doesn't see available as a field for ProductVariant. Can use 'variant as any' to bypass!
    }));

    return {
      id: item.id,
      handle: item.handle,
      name: item.title,
      size: sizes,
      color: colors,
      price: item.variants[0]?.price.amount || 0, // Adjust this based on your product structure
      variants: variants,
      image: images,
      available: (item as any).available, // same for item.available
      description: item.description, // item description, update in shopify product listing
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}


export async function getServerProductsProps(): Promise<{ products?: any[]; error?: any }> {
  try {
    const products = await getProducts(client);
    return { products };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { error };
  }
}

export async function getServerItemProps({ params }: any) {
  const productHandle = params?.handle as string;

  try {
    const item = await getProductByHandle(productHandle);
    return { item };
  } catch (error) {
    console.error('Error fetching product by handle: ', error);
    return { error };
  }
}