import get from 'lodash/get';
import queryString from 'query-string';
import React, { createContext, useReducer } from 'react';
import {
    useLazyGetProfileQuery,
    useLoginMutation,
    useZaloOAuthByTokenMutation,
} from 'services/auth';
import { useLazyGetShopDetailQuery } from 'services/shop';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { removeDataStorageByKey, setDataStorageByKey } from 'utils/nativeStorage';

import appConfig from '../../../app-config.json';
import { Action, AuthContextType, AuthDispatchEnum, AuthProviderProps } from './AuthContext.type';
const MySwal = withReactContent(Swal);

// initial state
const initialState: AuthContextType = {
    isLoggedIn: false,
    isLoggingIn: false,
    selectedShop: null,
    userInfo: null,
    affiliateCode: null,
    dispatch: () => {},
    login: () => {},
    loginViaQR: () => {},
    updateSelectedShop: () => {},
    updateUserInfo: () => {},
    updateAffiliateCode: () => {},
    logout: () => {},
};

// create context
const AuthContext = createContext<AuthContextType>(initialState);

// handlers
const handlers: Record<
    AuthDispatchEnum,
    (state: AuthContextType, action: Action) => AuthContextType
> = {
    login: (state, action) => {
        const isLoggedIn = action.payload as boolean;
        return { ...state, isLoggedIn: isLoggedIn };
    },
    updateAffiliateCode: (state, action) => {
        const { affiliateCode } = action.payload;

        return { ...state, affiliateCode: affiliateCode || null };
    },
    updateSelectedShop: (state, action) => {
        const selectedShop = action.payload;
        return { ...state, selectedShop: selectedShop };
    },
    updateUserInfo: (state, action) => {
        const userInfo = action.payload;
        return { ...state, userInfo: userInfo };
    },
    loginViaQR: (state, action) => {
        return { ...state };
    },
    logout: (state, action) => {
        return { ...state, isLoggedIn: false };
    },
};

// reducer
const reducer = (state: AuthContextType, action: Action) =>
    handlers[action.type] ? handlers[action.type](state, action) : state;

