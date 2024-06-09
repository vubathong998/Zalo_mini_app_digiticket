import { NotificationModel } from 'models/Notification/NotificationModel';
import React, { FC, ReactNode } from 'react';
import { getTimeAgo } from 'utils/date';
import { trimTextByChar } from 'utils/string';

interface IProps {
    data: NotificationModel;
    onClick: (data: NotificationModel) => void;
    customAction?: ReactNode;
}

const NotificationItem: FC<IProps> = (props) => {
    const { data, onClick, customAction } = props;
    const isReadClassName = `text-${data?.isRead ? 'grey-300' : 'primary'} font-semibold text-sm`;
    return (
        <div className='flex w-full'>
            <div
                className='flex me-3 flex-1 gap-2'
                onClick={() => (onClick ? onClick(data) : undefined)}
            >
                <div className='flex-none w-14 h-14'>
                    <img src={data.image} className='rounded-xl w-14 h-14' />
                </div>
                <div className='flex flex-col grow'>
                    <span className='text-grey-800 text-base font-bold lh-0'>{data.title}</span>
                    <span className='text-grey-400 font-semibold d-block'>
                        {trimTextByChar(data.description, 40)}
                    </span>
                    <span className={isReadClassName}>{getTimeAgo(data.createdAt)}</span>
                </div>
            </div>
            {customAction && <div className='flex flex'>{customAction}</div>}
        </div>
    );
};
export default NotificationItem;
