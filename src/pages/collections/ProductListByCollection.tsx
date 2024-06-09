import React, { FC, Suspense, useEffect, useState } from 'react';
import { Box, Button, Icon } from 'zmp-ui';
import { ProductItemSkeleton } from 'components/Skeletons';
import ProductItem from 'components/Softcom/Product/ProductItem';
import CartContext from 'contexts/Cart/CartContext';
import { FilterItemTypeEnum, FilterOptJoinQueryEnum } from 'types/dynamicFilter';
import { NewCollectionGetByPageRequest } from 'models/NewCollection/NewCollectionRequest';
import appConfig from '../../../app-config.json';
import { NewListingGetByPageResponse } from 'models/NewListing/NewListingResponse';
import { useLazyNewListingGetByPageQuery } from 'services/newListing';

interface ProductListByCollectionInterface {
    isLoading?: boolean;
    collectionId: string;
}

export const ProductListContent: FC<ProductListByCollectionInterface> = (
    props: ProductListByCollectionInterface,
) => {
    const { isLoading, collectionId } = props;
    const { cart } = React.useContext(CartContext);
    const aid = appConfig.env.VITE_SHOP_ID;

    const [getData, getDataState] = useLazyNewListingGetByPageQuery();

    const [request, setRequest] = useState<NewCollectionGetByPageRequest>({
        Filter: [
            {
                Opt: FilterOptJoinQueryEnum.And,
                Name: 'CollectionId',
                Opt1: '=',
                Type: FilterItemTypeEnum.List,
                Values: JSON.stringify([collectionId]),
            },
        ],
        PageIndex: 1,
        PageSize: 12,
        Keyword: '',
        FieldName: 'Priority',
        Orderby: 'desc',
        AId: aid,
    });

    const [products, setProducts] = useState<NewListingGetByPageResponse>([]);

    useEffect(() => {
        getData(request)
            .unwrap()
            .then((res) => setProducts([...products, ...res.Result]));
        /* #region dữ liệu fake */
        // .then(() => {
        //     setProducts([
        //         {
        //             Description: 'Description',
        //             DiscountPercentage: 1,
        //             HasPromotion: true,
        //             HasVariationUsingDate: true,
        //             Id: 'fed9a193-3f21-4e06-af45-205612625ac0',
        //             Images: [
        //                 {
        //                     Url: 'https://cdn.digiticket.vn/Content/ShowFile/Images/21-03-2024/shopee-5_1711015682.jpg',
        //                 },
        //             ],
        //             Name: 'Name',
        //             Price: 50000,
        //             PromotionPrice: 50000,
        //             ShortDescription: 'ShortDescription',
        //         },
        //         {
        //             Description: 'Description 2',
        //             DiscountPercentage: 1,
        //             HasPromotion: true,
        //             HasVariationUsingDate: true,
        //             Id: 'fed9a193-3f21-4e06-af45-205612625ac0',
        //             Images: [
        //                 {
        //                     Url: 'https://cdn.digiticket.vn/Content/ShowFile/Images/21-03-2024/shopee-5_1711015682.jpg',
        //                 },
        //             ],
        //             Name: 'Name 2',
        //             Price: 50000,
        //             PromotionPrice: 50000,
        //             ShortDescription: 'ShortDescription 2',
        //         },
        //         {
        //             Description: 'Description 2',
        //             DiscountPercentage: 1,
        //             HasPromotion: true,
        //             HasVariationUsingDate: true,
        //             Id: 'fed9a193-3f21-4e06-af45-205612625ac0',
        //             Images: [
        //                 {
        //                     Url: 'https://cdn.digiticket.vn/Content/ShowFile/Images/21-03-2024/shopee-5_1711015682.jpg',
        //                 },
        //             ],
        //             Name: 'Name 2',
        //             Price: 50000,
        //             PromotionPrice: 50000,
        //             ShortDescription: 'ShortDescription 2',
        //         },
        //         {
        //             Description: 'Description 2',
        //             DiscountPercentage: 1,
        //             HasPromotion: true,
        //             HasVariationUsingDate: true,
        //             Id: 'fed9a193-3f21-4e06-af45-205612625ac0',
        //             Images: [
        //                 {
        //                     Url: 'https://cdn.digiticket.vn/Content/ShowFile/Images/21-03-2024/shopee-5_1711015682.jpg',
        //                 },
        //             ],
        //             Name: 'Name 2',
        //             Price: 50000,
        //             PromotionPrice: 50000,
        //             ShortDescription: 'ShortDescription 2',
        //         },
        //     ]);
        // });
        /* #endregion */
    }, [request]);

    return (
        <>
            {getDataState.isFetching && request.PageIndex === 1 ? (
                <ProductListFallback />
            ) : (
                <>
                    <Box className='grid grid-cols-2 gap-4'>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <ProductItem
                                    data={product}
                                    onClick={() => {}}
                                    key={product.Id}
                                    itemInCart={
                                        cart.ListItem.find((o) => o.Id === product.Id) || undefined
                                    }
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
                                    className='text-primary text-sm'
                                    loading={Boolean(
                                        (getDataState.isFetching || getDataState.isLoading) &&
                                            getDataState.originalArgs?.PageIndex &&
                                            getDataState.originalArgs?.PageIndex > 0,
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
                                    className='text-grey-900 text-sm'
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
        </>
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

export const ProductListByCollection: FC<ProductListByCollectionInterface> = (
    props: ProductListByCollectionInterface,
) => {
    return (
        <Suspense fallback={<ProductListFallback />}>
            <ProductListContent {...props} />
        </Suspense>
    );
};
