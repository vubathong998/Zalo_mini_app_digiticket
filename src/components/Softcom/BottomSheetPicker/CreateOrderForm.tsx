import { Sheet } from 'components/BottomSheet';
import { TextSkeleton } from 'components/Skeletons';
import AuthContext from 'contexts/Auth/AuthContext';
import CartContext from 'contexts/Cart/CartContext';
import { useVirtualKeyboardVisible } from 'hooks';
import { NewCreateOrderFromCartRequest } from 'models/NewCart/NewCartRequest';
import React, { FC, ReactNode, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { useLazyGetProfileQuery } from 'services/auth';
import isEmail from 'utils/isEmail';
import { Box, Button, Input, Text } from 'zmp-ui';
export interface CreateOrderFormProps {
    children: (methods: { open: () => void; close: () => void }) => ReactNode;
}

const CreateOrderForm: FC<CreateOrderFormProps> = (props) => {
    const { children } = props;
    const { cart, createBooking, isLoadingCreateBookingFromCart } = useContext(CartContext);
    const { affiliateCode } = React.useContext(AuthContext);
    const [visible, setVisible] = useState(false);
    const [getProfile, getProfileState] = useLazyGetProfileQuery();
    const keyboardVisible = useVirtualKeyboardVisible();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        getValues,
        reset,
        formState: { errors },
    } = useForm<NewCreateOrderFromCartRequest>({
        defaultValues: {
            Contact: {
                Name: '',
                Email: '',
                Phone: '',
                Address: '',
                FirstName: '',
            },
        },
        mode: 'onChange',
        reValidateMode: 'onChange',
        resolver: undefined,
        context: undefined,
        criteriaMode: 'firstError',
        shouldFocusError: true,
    });

    const onSubmit = (data: NewCreateOrderFromCartRequest) => {
        if (cart.CartId)
            createBooking({
                CartId: cart.CartId,
                Contact: {
                    Address: data.Contact.Address,
                    Name: data.Contact.Name,
                    Email: data.Contact.Email,
                    Phone: data.Contact.Phone,
                    FirstName: data.Contact.FirstName,
                    Title: data.Contact.Title,
                },
                // Note: data.note,
                // CId: data.Affiliate,
                // CustomerId: '',
            });
    };

    useEffect(() => {
        getProfile({})
            .unwrap()
            .then((r) => {
                reset({
                    Contact: {
                        Name: r.Contacts[0].LastName,
                        FirstName: r.Contacts[0].FirstName,
                        Address: r.Contacts[0].Address,
                        Email: r.Contacts[0].EmailAddress,
                        Phone: r.Contacts[0].Phone,
                    },
                });
            });
    }, []);

    return (
        <>
            {children({
                open: () => setVisible(true),
                close: () => setVisible(false),
            })}
            {createPortal(
                <Sheet visible={visible} onClose={() => setVisible(false)} autoHeight>
                    <form onSubmit={handleSubmit(onSubmit)} className='mb-4'>
                        <Box className='px-4'>
                            <Text.Header>Thông tin người mua</Text.Header>
                            {getProfileState?.isFetching ? (
                                <Box className=''>
                                    <TextSkeleton className='w-full rounded-xl h-[40px] mb-4' />
                                    <TextSkeleton className='w-full rounded-xl h-[40px] mb-4' />
                                    <TextSkeleton className='w-full rounded-xl h-[40px] mb-4' />
                                </Box>
                            ) : (
                                <Box className=''>
                                    <div className='my-4'>
                                        <Input
                                            required
                                            label='Họ *'
                                            placeholder='Nguyễn Văn'
                                            className='w-full'
                                            defaultValue={
                                                getProfileState?.data?.Contacts[0]?.FirstName
                                            }
                                            // value={watch('name')}
                                            onChange={(e) => {
                                                setValue(
                                                    'Contact.FirstName',
                                                    e.currentTarget.value,
                                                );
                                            }}
                                        />
                                        {watch('Contact.FirstName').trim() === '' ? (
                                            <span className='text-xs text-danger'>
                                                Vui lòng nhập Họ
                                            </span>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                    <div className='my-4'>
                                        <Input
                                            required
                                            label='Tên *'
                                            placeholder='Tên'
                                            className='w-full'
                                            defaultValue={
                                                getProfileState?.data?.Contacts[0]?.LastName
                                            }
                                            // value={watch('name')}
                                            onChange={(e) => {
                                                setValue('Contact.Name', e.currentTarget.value);
                                            }}
                                        />
                                        {watch('Contact.Name').trim() === '' ? (
                                            <span className='text-xs text-danger'>
                                                Vui lòng nhập tên
                                            </span>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                    <div className='my-4'>
                                        <Input
                                            required
                                            label='E-Mail *'
                                            placeholder='example@gmail.com'
                                            className='w-full'
                                            defaultValue={`${
                                                getProfileState?.data?.Contacts[0]?.EmailAddress ||
                                                ''
                                            }`}
                                            onChange={(e) => {
                                                setValue('Contact.Email', e.currentTarget.value);
                                            }}
                                        />
                                        {(!isEmail(watch('Contact.Email')) &&
                                            watch('Contact.Email').trim() !== '') ||
                                        watch('Contact.Email').trim() === '' ? (
                                            <span className='text-xs text-danger'>
                                                E-Mail không hợp lệ
                                            </span>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                    <div className='my-4'>
                                        <Input
                                            required
                                            label='Số điện thoại *'
                                            placeholder='09xx xxx xxx'
                                            className='w-full'
                                            defaultValue={`${
                                                getProfileState?.data?.Contacts[0]?.Phone || ''
                                            }`}
                                            // value={watch('phone')}
                                            onChange={(e) => {
                                                setValue('Contact.Phone', e.currentTarget.value);
                                            }}
                                        />
                                        {watch('Contact.Phone').trim() === '' ? (
                                            <span className='text-xs text-danger'>
                                                Số điện thoại không hợp lệ
                                            </span>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                    {/* <div className='my-4'>
                                        <Input
                                            label='Ghi chú'
                                            placeholder='Gọi điện trước khi giao hàng...'
                                            className='w-full'
                                            value={watch('note')}
                                            onChange={(e) => {
                                                setValue('note', e.currentTarget.value);
                                            }}
                                        />
                                    </div> */}
                                    {/* <div className='my-4'>
                                        <Input
                                            label='Người giới thiệu'
                                            placeholder='VD: TMX12****1'
                                            className='w-full'
                                            // disabled={affiliateCode !== ''}
                                            value={watch('affiliateCode')}
                                            onChange={(e) => {
                                                setValue('affiliateCode', e.currentTarget.value);
                                            }}
                                        />
                                    </div> */}
                                    <Button
                                        loading={
                                            isLoadingCreateBookingFromCart ||
                                            getProfileState.isFetching
                                        }
                                        type='highlight'
                                        disabled={
                                            cart.ListItem.length === 0 ||
                                            watch('Contact.Name').trim() === '' ||
                                            watch('Contact.FirstName').trim() === '' ||
                                            watch('Contact.Email').trim() === '' ||
                                            watch('Contact.Phone').trim() === '' ||
                                            !isEmail(watch('Contact.Email').trim())
                                        }
                                        fullWidth
                                        onClick={handleSubmit(onSubmit)}
                                    >
                                        Tiến hành thanh toán
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    </form>
                </Sheet>,
                document.body,
            )}
        </>
    );
};
export default CreateOrderForm;
