import { ProductModel } from 'models/Product/ProductModel';
import React, { FC } from 'react';
import toThousandSeparator from 'utils/toThousandSeparator';
import { Box } from 'zmp-ui';
import ProductPicker from '../BottomSheetPicker/ProductPicker';

interface IProps {
    data: ProductModel;
    onClick: (data: any) => void;
}

const RecommendProduct: FC<IProps> = (props) => {
    const { data, onClick } = props;
    const isSale = data.PromotionPrice > 0;
    return (
        <ProductPicker product={data}>
            {({ open }) => (
                <div onClick={open}>
                    <Box className='overlay overlay-show rounded-xl w-full'>
                        <div
                            // className='relative aspect-video rounded-lg bg-cover bg-center bg-skeleton'
                            style={{
                                backgroundImage: `url(https://digipost.digiticket.vn/cdn/Content/ShowImage?url=${
                                    data?.Images[0]?.Url || ''
                                })`,
                            }}
                            className='bgi-no-repeat bgi-position-center bgi-size-cover rounded-xl aspect-[3/2]'
                            // style={{
                            //     backgroundImage: `url(${image})`,
                            //     backgroundSize: 'cover',
                            // }}
                        />
                        <div
                            className='rounded-xl overlay-layer'
                            style={{
                                background: `linear-gradient(180deg,transparent 80%,rgba(0,0,0,0.25))`,
                            }}
                        />
                        {isSale && (
                            <span className='absolute top-0 right-0 me-2 mt-2 bg-danger px-[8px] py-[2px] font-bold text-white rounded-full text-sm'>
                                Giảm{' '}
                                <span className='text-white'>
                                    {Math.round(
                                        ((data.EndUsedPrice - data.PromotionPrice) /
                                            data.EndUsedPrice) *
                                            100,
                                    )}
                                    %
                                </span>
                            </span>
                        )}
                    </Box>
                    <Box className='grid'>
                        <span className='text-grey-400 text-xs text__ellipsis_1 mt-1'>
                            {data.Code}
                        </span>
                        <span className='text-grey-800 text-sm font-semibold text__ellipsis_1'>
                            {data.Name}
                        </span>
                        <div className='pb-2 flex gap-2'>
                            {isSale && (
                                <span className='text-danger font-semibold text-sm'>
                                    <span>{toThousandSeparator(data.PromotionPrice)}</span>
                                </span>
                            )}
                            <span
                                className={`${
                                    isSale
                                        ? 'text-grey-400 text-xs'
                                        : 'text-primary text-sm font-semibold'
                                }`}
                                style={isSale ? { textDecoration: 'line-through' } : {}}
                            >
                                {toThousandSeparator(data.EndUsedPrice)}
                            </span>
                        </div>
                    </Box>
                </div>
            )}
        </ProductPicker>
    );
};
export default RecommendProduct;
