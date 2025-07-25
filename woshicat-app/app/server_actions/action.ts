'use server';

import { createStorefrontApiClient as shopify } from '@shopify/storefront-api-client';
import { cookies } from 'next/headers';
import { 
  productsQuery,
  collectionNamesQuery,
  collectionsInfoQuery,
  collectionByHandle,
  productByHandle,
  createCartMutation,
  validateCartQuery,
  addLineItemQuery,
  getCartQuery,
  updateCartQuery, 
  getCheckoutQuery,
  productRecommendationsQuery
} from './queries';

const shopify_domain = process.env.SHOPIFY_STORE_DOMAIN;
const shopify_token = process.env.SHOPIFY_TOKEN;

const client = shopify({
  storeDomain: shopify_domain!,
  publicAccessToken: shopify_token!,
  apiVersion: '2025-01',
});


async function getProducts(cursor?: string | null): Promise<any[]> {
  const { data, errors } = await client.request(productsQuery(cursor));
  try {
    const products = data.products.edges.map((item: any) => {
      const collection = item.node.collections.edges[0];
      const price = item.node.priceRange.maxVariantPrice.amount;
      const images = item.node.images.edges.map((image: any) => ({
        url: image.node.url,
        altText: image.node.altText,
      }));
      
      if (collection === undefined) {
        return '';
      }

      if (price === undefined) {
        return -1; // -1 catches that a price was not assigned, use later to catch errors for pricing
      }

      return {
        id: item.node.id, //product id in shopify
        name: item.node.title, //product title in shopify
        handle: item.node.handle, // product handle in shopify
        collection: collection.node.handle, //collection handle
        collectionTitle: collection.node.title,
        inventoryCount: item.node.totalInventory, //total inventory in stock
        available: item.node.totalInventory > 0, //checks if item is available
        price: Number(price).toFixed(2) || 0, //price assigned in shopify
        description: item.node.description, //description assigned to product in shopify
        images: images, //array of images related to shopify product
      }; 
    })
    
    return [products, { 
      endCursor: data.products.pageInfo.endCursor, 
      hasNextPage: data.products.pageInfo.hasNextPage
    }]; // allow to display in reverse order from upload order
  } catch (error) {
    throw errors;
  }
};

export async function getAllProductsHelper(cursor?: string | null) {
  const products = await getProducts(cursor);
  return products;
}

async function getProductRecommendations(handle: string): Promise<any[]> {
  const recommendationsQuery = productRecommendationsQuery(handle);
  const { data, errors } = await client.request(recommendationsQuery);
  try {
    const productRecommendations = data.productRecommendations.map((product: any) => {
      const images = product.images.edges.map((img: any) => {
        return {
          url: img.node.url,
          altText: img.node.altText
        }
      })
      
      return {
        id: product.id,
        handle: product.handle,
        available: product.availableForSale,
        collection: product.collections.edges[0].node.handle,
        images: images,
        name: product.title,
        price: product.priceRange.maxVariantPrice.amount
      }
    })
    return productRecommendations;
  } catch (error) {
    throw errors;
  }
}

export async function getProductRecommendationsHelper(handle: string) {
  const productRecommendations = await getProductRecommendations(handle);
  return productRecommendations;
}

async function getCollectionNames(): Promise<string[]> {
  const { data, errors } = await client.request(collectionNamesQuery);
  try {
    const collectionNames = data.collections.edges.map((names: any) => {
        return {
          id: names.node.id,
          handle: names.node.handle,
          title: names.node.title
        }
      })

    return collectionNames;
    
  } catch (error) {
    console.error('Error fetching collection:', errors);
    throw errors;
  }
}

export async function getCollectionNamesHelper() {
  const collections = await getCollectionNames();
  return collections;
}

async function getCollectionInfo(): Promise<string[]> {
  const { data, errors } = await client.request(collectionsInfoQuery);
  try {
    const collectionDisplay = data.collections.edges.map((collection: any) => {
      return {
        handle: collection.node.handle,
        title: collection.node.title,
        imgSrc: collection.node.image.url,
        imgAlt: collection.node.image.altText,
        featured: collection.node.metafield.value
      }
    })
    return collectionDisplay;
  } catch (error) {
    console.error('Error fetching collection:', errors);
    throw errors;
  }
}

export async function getCollectionInfoHelper() {
  const collectionInfo = await getCollectionInfo();
  return collectionInfo;
}

