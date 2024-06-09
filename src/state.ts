import { atom, selector } from 'recoil';
import logo from 'static/logo.png';
import { Notification } from 'types/notification';
import { getLocation, getPhoneNumber, getUserInfo } from 'zmp-sdk';

export const userState = selector({
    key: 'user',
    get: () => getUserInfo({}).then((res) => res.userInfo),
});

export const notificationsState = atom<Notification[]>({
    key: 'notifications',
    default: [
        {
            id: 1,
            image: logo,
            title: 'Chào bạn mới',
            content:
                'Cảm ơn đã sử dụng Digiticket, bạn có thể dùng ứng dụng này để tiết kiệm thời gian xây dựng',
        },
        {
            id: 2,
            image: logo,
            title: 'Giảm 50% lần đầu mua hàng',
            content: 'Nhập WELCOME để được giảm 50% giá trị đơn hàng đầu tiên order',
        },
    ],
});

export const keywordState = atom({
    key: 'keyword',
    default: '',
});

export const selectedDeliveryTimeState = atom({
    key: 'selectedDeliveryTime',
    default: +new Date(),
});

export const requestLocationTriesState = atom({
    key: 'requestLocationTries',
    default: 0,
});

export const requestPhoneTriesState = atom({
    key: 'requestPhoneTries',
    default: 0,
});

export const locationState = selector<{ latitude: string; longitude: string } | false>({
    key: 'location',
    get: async ({ get }) => {
        const requested = get(requestLocationTriesState);
        if (requested) {
            const { latitude, longitude, token } = await getLocation({
                fail: console.warn,
            });
            if (latitude && longitude) {
                return { latitude, longitude };
            }
            if (token) {
                return {
                    latitude: '10.7287',
                    longitude: '106.7317',
                };
            }
        }
        return false;
    },
});

export const phoneState = selector<string | boolean>({
    key: 'phone',
    get: async ({ get }) => {
        const requested = get(requestPhoneTriesState);
        if (requested) {
            const { number, token } = await getPhoneNumber({ fail: console.warn });
            if (number) {
                return number;
            }

            return '';
        }
        return false;
    },
});
