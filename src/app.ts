// Import React and ReactDOM
import React from 'react';
import { createRoot } from 'react-dom/client';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import 'zmp-ui/zaui.css';
import './public/css/app.scss';
import './public/css/tailwind.css';

// Import App Component
import appConfig from '../app-config.json';
import App from './components/app';

if (!window.APP_CONFIG) {
    window.APP_CONFIG = appConfig;
}
// Mount React App
const root = createRoot(document.getElementById('app')!);
root.render(React.createElement(App));
