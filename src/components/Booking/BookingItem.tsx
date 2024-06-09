import { ImageSkeleton } from 'components/Skeletons';
import ListRenderer from 'components/Softcom/ListRenderer';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import { BookingPaymentStatusEnum, OrderStatusEnum } from 'models/Booking/BookingEnum';
import { BookingItemDetailModel } from 'models/Booking/BookingModel';
import { NewOrderInfoModel, NewOrderTicketModel } from 'models/NewOrderInfo/NewOrderInfoModel';
import { NewOrderTicketGetListResponse } from 'models/NewOrderInfo/NewOrderInfoResponse';
import { getStatus } from 'models/orderStatus';
import { getPaymentStatus } from 'models/paymentStatus';
import queryString from 'query-string';
import React, { FC, Fragment } from 'react';
import { generatePath } from 'react-router-dom';
import { paths } from 'routes/routeConfig';
import QRSVG from 'static/QR.svg';
import formatDateCustom from 'utils/formatDateCustom';
import toThousandSeparator from 'utils/toThousandSeparator';
import { Box, Button, Icon, useNavigate } from 'zmp-ui';
interface IProps {
    data: NewOrderInfoModel;
    showDetail?: () => void;
    items: NewOrderTicketGetListResponse;
    isLoadingItems?: boolean;
    quickViewItems: Array<BookingItemDetailModel>;
    showQR?: (ticket: NewOrderTicketModel) => void;
}

