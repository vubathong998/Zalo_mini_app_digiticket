/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx,vue}'],
    theme: {
        colors: {
            divider: '#E9EBED',
            skeleton: 'rgba(0, 0, 0, 0.1)',
            white: '#ffffff',
            background: '#FBFBFB',
            grey: {
                100: '#F9FAFB',
                200: '#F4F6F8',
                300: '#DFE3E8',
                400: '#C4CDD5',
                500: '#919EAB',
                600: '#637381',
                700: '#454F5B',
                800: '#212B36',
                900: '#161C24',
            },
            danger: {
                lighter: '#d1988b',
                light: '#c17565',
                DEFAULT: '#B2533E',
                dark: '#a04b38',
                darker: '#8e4232',
            },
            warning: {
                lighter: '#f5be7a',
                light: '#f1a94e',
                DEFAULT: '#EE9322',
                dark: '#d6841f',
                darker: '#be761b',
            },
            success: {
                lighter: '#c0dabd',
                light: '#abcea7',
                DEFAULT: '#96c291',
                dark: '#87af83',
                darker: '#789b74',
            },
            primary: {
                lighter: '#74a9a3',
                light: '#468c84',
                DEFAULT: '#186F65',
                dark: '#16645b',
                darker: '#135951',
            },
            secondary: {
                lighter: '#fbe9df',
                light: '#f7d2bf',
                DEFAULT: '#EC8F5E',
                dark: '#d48155',
                darker: '#bd724b',
            },
            info: {
                lighter: '#d6c7f4',
                light: '#ad8ee9',
                DEFAULT: '#7743DB',
                dark: '#5f36af',
                darker: '#472883',
            },
        },
        extend: {
            // SHADOW
            boxShadow: {
                xs: '0px 4px 10px 0px #0000001A', // elevation 1
                sm: '0px 6px 12px 0px #0000001A', // elevation 2
                DEFAULT: '0px 10px 16px 0px #0000001A', // elevation 3
                lg: '0px 16px 22px 0px #00000014', // elevation 4
                xl: '0px 28px 32px 0px #00000014', // elevation 5
                '2xl': '0px 32px 64px 0px #00000014', // elevation 6
            },
            // that is animation class
            animation: {
                fadeInDown: 'fadeInDown .3s ease-in',
                fadeOutUp: 'fadeOutUp .3s ease-in-out',
            },
        },
    },
};
