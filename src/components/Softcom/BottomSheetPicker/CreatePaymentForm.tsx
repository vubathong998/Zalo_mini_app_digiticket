/* #region hooks */
import clsx from 'clsx';
import { Sheet } from 'components/BottomSheet';
import { BankModel, InvoicePaymentMethod } from 'models/Invoice/InvoiceModel';
import { NewOrderInfoGetDetailModel } from 'models/NewOrderInfo/NewOrderInfoModel';
import { PaymentMethodEnum } from 'models/paymentMethod';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import toThousandSeparator from 'utils/toThousandSeparator';
import { openWebview } from 'zmp-sdk';
import { EventName, events } from 'zmp-sdk/apis';
import { Box, Button, Text } from 'zmp-ui';
/* #endregion */

export interface CreatePaymentFormProps {
    children: (methods: { open: () => void; close: () => void }) => ReactNode;
    data: NewOrderInfoGetDetailModel;
    onCallback: () => void;
    onWaitPaymentCallback: () => void;
}

const CreatePaymentForm: FC<CreatePaymentFormProps> = (props) => {
    const { children, data, onCallback, onWaitPaymentCallback } = props;
    const [visible, setVisible] = useState(false);
    const [step, setStep] = useState<'PAYMENT' | 'QR_BANK'>('PAYMENT');

    const { handleSubmit, watch, setValue, getValues } = useForm<{
        PaymentMethod: InvoicePaymentMethod | null;
        Bank: BankModel | null;
    }>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        resolver: undefined,
        context: undefined,
        criteriaMode: 'firstError',
        shouldFocusError: true,
        defaultValues: {
            PaymentMethod: null,
            Bank: null,
        },
    });

    const onSubmit = () => {
        const paymentMethod = getValues('PaymentMethod');
        if (data && paymentMethod) {
            if (
                paymentMethod?.Url !== '' &&
                paymentMethod?.Id !== PaymentMethodEnum.BANK_TRANSFER
            ) {
                openWebview({
                    url: paymentMethod?.Url || '',
                    success: (res) => {
                        setVisible(false);
                    },
                    fail: (error) => {
                        console.log(error);
                    },
                });
            } else {
                setVisible(false);
                onWaitPaymentCallback();
            }
        }
    };

    useEffect(() => {
        if (watch('Bank') && watch('PaymentMethod')?.Id === PaymentMethodEnum.BANK_TRANSFER) {
            setStep('QR_BANK');
        }
    }, [watch('Bank')]);

    useEffect(() => {
        if (watch('PaymentMethod')?.Id !== PaymentMethodEnum.BANK_TRANSFER) {
            setValue('Bank', null);
        }
    }, [watch('PaymentMethod')]);

    events.on(EventName.WebviewClosed, () => {
        onCallback();
    });

    return (
        <>
            {children({
                open: () => setVisible(true),
                close: () => setVisible(false),
            })}
            {createPortal(
                <Sheet visible={visible} onClose={() => setVisible(false)} height={'80vh'}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box className='space-y-3 px-4'>
                            <Box className='flex flex-row items-center gap-4'>
                                <span
                                    onClick={() => {
                                        if (step === 'QR_BANK') {
                                            setStep('PAYMENT');
                                        } else {
                                            setVisible(false);
                                        }
                                    }}
                                    className='text-grey-900'
                                >
                                    <svg
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke-width='1.5'
                                        stroke='currentColor'
                                        className='w-6 h-6'
                                    >
                                        <path
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                            d='M15.75 19.5L8.25 12l7.5-7.5'
                                        />
                                    </svg>
                                </span>
                                <Text.Header>Phương thức thanh toán</Text.Header>
                            </Box>
                            <Box
                                className='bg-background flex flex-col overflow-y-scroll pb-4 pr-4'
                                style={{
                                    height: 'calc(80vh - 100px)',
                                }}
                            >
                                {step === 'PAYMENT' ? (
                                    data.PaymentMethod.map(
                                        (paymentMethod: InvoicePaymentMethod) => {
                                            const paymentMethodSelectedClass =
                                                'border border-primary';
                                            return (
                                                <Box key={paymentMethod.Id}>
                                                    <Box
                                                        className={clsx(
                                                            'flex gap-2 rounded-lg p-2',
                                                            {
                                                                [paymentMethodSelectedClass]:
                                                                    Boolean(
                                                                        watch('PaymentMethod')
                                                                            ?.Id ===
                                                                            paymentMethod.Id &&
                                                                            paymentMethod.Url ===
                                                                                watch(
                                                                                    'PaymentMethod',
                                                                                )?.Url,
                                                                    ),
                                                            },
                                                        )}
                                                        onClick={() => {
                                                            setValue(
                                                                'PaymentMethod',
                                                                paymentMethod,
                                                            );
                                                        }}
                                                    >
                                                        <img
                                                            src={
                                                                paymentMethod?.Images?.[0]?.Url ||
                                                                ''
                                                            }
                                                            className='w-[35px] h-[35px] border border-grey-200 rounded-lg p-1'
                                                        />
                                                        <div className='flex flex-col gap-1 justify-center'>
                                                            <span className='text-primary text-xs'>
                                                                {paymentMethod.Name}
                                                            </span>
                                                            <span className='text-grey-500 text-xs text-ellipsis'>
                                                                {paymentMethod.Description}
                                                            </span>
                                                        </div>
                                                    </Box>

                                                    {watch('PaymentMethod')?.Id ===
                                                        PaymentMethodEnum.BANK_TRANSFER &&
                                                    paymentMethod.Id ===
                                                        PaymentMethodEnum.BANK_TRANSFER &&
                                                    paymentMethod.Detail ? (
                                                        <Box className='flex flex-col px-4'>
                                                            {paymentMethod.Detail.map((bank) => {
                                                                return (
                                                                    <Box
                                                                        key={bank.AccountNo}
                                                                        className='flex gap-2 p-2 rounded-lg'
                                                                    >
                                                                        <img
                                                                            src={
                                                                                bank?.Images?.[0]
                                                                                    ?.Url || ''
                                                                            }
                                                                            className='w-[35px] h-[35px] border border-grey-200 rounded-lg p-1'
                                                                        />
                                                                        <div
                                                                            onClick={() => {
                                                                                setValue(
                                                                                    'Bank',
                                                                                    bank,
                                                                                );
                                                                            }}
                                                                            className='flex flex-col gap-1 justify-center'
                                                                        >
                                                                            <span className='flex flex-col gap-1 justify-center text-xs text-primary'>
                                                                                {bank.AccountName}
                                                                            </span>
                                                                            <span className='text-grey-500 text-xs text-ellipsis'>
                                                                                {bank.BankName}
                                                                            </span>
                                                                        </div>
                                                                    </Box>
                                                                );
                                                            })}
                                                        </Box>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </Box>
                                            );
                                        },
                                    )
                                ) : (
                                    <>
                                        {step === 'QR_BANK' && (
                                            <Box className='flex flex-col items-center justify-center h-full w-full'>
                                                {watch('Bank') && (
                                                    <img
                                                        className='w-[250px] h-[250px]'
                                                        src={`https://img.vietqr.io/image/${
                                                            watch('Bank')?.BinCode
                                                        }-${
                                                            watch('Bank')?.AccountNo
                                                        }-${'qr-only'}.png?amount=${Number(
                                                            data.TotalPrice,
                                                        )}&addInfo=MDH ${
                                                            data.OrderCode
                                                        }&accountName=${
                                                            watch('Bank')?.AccountName
                                                        }`}
                                                    />
                                                )}
                                                <Text className='text-base font-bold text-primary mb-1'>
                                                    Số tiền: {toThousandSeparator(data.TotalPrice)}
                                                </Text>
                                                <Text className='text-xs font-bold text-primary mb-1'>
                                                    Số TK: {watch('Bank')?.AccountNo}
                                                </Text>
                                                <Text className='text-xs text-primary mb-1'>
                                                    {watch('Bank')?.BankName}
                                                </Text>
                                                <Text className='text-xs text-primary mb-1'>
                                                    {watch('Bank')?.AccountName}
                                                </Text>
                                                <Text className='text-xs text-primary font-bold mb-1'>
                                                    Nội dung: MDH {data.OrderCode}
                                                </Text>
                                            </Box>
                                        )}
                                    </>
                                )}
                            </Box>
                            <Button
                                type='highlight'
                                fullWidth
                                size='medium'
                                onClick={onSubmit}
                                className='sticky bottom-0'
                            >
                                {step === 'QR_BANK'
                                    ? 'Xác nhận thanh toán'
                                    : 'Tiến hành thanh toán'}
                            </Button>
                        </Box>
                    </form>
                </Sheet>,
                document.body,
            )}
        </>
    );
};
export default CreatePaymentForm;
