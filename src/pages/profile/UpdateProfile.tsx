import { ImageSkeleton } from 'components/Skeletons';
import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLazyGetProfileQuery } from 'services/auth';
import { Box, Button, Header, Icon, Input, Page } from 'zmp-ui';

interface IProps {}

const UpdateProfilePage: FC<IProps> = (props) => {
    const [getProfile, getProfileState] = useLazyGetProfileQuery();
    useEffect(() => {
        getProfile({});
    }, []);

    const { formState, handleSubmit, reset, setValue, getValues, control, watch } = useForm<any>({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        resolver: undefined,
        context: undefined,
        criteriaMode: 'firstError',
        shouldFocusError: true,
        defaultValues: {},
    });

    const onSubmit = () => {};

    return (
        <Page hideScrollbar>
            <Header
                showBackIcon={true}
                backIcon={<Icon icon='zi-chevron-left-header' className='text-5xl text-dark' />}
                title='Thông tin cá nhân'
            />

            {getProfileState?.isFetching ? (
                <div className='p-4'>
                    <ImageSkeleton className='w-full rounded-xl h-[80px] mb-4' />
                    <ImageSkeleton className='w-full rounded-xl h-[120px] mb-4' />
                </div>
            ) : (
                <>
                    {getProfileState.data ? (
                        <form onSubmit={handleSubmit(onSubmit)} className='mb-4'>
                            <Box className='px-4'>
                                <div className='my-4'>
                                    <Input
                                        required
                                        label='Họ & Đệm'
                                        placeholder='Nguyễn Văn A'
                                        className='w-full'
                                        defaultValue={`${
                                            getProfileState?.data?.Contacts[0]?.FirstName || ''
                                        } ${getProfileState?.data?.Contacts[0]?.LastName || ''}`}
                                        // value={watch('name')}
                                        onChange={(e) => {
                                            setValue('name', e.currentTarget.value);
                                        }}
                                    />
                                    {watch('name').trim() === '' ? (
                                        <span className='text-xs text-danger'>
                                            Trường này không được bỏ trống
                                        </span>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                <div className='my-4'>
                                    <Input
                                        required
                                        label='Tên'
                                        placeholder='Tên'
                                        className='w-full'
                                        defaultValue={`${
                                            getProfileState?.data?.Contacts[0]?.FirstName || ''
                                        } ${getProfileState?.data?.Contacts[0]?.LastName || ''}`}
                                        // value={watch('name')}
                                        onChange={(e) => {
                                            setValue('name', e.currentTarget.value);
                                        }}
                                    />
                                    {watch('name').trim() === '' ? (
                                        <span className='text-xs text-danger'>
                                            Trường này không được bỏ trống
                                        </span>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                <div className='my-4'>
                                    <Input
                                        required
                                        label='E-Mail'
                                        placeholder='Địa chỉ E-Mail'
                                        className='w-full'
                                        defaultValue={`${
                                            getProfileState?.data?.Contacts[0]?.FirstName || ''
                                        } ${getProfileState?.data?.Contacts[0]?.LastName || ''}`}
                                        // value={watch('name')}
                                        onChange={(e) => {
                                            setValue('name', e.currentTarget.value);
                                        }}
                                    />
                                    {watch('name').trim() === '' ? (
                                        <span className='text-xs text-danger'>
                                            Trường này không được bỏ trống
                                        </span>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                <div className='my-4'>
                                    <Input
                                        required
                                        label='Số điện thoại'
                                        placeholder='Số điện thoại giao hàng'
                                        className='w-full'
                                        defaultValue={`${
                                            getProfileState?.data?.Contacts[0]?.FirstName || ''
                                        } ${getProfileState?.data?.Contacts[0]?.LastName || ''}`}
                                        // value={watch('name')}
                                        onChange={(e) => {
                                            setValue('name', e.currentTarget.value);
                                        }}
                                    />
                                    {watch('name').trim() === '' ? (
                                        <span className='text-xs text-danger'>
                                            Trường này không được bỏ trống
                                        </span>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                <div className='my-4'>
                                    <Input
                                        required
                                        label='Địa chỉ'
                                        placeholder='Địa chỉ giao hàng mặc định'
                                        className='w-full'
                                        defaultValue={`${
                                            getProfileState?.data?.Contacts[0]?.FirstName || ''
                                        } ${getProfileState?.data?.Contacts[0]?.LastName || ''}`}
                                        // value={watch('name')}
                                        onChange={(e) => {
                                            setValue('name', e.currentTarget.value);
                                        }}
                                    />
                                    {watch('name').trim() === '' ? (
                                        <span className='text-xs text-danger'>
                                            Trường này không được bỏ trống
                                        </span>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                <Button
                                    loading={false}
                                    type='highlight'
                                    disabled={false}
                                    fullWidth
                                    onClick={handleSubmit(onSubmit)}
                                >
                                    Cập nhật thông tin cá nhân
                                </Button>
                            </Box>
                        </form>
                    ) : (
                        <></>
                    )}
                </>
            )}
            {/* <Other /> */}
        </Page>
    );
};
export default UpdateProfilePage;
