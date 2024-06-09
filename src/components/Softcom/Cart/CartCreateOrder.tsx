import CartContext from 'contexts/Cart/CartContext';
import sumBy from 'lodash/sumBy';
import React, { FC, Fragment } from 'react';
import { paths } from 'routes/routeConfig';
import toThousandSeparator from 'utils/toThousandSeparator';
import { Box, Button, useNavigate } from 'zmp-ui';

interface IProps {
    onCreateOrder: () => void;
}

const CartCreateOrder: FC<IProps> = (props) => {
    const { onCreateOrder } = props;
    const { cart } = React.useContext(CartContext);
    const navigate = useNavigate();
    return (
        <Fragment>
            <Box flex className='sticky bottom-0 bg-background p-4 space-x-4'>
                {cart.ListItem.length === 0 ? (
                    <Button
                        type='highlight'
                        fullWidth
                        size='medium'
                        onClick={() => {
                            navigate(paths.Shop);
                        }}
                    >
                        Bắt đầu mua hàng
                    </Button>
                ) : (
                    <>
                        <Box
                            flex
                            flexDirection='column'
                            justifyContent='space-between'
                            className='min-w-[120px] flex-none'
                        >
                            <span className='text-grey-400'>
                                <span className='me-1'>
                                    {toThousandSeparator(sumBy(cart.ListItem, (o) => o.Count))}
                                </span>
                                sản phẩm
                            </span>
                            <span className=' text-primary'>
                                {toThousandSeparator(sumBy(cart.ListItem, (o) => o.TotalPrice))}
                            </span>
                        </Box>
                        <Button
                            type='highlight'
                            disabled={cart.ListItem.length === 0}
                            fullWidth
                            size='medium'
                            onClick={onCreateOrder}
                        >
                            Đặt hàng
                        </Button>
                    </>
                )}
            </Box>
        </Fragment>
    );
};
export default CartCreateOrder;
