import CollectionItemOnlyImage from 'components/Softcom/Collection/CollectionItemOnlyImage';
import { CDN_SHOW_IMAGE } from 'constants/common';
import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Header, Icon, Page } from 'zmp-ui';
import CollectionInfo from './CollectionInfo';
import { ProductListByCollection } from './ProductListByCollection';
import { useLazyNewCollectionGetDetailQuery } from 'services/newCollection';
import appConfig from '../../../app-config.json';

interface IProps {}

const DetailCollection: FC<IProps> = (props) => {
    const { collectionId } = useParams() as { collectionId: string };
    const aid = appConfig.env.VITE_SHOP_ID;

    // const [getDetail, getDetailState] = useLazyGetDetailCollectionQuery();
    const [getDetail, getDetailState] = useLazyNewCollectionGetDetailQuery();

    useEffect(() => {
        getDetail({
            Id: collectionId,
            Aid: aid,
        });
    }, [collectionId]);

    return (
        <Page className='flex flex-col' hideScrollbar>
            <Header
                title={getDetailState?.data?.CollectionName || ''}
                showBackIcon
                backIcon={<Icon icon='zi-chevron-left-header' className='text-5xl text-dark' />}
            />

            <Box className='mb-4 px-4'>
                <CollectionInfo
                    name={getDetailState?.data?.CollectionName || ''}
                    description={getDetailState?.data?.Description || ''}
                >
                    {({ open }) => (
                        <CollectionItemOnlyImage
                            title={getDetailState?.data?.CollectionName || ''}
                            image={`${CDN_SHOW_IMAGE}${getDetailState?.data?.IconPath}`}
                            onClick={open}
                        />
                    )}
                </CollectionInfo>
            </Box>

            {/* <Box className='flex items-center justify-center px-4 mb-4'>
                <div className='overflow-x-auto no-scrollbar'>
                    <div className='flex items-center gap-2'>
                        <span className='whitespace-nowrap rounded-lg bg-primary-lighter hover:bg-primary-light px-2 py-0.5 text-xs font-semibold leading-6 text-grey-900'>
                            Vé khu vui chơi
                        </span>
                        <span className='whitespace-nowrap rounded-lg bg-primary-lighter hover:bg-primary-light px-2 py-0.5 text-xs font-semibold leading-6 text-grey-900'>
                            Thời trang
                        </span>
                        <span className='whitespace-nowrap rounded-lg bg-primary-lighter hover:bg-primary-light px-2 py-0.5 text-xs font-semibold leading-6 text-grey-900'>
                            Thẻ thành viên
                        </span>
                        <span className='whitespace-nowrap rounded-lg bg-primary-lighter hover:bg-primary-light px-2 py-0.5 text-xs font-semibold leading-6 text-grey-900'>
                            Evoucher
                        </span>
                        <span className='whitespace-nowrap rounded-lg bg-primary-lighter hover:bg-primary-light px-2 py-0.5 text-xs font-semibold leading-6 text-grey-900'>
                            Thẻ nạp dịch vụ
                        </span>
                        <span className='whitespace-nowrap rounded-lg bg-primary-lighter hover:bg-primary-light px-2 py-0.5 text-xs font-semibold leading-6 text-grey-900'>
                            Dịch vụ khác
                        </span>
                    </div>
                </div>
            </Box> */}
            <Box className='px-4'>
                <ProductListByCollection
                    isLoading={getDetailState?.isFetching}
                    collectionId={collectionId}
                    // products={getDetailState?.data?.GroupServices || []}
                />
            </Box>
        </Page>
    );
};
export default DetailCollection;
