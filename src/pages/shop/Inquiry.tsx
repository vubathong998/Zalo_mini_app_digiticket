import React, { FC } from 'react';
import { paths } from 'routes/routeConfig';
import { Box, Input, useNavigate } from 'zmp-ui';

export const Inquiry: FC = () => {
    const navigate = useNavigate();
    return (
        <Box p={4} className='bg-white'>
            <Input.Search
                onClick={() => navigate(paths.Search)}
                placeholder="Tìm kiếm sản phẩm ...'"
            />
        </Box>
    );
};
