import React, { FC } from 'react';
import { Box } from 'zmp-ui';

interface IProps {
    title: string;
    image: string;
    url?: string;
    onClick: (data: any) => void;
}

const CollectionItemWithImage: FC<IProps> = (props) => {
    const { title, url, image, onClick } = props;

    return (
        <Box className='overlay overlay-show rounded-xl w-full' onClick={onClick}>
            <div
                className='bgi-no-repeat bgi-position-center bgi-size-cover rounded-xl ratio-3x2'
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'contain',
                }}
            />
            <div
                className='rounded-xl overlay-layer'
                style={{
                    background: `linear-gradient(transparent 0%, rgba(0, 0, 0, 0.70))`,
                }}
            >
                <span className='absolute bottom-0 left-0 text-white text-xs font-bold ms-2 mb-2 text__ellipsis_1'>
                    {title}
                </span>
            </div>
        </Box>
    );
};
export default CollectionItemWithImage;
