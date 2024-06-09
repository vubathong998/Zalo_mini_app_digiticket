import { api } from '../api';
import { newAddItemToCart } from './queries/newAddItemToCart';
import { newCreateOrderFromCart } from './queries/newCreateOrderFromCart';
import { newGetCartDetail } from './queries/newGetCartDetail';
import { newRemoveItemFromCart } from './queries/newRemoveItemFromCart';
import { newUpdateCartItemQuantity } from './queries/newUpdateCartItemQuantity';

const queries = api.injectEndpoints({
    endpoints: (builder) => ({
        newAddItemToCart: newAddItemToCart(builder),
        newGetCartDetail: newGetCartDetail(builder),
        newUpdateCartItemQuantity: newUpdateCartItemQuantity(builder),
        newRemoveItemFromCart: newRemoveItemFromCart(builder),
        newCreateOrderFromCart: newCreateOrderFromCart(builder)
    }),
});

export default queries;
