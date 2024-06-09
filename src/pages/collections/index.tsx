import { ImageSkeleton } from 'components/Skeletons';
import CollectionItemOnlyImage from 'components/Softcom/Collection/CollectionItemOnlyImage';
import { CDN_SHOW_IMAGE } from 'constants/common';
import { GetListCollectionRequest } from 'models/Collection/CollectionRequest';
import { ListCollectionResponse } from 'models/Collection/CollectionResponse';
import { NewCollectionGetByPageRequest } from 'models/NewCollection/NewCollectionRequest';
import {
    NewCollectionResponse,
    newCollectionGetDetailResponse,
} from 'models/NewCollection/NewCollectionResponse';
import { Inquiry } from 'pages/shop/Inquiry';
import React, { FC, Suspense, useEffect, useState } from 'react';
import { generatePath } from 'react-router-dom';
import { paths } from 'routes/routeConfig';
import { useLazyGetListCollectionQuery } from 'services/collection';
import { useLazyNewCollectionGetByPageQuery } from 'services/newCollection';
import { Box, Button, Header, Icon, Page, useNavigate } from 'zmp-ui';
import appConfig from '../../../app-config.json';

const ListCollectionContent: FC = () => {
    const navigate = useNavigate();
    const aid = appConfig.env.VITE_SHOP_ID;

    const [getData, getDataState] = useLazyNewCollectionGetByPageQuery();
    const [request, setRequest] = useState<NewCollectionGetByPageRequest>({
        Filter: [],
        PageIndex: 1,
        PageSize: 12,
        Keyword: '',
        FieldName: '',
        Orderby: 'desc',
        AId: aid,
    });

    const [collections, setCollections] = useState<NewCollectionResponse | null>(null);

    useEffect(() => {
        getData(request)
            .unwrap()
            .then((res) =>
                setCollections((old) => (old ? [...old, ...res.Result] : [...res.Result])),
            );
    }, [request]);

    return (
        <Page className='flex flex-col' hideScrollbar>
            <Header
                title='Danh sách bộ sưu tập'
                showBackIcon
                backIcon={<Icon icon='zi-chevron-left-header' className='text-5xl text-dark' />}
            />
            <Inquiry />
            {getDataState.isFetching && request.PageIndex === 1 ? (
                <ListCollectionFallback />
            ) : (
                <>
                    <Box className='grid grid-cols-2 gap-2 px-4'>
                        {collections && collections.length > 0 ? (
                            collections.map((collection) => (
                                <CollectionItemOnlyImage
                                    image={`${CDN_SHOW_IMAGE}${collection.IconPath}`}
                                    onClick={() => {
                                        navigate(
                                            generatePath(paths.DetailCollection, {
                                                collectionId: collection.Id,
                                            }),
                                        );
                                    }}
                                    title={collection.CollectionName}
                                    key={collection.Id}
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
        </Page>
    );
};

const ListCollectionFallback: FC = () => {
    const collections = [1, 2, 3, 4];

    return (
        <Box className='grid grid-cols-2 gap-2 mx-4'>
            {collections.map((product, i) => (
                <ImageSkeleton key={`collection-${i}`} className='!w-full !h-[90px] !rounded-lg' />
            ))}
        </Box>
    );
};

const ListCollection: FC = () => {
    return (
        <Suspense fallback={<ListCollectionFallback />}>
            <ListCollectionContent />
        </Suspense>
    );
};

export default ListCollection;
