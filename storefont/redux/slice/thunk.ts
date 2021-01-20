import { createAsyncThunk } from '@reduxjs/toolkit';
import useShop from '../../hooks/shop/useShop';
import { client } from '../../service/config';
import { GET_SHOP_INFO } from '../../service/shop/shop.graphql';

export const fetchDataAPI = createAsyncThunk(
    'cart/fetchDataAPI',
    async () => {
       const data =  client.query({query: GET_SHOP_INFO, variables:{id: "60032d697baff543476fb632"}})
       .then(result => {
           return result.data.getShopInfo;
       })
        return data;
    }
)