"use server"

import Client from 'shopify-buy';
import { cookies } from 'next/headers';

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
    console.log(products[0].collections)
    
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
        price: Number(product.variants[0]?.price.amount).toFixed(2) || 0, // Adjust this based on your product structure
        image: plainImage,
        collection: product.collections,
        // may need to add collection tag for a general products page somehow...
        // add more properties as needed
      };
    });

    return serializedProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

async function getCollectionID(collectionName: string): Promise<any> {
  try {
    const collection = await client.collection.fetchAllWithProducts();
    // Extract necessary information from each product
    const collectionID = collection.filter(collection => {
    // Condition to filter products, e.g., filter by a specific collection
    return collection.handle === collectionName; // Replace with your condition
  }).map((groupCollection) => {
      return groupCollection.id;
  });

  return collectionID[0];

  } catch (error) {
    console.error('Error fetching collection:', error);
    throw error;
  }
}

async function getCollection(collectionName: string) {
  try {
    const collectionID = await getCollectionID(collectionName);
    const collectionItems = await client.collection.fetchWithProducts(collectionID);
    // Extract necessary information from each product
    const serializedProducts = collectionItems.products.map((product) => {
      const image = product.images[0];
      const image2 = product.images[2];
      // console.log("Product Type: ",product.productType)

      const plainImage = {
        url: image?.src || '',
        altText: image?.altText || '',
        // Add other image properties as needed
      };

      const plainImage2 = {
        url: image2?.src || '',
        altText: image2?.altText || '',
      }

      return {
        id: product.id,
        handle: product.handle,
        name: product.title,
        image: plainImage,
        image2: plainImage2,
        collection: collectionName,
        price: Number(product.variants[0].price.amount).toFixed(2),
        // add more properties as needed
      };
    });

    return serializedProducts;
  } catch (error) {
    console.error('Error fetching collection:', error);
    throw error;
  }
}

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
      price: Number(variant.price.amount).toFixed(2),
      available: (variant as any).available, 
      // TS doesn't see available as a field for ProductVariant. Can use 'variant as any' to bypass!
    }));

    return {
      id: item.id,
      handle: item.handle,
      name: item.title,
      size: sizes,
      color: colors,
      price: Number(item.variants[0]?.price.amount).toFixed(2) || 0, // Adjust this based on your product structure
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

export async function getProductsByID(productID: string) {
  try {
    const item = await client.product.fetch(productID);
    
    return {
      id: item.id,
      handle: item.handle,
      name: item.title,
      price: Number(item.variants[0]?.price.amount).toFixed(2) || 0, // Adjust this based on your product structure
      image: item.images[0],
      variantImage: item.variants[0]?.image?.src || null,
      available: (item as any).available, // same for item.available
      description: item.description, // item description, update in shopify product listing
    };
  } catch (error) {
    console.error('Error fetching product by ID');
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

export async function getServerCollectionProps(collection: string): Promise<{ products?: any; error?: any}> {
  try {
    const products = await getCollection(collection);
    return { products };
  } catch (error) {
    console.error('Error fetching collection items:', error);

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

// Cart functions: //

async function findLineItemCart(variantID: string) {
  const checkoutID = cookies().get('checkoutID');
  if (!checkoutID || !(await validateCheckout(checkoutID.value))) {
    throw new Error('Checkout not found');
  }

  const checkout = await client.checkout.fetch(checkoutID.value);
  const lineItems = checkout.lineItems.filter((item: any) => item.id === variantID);
  return lineItems.length > 0 ? lineItems[0] : null; // Return the line item if found, otherwise return null
}


export async function decrementQuantity(variantID: string) {
  const lineItem = await findLineItemCart(variantID);
  if (lineItem && lineItem.quantity > 1) {
    const updatedQuantity = lineItem?.quantity - 1;
    updateQuantityinCart(variantID, updatedQuantity);
  }
};

export async function incrementQuantity(variantID: string) {
  const lineItem = await findLineItemCart(variantID);
  if (lineItem) {
    const updatedQuantity = lineItem?.quantity + 1;
    updateQuantityinCart(variantID, updatedQuantity);
  }
};

export async function updateQuantityinCart(variantID: string, quantity: number) {
  const checkoutID = cookies().get('checkoutID');
  if (!checkoutID || !(await validateCheckout(checkoutID.value))) {
    throw new Error('Checkout ID not found');
  }
  const lineItemsToUpdate = [
		{ id: variantID, 
      quantity: quantity },
	]
  
  await client.checkout.updateLineItems(checkoutID.value, lineItemsToUpdate);
  
}

async function createCheckout(variantID: string, quantityProduct: number) {
  const checkout = await client.checkout.create();
  const checkoutID = checkout.id;
  await client.checkout.addLineItems(checkoutID, [{variantId: variantID, quantity: quantityProduct}]);
  cookies().set('checkoutID', checkoutID);
  console.log("checkout created and cookie set");
}

// Function to validate if the checkout session is still active
async function validateCheckout(checkoutID: string) {
  const shopifyCheckout = await client.checkout.fetch(checkoutID);
  // Check if the checkout session is completed or invalid
  return shopifyCheckout && !shopifyCheckout.completedAt;
}

// Updating cart function. Gets checkout ID from cookie that's set in createCheckout
export async function addToCart(productVariantID: string, quantity: number) {
  const checkoutID = cookies().get('checkoutID');
  try {
    if(!checkoutID || !(await validateCheckout(checkoutID.value))) {
      await createCheckout(productVariantID, quantity);
    }
    else {
      await client.checkout.addLineItems(checkoutID.value, [{variantId: productVariantID, quantity: quantity}]);
      console.log("Your cart has been updated.");
      // console.log(productVariantID);
    }
  } catch (error) {
    console.error("An error occurred while adding to the cart:", error);
    return {error};
  }
}

export async function removeItemCart(productVariantID: string) {
  const checkoutID = cookies().get('checkoutID');
  if(!checkoutID || !(await validateCheckout(checkoutID.value))) {
    console.log('Nothing here...')
    return;
  }
  try {
    await client.checkout.removeLineItems(checkoutID.value, [productVariantID]);
    console.log("Line item removed");
  } catch (error) {
    console.error("Error removing line item:", error);
  }
}

export async function displayCart() {
  const checkoutID = cookies().get('checkoutID');
  
  if (!checkoutID || !(await validateCheckout(checkoutID.value))) {
    console.log("nothing here...");
    return [];
  }
  
  try {
    const checkout = await client.checkout.fetch(checkoutID.value);
    if (!checkout || !checkout.lineItems || checkout.lineItems.length === 0) {
      console.log('Cart is empty');
      return [];
    }

    const cartItems = checkout.lineItems
      .filter((item: any) => item.quantity > 0)
      .map((item: any) => {
        const hasVariants = item.variant && item.variant.selectedOptions && item.variant.selectedOptions.length > 0;

        return {
          title: item.title,
          cartItemID: item.id,
          variantID: item.variant?.id || null,
          size: hasVariants ? item.variant.selectedOptions[0]?.value : 'N/A',
          color: hasVariants ? item.variant.selectedOptions[1]?.value : 'N/A',
          variantTitle: item.variant?.title || 'Default',
          quantity: item.quantity,
          price: Number(item.variant?.price?.amount).toFixed(2) || Number(item.price?.amount).toFixed(2),
          currency: item.variant?.price?.currencyCode || item.price?.currencyCode,
          image: item.variant?.image?.src || item.image?.src,
          
        };
      });

    return cartItems;
  } catch (error) {
    console.error("Error displaying cart:", error);
    return [];
  }
}

export async function FinalCheckout() {
  const checkoutID = cookies().get('checkoutID');
  const shopifyCheckout = await client.checkout.fetch(checkoutID!.value);
  
  if (shopifyCheckout.webUrl) {
    return shopifyCheckout.webUrl;
  }
}

export async function FetchPrivacyPolicy() {
  const policies = await client.shop.fetchPolicies();
  return policies;
}