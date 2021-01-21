import React from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import useShop from '../../hooks/shop/useShop';

const ShopInfo: InferGetStaticPropsType<typeof getServerSideProps> = (props) => {
    const router = useRouter();
    const { shopId } = props
    console.log(shopId)
    const {
        data,
        loading,
        error
    } = useShop({ id: shopId })
    if (loading) {
        return (
            <React.Fragment>
                <h3>Loading</h3>
            </React.Fragment>
        )
    }
    if (error) {
        router.push('/')
    }
    return (
        <React.Fragment>
            {data?.getShopInfo?.brandName}
        </React.Fragment>
    )
}

export const getServerSideProps: GetStaticProps = async (context) => {
    const id = context.params.id;
    if (!id) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            shopId: id
        }
    }
}

export default ShopInfo;