import { ActionSheet } from 'components/BottomSheet';
import { ListItem } from 'components/ListItem';
import React, { FC, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSetRecoilState } from 'recoil';
import { requestLocationTriesState } from 'state';

export const StorePicker: FC = () => {
    const [visible, setVisible] = useState(false);
    const nearbyStores = [];
    const setSelectedStoreIndex = 0;
    const selectedStore: { name: string; address: string } = {
        name: 'Cửa hàng',
        address: 'Địa chỉ cửa hàng',
    };

    if (!selectedStore) {
        return <RequestStorePickerLocation />;
    }

    return (
        <>
            <ListItem
                onClick={() => setVisible(true)}
                title={selectedStore?.name}
                subtitle={selectedStore?.address}
            />
            {nearbyStores.length > 0 &&
                createPortal(
                    <ActionSheet
                        title='Các cửa hàng ở gần bạn'
                        visible={visible}
                        onClose={() => setVisible(false)}
                        actions={[nearbyStores, [{ text: 'Đóng', close: true, danger: true }]]}
                    ></ActionSheet>,
                    document.body,
                )}
        </>
    );
};

export const RequestStorePickerLocation: FC = () => {
    const retry = useSetRecoilState(requestLocationTriesState);
    return (
        <ListItem
            onClick={() => retry((r) => r + 1)}
            title='Chọn cửa hàng'
            subtitle='Yêu cầu truy cập vị trí'
        />
    );
};
