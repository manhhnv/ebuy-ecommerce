import { Helmet } from 'react-helmet-async';

interface SeoMetaProps {
    name: string;
    content: string;
}

const SeoMeta = (props: SeoMetaProps) => {
    return (
        <Helmet>
            <meta name={props?.name} content={props?.content}></meta>
        </Helmet>
    )
}

export default SeoMeta;