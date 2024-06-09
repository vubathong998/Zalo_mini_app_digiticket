import CartItemPicker from 'components/Softcom/BottomSheetPicker/CartItemPicker';
import CartItem from 'components/Softcom/Cart/CartItem';
import ListRenderer from 'components/Softcom/ListRenderer';
import CartContext from 'contexts/Cart/CartContext';
import { NewCartListItemModel } from 'models/NewCart/NewCartModel';
import React, { FC, useContext, useState } from 'react';
import { Box } from 'zmp-ui';
const ListItem: FC = () => {
    const [editingItem, setEditingItem] = useState<NewCartListItemModel | undefined>(undefined);
    const { cart } = useContext(CartContext);

    return (
        <Box className='h-full '>
            {cart.ListItem.length > 0 ? (
                <CartItemPicker selected={editingItem}>
                    {({ open }) => (
                        <ListRenderer
                            classNameItemContainer='mb-0'
                            items={cart.ListItem}
                            renderKey={(item: NewCartListItemModel) => JSON.stringify(item)}
                            renderItem={(item: NewCartListItemModel) => (
                                <CartItem
                                    data={item}
                                    onClick={(item: NewCartListItemModel) => {
                                        setEditingItem(item);
                                        open();
                                    }}
                                />
                            )}
                        />
                    )}
                </CartItemPicker>
            ) : (
                <div className='bg-white rounded-xl py-8 px-4flex flex-col items-center justify-center'>
                    <div className='text-base text-center text-grey-400 w-full'>
                        Không có sản phẩm trong giỏ hàng
                    </div>
                    <img
                        data-testid='Image'
                        width='100%'
                        className='object-fit-cover'
                        src='https://cdn.digiticket.vn/Content/ShowFile/Images/15-06-2023/preview_1686802084.png'
                        style={{
                            transition: 'filter 0.5s linear 0s',
                            background: 'white',
                            overflow: 'hidden',
                        }}
                    />
                </div>
            )}
        </Box>
    );
};
export default ListItem;
