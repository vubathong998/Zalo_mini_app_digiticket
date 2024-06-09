import BookingItem from 'components/Booking/BookingItem';
import { ImageSkeleton } from 'components/Skeletons';
import ListRenderer from 'components/Softcom/ListRenderer';
import { getTicketStatus } from 'constants/ticketStatus';
import { OrderStatusEnum } from 'models/Booking/BookingEnum';
import { BookingListRequest } from 'models/Booking/BookingRequest';
import { NewOrderInfoModel, NewOrderTicketModel } from 'models/NewOrderInfo/NewOrderInfoModel';
import {
    NewOrderInfoGetByPageResponse,
    NewOrderTicketGetListResponse,
} from 'models/NewOrderInfo/NewOrderInfoResponse';
import { NewTicketGetListResponse } from 'models/NewTicket/NewTicketResponse';
import { TicketStatusEnum } from 'models/Ticket/TicketEnum';
import { TicketModel } from 'models/Ticket/TicketModel';
import { DynamicFilterItem } from 'models/dynamicFilterInterface';
import { ORDER_STATUS } from 'models/orderStatus';
import React, { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLazyGetBookingDetailItemsQuery, useLazyGetMyBookingQuery } from 'services/booking';
import {
    useLazyNewOrderInfoGetByPageQuery,
    useLazyNewOrderTicketGetListQuery,
} from 'services/newOrderInfo';
import { useLazyNewGetTicketQuery } from 'services/newTicket';
import { useLazyGetTicketsQuery } from 'services/tickets';
import QRSVG from 'static/QR.svg';
import { FilterItemTypeEnum } from 'types/dynamicFilter';
import { Box, Header, Icon, Page, Sheet, Tabs } from 'zmp-ui';
interface IProps {}

