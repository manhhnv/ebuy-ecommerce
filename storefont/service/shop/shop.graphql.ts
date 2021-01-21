import gql from "graphql-tag";
import { OWNER_FRAGMENT } from '../fragment.graphql';

export const GET_SHOP_INFO = gql`
    query getShopInfo($id: ID!) {
        getShopInfo(_id: $id) {
            brandName
            owner {
                ...OwnerFragment
            }
            metaDescription
            metaKeyword
        }
    }
    ${OWNER_FRAGMENT}
`;