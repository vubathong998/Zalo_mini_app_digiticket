/* #region hooks */
import { Section } from 'components/Section';
import React, { FC, Suspense, useEffect, useState } from 'react';
import { Box, Button, Icon } from 'zmp-ui';
import { ProductItemSkeleton } from 'components/Skeletons';
import ProductItem from 'components/Softcom/Product/ProductItem';
import CartContext from 'contexts/Cart/CartContext';
import appConfig from '../../../app-config.json';
import { NewListingGetByPageRequest } from 'models/NewListing/NewListingRequest';
import { useLazyNewListingGetByPageQuery } from 'services/newListing';
import { NewListingGetByPageResponse } from 'models/NewListing/NewListingResponse';
import { newListingGetByPage } from 'services/newListing/queries/newGetListProduct';
import { Sheet } from 'components/BottomSheet';
/* #endregion */

export const ProductListContent: FC = () => {
    /* #region variable */
    const aid = appConfig.env.VITE_SHOP_ID;
    const { cart } = React.useContext(CartContext);
    /* #endregion */

    /* #region useState */
    const [request, setRequest] = useState<NewListingGetByPageRequest>({
        AId: aid,
        Filter: [],
        PageIndex: 1,
        PageSize: 8,
        Keyword: '',
        FieldName: 'Priority',
        Orderby: 'desc',
    });
    const [products, setProducts] = useState<NewListingGetByPageResponse>([]);
    /* #endregion */

    /* #region services */
    const [getData, getDataState] = useLazyNewListingGetByPageQuery();
    /* #endregion */

    /* #region process later */
    useEffect(() => {
        getData(request)
            .unwrap()
            .then((res) => setProducts([...products, ...res.Result]));
    }, [request]);
    /* #endregion */

    return (
        <Section title='Danh sách sản phẩm'>
            {getDataState.isFetching && request.PageIndex === 1 ? (
                <ProductListFallback />
            ) : (
                <>
                    <Box className='grid grid-cols-2 gap-2'>
                        {products && products.length > 0 ? (
                            products?.map((val) => (
                                <ProductItem
                                    data={val}
                                    onClick={() => {}}
                                    key={val.Id}
                                    itemInCart={cart.ListItem.find((o) => o.Id === val.Id)}
                                />
                            ))
                        ) : (
                            <></>
                        )}
                    </Box>
                    {getDataState.data && (
                        <Box>
                            {getDataState.data.Total / request.PageSize > request.PageIndex ? (
                                <Button
                                    className='text-primary'
                                    loading={Boolean(
                                        (getDataState.isFetching || getDataState.isLoading) &&
                                            getDataState.data.PageIndex &&
                                            getDataState.data.PageIndex > 0,
                                    )}
                                    onClick={() =>
                                        setRequest({
                                            ...request,
                                            PageIndex: request.PageIndex + 1,
                                        })
                                    }
                                    fullWidth
                                    suffixIcon={
                                        <Icon icon='zi-chevron-down' className='text-primary' />
                                    }
                                    variant='tertiary'
                                    type='neutral'
                                >
                                    Xem thêm
                                </Button>
                            ) : (
                                <Button
                                    className='text-grey-900'
                                    fullWidth
                                    variant='tertiary'
                                    type='neutral'
                                >
                                    Đã hết sản phẩm
                                </Button>
                            )}
                        </Box>
                    )}
                </>
            )}
        </Section>
    );
};

export const ProductListFallback: FC = () => {
    const products = [1, 2, 3, 4];

    return (
        <Box className='grid grid-cols-2 gap-2'>
            {products.map((product, i) => (
                <ProductItemSkeleton key={`prod-${i}`} />
            ))}
        </Box>
    );
};

export const ProductList: FC = () => {
    return (
        <Suspense fallback={<ProductListFallback />}>
            <ProductListContent />
        </Suspense>
    );
};
