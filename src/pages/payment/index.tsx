import BookingPayment from 'components/Booking/BookingPayment';
import BookingPaymentItem from 'components/Booking/BookingPaymentItem';
import { Divider } from 'components/Divider';
import { ImageSkeleton } from 'components/Skeletons';
import CreatePaymentForm from 'components/Softcom/BottomSheetPicker/CreatePaymentForm';
import { BookingPaymentStatusEnum } from 'models/Booking/BookingEnum';
import React, { FC, useEffect } from 'react';
import { generatePath, useParams } from 'react-router-dom';
import { paths } from 'routes/routeConfig';
import { useLazyNewOrderInfoGetDetailQuery } from 'services/newOrderInfo';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Header, Icon, Page, useNavigate } from 'zmp-ui';
const MySwal = withReactContent(Swal);

interface IProps {}

const PaymentPage: FC<IProps> = (props) => {
    const { orderCode, signature } = useParams() as { orderCode: string; signature: string };
    // const [getBookingDetail, getBookingDetailState] = useLazyGetBookingDetailQuery();
    const [getBookingDetail, getBookingDetailState] = useLazyNewOrderInfoGetDetailQuery();
    const navigate = useNavigate();
    const onCloseWebviewPayment = () => {
        getBookingDetail({
            OrderCode: orderCode,
            // Signature: signature,
        })
            .unwrap()
            .then((r) => {
                if (r.PaymentStatus === BookingPaymentStatusEnum.PaymentOk) {
                    MySwal.fire({
                        title: '<strong class="text-lg">Thanh toán thành công</strong>',
                        html: `<div class="flex flex-col gap-2">
                            <span class="text-sm">Đã thanh toán cho đơn hàng #${r.OrderCode}</span>
                        </div>`,
                        icon: 'success',
                        confirmButtonColor: '#186F65',
                        customClass: {
                            cancelButton: 'text-md p-6',
                            confirmButton: 'text-md p-6',
                        },
                        didClose: async () => {
                            navigate(generatePath(paths.MyBooking));
                        },
                    });
                } else {
                    MySwal.fire({
                        title: '<strong class="text-lg">Thanh toán không thành công</strong>',
                        html: `<div class="flex flex-col gap-2">
                            <span class="text-sm">Vui lòng thực hiện thanh toán lại hoặc liên hệ với chúng tôi</span>
                        </div>`,
                        icon: 'error',
                        confirmButtonColor: '#B2533E',
                        customClass: {
                            cancelButton: 'text-md p-6',
                            confirmButton: 'text-md p-6',
                        },
                        didClose: async () => {
                            navigate(generatePath(paths.MyBooking));
                        },
                    });
                }
            })
            .catch((e) => {});
    };
    const onWaitPaymentCallback = () => {
        MySwal.fire({
            title: '<strong class="text-lg">Cảm ơn bạn đã mua hàng</strong>',
            html: `<div class="flex flex-col gap-2">
                        <span class="text-sm">Chúng tôi đang tiến hành kiểm tra trạng thái thanh toán của đơn hàng #${orderCode}</span>
                        <span class="text-sm">Vui lòng quay lại sau ít phút</span>
                    </div>`,
            icon: 'success',
            confirmButtonColor: '#186F65',
            customClass: {
                cancelButton: 'text-md p-6',
                confirmButton: 'text-md p-6',
            },
            didClose: async () => {
                navigate(generatePath(paths.MyBooking));
            },
        });
    };

    useEffect(() => {
        getBookingDetail({
            OrderCode: orderCode,
            // Signature: signature,
        }).unwrap();
    }, []);

    return (
        <Page className='flex flex-col' hideScrollbar>
            <Header
                title={'Thanh toán'}
                showBackIcon
                backIcon={<Icon icon='zi-chevron-left-header' className='text-5xl text-dark' />}
            />
            {getBookingDetailState.isFetching ? (
                <ImageSkeleton className='w-full rounded-xl h-[160px]' />
            ) : (
                <>
                    {getBookingDetailState.data ? (
                        <BookingPaymentItem
                            data={getBookingDetailState.data}
                            items={getBookingDetailState.data?.OrderTickets}
                        />
                    ) : (
                        <div className='bg-white rounded-xl py-8 px-4 text-center text-grey-400 text-sm flex flex-col items-center justify-center'>
                            Không tải được dữ liệu đơn hàng
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
            <Divider size={32} className='flex-1' />
            {getBookingDetailState.data ? (
                <CreatePaymentForm
                    data={getBookingDetailState.data}
                    onCallback={onCloseWebviewPayment}
                    onWaitPaymentCallback={onWaitPaymentCallback}
                >
                    {({ open }) => (
                        <BookingPayment
                            //@ts-ignore
                            data={getBookingDetailState.data}
                            onPayment={open}
                        />
                    )}
                </CreatePaymentForm>
            ) : (
                <></>
            )}
        </Page>
    );
};
export default PaymentPage;
