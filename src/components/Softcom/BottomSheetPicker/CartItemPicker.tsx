import { Sheet } from 'components/BottomSheet';
import CartContext from 'contexts/Cart/CartContext';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import toThousandSeparator from 'utils/toThousandSeparator';
import { Box, Button } from 'zmp-ui';
import QuantityPicker from './QuantityPicker';
import { NewCartListItemModel } from 'models/NewCart/NewCartModel';
import { GUID_EMPTY } from 'constants/guid';
export interface CartItemPickerProps {
    children: (methods: { open: () => void; close: () => void }) => ReactNode;
    selected?: NewCartListItemModel;
}

const CartItemPicker: FC<CartItemPickerProps> = (props) => {
    const { children, selected } = props;
    const [visible, setVisible] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const {
        isLoadingUpdateItemQuantityFromCart,
        isLoadingRemoveItemFromCart,
        cart,
        updateItemQuantity,
        removeItem,
    } = React.useContext(CartContext);
    const updateCart = () => {
        if (selected && cart.CartId && cart.CartId !== '') {
            updateItemQuantity({
                cartItemId: selected.CartItemId,
                groupServiceId: selected.Id || GUID_EMPTY,
                quantity: quantity,
            });
            setVisible(false);
        }
    };
    // const removeFromCart = () => {
    //     if (selected && cart.CartId && cart.CartId !== '') {
    //         removeItem({
    //             cartItemId: selected.CartItemId,
    //             groupServiceId: selected.Id || GUID_EMPTY,
    //         });
    //         setVisible(false);
    //     }
    // };
    useEffect(() => {
        if (selected) {
            setQuantity(selected.Count);
        }
    }, [selected]);

    return (
        <>
            {children({
                open: () => setVisible(true),
                close: () => setVisible(false),
            })}
            {createPortal(
                <Sheet visible={visible} onClose={() => setVisible(false)} autoHeight>
                    {selected && (
                        <Box className='space-y-6 mt-2' p={4}>
                            <Box className='space-y-2'>
                                <div className=''>
                                    <div className='font-semibold'>{selected.Name}</div>
                                    {/* <span className=' text-grey-400'>{selected.Unit}</span> */}
                                </div>

                                <div className='flex'>
                                    <span className=' text-primary'>
                                        ₫
                                        {toThousandSeparator(
                                            (selected.TotalPrice / selected.Count) * quantity,
                                        )}
                                        ₫
                                    </span>
                                </div>
                            </Box>
                            <Box className='space-y-5'>
                                <QuantityPicker value={quantity} onChange={setQuantity} />

                                <Button
                                    loading={
                                        isLoadingRemoveItemFromCart ||
                                        isLoadingUpdateItemQuantityFromCart
                                    }
                                    variant={'primary'}
                                    type={'highlight'}
                                    className={'!bg-warning-dark !text-white'}
                                    fullWidth
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (quantity > 0) updateCart();
                                    }}
                                >
                                    Cập nhật giỏ hàng
                                    {/* {quantity > 0 ? 'Cập nhật giỏ hàng' : 'Xoá'} */}
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Sheet>,
                document.body,
            )}
        </>
    );
};
export default CartItemPicker;
