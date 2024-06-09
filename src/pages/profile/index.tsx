import { ImageSkeleton } from 'components/Skeletons';
import ListRenderer from 'components/Softcom/ListRenderer';
import AuthContext from 'contexts/Auth/AuthContext';
import { ProfileResponse } from 'models/Profile/ProfileModel';
import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { paths } from 'routes/routeConfig';
import { useLazyGetCollaboratorDetailQuery } from 'services/affiliate';
import { useLazyGetProfileQuery } from 'services/auth';
import subscriptionDecor from 'static/subscription-decor.svg';
import { Box, Button, Header, Icon, Page, Text } from 'zmp-ui';
import { IconProps } from 'zmp-ui/icon';
import appConfig from '../../../app-config.json';
import UpdateAffiliateForm from './UpdateAffiliateForm';
interface ProfileProps {
    data: ProfileResponse;
}

const Welcome: FC<ProfileProps> = (props: ProfileProps) => {
    const { data } = props;

    return (
        <Box className='m-4'>
            <Box
                className='bg-primary text-white rounded-2xl p-4 space-y-2'
                style={{
                    backgroundImage: `url(${subscriptionDecor})`,
                    backgroundPosition: 'right 8px center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <Text.Title className='font-bold'>
                    Xin chào, {data.Contacts[0].FirstName} {data.Contacts[0].LastName}
                </Text.Title>
                <Text size='xxSmall'>Tích điểm, đổi thưởng và vô vàn tiện ích khác</Text>
            </Box>
        </Box>
    );
};

const Personal: FC<ProfileProps> = (props: ProfileProps) => {
    const { data } = props;
    const navigate = useNavigate();

    return (
        <Box className='m-4'>
            <ListRenderer
                title='Cá nhân'
                renderItem={(item: { url: string; name: string; icon: IconProps['icon'] }) => {
                    return (
                        <div
                            onClick={() => navigate(item.url)}
                            className='flex space-x-4 p-2 last:pb-0 w-full'
                        >
                            <Icon icon={item.icon} />
                            <Box className='flex-1 min-w-0 relative'>
                                <Box flex>
                                    <Text.Header className='flex-1 items-center font-normal'>
                                        {item.name}
                                    </Text.Header>
                                    <Icon icon='zi-chevron-right' />
                                </Box>
                            </Box>
                        </div>
                    );
                }}
                items={[
                    // {
                    //     url: paths.UpdateProfile,
                    //     name: 'Thông tin tài khoản',
                    //     icon: 'zi-user',
                    // },
                    {
                        url: paths.MyBooking,
                        name: 'Đơn hàng của tôi',
                        icon: 'zi-clock-2',
                    },
                ]}
            />
        </Box>
    );
};

const Actions: FC = () => {
    const navigate = useNavigate();
    const { logout, affiliateCode, selectedShop, updateAffiliateCode } =
        React.useContext(AuthContext);

    const [getCollaborator, getCollaboratorState] = useLazyGetCollaboratorDetailQuery();

    const getDetailCollaborator = (data: { affiliateCode: string }) => {
        getCollaborator({
            aid: selectedShop?.Id || appConfig.env.VITE_SHOP_ID,
            cid: data.affiliateCode,
        })
            .unwrap()
            .then((r) => {
                updateAffiliateCode(data.affiliateCode);
            });
    };

    return (
        <Box className='m-4 flex-1 flex flex-col items-end justify-end gap-4'>
            {affiliateCode ? (
                <></>
            ) : (
                <div className='flex gap-2 w-full justify-center items-center'>
                    <UpdateAffiliateForm onSubmit={getDetailCollaborator}>
                        {({ open }) => (
                            <div
                                className='bg-white  border-primary border-dotted border-2 rounded-full py-2 shadow-lg text-primary text-center font-semibold flex-1 uppercase'
                                onClick={open}
                            >
                                {affiliateCode
                                    ? `Mã giới thiệu: ${affiliateCode}`
                                    : 'Nhập mã giới thiệu'}
                            </div>
                        )}
                    </UpdateAffiliateForm>
                </div>
            )}

            {affiliateCode ? (
                <div className='flex w-full bg-white shadow-md rounded-lg p-2'>
                    {/* <div className='w-[50px] h-[50px] me-2'>
                        <img
                            className='h-full w-full rounded-xl mb-1 object-cover'
                            src={}
                        />
                    </div> */}
                    <div className='flex items-start flex-1'>
                        <div className='flex flex-col w-full'>
                            <span className='text-grey-800 text-sm'>
                                {getCollaboratorState.data?.Name}
                            </span>
                            <span className='text-grey-800 text-xs flex gap-1'>
                                Mã giới thiệu:{' '}
                                <span className='text-primary fw-bold uppercase'>
                                    {affiliateCode}
                                </span>
                            </span>
                        </div>
                    </div>
                    <UpdateAffiliateForm onSubmit={getDetailCollaborator}>
                        {({ open }) => (
                            <div
                                className='w-[50px] h-[50px] flex items-center justify-center'
                                onClick={open}
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke-width='1.5'
                                    stroke='currentColor'
                                    className='w-6 h-6 text-primary'
                                >
                                    <path
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                        d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'
                                    />
                                </svg>
                            </div>
                        )}
                    </UpdateAffiliateForm>
                </div>
            ) : (
                <></>
            )}

            <Button
                size='medium'
                className='rounded-full w-full bg-danger-darker text-white hover:bg-danger-darker'
                onClick={() => logout(() => navigate(paths.Greeting))}
            >
                Đăng xuất
            </Button>
        </Box>
    );
};

const ProfilePage: FC = () => {
    const [getProfile, getProfileState] = useLazyGetProfileQuery();
    useEffect(() => {
        getProfile({});
    }, []);
    return (
        <Page className='flex flex-col mt-[30px]' hideScrollbar>
            <Header showBackIcon={false} title='' />
            {getProfileState?.isFetching ? (
                <div className='p-4'>
                    <ImageSkeleton className='w-full rounded-xl h-[80px] mb-4' />
                    <ImageSkeleton className='w-full rounded-xl h-[120px] mb-4' />
                </div>
            ) : (
                <>
                    {getProfileState.data ? (
                        <>
                            <Welcome data={getProfileState.data} />
                            <Personal data={getProfileState.data} />
                            <Actions />
                        </>
                    ) : (
                        <></>
                    )}
                </>
            )}
            {/* <Other /> */}
        </Page>
    );
};

export default ProfilePage;
