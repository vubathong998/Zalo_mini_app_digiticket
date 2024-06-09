import CreateOrderForm from 'components/Softcom/BottomSheetPicker/CreateOrderForm';
import CartCreateOrder from 'components/Softcom/Cart/CartCreateOrder';
import React, { FC } from 'react';
import { Header, Icon, Page } from 'zmp-ui';
import ListItem from './ListItem';

const CartPage: FC = () => {
    return (
        <Page className='flex flex-col' hideScrollbar>
            <Header
                title='Giỏ hàng'
                showBackIcon
                backIcon={<Icon icon='zi-chevron-left-header' className='text-5xl text-dark' />}
            />
            <ListItem />
            {/* <Divider size={32} className='flex-1' /> */}
            <CreateOrderForm>
                {({ open }) => <CartCreateOrder onCreateOrder={open} />}
            </CreateOrderForm>
        </Page>
    );
};

export default CartPage;
