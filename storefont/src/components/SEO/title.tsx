import { Helmet, HelmetProps } from 'react-helmet-async';

const SeoTitle = (props: HelmetProps) => {
    const { title } = props;

    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    )
}
export default SeoTitle;