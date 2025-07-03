// Product Related Queries
export const productsQuery = `
  query {
    products(first: 20) {
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
                originalSrc
                altText
              }
            }
          }
        }
      }
    }
  }
`;
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
    collections(first: 10) {
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
export const collectionByHandle = (handle: string) => {
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
        products(first: 20) {
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
              images(first: 50) {
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
          images(first:10) {
            edges {
              node {
                url
                altText
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