const MyBookingPage: FC<IProps> = (props) => {
    const [request, setRequest] = useState<BookingListRequest>({
        Filter: [],
        Keyword: '',
        Orderby: 'desc',
        PageIndex: 1,
        PageSize: 5,
    });
    const [visible, setVisible] = useState<boolean>(false);
    const [selectedTicket, setSelectedTicket] = useState<NewTicketGetListResponse>([]);
    const [listBooking, setListBooking] = useState<NewOrderInfoGetByPageResponse>([]);
    const [counterShowQR, setCounterShowQR] = React.useState(60);
    const [listItemByBookingId, setListItemByBookingId] = useState<
        Record<string, NewOrderTicketGetListResponse>
    >({});
    const [currentTicketShowQR, setCurrentTicketShowQR] = useState<string>('');
    // const [getMyBooking, getMyBookingState] = useLazyGetMyBookingQuery();
    const [getMyBooking, getMyBookingState] = useLazyNewOrderInfoGetByPageQuery();
    // const [getTickets, getTicketsState] = useLazyGetTicketsQuery();
    const [getTickets, getTicketsState] = useLazyNewGetTicketQuery();
    const [getBookingDetailItems, getBookingDetailItemsState] = useLazyNewOrderTicketGetListQuery();
    // Get danh sách đơn hàng
    const onShowQR = (ticket: NewOrderTicketModel, orderCode: string) => {
        setVisible(true);
        getTickets({
            // Keyword: '',
            // Orderby: 'desc',
            // PageIndex: 1,
            // PageSize: ticket.Count,
            // OrderTicketId: ticket.Id,
            OrderCode: orderCode,
            // Filter: [],
        })
            .unwrap()
            .then((res) => {
                setSelectedTicket(res);
            });
    };
    const onGetOrderTickets = (orderCode: string) => {
        getBookingDetailItems({
            OrderCode: orderCode,
        })
            .unwrap()
            .then((res) => {
                setListItemByBookingId({
                    ...listItemByBookingId,
                    [orderCode]: res,
                });
            });
    };

    const onFilterStatus = (status: OrderStatusEnum) => {
        const isStatusFilterExisted =
            status.toString() === (request?.Filter || []).find((o) => o.Name === 'Status')?.Values;
        const filterWithoutStatus = request.Filter.filter((o) => o.Name !== 'Status');
        const newFilter: Array<DynamicFilterItem> = isStatusFilterExisted
            ? filterWithoutStatus
            : [
                  ...filterWithoutStatus,
                  {
                      Opt: 'AND',
                      Name: 'Status',
                      Opt1: '=',
                      Type: FilterItemTypeEnum.String,
                      Values: status.toString(),
                  },
              ];
        const newRequest = {
            ...request,
            PageIndex: 1,
            PageSize: 5,
            Filter: newFilter,
        };
        setRequest(newRequest);
        getMyBooking(newRequest)
            .unwrap()
            .then((res) => {
                setListBooking([...res.Result]);
            });
    };

    const onViewMore = () => {
        const newRequest = {
            ...request,
            PageIndex: request.PageIndex + 1,
        };
        setRequest(newRequest);

        getMyBooking(newRequest)
            .unwrap()
            .then((res) => {
                setListBooking([...listBooking, ...res.Result]);
            });
    };

    const handleGetListBooking = () => {
        getMyBooking({ ...request })
            .unwrap()
            .then((res) => {
                setListBooking([...res.Result]);
            });
    };

    useEffect(() => {
        handleGetListBooking();
    }, []);

    useEffect(() => {
        if (currentTicketShowQR !== '' && counterShowQR > 0) {
            const interval = setInterval(() => {
                setCounterShowQR(counterShowQR - 1);
            }, 1000);

            return () => clearInterval(interval);
        }
        if (counterShowQR === 0) {
            setCurrentTicketShowQR('');
            setCounterShowQR(60);
            return;
        }
        return;
    }, [counterShowQR, currentTicketShowQR]);

    return (
        <Page className='flex flex-col' hideScrollbar>
            <Header showBackIcon={true} title='Đơn hàng của tôi' />
            <div className='flex gap-2 px-4 flex-wrap'>
                {ORDER_STATUS.map((status) => {
                    const isSelected = request.Filter.map((item) =>
                        item.Name === 'Status' ? item.Values : undefined,
                    ).includes(status.value.toString());
                    const notSelectedClass = `rounded-xl px-2 py-1 text-xs border border-${status.color} text-${status.color}`;
                    const selectedClass = `rounded-xl px-2 py-1 text-xs text-white bg-${status.color}`;
                    return !isSelected ? (
                        <span
                            onClick={() => onFilterStatus(status.value)}
                            className={notSelectedClass}
                            key={status.value}
                        >
                            {status.label}
                        </span>
                    ) : (
                        <span
                            onClick={() => onFilterStatus(status.value)}
                            className={selectedClass}
                            key={status.value}
                        >
                            {status.label}
                        </span>
                    );
                })}
            </div>
            {getMyBookingState?.isFetching && getMyBookingState.originalArgs?.PageIndex === 1 ? (
                <div className='p-4 flex flex-col gap-2'>
                    <ImageSkeleton className='w-full rounded-xl h-[160px]' />
                    <ImageSkeleton className='w-full rounded-xl h-[160px]' />
                    <ImageSkeleton className='w-full rounded-xl h-[160px]' />
                    <ImageSkeleton className='w-full rounded-xl h-[160px]' />
                </div>
            ) : (
                <>
                    {listBooking && listBooking.length > 0 ? (
                        <Box className='bg-white p-4'>
                            <ListRenderer
                                classNameItemContainer='!p-0 mb-2'
                                noDivider
                                onLoadingMoreData={getMyBookingState?.isFetching}
                                renderKey={(item) => item.OrderCode}
                                onViewMore={
                                    listBooking.length < (getMyBookingState.data?.Total || 0)
                                        ? onViewMore
                                        : undefined
                                }
                                items={listBooking}
                                renderItem={(item: NewOrderInfoModel) => (
                                    <BookingItem
                                        showQR={(ticket: NewOrderTicketModel) =>
                                            onShowQR(ticket, item.OrderCode)
                                        }
                                        isLoadingItems={
                                            (getBookingDetailItemsState.isFetching ||
                                                getBookingDetailItemsState.isLoading) &&
                                            getBookingDetailItemsState.originalArgs?.OrderCode ===
                                                item.OrderCode
                                        }
                                        showDetail={() => onGetOrderTickets(item.OrderCode)}
                                        data={item}
                                        items={listItemByBookingId?.[item.OrderCode] || []}
                                        quickViewItems={[]}
                                    />
                                )}
                            />
                        </Box>
                    ) : (
                        <div className='bg-white rounded-xl py-8 px-4 text-center text-grey-400 text-sm flex flex-col items-center justify-center'>
                            Chưa có đơn hàng
                            <img
                                data-testid='Image'
                                width='100%'
                                className='object-fit-cover'
                                src='https://cdn.digiticket.vn/Content/ShowFile/Images/15-06-2023/preview_1686802084.png'
                                style={{
                                    transition: 'filter 0.5s linear 0s',
                                    background: 'white',
                                    overflow: 'hidden',
                                }}
                            />
                        </div>
                    )}
                </>
            )}

            {createPortal(
                <Sheet visible={visible} onClose={() => setVisible(false)} height={'75%'}>
                    <Box className='flex flex-col'>
                        {getTicketsState.isLoading ? (
                            <ImageSkeleton />
                        ) : (
                            <Tabs
                                scrollable
                                className='category-tabs'
                                onChange={() => {
                                    setCurrentTicketShowQR('');
                                    setCounterShowQR(60);
                                }}
                            >
                                {selectedTicket.map((ticket, index) => (
                                    <Tabs.Tab
                                        key={ticket.SerialNumber}
                                        label={`Vé ${index + 1} - ${
                                            // ticket?.StatusName ||
                                            getTicketStatus(ticket.Status)?.label || ''
                                        }`}
                                    >
                                        <Box className='flex flex-col items-center justify-center my-8'>
                                            <span className='text-sm'>
                                                Mã vé: {ticket.CheckCode}
                                            </span>
                                            <span className='text-sm'>
                                                Serial: {ticket.SerialNumber}
                                            </span>
                                            {/* {ticket?.TicketOTA?.Password && (
                                                <span className='text-sm text-secondary'>
                                                    Mật khẩu:
                                                    {`${
                                                        currentTicketShowQR === ticket.SerialNumber
                                                            ? ticket.TicketOTA.Password
                                                            : '************'
                                                    }`}
                                                </span>
                                            )} */}
                                            {currentTicketShowQR === ticket.SerialNumber ? (
                                                <>
                                                    <span className='text-sm mt-1'>
                                                        Mã QR sẽ tự khoá sau:
                                                        <span className='text-danger mx-1'>
                                                            {counterShowQR}
                                                        </span>
                                                        giây
                                                    </span>
                                                    <img
                                                        src={`data:image/png;base64, ${ticket.QRCode}`}
                                                        className='w-[250px] h-[250px] rounded-xl'
                                                    />
                                                </>
                                            ) : (
                                                <div
                                                    className='flex-none w-[250px] h-[250px] overlay overlay-show rounded-xl relative'
                                                    onClick={() =>
                                                        ticket.Status === TicketStatusEnum.OnHand ||
                                                        ticket.Status === TicketStatusEnum.Issue
                                                            ? setCurrentTicketShowQR(
                                                                  ticket.SerialNumber,
                                                              )
                                                            : {}
                                                    }
                                                >
                                                    <img
                                                        src={QRSVG}
                                                        className='w-[250px] h-[250px] rounded-xl ratio-1x1 blur-md'
                                                    />

                                                    <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                                                        <Icon
                                                            icon='zi-unlock-solid'
                                                            className='text-primary'
                                                        />
                                                    </span>
                                                </div>
                                            )}
                                            {/* <span>
                                                {ticket?.StatusName ||
                                                    getTicketStatus(ticket.Status)?.label ||
                                                    ''}
                                            </span> */}
                                        </Box>
                                    </Tabs.Tab>
                                ))}
                            </Tabs>
                        )}
                    </Box>
                </Sheet>,
                document.body,
            )}
        </Page>
    );
};
export default MyBookingPage;