const BookingItem: FC<IProps> = (props) => {
    const { data, items, showDetail, isLoadingItems, showQR } = props;
    const status = getStatus(data.Status);
    const generateClassNameBookingStatus = `bg-${status?.color} rounded-xl px-2 py-1 text-white text-xs`;
    const navigate = useNavigate();

    const paymentStatus = getPaymentStatus(data.PaymentStatus);

    return (
        <Fragment>
            <Box className='grid w-full shadow-sm p-4 rounded-xl'>
                <div className='flex w-full justify-between mb-2'>
                    <span className='text-primary font-semibold text-base'>
                        Mã đơn hàng: #{data.OrderCode}
                    </span>
                    <span className={paymentStatus?.color}>{paymentStatus?.label}</span>
                </div>
                <div className='text-grey-800 text-base flex w-full justify-between items-center mb-1'>
                    <span className='text-xs'>
                        {formatDateCustom({
                            value: data.CreatedDate,
                            format: 'HH:mm, dddd, DD-MM-YYYY',
                        })}
                    </span>
                    <span className={generateClassNameBookingStatus}>{status?.label}</span>
                </div>
                {isLoadingItems ? (
                    <Box className='flex flex-col gap-2'>
                        <ImageSkeleton className='rounded-xl h-[50px] w-full' />
                        <ImageSkeleton className='rounded-xl h-[50px] w-full' />
                    </Box>
                ) : (
                    <>
                        {items && items.length > 0 ? (
                            <ListRenderer
                                classNameItemContainer='mb-0 !px-0'
                                items={items}
                                limit={4}
                                renderKey={(item) => JSON.stringify(item)}
                                renderItem={(item) => (
                                    <div className='flex flex-1 gap-2'>
                                        <div className='flex-none w-14 h-14'>
                                            {item.Images &&
                                            item.Images.length > 0 &&
                                            item.Images?.[0]?.Url !== '' ? (
                                                <img
                                                    src={`https://digipost.digiticket.vn/cdn/Content/ShowImage?url=${item.Images?.[0]?.Url}`}
                                                    className='rounded-xl w-14 h-14'
                                                />
                                            ) : (
                                                <div className='w-14 h-14 border border-grey-300 font-bold text-white bg-primary flex justify-center items-center rounded-xl text-lg'>
                                                    {item?.GroupServiceName?.charAt &&
                                                        item.GroupServiceName.charAt(
                                                            0,
                                                        ).toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                        <div className='flex flex-col grow'>
                                            <span className='text-grey-800 text-sm font-semibold text__ellipsis_2'>
                                                {item.GroupServiceName}
                                            </span>

                                            <span className='text-grey-800 text-sm mb-1'>
                                                <span className='me-1'> Số lượng: </span>
                                                <span className='text-primary font-semibold'>
                                                    {toThousandSeparator(
                                                        //q
                                                        // item?.Quantity || item.Count,
                                                        item.Count,
                                                    )}
                                                </span>
                                                <span className='mx-1'>x</span>
                                                <span className='text-primary font-semibold'>
                                                    {toThousandSeparator(item.SalePrice)}
                                                </span>
                                            </span>
                                            {item.DiscountValue > 0 && (
                                                <span className='text-grey-800 text-sm mb-1'>
                                                    <span className='me-1'>Giảm giá:</span>
                                                    <span className='text-danger font-semibold'>
                                                        {toThousandSeparator(item.DiscountValue)}
                                                    </span>
                                                </span>
                                            )}
                                            <span className='text-grey-800 text-sm'>
                                                <span className='me-1'>Thành tiền:</span>
                                                <span className='text-primary font-semibold'>
                                                    {toThousandSeparator(item.TotalPrice)}
                                                </span>
                                            </span>
                                        </div>
                                        {isFunction(showQR) && data.VoucherStatus === 2 ? (
                                            <div
                                                className='flex-none w-14 h-14 overlay overlay-show rounded-xl relative'
                                                onClick={() => showQR(item)}
                                            >
                                                <img
                                                    src={QRSVG}
                                                    className='w-14 h-14 rounded-xl ratio-1x1 blur-sm'
                                                />

                                                <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                                                    <Icon
                                                        icon='zi-unlock-solid'
                                                        className='text-primary'
                                                    />
                                                </span>
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                )}
                            />
                        ) : (
                            <Button
                                className='text-primary text-sm font-semibold'
                                loading={isLoadingItems}
                                onClick={() => {
                                    if (isFunction(showDetail)) {
                                        showDetail();
                                    }
                                }}
                            >
                                Xem sản phẩm trong đơn hàng
                            </Button>
                        )}
                    </>
                )}
                <div className='h-[0.5px] bg-grey-400 w-full my-1'></div>
                <div className='text-grey-800 text-base flex w-full justify-between items-center mb-2'>
                    <span className='text-xs'>Tổng đơn</span>
                    <span className='text-md text-primary font-semibold'>
                        {toThousandSeparator(data.TotalPrice)}
                    </span>
                </div>
                {data?.Status !== OrderStatusEnum.Cancel &&
                data?.Status !== OrderStatusEnum.PaymentSuccess &&
                data?.Status !== OrderStatusEnum.IssueTicket &&
                data?.Status !== OrderStatusEnum.Finish ? (
                    <>
                        {paymentStatus?.value !== BookingPaymentStatusEnum.PaymentOk ? (
                            <Button
                                className='bg-secondary'
                                size='small'
                                loading={isLoadingItems}
                                onClick={() => {
                                    if (data.PaymentStatus === BookingPaymentStatusEnum.PaymentOk) {
                                        return;
                                    } else {
                                        const params = queryString.parseUrl(
                                            data.PaymentUrlPublic as string,
                                        );
                                        const signature = get(params, ['query', 'signature'], null);
                                        if (signature)
                                            navigate(
                                                generatePath(paths.Payment, {
                                                    orderCode: data.OrderCode,
                                                    signature: signature,
                                                }),
                                            );
                                    }
                                }}
                            >
                                Thanh toán ngay
                            </Button>
                        ) : (
                            <Button className='text-success text-sm font-semibold'>
                                Đã thành công
                            </Button>
                        )}
                    </>
                ) : (
                    <></>
                )}
            </Box>
        </Fragment>
    );
};
export default BookingItem;
