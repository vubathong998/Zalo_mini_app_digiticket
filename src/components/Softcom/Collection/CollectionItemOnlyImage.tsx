import React, { FC } from 'react';
import { Box } from 'zmp-ui';

interface IProps {
    title: string;
    image: string;
    url?: string;
    onClick: (data: any) => void;
}

const CollectionItemOnlyImage: FC<IProps> = (props) => {
    const { title, image, onClick } = props;

    return (
        <Box className='overlay overlay-show rounded-xl w-full' onClick={onClick}>
            <div
                className='bgi-no-repeat bgi-position-center bgi-size-cover rounded-xl ratio-2x1'
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                }}
            />
            <div
                className='rounded-xl overlay-layer'
                style={{
                    background: `rgba(0, 0, 0, 0.4)`,
                }}
            >
                <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-bold text__ellipsis_2 w-full text-center px-2'>
                    {title}
                </span>
            </div>
        </Box>
    );
};
export default CollectionItemOnlyImage;
