import React, { createContext, useContext, useEffect, useReducer } from 'react';
// types
import AuthContext from 'contexts/Auth/AuthContext';
import { CartItemResponseModel } from 'models/Cart/CartModel';
import { CartCreateBookingRequest } from 'models/Cart/CartRequest';
import { CartResponse } from 'models/Cart/CartResponse';
import { generatePath } from 'react-router-dom';
import { paths } from 'routes/routeConfig';
import { useCreateBookingMutation, useReduceItemFromCartMutation } from 'services/cart';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
    getDataStorageByKey,
    removeDataStorageByKey,
    setDataStorageByKey,
} from 'utils/nativeStorage';
import { useNavigate, useSnackbar } from 'zmp-ui';
import appConfig from '../../../app-config.json';
import type { Action, CartContextType, CartProviderProps } from './CartContext.type';
import { CartDispatchEnum } from './CartContext.type';
import {
    useLazyNewGetCartDetailQuery,
    useNewAddItemToCartMutation,
    useNewCreateOrderFromCartMutation,
    useNewRemoveItemFromCartMutation,
    useNewUpdateCartItemQuantityMutation,
} from 'services/newCart';
import {
    NewCartAddItemResponse,
    NewCartGetDetailResponse,
    NewCartUpdateItemResponse,
    NewItemRemoveFromCartResponse,
} from 'models/NewCart/NewCartResponse';
import queryString from 'query-string';
import { NewCreateOrderFromCartRequest } from 'models/NewCart/NewCartRequest';

const MySwal = withReactContent(Swal);

// initial state
const initialState: CartContextType = {
    isLoadingCart: false,
    isLoadingCreateBookingFromCart: false,
    isLoadingAddItemToCart: false,
    isLoadingReduceItemFromCart: false,
    isLoadingUpdateItemQuantityFromCart: false,
    isLoadingRemoveItemFromCart: false,
    cart: {
        DistributorId: '',
        CartId: '',
        DisWorkgroupId: undefined,
        Expires: undefined,
        ListItem: [],
        PlaceOrEventId: '',
        PoeWorkgroupId: undefined,
        TenantId: undefined,
        WorkgroupId: undefined,
    },
    updateCart: () => {},
    addItem: () => {},
    updateItemQuantity: () => {},
    reduceItem: () => {},
    removeItem: () => {},
    createBooking: () => {},
};

// create context
const CartContext = createContext<CartContextType>(initialState);

// handlers
const handlers: Record<
    CartDispatchEnum,
    (state: CartContextType, action: Action) => CartContextType
> = {
    updateCart: (state, action) => {
        const cart = action.payload as NewCartGetDetailResponse;
        return { ...state, cart: cart };
    },
    createBooking: (state, action) => {
        const cart = action.payload as NewCartGetDetailResponse;
        return {
            ...state,
            cart: cart,
        };
    },
};

// reducer
const reducer = (state: CartContextType, action: Action) =>
    handlers[action.type] ? handlers[action.type](state, action) : state;

