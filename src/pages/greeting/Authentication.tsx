import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { paths } from 'routes/routeConfig';
import { Button, Header, Icon, Input, Page } from 'zmp-ui';

interface IProps {}

const AuthenticationPage: FC<IProps> = (props) => {
    const navigate = useNavigate();
    return (
        <Page className='flex flex-col bg-background h-full' hideScrollbar>
            <Header
                showBackIcon
                backIcon={<Icon icon='zi-chevron-left-header' className='text-5xl text-dark' />}
                onBackClick={() => navigate(paths.Greeting)}
            />
            <div className='flex flex-col flex-1 justify-center items-center gap-8 px-8 w-full'>
                <Input label='Tên đăng nhập' placeholder='eg: 09xx xxx xxx' className='w-full' />
                <Input
                    label='Mật khẩu'
                    className='w-full'
                    type='password'
                    placeholder={'************'}
                />
                <Button className='bg-primary' fullWidth>
                    Đăng nhập
                </Button>
            </div>
        </Page>
    );
};
export default AuthenticationPage;
