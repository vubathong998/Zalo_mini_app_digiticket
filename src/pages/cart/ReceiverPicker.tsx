import { ListItem } from 'components/ListItem';
import React, { FC } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { phoneState, requestPhoneTriesState, userState } from 'state';

export const ReceiverPicker: FC = () => {
    const user = useRecoilValue(userState);
    const phone = useRecoilValue(phoneState);

    if (!phone) {
        return <RequestReceiverPickerPhone />;
    }

    return <ListItem title={`${user.name} - ${phone}`} subtitle='Người nhận' />;
};

export const RequestReceiverPickerPhone: FC = () => {
    const retry = useSetRecoilState(requestPhoneTriesState);
    return (
        <ListItem
            onClick={() => retry((r) => r + 1)}
            title='Chọn người nhận'
            subtitle='Yêu cầu truy cập số điện thoại'
        />
    );
};
