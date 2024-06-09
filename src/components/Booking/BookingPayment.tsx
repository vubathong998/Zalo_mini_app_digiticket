import { BookingPaymentStatusEnum } from 'models/Booking/BookingEnum';
import { BookingPaymentDetailModel } from 'models/Booking/BookingModel';
import React, { FC, Fragment } from 'react';
import { Box, Button } from 'zmp-ui';

interface IProps {
    data: BookingPaymentDetailModel;
    onPayment: () => void;
}

const BookingPayment: FC<IProps> = (props) => {
    const { data, onPayment } = props;

    return (
        <Fragment>
            <Box flex className='sticky bottom-0 bg-background p-4 space-x-4'>
                {/* <Box
                    flex
                    flexDirection='column'
                    justifyContent='space-between'
                    className='min-w-[120px] flex-none'
                >
                    <span className='text-grey-400'>
                        <span className='me-1'>
                            {toThousandSeparator(data.OrderTickets.length)}
                        </span>
                        sản phẩm
                    </span>
                    <span className='text-primary'>{toThousandSeparator(data.TotalPrice)}</span>
                </Box> */}
                <Button
                    type='highlight'
                    className='bg-primary'
                    disabled={data.PaymentStatus === BookingPaymentStatusEnum.PaymentOk}
                    fullWidth
                    onClick={onPayment}
                >
                    {data.PaymentStatus === BookingPaymentStatusEnum.PaymentOk
                        ? 'Đã thanh toán'
                        : 'Tiến hành thanh toán'}
                </Button>
            </Box>
        </Fragment>
    );
};
export default BookingPayment;
