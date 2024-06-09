import AuthContext from 'contexts/Auth/AuthContext';
import { AuthDispatchEnum } from 'contexts/Auth/AuthContext.type';
import get from 'lodash/get';
import queryString from 'query-string';
import React, { FC, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { paths, routes } from 'routes/routeConfig';
import { isValidJsonString } from 'utils/isValidJsonString';
import { getDataStorageByKey } from 'utils/nativeStorage';
import { getSystemInfo } from 'zmp-sdk';
import { Box, useNavigate } from 'zmp-ui';
import appConfig from '../../app-config.json';
import { Navigation } from './Navigation';
import { ScrollRestoration } from './ScrollRestoration';

if (getSystemInfo().platform === 'android') {
    const androidSafeTop = Math.round(
        ((window as any).ZaloJavaScriptInterface?.getStatusBarHeight() || 0) /
            window.devicePixelRatio,
    );
    document.body.style.setProperty('--zaui-safe-area-inset-top', `${androidSafeTop}px`);
}

export const Layout: FC = () => {
    let { isLoggedIn, dispatch } = React.useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const queryParsed = queryString.parse(location.search);
        const queryStringWithViewMode = queryString.stringify({
            ...queryParsed,
            viewmode: 'policies',
        });

        const cid = get(queryParsed, 'cid', '');
        const aid = get(queryParsed, 'aid', '');
        if (!isLoggedIn) {
            getDataStorageByKey(appConfig.nativeKey.scToken)
                .then((r: Record<string, string>) => {
                    if (
                        appConfig.nativeKey.scToken in r &&
                        Boolean(r[appConfig.nativeKey.scToken])
                    ) {
                        if (cid && cid !== '') {
                            dispatch({
                                type: AuthDispatchEnum.updateAffiliateCode,
                                payload: {
                                    affiliateCode: cid,
                                },
                            });
                        }
                        dispatch({
                            type: AuthDispatchEnum.login,
                            payload: true,
                        });
                        navigate(paths.Shop);
                    } else {
                        if (cid && cid !== '' && aid && aid !== '') {
                            // isLoggedIn = false, không token trong storage
                            navigate(`${paths.Greeting}?${queryStringWithViewMode}`, {
                                replace: true,
                            });
                        }
                    }
                })
                .catch((err) => {
                    if (cid && cid !== '' && aid && aid !== '') {
                        // isLoggedIn = false, không token trong storage
                        navigate(`${paths.Greeting}?${queryStringWithViewMode}`, {
                            replace: true,
                        });
                    }
                });
        } else {
            getDataStorageByKey(appConfig.nativeKey.scToken).then((r: Record<string, string>) => {
                if (appConfig.nativeKey.scToken in r && Boolean(r[appConfig.nativeKey.scToken])) {
                    if (cid && cid !== '') {
                        dispatch({
                            type: AuthDispatchEnum.updateAffiliateCode,
                            payload: {
                                affiliateCode: cid,
                            },
                        });
                    }
                    navigate(paths.Shop);
                }
            });
        }
        getDataStorageByKey(appConfig.nativeKey.selectedShop).then((r: Record<string, string>) => {
            if (
                appConfig.nativeKey.selectedShop in r &&
                Boolean(r[appConfig.nativeKey.selectedShop]) &&
                isValidJsonString(r[appConfig.nativeKey.selectedShop])
            ) {
                dispatch({
                    type: AuthDispatchEnum.updateSelectedShop,
                    payload: JSON.parse(r[appConfig.nativeKey.selectedShop]),
                });
                navigate(paths.Shop);
            }
        });
    }, []);

    return (
        <Box flex flexDirection='column' className='h-screen'>
            <ScrollRestoration />
            <Box className='flex-1 flex flex-col overflow-hidden'>
                <Routes>
                    {routes.map((item, index) => {
                        const Component = item.component as React.FunctionComponent<any>;
                        return item.isPrivate ? (
                            <Route
                                {...item}
                                element={
                                    isLoggedIn ? <Component /> : <Navigate to={paths.Greeting} />
                                }
                            />
                        ) : (
                            <Route path={item.path} element={<Component />} key={item.path}></Route>
                        );
                    })}
                </Routes>
            </Box>
            <Navigation />
        </Box>
    );
};
