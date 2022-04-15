import { gql } from "graphql-tag";

export const GET_CATEGORIES = gql`
  query {
    categories {
      name
    }
  }
`;

export const GET_CURRENCIES = gql`
  query {
    currencies {
      symbol
    }
  }
`;

export const GET_ALL_PRODUCTS = `
  query {
    category(input: { title: "all" }) {
      name
      products {
        name
        id
        brand
        attributes {
          id
          name
          type
        }
        category
        gallery
        inStock
        description
        prices {
          amount
          currency {
            label
            symbol
          }
        }
      }
    }
  }
`;

export const GET_CLOTHES_PRODUCTS = `
query {
  category(input: { title: "clothes" }) {
    name
    products {
      name
      id
      brand
      attributes {
        id
        name
        type
      }
      category
      gallery
      inStock
      description
      prices {
        amount
        currency {
          label
          symbol
        }
      }
    }
  }
}
`;

export const GET_TECH_PRODUCTS = `
query {
  category(input: { title: "tech" }) {
    name
    products {
      name
      id
      brand
      attributes {
        id
        name
        type
      }
      category
      gallery
      inStock
      description
      prices {
        amount
        currency {
          label
          symbol
        }
      }
    }
  }
}
`;
