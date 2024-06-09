import { DisplayPrice } from 'components/Display/Price';
import CartContext from 'contexts/Cart/CartContext';
import React, { FC, useContext } from 'react';
import pay from 'utils/product';
import sumBy from 'utils/sumby';
import { Box, Button, Text } from 'zmp-ui';

export const CartPreview: FC = () => {
    const { cart } = useContext(CartContext);
    const quantity = sumBy(cart.ListItem, (o) => o.Count);
    const totalPrice = sumBy(cart.ListItem, (o) => o.TotalPrice);
    return (
        <Box flex className='sticky bottom-0 bg-background p-4 space-x-4'>
            <Box
                flex
                flexDirection='column'
                justifyContent='space-between'
                className='min-w-[120px] flex-none'
            >
                <Text className='text-grey' size='xSmall'>
                    {quantity} sản phẩm
                </Text>
                <Text.Title size='large'>
                    <DisplayPrice>{totalPrice}</DisplayPrice>
                </Text.Title>
            </Box>
            <Button
                type='highlight'
                disabled={!quantity}
                fullWidth
                onClick={() => pay(totalPrice)}
            >
                Đặt hàng
            </Button>
        </Box>
    );
};
