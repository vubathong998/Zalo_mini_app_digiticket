import { Divider } from 'components/Divider';
import ListRenderer from 'components/Softcom/ListRenderer';
import NotificationItem from 'components/Softcom/Notification/NotificationItem';
import { NotificationModel } from 'models/Notification/NotificationModel';
import React, { FC } from 'react';
import { Box, Button, Header, Page } from 'zmp-ui';

const NotificationList: FC = () => {
    const notifications: Array<NotificationModel> = [
        {
            id: '',
            title: 'test',
            description:
                'How likely are you to recommend our company to your friends and family ? Hey there, we’re just writing to let you know that you’ve been subscribed to a repository on GitHub. How likely are you to recommend our company to your friends and family ? Hey there, we’re just writing to let you know that you’ve been subscribed to a repository on GitHub. How likely are you to recommend our company to your friends and family ? Hey there, we’re just writing to let you know that you’ve been subscribed to a repository on GitHub. How likely are you to recommend our company to your friends and family ? Hey there, we’re just writing to let you know that you’ve been subscribed to a repository on GitHub.',
            image: 'https://plus.unsplash.com/premium_photo-1673002094173-b16f2b946780?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
            isRead: false,
            createdAt: '2023-06-19T02:24:04Z',
        },
        {
            id: '',
            title: 'test',
            description:
                'How likely are you to recommend our company to your friends and family ? Hey there, we’re just writing to let you know that you’ve been subscribed to a repository on GitHub.',
            image: 'https://plus.unsplash.com/premium_photo-1673002094173-b16f2b946780?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
            isRead: false,
            createdAt: '2023-06-19T02:24:04Z',
        },
        {
            id: '',
            title: 'test',
            description:
                'How likely are you to recommend our company to your friends and family ? Hey there, we’re just writing to let you know that you’ve been subscribed to a repository on GitHub.',
            image: 'https://plus.unsplash.com/premium_photo-1673002094173-b16f2b946780?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
            isRead: true,
            createdAt: '2023-06-19T02:24:04Z',
        },
        {
            id: '',
            title: 'test',
            description:
                'How likely are you to recommend our company to your friends and family ? Hey there, we’re just writing to let you know that you’ve been subscribed to a repository on GitHub.',
            image: 'https://plus.unsplash.com/premium_photo-1673002094173-b16f2b946780?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
            isRead: true,
            createdAt: '2023-06-19T02:24:04Z',
        },
        {
            id: '',
            title: 'test',
            description:
                'How likely are you to recommend our company to your friends and family ? Hey there, we’re just writing to let you know that you’ve been subscribed to a repository on GitHub.',
            image: 'https://plus.unsplash.com/premium_photo-1673002094173-b16f2b946780?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
            isRead: false,
            createdAt: '2023-06-19T02:24:04Z',
        },
    ];
    return (
        <Box className='bg-background'>
            <ListRenderer
                noDivider
                items={notifications}
                renderItem={(item: NotificationModel) => (
                    <NotificationItem
                        data={item}
                        onClick={() => {}}
                        customAction={
                            <Button
                                size='small'
                                icon={'+'}
                                onClick={() => {}}
                                fullWidth
                                variant='tertiary'
                                type='neutral'
                            />
                        }
                    />
                )}
            />
        </Box>
    );
};

const NotificationPage: FC = () => {
    return (
        <Page hideScrollbar>
            <Header title='Thông báo' showBackIcon={false} />
            <Divider />
            <NotificationList />
        </Page>
    );
};

export default NotificationPage;
