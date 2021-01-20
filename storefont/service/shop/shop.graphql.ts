import gql from "graphql-tag";

export const GET_SHOP_INFO = gql`
    query getShopInfo($id: ID!) {
        getShopInfo(_id: $id) {
            _id
        }
    }
`;