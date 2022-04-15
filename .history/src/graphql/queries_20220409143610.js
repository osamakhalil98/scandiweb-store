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

export const GET_ALL_PRODUCTS = gql`
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