async function getFeaturedCollection(): Promise<string[]> {
  const { data, errors } = await client.request(collectionsInfoQuery);
  try {
    const featured = data.collections.edges.map((collection: any) => {
      return {
        handle: collection.node.handle,
        title: collection.node.title,
        imgSrc: collection.node.image.url,
        imgAlt: collection.node.image.altText,
        featured: collection.node.metafield.value
      }

    })

    return featured.filter((collection: any) => collection.featured === 'true');
  } catch (error) {
    console.error('Error fetching featured collection:', errors);
    throw errors;
  }
}

export async function getFeaturedCollectionHelper() {
  const featuredCollection = await getFeaturedCollection();
  return featuredCollection;
}

async function getCollectionByHandle(handle: string, cursor?: string | null): Promise<any[]> {
  const collectionHandleQuery: string = collectionByHandle(handle, cursor);
  const { data, errors } = await client.request(collectionHandleQuery);
  try {
    const products = data.collection.products.edges.map((product: any) => {
      const info = product.node;
      const itemPrice = Number(info.priceRange.maxVariantPrice.amount).toFixed(2);
      const imageList = info.images.nodes.map((image: any) => {
        return {
          url: image.url,
          altText: image.altText
        }
      })

      return {
        id: info.id,
        title: info.title,
        handle: info.handle,
        available: Number(info.totalInventory) > 0,
        price: itemPrice,
        images: imageList,
        collection: handle,
        collectionImg: data.collection.image.url,
        collectionAlt: data.collection.image.altText,
        collectionTitle: data.collection.title,
      }
    }
  )
    
    return [products, {
      endCursor: data.collection.products.pageInfo.endCursor, 
      hasNextPage: data.collection.products.pageInfo.hasNextPage
    }];
  } catch (error) {
    throw errors;
  }
};

export async function getCollectionProductsHelper(handle: string, cursor?: string | null) {
  const products = await getCollectionByHandle(handle, cursor);
  return products;
}

async function getProductByHandle(handle: string): Promise<any> {
  const singleProductQuery: string = productByHandle(handle);
  const { data, errors } = await client.request(singleProductQuery);
  try {
    if (data.product.tags.includes('no-variants')) {
      const images = data.product.images.edges.map((image: any) => {
        return {
          url: image.node.url,
          altText: image.node.altText
        }
      });
      const price = Number(data.product.priceRange.maxVariantPrice.amount).toFixed(2);
      const collection = {
        title: data.product.collections.edges[0].node.title,
        handle: data.product.collections.edges[0].node.handle
      }

      const variantOptions = {
        id: data.product.variants.edges[0].node.id,
        title: data.product.title,
        quantity: data.product.totalInventory
      };

    
      return {
        id: data.product.id,
        title: data.product.title,
        quantity: data.product.totalInventory,
        description: data.product.description,
        collection: collection,
        price: price,
        variants: variantOptions,
        images: images,
        type: data.product.productType,
        tags: data.product.tags
      };
    }

    const images = data.product.images.edges.map((image: any) => {
      return {
        url: image.node.url,
        altText: image.node.altText
      }
    });
    const price = Number(data.product.priceRange.maxVariantPrice.amount).toFixed(2);
    const collection = {
      title: data.product.collections.edges[0].node.title,
      handle: data.product.collections.edges[0].node.handle
    }

    const variantOptions = data.product.variants.edges.map((option: any) => {
      return {
        id: option.node.id,
        title: option.node.title,
        quantity: option.node.quantityAvailable,
        size: option.node.selectedOptions[0].value,
        color: option.node.selectedOptions[1].value
      };
    });
    
    return {
      id: data.product.id,
      title: data.product.title,
      quantity: data.product.totalInventory,
      description: data.product.description,
      collection: collection,
      price: price,
      variants: variantOptions,
      images: images,
      type: data.product.productType,
      tags: data.product.tags
    };
  } catch(error) {
    console.log(error);
    throw errors;
  };
}

export async function getProductByHandleHelper(handle: string) {
  const item = await getProductByHandle(handle);
  return item;
}

// Cart functions: //

// Function to validate if the checkout session is still active
async function validateCart(): Promise<boolean> {
  const cartID = (await cookies()).has('cartID');
  if (cartID) {
    const validId = (await cookies()).get('cartID')!;
    const cartValidation: string = validateCartQuery(validId.value);
    const { data, errors } = await client.request(cartValidation);
    // Check if the checkout session is completed or invalid
    try {
      const cart = data.cart.id;
      if (cart === null) {
        (await cookies()).delete('cartID');
        return false; // Cart ID does not exist or customer checkout complete on our shopify store
      }
      const urlCheck = (await cookies()).has('checkoutUrl');
      if (urlCheck) {
        (await cookies()).delete('checkoutUrl');
      }
    } catch (error) {
      throw errors;
    }
    return true;
  }
  return false // Cart ID does not exist as a cookie
  
};

