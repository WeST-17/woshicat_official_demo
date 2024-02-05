"use server"

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
}

export async function getProductByHandle(productHandle: string) {
  try {
    const item = await client.product.fetchByHandle(productHandle);
    const image = item.images[0];
    const itemImage = {
      url: image?.src || '',
      altText: image?.altText || '',
      // Add other image properties as needed
    };
    return {
      id: item.id,
      handle: item.handle,
      name: item.title,
      price: item.variants[0]?.price.amount || 0, // Adjust this based on your product structure
      image: itemImage,
      // add more properties as needed
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