// provider
const CartProvider = (props: CartProviderProps) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialState);
    const snackbar = useSnackbar();
    const navigate = useNavigate();

    const [newGetCartDetail, newGetCartDetailState] = useLazyNewGetCartDetailQuery();

    // const [createBookingFromCart, createBookingFromCartState] = useCreateBookingMutation();
    const [newCreateOrderFromCart, newCreateOrderFromCartState] =
        useNewCreateOrderFromCartMutation();
    const [newAddItemToCart, newAddItemToCartState] = useNewAddItemToCartMutation();
    const [reduceItemFromCart, reduceItemFromCartState] = useReduceItemFromCartMutation();
    const [newUpdateItemQuantityFromCart, newUpdateItemQuantityFromCartState] =
        useNewUpdateCartItemQuantityMutation();
    const [newRemoveItemFromCart, newRemoveItemFromCartState] = useNewRemoveItemFromCartMutation();

    const updateCart = (cart: CartResponse) => {
        setDataStorageByKey({
            key: appConfig.nativeKey.cartId,
            data: cart.CartId as string,
        });

        dispatch({
            type: CartDispatchEnum.updateCart,
            payload: cart,
        });
    };

    const addItem = async ({
        groupServiceId,
        quantity = 1,
        usingDate,
    }: {
        groupServiceId: string;
        quantity: number;
        usingDate: Array<string>;
        // CId?: string;
    }) => {
        newAddItemToCart({
            CartId: state.cart.CartId || '',
            UsingDate: usingDate,
            Count: quantity || 1,
            ItemId: groupServiceId,
        })
            .unwrap()
            .then((r) => {
                dispatch({
                    type: CartDispatchEnum.updateCart,
                    payload: r as NewCartAddItemResponse,
                });
                setDataStorageByKey({
                    key: appConfig.nativeKey.cartId,
                    data: r.CartId,
                });
                snackbar.openSnackbar({
                    type: 'success',
                    text: 'Sản phẩm đã thêm vào giỏ hàng',
                    position: 'top',
                });
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const updateItemQuantity = ({
        cartItemId,
        groupServiceId,
        quantity,
    }: {
        groupServiceId: string;
        cartItemId: string;
        quantity: number;
    }) => {
        if (state.cart.CartId) {
            newUpdateItemQuantityFromCart({
                CartId: state.cart.CartId,
                Count: quantity,
                ItemId: groupServiceId,
                CartItemId: cartItemId,
            })
                .unwrap()
                .then((r) => {
                    dispatch({
                        type: CartDispatchEnum.updateCart,
                        payload: r as NewCartUpdateItemResponse,
                    });
                    snackbar.openSnackbar({
                        type: 'success',
                        text: 'Đã thay đổi số lượng sản phẩm trong giỏ hàng',
                        position: 'top',
                    });
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    };
    const reduceItem = (item: CartItemResponseModel) => {
        if (state.cart.CartId)
            reduceItemFromCart({
                CartId: state.cart.CartId,
                Count: item.Count,
                GroupServiceId: item.GroupServiceId,
                CartItemId: item.CartItemId,
            })
                .unwrap()
                .then((r) => {
                    dispatch({
                        type: CartDispatchEnum.updateCart,
                        payload: r as CartResponse,
                    });
                })
                .catch((e) => {
                    console.log(e);
                });
    };
    const removeItem = ({
        cartItemId,
        groupServiceId,
        quantity,
    }: {
        groupServiceId: string;
        cartItemId: string;
        quantity: number;
    }) => {
        if (state.cart.CartId)
            newRemoveItemFromCart({
                CartId: state.cart.CartId,
                CartItemId: cartItemId,
                GroupServiceId: groupServiceId,
            })
                .unwrap()
                .then((r) => {
                    dispatch({
                        type: CartDispatchEnum.updateCart,
                        payload: r as NewItemRemoveFromCartResponse,
                    });
                    snackbar.openSnackbar({
                        type: 'success',
                        text: 'Đã bỏ sản phẩm khỏi giỏ hàng',
                        position: 'top',
                    });
                })
                .catch((e) => {
                    console.log(e);
                });
    };
    const createBooking = (request: NewCreateOrderFromCartRequest) => {
        if (state.cart.CartId)
            newCreateOrderFromCart({
                ...request,
            })
                .unwrap()
                .then((r) => {
                    dispatch({
                        type: CartDispatchEnum.createBooking,
                        payload: {
                            CartId: null,
                            ListItem: [],
                        },
                    });
                    removeDataStorageByKey(appConfig.nativeKey.cartId);
                    if (r.PaymentUrl && r.Signature) {
                        navigate(
                            generatePath(paths.Payment, {
                                orderCode: r.OrderCode,
                                signature: r?.Signature,
                            }),
                        );
                    } else {
                        MySwal.fire({
                            title: '<strong class="text-lg">Đặt hàng thành công</strong>',
                            html: `<div class="flex flex-col gap-2">
                            <span class="text-sm">Đã tạo đơn hàng #${r.OrderCode}</span>
                            <span class="text-sm">Chúng tôi sẽ liên hệ với bạn sau ít phút</span>
                        </div>`,
                            icon: 'success',
                            confirmButtonColor: '#186F65',
                            customClass: {
                                cancelButton: 'text-md p-6',
                                confirmButton: 'text-md p-6',
                            },
                            didClose: async () => {
                                navigate(paths.Shop);
                            },
                        });
                        navigate(generatePath(paths.MyBooking));
                    }
                })
                .catch((e) => {
                    MySwal.fire({
                        title: <strong>Thất bại</strong>,
                        html: `Không thể tạo đơn hàng`,
                        icon: 'error',
                    });
                });
    };

    useEffect(() => {
        getDataStorageByKey(appConfig.nativeKey.scToken).then((res: Record<string, string>) => {
            if (
                `${appConfig.nativeKey.scToken}` in res &&
                Boolean(res[appConfig.nativeKey.scToken])
            ) {
                getDataStorageByKey(appConfig.nativeKey.cartId)
                    .then(async (r: Record<string, string>) => {
                        // console.log({
                        //     token: res[appConfig.nativeKey.scToken],
                        // });
                        if (appConfig.nativeKey.cartId in r && r[appConfig.nativeKey.cartId]) {
                            newGetCartDetail({
                                Id: r[appConfig.nativeKey.cartId],
                            })
                                .unwrap()
                                .then((cart: any) => {
                                    dispatch({
                                        type: CartDispatchEnum.updateCart,
                                        payload: cart as NewCartGetDetailResponse,
                                    });
                                })
                                .catch((err) => {
                                    console.log({ err });
                                });
                        }
                    })
                    .catch(async (err) => {
                        console.log({ err });
                    });
            }
        });
    }, []);
    return (
        <CartContext.Provider
            value={{
                ...state,
                isLoadingCreateBookingFromCart: newCreateOrderFromCartState.isLoading,
                isLoadingCart: newGetCartDetailState.isLoading,
                isLoadingAddItemToCart: newAddItemToCartState.isLoading,
                isLoadingReduceItemFromCart: reduceItemFromCartState.isLoading,
                isLoadingUpdateItemQuantityFromCart: newUpdateItemQuantityFromCartState.isLoading,
                isLoadingRemoveItemFromCart: newRemoveItemFromCartState.isLoading,
                updateCart,
                addItem,
                reduceItem,
                removeItem,
                updateItemQuantity,
                createBooking,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// export
export { CartProvider };

export default CartContext;
