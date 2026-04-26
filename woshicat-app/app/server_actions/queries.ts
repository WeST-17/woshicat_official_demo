// Product Related Queries
export const productsQuery = (cursor?: string | null) => {
  if (cursor) {
    return (
      `
        query {
          products(first: 12, after: "${cursor}", reverse: true) {
            edges {
              node {
                id
                handle
                title
                totalInventory
                collections(first: 5) {
                  edges {
                    node {
                      title
                      handle
                    }
                  }
                }
                priceRange {
                  maxVariantPrice {
                    amount
                  }
                }
                description
                images(first: 10) {
                  pageInfo {
                    hasNextPage
                    hasPreviousPage
                  }
                  edges {
                    cursor
                    node {
                      url
                      altText
                    }
                  }
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      `
    )
  }
  
  return (
    `
    query {
      products(first: 12, reverse: true) {
        edges {
          node {
            id
            handle
            title
            totalInventory
            collections(first: 5) {
              edges {
                node {
                  title
                  handle
                }
              }
            }
            priceRange {
              maxVariantPrice {
                amount
              }
            }
            description
            images(first: 10) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                cursor
                node {
                  url
                  altText
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `
  )
};
export const collectionNamesQuery = `
  query {
    collections(first: 10) {
      edges {
        node {
          id
          handle
          title
        }
      }
    }
  }
`;
export const collectionsInfoQuery = `
  query {
    collections(first: 12) {
      edges {
        node {
          id
          handle
          title
          image {
            url
            altText
          }
          metafield(namespace: "collection", key: "featured") {
            value
          }
        }
      }
    }
  }
`;
export const featuredCollectionItems = (handle: string) => {
  return (`
    query {
      collection(handle: "${handle}") {
        id
        handle
        title
        products(first: 10) {
          edges {
            node {
              id
              title
              handle
              totalInventory
              priceRange {
                maxVariantPrice {
                  amount
                }
              }
              images(first: 3) {
                nodes {
                  url
                  altText
                }
              }
              collections(first: 1) {
                edges {
                  node {
                    handle
                  }
                }
              }
            }
          }
        }
      }
    }
  `);
};
export const collectionByHandle = (handle: string, cursor?: string | null) => {
  if (cursor) {
    return (`
      query {
        collection(handle: "${handle}") {
          id
          handle
          title
          image {
            url
            altText
          }
          products(first: 12, after: "${cursor}") {
            edges {
              node {
                id
                title
                handle
                totalInventory
                priceRange {
                  maxVariantPrice {
                    amount
                  }
                }
                images(first: 15) {
                  nodes {
                    url
                    altText
                  }
                }
                collections(first: 1) {
                  edges {
                    node {
                      handle
                    }
                  }
                }
              }
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }
      }
    `)
  }
  // inital request
  return (`
    query {
      collection(handle: "${handle}") {
        id
        handle
        title
        image {
          url
          altText
        }
        products(first: 12) {
          edges {
            node {
              id
              title
              handle
              totalInventory
              priceRange {
                maxVariantPrice {
                  amount
                }
              }
              images(first: 15) {
                nodes {
                  url
                  altText
                }
              }
              collections(first: 1) {
                edges {
                  node {
                    handle
                  }
                }
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  `)
};
export const productByHandle = (handle: string) => {
  
  return (
    ` query {
        product(handle: "${handle}") {
          id
          title
          totalInventory
          description
          productType
          tags
          images(first:15) {
            edges {
              node {
                url
                altText
                width
                height
              }
            }
          }
          media(first:15, reverse:true) {
            edges {
              node {
                ... on Video {
                  id
                  alt
                  mediaContentType
                  sources {
                    url
                    width
                    height
                    mimeType
                  }
                }
              }
            }
          }
          collections(first: 1) {
            edges {
              node {
                title
                handle
              }
            }
          }
          priceRange {
            maxVariantPrice {
              amount
            }
          }
          variants(first: 10) {
            edges {
              node {
                quantityAvailable
                availableForSale
                id
                title
                price {
                  amount
                }
                selectedOptions {
                  name
                  value
                }
                image {
                  url
                }
              }
            }
          }
        }
      }
    `
  )
};
// Cart and Checkout Mutations/Queries
export const createCartMutation = (productVariantID: string, quantity: number) => {
  return (
    `
      mutation {
        cartCreate(
          input: {
            lines: [
              {
                quantity: ${quantity}
                merchandiseId: "${productVariantID}"
              }
            ]
          }
        ) {
          cart {
            id
            createdAt
            updatedAt 
          }
        }
      }
    `
  )
}
export const validateCartQuery = (cartID: string) => {
  return (
    `
      {
        cart(
          id: "${cartID}"
        ) {
          id
          createdAt
          updatedAt
        }
      }
    `
  )
}
export const addLineItemQuery = (lines: string, cartID: string) => {
  return (
    `
      mutation {
        cartLinesAdd(
          cartId: "${cartID}"
          lines: ${lines}
        ) {
          cart {
            id
            lines(first: 20) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                    }
                  }
                }
              }
            }
            cost {
              subtotalAmount {
                amount
                currencyCode
              }
            }
          }
        }
      }
    `
  )
}
export const getCartQuery = (cartID: string) => {
  return (
    `
      query {
        cart(
          id: "${cartID}"
        ) {
          id
          createdAt
          updatedAt
          lines(first: 25) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    quantityAvailable
                    image {
                      url
                      altText
                    }
                    price {
                      amount
                      currencyCode
                    }
                    product {
                      handle
                      title
                      collections(first:1) {
                        edges {
                          node {
                            handle
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          cost {
            subtotalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    `
  )
}
export const updateCartQuery = (cartID: string, lines: string) => {
  return (
    `
      mutation {
        cartLinesUpdate(
          cartId: "${cartID}"
          lines: ${lines}
        ) {
          cart {
            id
            updatedAt
            lines(first: 25) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                    }
                  }
                }
              }
            }
            cost {
              subtotalAmount {
                amount
                currencyCode
              }
            }
          }
        }
      }
    `
  );
}
export const getCheckoutQuery = (cartID: string) => {
  return (
    `
      {
        cart(
          id: "${cartID}"
        ) {
          id
          updatedAt
          checkoutUrl
        }
      }
    `
  )
}
export const productRecommendationsQuery = (handle: string) => {
  return (
    `
      query {
        productRecommendations(intent: RELATED, productHandle: "${handle}") {
          id
          handle
          title
          availableForSale
          priceRange {
            maxVariantPrice {
              amount
            }
          }
          collections(first: 1) {
            edges {
              node {
                handle
              }
            }
          }
          images(first: 2) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    `
  )
}