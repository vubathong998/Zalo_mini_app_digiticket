import { ImageSkeleton } from 'components/Skeletons';
import ListRenderer from 'components/Softcom/ListRenderer';
import isFunction from 'lodash/isFunction';
import { NewOrderTicketModel } from 'models/NewOrderInfo/NewOrderInfoModel';
import { NewOrderInfoGetDetailResponse } from 'models/NewOrderInfo/NewOrderInfoResponse';
import { getStatus } from 'models/orderStatus';
import React, { FC, Fragment } from 'react';
import formatDateCustom from 'utils/formatDateCustom';
import toThousandSeparator from 'utils/toThousandSeparator';
import { Box, Button } from 'zmp-ui';
interface IProps {
    data: NewOrderInfoGetDetailResponse;
    limitItems?: number;
    showDetail?: () => void;
    items: Array<NewOrderTicketModel>;
    isLoadingItems?: boolean;
}

const BookingPaymentItem: FC<IProps> = (props) => {
    const { data, limitItems, items, showDetail, isLoadingItems } = props;
    const status = getStatus(data.Status);
    const generateClassNameBookingStatus = `bg-${status?.color} rounded-xl px-2 py-1 text-white text-xs`;

    return (
        <Fragment>
            <Box className='grid w-full shadow-sm p-4 rounded-xl'>
                <div className='flex w-full justify-between mb-2'>
                    <span className='text-primary font-semibold text-base'>
                        Mã đơn hàng: #{data.OrderCode}
                    </span>
                </div>
                <div className='text-grey-800 text-base flex w-full justify-between items-center mb-1'>
                    <span className='text-xs'>
                        {formatDateCustom({
                            value: data.DeliveryDate.toString(),
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
                                limit={limitItems}
                                renderKey={(item) => JSON.stringify(item)}
                                renderItem={(item) => (
                                    <div className='flex flex-1 gap-2'>
                                        <div className='flex-none w-14 h-14'>
                                            <img
                                                src={
                                                    'https://plus.unsplash.com/premium_photo-1690489323622-6033f11bb1a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60'
                                                }
                                                className='rounded-xl w-14 h-14'
                                            />
                                        </div>
                                        <div className='flex flex-col grow'>
                                            <span className='text-grey-800 text-sm font-semibold text__ellipsis_2'>
                                                {item.GroupServiceName}
                                            </span>

                                            <span className='text-grey-800 text-sm mb-1'>
                                                <span className='me-1'> Số lượng: </span>
                                                <span className='text-primary font-semibold'>
                                                    {toThousandSeparator(item.Count)}
                                                </span>
                                            </span>
                                            <span className='text-grey-800 text-sm mb-1'>
                                                <span className='me-1'> Đơn giá: </span>
                                                <span className='text-primary font-semibold'>
                                                    {toThousandSeparator(item.SalePrice)}
                                                </span>
                                            </span>
                                            {item.DiscountValue > 0 && (
                                                <span className='text-grey-800 text-sm mb-1'>
                                                    <span className='me-1'>Giảm giá:</span>
                                                    <span className='text-primary font-semibold'>
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
                                Chi tiết sản phẩm
                            </Button>
                        )}
                    </>
                )}
                <div className='h-[0.5px] bg-grey-400 w-full my-1'></div>
                <div className='text-grey-800 text-base flex w-full justify-between items-center'>
                    <span className='text-xs'>Tổng đơn</span>
                    <span className='text-md text-primary font-semibold'>
                        {toThousandSeparator(data.TotalPrice)}
                    </span>
                </div>
            </Box>
        </Fragment>
    );
};
export default BookingPaymentItem;
