import { Section } from 'components/Section';
import { CollectionSwiperItemSkeleton } from 'components/Skeletons';
import CollectionItemWithImage from 'components/Softcom/Collection/CollectionItemWithImage';
import { CDN_SHOW_IMAGE } from 'constants/common';
import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import { generatePath } from 'react-router-dom';
import { paths } from 'routes/routeConfig';
import { useNewCollectionGetByPageQuery } from 'services/newCollection';
import { FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box } from 'zmp-ui';
import appConfig from '../../../app-config.json';

export const Collections: FC = () => {
    const navigate = useNavigate();
    const aid = appConfig.env.VITE_SHOP_ID;

    const { data, isFetching, isSuccess, isError, refetch } = useNewCollectionGetByPageQuery(
        {
            AId: aid,
            Keyword: '',
            Filter: [],
            Orderby: 'asc',
            PageIndex: 1,
            PageSize: 20,
            CreateBy: 0,
            FieldName: 'CreateDate',
        },
        {
            refetchOnMountOrArgChange: true,
            refetchOnReconnect: true,
        },
    );

    const goToCollection = (collectionId: string) => {
        navigate(
            generatePath(paths.DetailCollection, {
                collectionId: collectionId,
            }),
        );
    };

    return (
        <Section
            title='Bộ sưu tập'
            toolbar={() => (
                <span
                    className='text-danger-dark'
                    onClick={() => {
                        navigate(paths.ListCollection);
                    }}
                >
                    Xem tất cả
                </span>
            )}
        >
            <Box className='bg-white'>
                {isFetching ? (
                    <Swiper
                        spaceBetween={12}
                        slidesPerView={3.3}
                        modules={[FreeMode]}
                        pagination={{
                            clickable: true,
                        }}
                        loop
                        freeMode
                    >
                        {[1, 2, 3, 4, 5].map((collection, i) => (
                            <SwiperSlide key={i}>
                                <CollectionSwiperItemSkeleton />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <>
                        {isSuccess && data ? (
                            <Swiper
                                spaceBetween={12}
                                slidesPerView={3.2}
                                modules={[FreeMode]}
                                pagination={{
                                    clickable: true,
                                }}
                                loop
                                freeMode
                            >
                                {data.Result.map((collection, i) => (
                                    <SwiperSlide key={i}>
                                        <CollectionItemWithImage
                                            key={i}
                                            onClick={() => goToCollection(collection.Id)}
                                            title={collection.CollectionName}
                                            image={`${CDN_SHOW_IMAGE}${collection.IconPath}`}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        ) : (
                            <></>
                        )}
                    </>
                )}
            </Box>
        </Section>
    );
};
