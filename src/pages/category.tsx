import { ProductItemSkeleton } from 'components/Skeletons';
import ProductItem from 'components/Softcom/Product/ProductItem';
import { CATEGORIES } from 'constants/categories';
import { GUID_EMPTY } from 'constants/guid';
import CartContext from 'contexts/Cart/CartContext';
import { CategoryEnum } from 'models/Category/CategoryEnum';
import { GetListProductRequest } from 'models/Product/ProductRequest';
import { ProductListResponse } from 'models/Product/ProductResponse';
import React, { FC, Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLazyGetListProductQuery } from 'services/product';
import { Box, Button, Header, Icon, Page, Tabs, Text } from 'zmp-ui';

const CategoryPicker: FC = () => {
    const selectedCategory = useParams()?.categoryId || CATEGORIES[0].Id;
    return (
        <Tabs scrollable defaultActiveKey={selectedCategory} className='category-tabs'>
            {CATEGORIES.map((category) => (
                <Tabs.Tab key={category.Id} label={category.label}>
                    <Suspense>
                        <CategoryProducts categoryId={category.Id} />
                    </Suspense>
                </Tabs.Tab>
            ))}
        </Tabs>
    );
};

const CategoryProducts: FC<{ categoryId: CategoryEnum }> = ({ categoryId }) => {
    const [getData, getDataState] = useLazyGetListProductQuery();

    const { cart } = React.useContext(CartContext);

    const [request, setRequest] = useState<GetListProductRequest>({
        Filter: [],
        PageIndex: 1,
        PageSize: 14,
        Keyword: '',
        FieldName: 'Priority',
        Orderby: 'desc',
        CategoryId:
            categoryId && categoryId !== GUID_EMPTY ? categoryId : '',
        // UsingDate: new Date().toISOString(),
    });
    const [products, setProducts] = useState<ProductListResponse>([]);

    useEffect(() => {
        getData(request)
            .unwrap()
            .then((res) => setProducts([...products, ...res.Result]));
    }, [request]);

    return (
        <>
            {getDataState.isFetching && request.PageIndex === 1 ? (
                <Box className='grid grid-cols-2 gap-2 p-4'>
                    {[1, 2, 3, 4].map((product, i) => (
                        <ProductItemSkeleton key={`prod-${i}`} />
                    ))}
                </Box>
            ) : (
                <>
                    {products.length > 0 ? (
                        <Box className='bg-background grid grid-cols-2 gap-4 p-4'>
                            {products.map((product) => (
                                <ProductItem
                                    data={product}
                                    onClick={() => {}}
                                    key={product.Id}
                                    itemInCart={
                                        cart.ListItem.find(
                                            (o) => o.GroupServiceId === product.Id,
                                        ) || undefined
                                    }
                                />
                            ))}
                        </Box>
                    ) : (
                        <Box className='flex-1 bg-background p-4 flex justify-center items-center'>
                            <Text size='xSmall' className='text-grey'>
                                Không có sản phẩm trong danh mục
                            </Text>
                        </Box>
                    )}

                    {products.length > 0 && (
                        <Box className='p-2 mt-2'>
                            <Button
                                className='text-primary'
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
                        </Box>
                    )}
                </>
            )}
        </>
    );
};

const CategoryPage: FC = () => {
    return (
        <Page className='flex flex-col' hideScrollbar>
            <Header
                title='Danh mục'
                backIcon={<Icon icon='zi-chevron-left-header' className='text-5xl text-dark' />}
            />
            <CategoryPicker />
        </Page>
    );
};

export default CategoryPage;
