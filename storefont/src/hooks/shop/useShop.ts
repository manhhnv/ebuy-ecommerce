import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_SHOP_INFO } from '../../service/shop/shop.graphql';
import { UseShopPropsType } from '../../types';
import { GetShopInfo } from '../../generated/generate-types';

const useShop = (props: UseShopPropsType) => {
    const { id } = props;
    
    const { data, error, loading } = useQuery<GetShopInfo.Query, GetShopInfo.Variables>(GET_SHOP_INFO, {
        variables: {
            id: id
        },
        fetchPolicy: "cache-and-network"
    });
    return {
        data,
        error,
        loading
    }
}
export default useShop;