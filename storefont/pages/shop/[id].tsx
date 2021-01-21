import React from 'react';
import { GetStaticProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import useShop from '../../hooks/shop/useShop';
import SeoTitle from '../../components/SEO/title';
import SeoMeta from '../../components/SEO/meta';

const ShopInfo: InferGetServerSidePropsType<typeof getServerSideProps> = (props) => {
    const router = useRouter();
    const { shopId } = props
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
            <SeoTitle title={data?.getShopInfo?.brandName + ', Ebuy Online Shop | Ebuy, E-commerce'}/>
            <SeoMeta name="description" content={data?.getShopInfo?.metaDescription} />
            <SeoMeta name="keywords" content={data?.getShopInfo?.metaKeyword} />

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