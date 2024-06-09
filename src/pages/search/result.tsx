import { ProductItemSkeleton } from 'components/Skeletons';
import ProductItem from 'components/Softcom/Product/ProductItem';
import React, { FC, Suspense, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useLazyNewListingGetByPageQuery } from 'services/newListing';
import { useLazyGetListProductQuery } from 'services/product';
import { keywordState } from 'state';
import { Box, Text } from 'zmp-ui';
import appConfig from '../../../app-config.json';

const SearchResultContent: FC = () => {
    const [keyword] = useRecoilState(keywordState);
    const aid = appConfig.env.VITE_SHOP_ID;

    const [getData, getDataState] = useLazyNewListingGetByPageQuery();
    useEffect(() => {
        getData({
            Filter: [],
            PageIndex: 1,
            PageSize: 10,
            Keyword: keyword,
            FieldName: 'Priority',
            Orderby: 'desc',
            AId: aid,
            // UsingDate: new Date().toISOString(),
        });
    }, [keyword]);

    return (
        <Box flex flexDirection='column' className='bg-background flex-1 min-h-0'>
            {getDataState.isSuccess && !getDataState.isFetching && (
                <Text.Title className='p-4 py-0' size='small'>
                    Kết quả ({getDataState.data?.Result.length})
                </Text.Title>
            )}
            {getDataState.isFetching ? (
                <SearchResultFallback />
            ) : (
                <>
                    {getDataState.data && getDataState.data?.Result.length > 0 ? (
                        <Box className='grid grid-cols-2 gap-2 p-4'>
                            {getDataState.data?.Result.map((product) => (
                                <ProductItem data={product} onClick={() => {}} />
                            ))}
                        </Box>
                    ) : (
                        <Box className='flex-1 flex justify-center items-center pb-24'>
                            <Text size='xSmall' className='text-grey'>
                                Không tìm thấy kết quả. Vui lòng thử lại
                            </Text>
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
};

const SearchResultFallback: FC = () => {
    const result = [...new Array(5)];
    return (
        <Box flex flexDirection='column' className='bg-background flex-1 min-h-0'>
            <Text.Title className='p-4 py-0' size='small'>
                Đang tìm kiếm...
            </Text.Title>
            <Box className='grid grid-cols-2 gap-2 p-4'>
                {result.map((_, i) => (
                    <ProductItemSkeleton key={i} />
                ))}
            </Box>
        </Box>
    );
};

export const SearchResult: FC = () => {
    return (
        <Suspense fallback={<SearchResultFallback />}>
            <SearchResultContent />
        </Suspense>
    );
};
