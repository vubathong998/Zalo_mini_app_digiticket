import { CartProvider } from 'contexts/Cart/CartContext';
import moment from 'moment';
import 'moment/locale/vi.js';
import React from 'react';
import { Provider } from 'react-redux';
import { RecoilRoot } from 'recoil';
import store from 'services/store';
import { getConfig } from 'utils/config';
// import { setDataStorageByKey } from 'utils/nativeStorage';
import { AuthProvider } from 'contexts/Auth/AuthContext';
import { App, SnackbarProvider, ZMPRouter } from 'zmp-ui';
import { ConfigProvider } from './ConfigProvider';
import { Layout } from './Layout';

moment.locale('vi-VN');
const MyApp = () => {
    return (
        <RecoilRoot>
            <Provider store={store}>
                <ConfigProvider
                    cssVariables={{
                        '--zmp-primary-color': getConfig((c) => c.template.primaryColor),
                        '--zmp-background-color': getConfig((c) => c.template.backgroundColor),
                    }}
                >
                    <AuthProvider>
                        <SnackbarProvider>
                            <ZMPRouter>
                                <CartProvider>
                                    <App>
                                        <Layout />
                                    </App>
                                </CartProvider>
                            </ZMPRouter>
                        </SnackbarProvider>
                    </AuthProvider>
                </ConfigProvider>
            </Provider>
        </RecoilRoot>
    );
};
export default MyApp;
