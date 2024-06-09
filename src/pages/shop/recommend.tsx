import { Section } from 'components/Section';
import { ProductSlideSkeleton } from 'components/Skeletons';
import RecommendProduct from 'components/Softcom/Product/RecommendProduct';
import React, { FC, Suspense, useEffect } from 'react';
import { useLazyGetListProductQuery } from 'services/product';
import { Swiper, SwiperSlide } from 'swiper/react';

export const RecommendContent: FC = () => {
    const [getData, getDataState] = useLazyGetListProductQuery();
    useEffect(() => {
        getData({
            Filter: [],
            PageIndex: 1,
            PageSize: 6,
            Keyword: '',
            FieldName: 'Priority',
            Orderby: 'desc',
            UsingDate: new Date().toISOString(),
        });
    }, []);
    return (
        <Section title='Gợi ý cho bạn' padding='title-only'>
            {getDataState.isFetching ? (
                <RecommendFallback />
            ) : (
                <>
                    {getDataState.data && getDataState.data.Result.length > 0 ? (
                        <Swiper slidesPerView={1.25} spaceBetween={16} className='px-4' loop>
                            {getDataState.data.Result.map((product, i) => (
                                <SwiperSlide key={i}>
                                    <RecommendProduct
                                        data={product}
                                        onClick={function (data: any): void {
                                            throw new Error('Function not implemented.');
                                        }}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <></>
                    )}
                </>
            )}
        </Section>
    );
};

export const RecommendFallback: FC = () => {
    return (
        <div className='px-4'>
            <ProductSlideSkeleton />
        </div>
    );
};

export const Recommend: FC = () => {
    return (
        <Suspense fallback={<RecommendFallback />}>
            <RecommendContent />
        </Suspense>
    );
};
