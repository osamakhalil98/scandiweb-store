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
      label
    }
  }
`;

export const GET_PRODUCTS = `
  query getCategoryProducts($title:String!){
    category(input: { title: $title }) {
      name
      products {
        name
        id
        brand
        attributes {
          id
          name
          type
          items{
            value
            displayValue
            id
          }
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

export const GET_PRODUCT = `
query getProduct($id:String!){
  product(id:$id){
    name
    gallery
    description
    category
    brand
    prices{
      amount
      currency{
        symbol
        label
      }
    }
    attributes{
      id
      name
      type
      items{
        displayValue
        value
        id
      }
      
    }
    id
    inStock
  }
}
`;
