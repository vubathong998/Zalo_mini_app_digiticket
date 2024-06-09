import React, { FC, HTMLProps, PropsWithChildren } from 'react';
import { Box, Text } from 'zmp-ui';
import { BodyTextProps } from 'zmp-ui/text';

export const TextSkeleton: FC<PropsWithChildren<BodyTextProps>> = ({ className, ...props }) => {
    return (
        <Text
            {...props}
            className={`bg-skeleton text-transparent w-fit h-fit animate-pulse ${className ?? ''}`}
        />
    );
};

export const ImageSkeleton: FC<HTMLProps<HTMLImageElement>> = ({ className, ...props }) => {
    return <div {...props} className={`bg-skeleton animate-pulse ${className ?? ''}`} />;
};

export const ProductItemSkeleton: FC = () => {
    return (
        <div className='flex flex-col gap-2'>
            <ImageSkeleton className='w-full ratio-3x2 rounded-xl max-h-44' />
            <TextSkeleton className='!bg-skeleton rounded-full !h-[16px] !w-full'></TextSkeleton>
            <TextSkeleton
                size='xxSmall'
                className='!bg-skeleton rounded-full !h-[16px] !w-1/3'
            ></TextSkeleton>
        </div>
    );
};

export const ProductSlideSkeleton: FC = () => {
    return (
        <div className='space-y-1'>
            <ImageSkeleton className='w-full aspect-video rounded-xl' />
            <Box className='space-y-1'>
                <TextSkeleton size='small' className='rounded-full h-[16px] w-1/3'></TextSkeleton>
                <TextSkeleton
                    size='xxSmall'
                    className='rounded-full h-[16px] w-full'
                ></TextSkeleton>
                <TextSkeleton size='large' className='rounded-full h-[16px] w-1/4'></TextSkeleton>
            </Box>
        </div>
    );
};

export const ProductSearchResultSkeleton: FC = () => {
    return (
        <div className='flex items-center space-x-4'>
            <ImageSkeleton className='w-[88px] h-[88px] rounded-lg' />
            <Box className='space-y-2'>
                <TextSkeleton>1234567890</TextSkeleton>
                <TextSkeleton size='xSmall'>25,000đ</TextSkeleton>
            </Box>
        </div>
    );
};
export const CollectionListItemSkeleton: FC = () => {
    return (
        <div className='flex items-center flex-col'>
            <ImageSkeleton className='w-[50px] h-[50px] rounded-lg mb-1' />
            <Box>
                <TextSkeleton className='w-[60px] rounded-full h-[15px]'></TextSkeleton>
            </Box>
        </div>
    );
};
export const CollectionSwiperItemSkeleton: FC = () => {
    return <ImageSkeleton className='w-[100px] h-[100px] rounded-lg' />;
};

export const ShopListItemSkeleton: FC = () => {
    return <ImageSkeleton className='w-full rounded-xl h-[70px]' />;
};
