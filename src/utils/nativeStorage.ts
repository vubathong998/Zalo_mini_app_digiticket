import api from 'zmp-sdk';

export const setDataStorageByKey = async ({ key, data }: { key: string; data: string }) => {
    try {
        const { errorKeys } = await api.setStorage({
            data: {
                [`${key}`]: data,
            },
        });
    } catch (error) {
        // xử lý khi gọi api thất bại
        console.log(error);
    }
};

export const getDataStorageByKey = async (key: string) => {
    try {
        const res = await api.getStorage({
            keys: [key],
        });

        return res;
    } catch (error) {
        // xử lý khi gọi api thất bại
        console.log(error);
        return error;
    }
};

export const removeDataStorageByKey = async (key: string) => {
    try {
        const { errorKeys } = await api.removeStorage({
            keys: [key],
        });
    } catch (error) {
        // xử lý khi gọi api thất bại
        console.log(error);
    }
};