// provider
const AuthProvider = (props: AuthProviderProps) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialState);
    const [zaloOAuthByToken] = useZaloOAuthByTokenMutation();
    const [getShopDetail] = useLazyGetShopDetailQuery();
    const [getProfile] = useLazyGetProfileQuery();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [loginUserName] = useLoginMutation();
    const notifyCanNotLogin = (action: () => void) => {
        MySwal.fire({
            title: <strong>Không thể truy cập</strong>,
            html: (
                <span>
                    Bạn không thể truy cập ứng dụng này, vui lòng liên hệ quản trị viên ứng dụng
                </span>
            ),
            didClose: async () => {
                await clearAllToken();
                action();
            },
            icon: 'success',
        });
    };

    const clearAllToken = async () => {
        await removeDataStorageByKey(appConfig.nativeKey.scToken);
        await removeDataStorageByKey(appConfig.nativeKey.zToken);
        await removeDataStorageByKey(appConfig.nativeKey.selectedShop);
        await removeDataStorageByKey(appConfig.nativeKey.selectedShopId);
        await removeDataStorageByKey(appConfig.nativeKey.selectedCollection);
        await removeDataStorageByKey(appConfig.nativeKey.selectedCategory);
        await removeDataStorageByKey(appConfig.nativeKey.scRefreshToken);
        await removeDataStorageByKey(appConfig.nativeKey.cartId);
        await removeDataStorageByKey(appConfig.nativeKey.cartTotalItem);
        await removeDataStorageByKey(appConfig.nativeKey.userInfo);
    };

    const getShopData = async () => {
        await getShopDetail({ Id: appConfig.env.VITE_SHOP_ID })
            .unwrap()
            .then(async (r) => {
                dispatch({
                    type: AuthDispatchEnum.updateSelectedShop,
                    payload: r,
                });
                setDataStorageByKey({
                    key: appConfig.nativeKey.selectedShop,
                    data: JSON.stringify(r),
                });
                setDataStorageByKey({
                    key: appConfig.nativeKey.selectedShopId,
                    data: r.Id,
                });
            });
    };
    const getProfileData = async () => {
        await getProfile({})
            .unwrap()
            .then(async (r) => {
                dispatch({
                    type: AuthDispatchEnum.updateUserInfo,
                    payload: r,
                });
            });
    };

    const login = async (successCallback: VoidFunction, aid: string) => {
        setLoading(true);
        await loginUserName({
            Username: '0975685076',
            Password: '123123',
        })
            .unwrap()
            .then(async (res) => {
                await setDataStorageByKey({
                    key: appConfig.nativeKey.scToken,
                    data: res.AccessToken,
                });
                dispatch({
                    type: AuthDispatchEnum.login,
                    payload: true,
                });
                getShopData();
                getProfileData();
            })
            .then(() => {
                setLoading(false);
                successCallback();
            })
            .catch((e) => {
                setLoading(false);
                notifyCanNotLogin(() => {});
            });
        // Real function
        // try {
        //     await api.login({
        //         success: async (r) => {
        //             // Get Zalo Token
        //             api.getAccessToken({
        //                 success: (accessToken) => {
        //                     let userId: string = '';
        //                     api.getUserInfo({
        //                         success: (data) => {
        //                             // xử lý khi gọi api thành công
        //                             const { userInfo } = data;

        //                             if (userInfo) {
        //                                 userId = userInfo.id;
        //                             }
        //                             // Request phone number
        //                             api.getPhoneNumber({
        //                                 success: async (data) => {
        //                                     let { token, number } = data;

        //                                     if (token && token !== '') {
        //                                         zaloOAuthByToken({
        //                                             AccessToken: accessToken,
        //                                             Code: token || '',
        //                                             IsAutoRegister: true,
        //                                             AId: aid,
        //                                         })
        //                                             .unwrap()
        //                                             .then(async (scAuthResponse) => {
        //                                                 await setDataStorageByKey({
        //                                                     key: appConfig.nativeKey.scToken,
        //                                                     data: scAuthResponse.AccessToken,
        //                                                 });

        //                                                 await setDataStorageByKey({
        //                                                     key: appConfig.nativeKey.zToken,
        //                                                     data: JSON.stringify({
        //                                                         AccessToken: accessToken,
        //                                                         Code: token,
        //                                                     }),
        //                                                 });
        //                                                 await getShopData();
        //                                                 await getProfileData();
        //                                                 dispatch({
        //                                                     type: AuthDispatchEnum.login,
        //                                                     payload: true,
        //                                                 });
        //                                             })
        //                                             .then(() => {
        //                                                 setLoading(false);
        //                                                 successCallback();
        //                                             })
        //                                             .catch((e) => {
        //                                                 setLoading(false);
        //                                                 notifyCanNotLogin(() => {});
        //                                             });
        //                                     }
        //                                 },
        //                                 fail: (error) => {
        //                                     setLoading(false);
        //                                     MySwal.fire({
        //                                         title: <strong>Không thành công</strong>,
        //                                         html: (
        //                                             <span>
        //                                                 Bạn cần cấp quyền truy cập số điện thoại để
        //                                                 truy cập
        //                                             </span>
        //                                         ),
        //                                         didClose: async () => {
        //                                             await clearAllToken();
        //                                             window.location.reload();
        //                                         },
        //                                         icon: 'success',
        //                                     });
        //                                 },
        //                             });
        //                         },
        //                         fail: (error) => {
        //                             setLoading(false);
        //                             notifyCanNotLogin(() => {});
        //                         },
        //                     });
        //                 },
        //                 fail: (error) => {
        //                     setLoading(false);
        //                     MySwal.fire({
        //                         title: <strong>Đăng nhập không thành công</strong>,
        //                         html: 'Ứng dụng không có quyền truy cập',
        //                         icon: 'error',
        //                     });
        //                     console.error('Failed getting access token.'); // Ứng dụng không có quyền truy cập access token của user
        //                 },
        //             });
        //         },
        //         fail: (error) => {
        //             setLoading(false);
        //             MySwal.fire({
        //                 title: <strong>Đăng nhập không thành công</strong>,
        //                 html: '',
        //                 icon: 'error',
        //             });
        //         },
        //     });
        // } catch (error) {
        //     setLoading(false);
        //     MySwal.fire({
        //         title: <strong>Đăng nhập không thành công</strong>,
        //         html: '',
        //         icon: 'error',
        //     });
        // }
    };

    const updateAffiliateCode = (affiliateCode: string | null) => {
        if (affiliateCode && affiliateCode !== '')
            dispatch({
                type: AuthDispatchEnum.updateAffiliateCode,
                payload: {
                    affiliateCode: affiliateCode,
                },
            });
    };

    const loginViaQR = async (content: string, successCallback: VoidFunction) => {
        const paramsUrl: queryString.ParsedUrl = queryString.parseUrl(content);

        const affiliateCode = get(paramsUrl, ['query', 'cid'], '') as string;
        let aid = get(paramsUrl, ['query', 'aid'], '') as string;
        const distributorId =
            appConfig.env.VITE_SHOP_ID && appConfig.env.VITE_SHOP_ID !== ''
                ? appConfig.env.VITE_SHOP_ID
                : aid && aid !== ''
                ? aid
                : '';
        if (distributorId !== '')
            await login(() => {
                updateAffiliateCode(affiliateCode);
                successCallback();
            }, distributorId);
    };

    const logout = async (successCallback: VoidFunction) => {
        await clearAllToken().then((r) => successCallback());
        dispatch({
            type: AuthDispatchEnum.updateUserInfo,
            payload: null,
        });
        dispatch({
            type: AuthDispatchEnum.updateAffiliateCode,
            payload: '',
        });
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                isLoggingIn: loading,
                login,
                loginViaQR,
                updateAffiliateCode,
                logout,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// export
export { AuthProvider };

export default AuthContext;
