import React, { FC, Fragment } from 'react';
import Box from 'zmp-ui/box';

interface IProps {
    image: string;
}

const BannerItem: FC<IProps> = (props) => {
    const { image } = props;
    return (
        <Fragment>
            <Box
                className='w-full rounded-xl ratio-2x1 bgi-size-cover bgi-position-center'
                style={{ backgroundImage: `url(${image})` }}
            />
        </Fragment>
    );
};
export default BannerItem;
