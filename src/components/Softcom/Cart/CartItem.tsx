import { CDN_SHOW_IMAGE } from 'constants/common';
import CartContext from 'contexts/Cart/CartContext';
import { NewCartListItemModel } from 'models/NewCart/NewCartModel';
import React, { FC, useContext, useState } from 'react';
import formatDateCustom from 'utils/formatDateCustom';
import toThousandSeparator from 'utils/toThousandSeparator';
import { Button } from 'zmp-ui';
import { Sheet } from 'components/BottomSheet';

interface IProps {
    data: NewCartListItemModel;
    onClick: (item: NewCartListItemModel) => void;
}

const CartItem: FC<IProps> = (props) => {
    const { data, onClick } = props;
    const { removeItem, isLoadingRemoveItemFromCart } = useContext(CartContext);

    const [isShowRemoveSheet, setIsShowRemoveSheet] = useState<boolean>(false);

    const handleEditingItem = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e?.preventDefault();
        e.stopPropagation();
        data && onClick(data);
    };

    const handleRemoveItem = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e?.preventDefault();
        if (!isLoadingRemoveItemFromCart) {
            removeItem({
                cartItemId: data?.CartItemId || '',
                groupServiceId: data?.Id || '',
            });
            setIsShowRemoveSheet(false);
        }
    };

    const hasImage =
        data?.ImageUrl &&
        data?.ImageUrl?.length > 0 &&
        (data?.ImageUrl?.[0]?.Url || '').trim() !== '';
    return (
        <div className='w-full'>
            <div className='flex flex-row gap-2'>
                <div className='font-semibold w-full truncate mb-1' onClick={handleEditingItem}>
                    {data?.Name}
                </div>
                <div
                    className='text-danger-dark'
                    onClick={(e) => {
                        e?.preventDefault();
                        e?.stopPropagation();
                        if (!isLoadingRemoveItemFromCart) {
                            setIsShowRemoveSheet(true);
                        }
                    }}
                >
                    Xóa
                    {/* <svg
                            className='w-6 h-6 text-gray-800 dark:text-white'
                            aria-hidden='true'
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            fill='none'
                            viewBox='0 0 24 24'
                        >
                            <path
                                stroke='currentColor'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                                stroke-width='2'
                                d='M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z'
                            />
                        </svg> */}
                </div>
            </div>
            <div className='flex w-full'>
                <div className='w-[60px] h-[60px] me-2' onClick={handleEditingItem}>
                    {hasImage ? (
                        <img
                            className='rounded-xl mb-1 object-cover w-full h-full'
                            src={`${CDN_SHOW_IMAGE}${(data?.ImageUrl?.[0]?.Url || '').trim()}`}
                            style={{ objectFit: 'cover' }}
                        />
                    ) : (
                        <div className='font-semibold bg-primary text-white w-full h-full rounded-xl text-2xl flex  items-center justify-center'>
                            {data?.GroupName?.charAt(0) || ''}
                        </div>
                    )}
                </div>

                <div className='flex items-start flex-1' onClick={handleEditingItem}>
                    <div className='flex flex-col w-full'>
                        <span className='text-grey-800 text-sm flex gap-1'>
                            <span>Số lượng:</span>
                            <span className='text-primary font-semibold'>{data?.Count}</span>
                            <span> x </span>
                            <span className='text-primary font-semibold'>
                                {toThousandSeparator((data?.TotalPrice || 0) / (data?.Count || 1))}₫
                                {/* <span className='mx-1'>/</span> */}
                                {/* {data?.Unit} */}
                            </span>
                        </span>

                        <span className='text-grey-800 text-sm'>
                            Tổng tiền:
                            <span className='text-primary font-semibold ms-1'>
                                {toThousandSeparator(data?.TotalPrice || 0)}₫
                            </span>
                        </span>
                        {data && data?.TermOfUsingDate?.RequireUsingdate && (
                            <span className='text-grey-800 text-sm flex gap-1'>
                                <span>Ngày sử dụng:</span>
                                {data.UsingDate.length === 1 ? (
                                    <span className='text-primary font-semibold capitalize'>
                                        {formatDateCustom({
                                            value: data?.UsingDate[0],
                                            format: 'dddd, DD-MM-YYYY',
                                        })}
                                    </span>
                                ) : (
                                    <span className='text-primary font-semibold'>
                                        <span className='capitalize'>
                                            {formatDateCustom({
                                                value: data?.UsingDate[0],
                                                format: 'dddd, DD-MM-YYYY',
                                            })}
                                        </span>
                                        <span className='mx-1 text-grey-400'>tới</span>
                                        <span className='capitalize'>
                                            {formatDateCustom({
                                                value: data?.UsingDate[1],
                                                format: 'dddd, DD-MM-YYYY',
                                            })}
                                        </span>
                                    </span>
                                )}
                            </span>
                        )}
                        {data && data.VariationKey1stValue && data.VariationOption1stValue && (
                            <span className='text-grey-800 text-sm'>
                                {data.VariationKey1stValue}:
                                <span className='text-primary font-semibold ms-1'>
                                    {data.VariationOption1stValue}
                                </span>
                            </span>
                        )}
                        {data.VariationKey2ndValue && data.VariationOption2ndValue && (
                            <span className='text-grey-800 text-sm'>
                                {data.VariationKey2ndValue}:
                                <span className='text-primary font-semibold ms-1'>
                                    {data.VariationOption2ndValue}
                                </span>
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <Sheet
                visible={isShowRemoveSheet}
                onClose={() => setIsShowRemoveSheet(false)}
                autoHeight
            >
                <div className='p-4'>
                    <div className='font-semibold'>Xóa "{data?.Name}" khỏi giỏ hàng ?</div>
                    <div className='flex flex-row justify-between gap-3 mt-4'>
                        <Button
                            className={'!bg-primary-dark !text-white'}
                            fullWidth
                            onClick={(e) => {
                                e?.preventDefault();
                                setIsShowRemoveSheet(false);
                            }}
                        >
                            Đóng
                        </Button>
                        <Button
                            fullWidth
                            onClick={handleRemoveItem}
                            variant={'secondary'}
                            type={'neutral'}
                            className={'!bg-danger !text-white'}
                        >
                            Tiếp tục
                        </Button>
                    </div>
                </div>
            </Sheet>
        </div>
    );
};
export default CartItem;