// Create cart function, run if cart ID doesn't exist or is not valid
async function createCart(itemID: string, quantity: number): Promise<boolean> {
  const cartMutation: string = createCartMutation(itemID, quantity);
  const { data, errors } = await client.request(cartMutation);
  try {
    const cartID = data.cartCreate.cart.id;
    (await cookies()).set('cartID', cartID, { secure: true }); // set cookie to store cart ID
    
    console.log('cart created and id set. checkout url set.');
    return true;
  } catch (error) {
    console.log('There was an error creating the cart: ', errors);
    return false;
  }
}

// Add item to cart if valid cart exists, otherwise calls createCart() to create cart
export async function addToCart(
  variantID: string, 
  quantityAdd: number, 
  ): Promise<void> {
  const validCart = await validateCart();
  console.log(validCart);
  if (validCart) {
    const cartID = (await cookies()).get('cartID')?.value!;
    const lines =
      `
      {
        merchandiseId: "${variantID}"
        quantity: ${quantityAdd}
      }
      `

    const addLineItem = addLineItemQuery(lines, cartID);
    const { data, errors } = await client.request(addLineItem);
    try {
      if (data) {
        console.log('item variant added to cart');
      } else {
        console.log("product was not added to cart, something happened!")
      }
    } catch (error) {
      throw errors;
    }
  } else {
    const newCart = await createCart(variantID, quantityAdd);
    if (newCart) {
      console.log('new cart created and items added to cart');
    } else {
      console.log('An error occurred. Cart was not created');
    }; 
  }
}

// get cart function. calls shopify storefront api through GraphQl query
export async function getCart() {
  const cartID = (await cookies()).get('cartID');
  if (!cartID || !(await validateCart())) {
    throw new Error('Cart not found');
  }

  const getCartItems = getCartQuery(cartID.value);
  const { data, errors } = await client.request(getCartItems);
  if (data) {
    const lineItems = data.cart.lines.edges.map((line: any) => {
      return {
      cartLineId: line.node.id,
      quantity: line.node.quantity,
      variantId: line.node.merchandise.id,
      variantTitle: line.node.merchandise.title,
      price: line.node.merchandise.price.amount,
      inventoryAvailable: line.node.merchandise.quantityAvailable,
      imageUrl: line.node.merchandise.image.url,
      imageAlt: line.node.merchandise.image.altText,
      collection: line.node.merchandise.product.collections.edges[0].node.handle,
      handle: line.node.merchandise.product.handle,
      title: line.node.merchandise.product.title
    }
  })

  return lineItems;
  } else {
    console.log('could not get cart, check errors: ');
    throw errors?.graphQLErrors;
  }
  
}

// Find line item id through variant ID. returns the first line item found
export async function findLineItemId(variantId: string) {
  const cartItems = await getCart();
  const lineItems = cartItems.filter((item: any) => item.variantId === variantId);
  return lineItems[0] || null;
}

// update item quantity in cart. used for increasing, decreasing, and removing line item
export async function updateCartQuantity(variantID: string, quantity: number): Promise<void> {
  const cartID = (await cookies()).get('cartID');
  if (!cartID || !validateCart()) {
    throw new Error('Checkout ID not found');
  }

  const cartItemId = await findLineItemId(variantID);
  if (cartItemId === null) {
    console.log('something happened in finding the item id')
    return;
  }

  const lineItemToUpdate = `
		{ 
      id: "${cartItemId.cartLineId}" 
      quantity: ${quantity}
    }
	`
  const update = updateCartQuery(cartID.value, lineItemToUpdate)
  const { data, errors } =  await client.request(update);
  if (data) {
    console.log('line item updated, new quantity: ', quantity);
  } else {
    console.log('an error occured updating the cart, check errors');
    throw errors;
  }
};

// validates cart and calls for
export async function FinalCheckout() {
  const cartId = (await cookies()).get('cartID')?.value;
  const validCart = await validateCart();
  if (cartId && validCart) {
    const checkout = getCheckoutQuery(cartId);
    const { data, errors } = await client.request(checkout);
    if (data) {
      return data.cart.checkoutUrl;
    } else {
      console.log('error getting checkout url.');
      throw errors;
    }
  }
  
  return;
};