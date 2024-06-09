import { Divider } from 'components/Divider';
import React, { Suspense } from 'react';
import { Page } from 'zmp-ui';
import { Categories } from './categories';
import { Collections } from './Collections';
import { Inquiry } from './Inquiry';
import { ProductList } from './ProductList';
// import { Recommend } from './Recommend';
import { Welcome } from './Welcome';
const ShopPage: React.FunctionComponent = () => {
    return (
        <Page className='relative flex-1 flex flex-col bg-white' hideScrollbar>
            <Welcome />
            {/* <Box className='flex-1 overflow-auto'> */}
            <Inquiry />
            {/* <Banner /> */}
            <Suspense>
                <Categories />
            </Suspense>
            <Divider />
            {/* aaa */}
            {/* <Recommend /> */}
            <Divider />
            <Suspense>
                <Collections />
            </Suspense>
            <Divider />
            <ProductList />
            <Divider />
            {/* </Box> */}
        </Page>
    );
};

export default ShopPage;
