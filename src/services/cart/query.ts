import { api } from '../api';
import { addItemToCart } from './queries/addItemToCart';
import { createBooking } from './queries/createBooking';
import { getCartDetail } from './queries/getCartDetail';
import { reduceItemFromCart } from './queries/reduceItemFromCart';
import { removeItemFromCart } from './queries/removeItemFromCart';
import { updateItemQuantity } from './queries/updateItemQuantity';

const queries = api.injectEndpoints({
    endpoints: (builder) => ({
        addItemToCart: addItemToCart(builder),
        reduceItemFromCart: reduceItemFromCart(builder),
        createBooking: createBooking(builder),
        removeItemFromCart: removeItemFromCart(builder),
        updateItemQuantity: updateItemQuantity(builder),
        getCartDetail: getCartDetail(builder),
    }),
});

export default queries;
