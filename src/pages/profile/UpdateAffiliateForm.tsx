import { Sheet } from 'components/BottomSheet';
import AuthContext from 'contexts/Auth/AuthContext';
import get from 'lodash/get';
import React, { FC, ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { Box, Button, Input, Text } from 'zmp-ui';

import queryString from 'query-string';

import { scanQRCode } from 'zmp-sdk';

export interface UpdateAffiliateFormProps {
    children: (methods: { open: () => void; close: () => void }) => ReactNode;
    onSubmit: (data: { affiliateCode: string }) => void;
}

const UpdateAffiliateForm: FC<UpdateAffiliateFormProps> = (props) => {
    const { children, onSubmit } = props;
    const { logout, affiliateCode, updateAffiliateCode } = React.useContext(AuthContext);
    const [visible, setVisible] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        getValues,
        reset,
        formState: { errors },
    } = useForm<{
        affiliateCode: string;
    }>({
        defaultValues: {
            affiliateCode: affiliateCode || '',
        },
        mode: 'onChange',
        reValidateMode: 'onChange',
        resolver: undefined,
        context: undefined,
        criteriaMode: 'firstError',
        shouldFocusError: true,
    });
    const openScan = async () => {
        try {
            const { content } = await scanQRCode({});
            if (content) {
                const paramsUrl: queryString.ParsedUrl = queryString.parseUrl(content);

                const affiliateCode = get(paramsUrl, ['query', 'cid'], '') as string;
                updateAffiliateCode(affiliateCode);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleSubmitAffiliateCode = (data: { affiliateCode: string }) => {
        onSubmit(data);
    };

    return (
        <>
            {children({
                open: () => setVisible(true),
                close: () => setVisible(false),
            })}
            {createPortal(
                <Sheet visible={visible} onClose={() => setVisible(false)} autoHeight>
                    <form onSubmit={handleSubmit(handleSubmitAffiliateCode)} className='mb-4'>
                        <Box className='px-4'>
                            <Text.Header className='text-center'>
                                Nhập hoặc quét mã giới thiệu
                            </Text.Header>
                            <Box className=''>
                                <div className='my-4 flex gap-2 w-full justify-center items-center'>
                                    <Input
                                        required
                                        label=''
                                        size='medium'
                                        placeholder='VD: AFF_EUROSTORE_1'
                                        className='w-full'
                                        defaultValue={``}
                                        onChange={(e) => {
                                            setValue('affiliateCode', e.currentTarget.value);
                                        }}
                                    />
                                    <div
                                        className='bg-white shadow-lg text-primary text-center font-semibold p-1 rounded-lg border border-primary border-1'
                                        onClick={() => {
                                            openScan();
                                        }}
                                    >
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            strokeWidth={1.5}
                                            stroke='currentColor'
                                            className='w-8 h-8 text-primary'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                d='M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z'
                                            />
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                d='M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z'
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <Button
                                    loading={false}
                                    type='highlight'
                                    fullWidth
                                    onClick={handleSubmit(handleSubmitAffiliateCode)}
                                >
                                    Xác nhận
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </Sheet>,
                document.body,
            )}
        </>
    );
};
export default UpdateAffiliateForm;
