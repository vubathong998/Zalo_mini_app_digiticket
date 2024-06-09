/* #region hooks */
import { Sheet } from 'components/BottomSheet';
import { TextSkeleton } from 'components/Skeletons';
import CartContext from 'contexts/Cart/CartContext';
import moment from 'moment';
import React, { FC, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import formatDateCustom from 'utils/formatDateCustom';
import toThousandSeparator from 'utils/toThousandSeparator';
import { Box, Button, DatePicker, Text } from 'zmp-ui';
import QuantityPicker from './QuantityPicker';
import { NewListingVariationItemModel, NewProductModel } from 'models/NewListing/NewListingModel';
import {
    useLazyNewListingGetDetailQuery,
    useLazyNewListingGetListUsingDateByIdQuery,
    useLazyNewListingPropertyGetPriceByVariationsQuery,
} from 'services/newListing';
import appConfig from '../../../../app-config.json';
import { NewListingDetailResponse } from 'models/NewListing/NewListingResponse';
import { NewCartListItemModel } from 'models/NewCart/NewCartModel';

/* #endregion */
export interface ProductPickerProps {
    product: NewProductModel;
    children: (methods: { open: () => void; close: () => void }) => ReactNode;
    selected?: NewCartListItemModel;
}

const ProductPicker: FC<ProductPickerProps> = (props) => {
    /* #region variable */
    const { children, product, selected } = props;
    const aid = appConfig.env.VITE_SHOP_ID;
    const { isLoadingAddItemToCart, addItem, updateItemQuantity, removeItem } =
        useContext(CartContext);
    /* #endregion */

    /* #region useState */
    const [isAbleToAddToCart, setIsAbleToAddToCart] = useState<boolean>(false);
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [usingDate, setUsingDate] = useState<Date>(
        selected?.UsingDate.length === 1 ? new Date(selected?.UsingDate[0]) : new Date(),
    );
    const [isAvailableUsingDate, setIsAvailableUsingDate] = useState<boolean>(true);
    const [detailListing, setDetailListing] = useState<NewListingDetailResponse | null>(null);
    const [variation1st, setVariation1st] = useState<NewListingVariationItemModel | null>(null);
    const [variation2nd, setVariation2nd] = useState<NewListingVariationItemModel | null>(null);
    /* #endregion */

    /* #region services */
    const [getPriceByVariation, getPriceByVariationState] =
        useLazyNewListingPropertyGetPriceByVariationsQuery();
    const [getAvailableUsingDate, getAvailableUsingDateState] =
        useLazyNewListingGetListUsingDateByIdQuery();
    const [getDetailListing, getDetailListingState] = useLazyNewListingGetDetailQuery();
    /* #endregion */

    /* #region function */
    const handleSelectVariation1st = (value: any) => {
        setVariation1st(value);
    };
    const handleSelectVariation2nd = (value: any) => {
        setVariation2nd(value);
    };
    const addToCart = () => {
        if (isLoadingAddItemToCart) return;

        if (getPriceByVariationState.data) {
            addItem({
                groupServiceId: getPriceByVariationState.data.GroupServiceId || '',
                quantity: quantity,
                usingDate: [
                    formatDateCustom({
                        format: 'YYYY-MM-DD',
                        inputType: 'DD-MM-YYYY',
                        value: moment(usingDate),
                    }),
                ],
            });
        }
        setVisible(false);
    };

    const handleGetPriceByVariations = async () => {
        const usingDateRequest: string = formatDateCustom({
            format: 'YYYY-MM-DD',
            inputType: 'DD-MM-YYYY',
            value: moment(usingDate),
        });
        try {
            if (detailListing) {
                if (!detailListing.Variation1st && !detailListing.Variation2nd) {
                    await getPriceByVariation({
                        AId: aid,
                        ListingId: detailListing.Id,
                        VariationUsingDateValue: usingDateRequest,
                    });
                    return;
                }
            }
            if (detailListing?.Variation1st && !detailListing.Variation2nd) {
                if (variation1st) {
                    await getPriceByVariation({
                        AId: aid,
                        ListingId: detailListing.Id,
                        VariationUsingDateValue: usingDateRequest,
                        VariationOption1stId: variation1st.Id,
                    });
                }
            }
            if (detailListing?.Variation1st && detailListing?.Variation2nd) {
                if (variation1st && variation2nd) {
                    await getPriceByVariation({
                        AId: aid,
                        ListingId: detailListing.Id,
                        VariationUsingDateValue: usingDateRequest,
                        VariationOption1stId: variation1st.Id,
                        VariationOption2ndId: variation2nd.Id,
                    });
                }
            }
        } catch (err) {
            console.error(err);
        }
    };
    /* #endregion */

    /* #region process later */
    useEffect(() => {
        if (!detailListing?.Variation1st) {
            setIsAbleToAddToCart(true);
        } else if (detailListing?.Variation1st && detailListing?.Variation2nd) {
            if (variation1st && variation2nd) {
                setIsAbleToAddToCart(true);
            } else {
                setIsAbleToAddToCart(false);
            }
        } else if (detailListing?.Variation1st) {
            if (variation1st) {
                setIsAbleToAddToCart(true);
            } else {
                setIsAbleToAddToCart(false);
            }
        }
    }, [visible, variation1st, variation2nd, detailListing]);

    useEffect(() => {
        if (visible) {
            getDetailListing({
                Id: product.Id,
                AId: aid,
            })
                .unwrap()
                .then((res) => {
                    setIsLoading(false);
                    setDetailListing(res);
                });
        }
    }, [visible]);

    useEffect(() => {
        if (selected && visible) {
            setQuantity(selected.Count);
        }
        if (visible && !selected && product.HasVariationUsingDate) {
            getAvailableUsingDate({
                Id: product.Id,
                AId: aid,
            })
                .unwrap()
                .then((res) => {
                    if (res.BeginDate && res.AvailableDates.length > 0) {
                        setUsingDate(new Date(res.BeginDate));
                    } else {
                        setIsAvailableUsingDate(false);
                    }
                });
        }
    }, [visible]);

    useEffect(() => {
        if (visible && !selected) {
            (async () => {
                await handleGetPriceByVariations();
            })();
        }
    }, [detailListing, variation1st, variation2nd, usingDate]);

    const prices = useMemo(() => {
        if (!detailListing) return {};

        const { MinPrice, MaxPrice, MaxPromotionPrice, MinPromotionPrice } = detailListing || {
            MinPrice: 0,
            MaxPrice: 0,
            MaxPromotionPrice: 0,
            MinPromotionPrice: 0,
        };
        const { Price, PromotionPrice } = getPriceByVariationState.data || {
            Price: 0,
            PromotionPrice: 0,
        };
        const discountPercent = Boolean(PromotionPrice || MinPromotionPrice)
            ? Math.round(((Price - PromotionPrice) / Price) * 100) ||
              Math.round(((MinPrice - MinPromotionPrice) / MinPrice) * 100)
            : null;

        return {
            price: Price || MinPromotionPrice || MinPrice,
            minPrice: MinPromotionPrice || MinPrice,
            maxPrice: MaxPromotionPrice || MaxPrice,
            promotionPrice: Boolean(PromotionPrice) ? PromotionPrice : null,
            discountPercent: discountPercent,
        };
    }, [detailListing, getPriceByVariationState.data]);
    /* #endregion */

    return (
        <>
            {children({
                open: () => setVisible(true),
                close: () => {
                    if (selected) {
                        setVisible(false);
                        setQuantity(selected.Count);
                    } else {
                        setVisible(false);
                    }
                },
            })}
            {createPortal(
                <Sheet
                    visible={visible}
                    onClose={() => {
                        if (selected) {
                            setVisible(false);
                            setQuantity(selected.Count);
                        } else {
                            setVisible(false);
                        }
                    }}
                    autoHeight
                    unmountOnClose
                >
                    <div className='max-h-[650px]'>
                        {product && (
                            <Box className='px-4'>
                                <Box className='flex flex-row items-center gap-4'>
                                    <span
                                        onClick={() => {
                                            if (selected) {
                                                setVisible(false);
                                                setQuantity(selected.Count);
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
                                    <Text.Header className='text__ellipsis_1'>
                                        {product.Name}
                                    </Text.Header>
                                </Box>
                                <Box
                                    className='mt-2 overflow-y-scroll'
                                    style={{ height: 'calc(90vh - 300px)' }}
                                >
                                    {product.Images &&
                                        product.Images.length > 0 &&
                                        product.Images?.[0]?.Url !== '' && (
                                            <div className='mt-2 mb-1'>
                                                <img
                                                    className='ratio-3x2 max-h-44 w-full rounded-lg mb-1'
                                                    src={`https://digipost.digiticket.vn/cdn/Content/ShowImage?url=${product.Images?.[0]?.Url}`}
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            </div>
                                        )}
                                    <div
                                        dangerouslySetInnerHTML={{ __html: product.Description }}
                                    ></div>
                                </Box>
                            </Box>
                        )}
                        <Box className='flex flex-col gap-4 pt-2 rounded-lg sticky bottom-0 bg-background px-4 pb-2'>
                            <div className='max-h-[300px] overflow-auto'>
                                {!selected &&
                                    product.HasVariationUsingDate &&
                                    isAvailableUsingDate && (
                                        <DatePicker
                                            label='Ngày sử dụng'
                                            mask
                                            maskClosable
                                            disabled={
                                                getDetailListingState.isFetching ||
                                                getAvailableUsingDateState.isFetching ||
                                                isLoading
                                            }
                                            value={usingDate}
                                            onChange={(date) => {
                                                setUsingDate(date);
                                            }}
                                            inputClass='text-center'
                                            dateFormat='dd-mm-yyyy'
                                            title='DatePicker'
                                        />
                                    )}
                                {detailListing && detailListing.Variation1st && (
                                    <Box className='flex flex-col'>
                                        <div>{detailListing.Variation1st.Name}</div>
                                        <div className='flex flex-wrap gap-3'>
                                            {detailListing?.Variation1st.SelectedOptions.map(
                                                (opt) => {
                                                    const isActive = variation1st?.Id === opt?.Id;
                                                    return (
                                                        <Button
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleSelectVariation1st(opt);
                                                            }}
                                                            variant='secondary'
                                                            type={
                                                                isActive ? 'highlight' : 'neutral'
                                                            }
                                                            size='small'
                                                            className={'rounded-lg truncate'}
                                                            key={opt.Id}
                                                        >
                                                            {opt.Value}
                                                        </Button>
                                                    );
                                                },
                                            )}
                                        </div>
                                    </Box>
                                )}
                                {detailListing && detailListing.Variation2nd && (
                                    <Box className='flex flex-col'>
                                        <div>{detailListing.Variation2nd.Name}</div>
                                        <div className='flex flex-wrap gap-3'>
                                            {detailListing?.Variation2nd.SelectedOptions.map(
                                                (opt) => {
                                                    const isActive = variation2nd?.Id === opt?.Id;
                                                    return (
                                                        <Button
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleSelectVariation2nd(opt);
                                                            }}
                                                            variant='secondary'
                                                            type={
                                                                isActive ? 'highlight' : 'neutral'
                                                            }
                                                            size='small'
                                                            className={'rounded-lg truncate'}
                                                            key={opt.Id}
                                                        >
                                                            {opt.Value}
                                                        </Button>
                                                    );
                                                },
                                            )}
                                        </div>
                                    </Box>
                                )}
                            </div>
                            {product.HasVariationUsingDate && !isAvailableUsingDate && !selected ? (
                                <span
                                    className='text-primary text-center py-2 border border-primary text-base font-semibold rounded-lg'
                                    onClick={() => {
                                        setVisible(false);
                                    }}
                                >
                                    Sắp mở bán
                                </span>
                            ) : (
                                <>
                                    <QuantityPicker value={quantity} onChange={setQuantity} />

                                    {!detailListing ||
                                    isLoading ||
                                    isLoadingAddItemToCart ||
                                    getPriceByVariationState.isLoading ||
                                    getPriceByVariationState.isFetching ||
                                    getAvailableUsingDateState.isLoading ||
                                    getAvailableUsingDateState.isFetching ||
                                    getDetailListingState.isLoading ||
                                    getDetailListingState.isFetching ? (
                                        <TextSkeleton
                                            className='rounded-lg w-full'
                                            style={{
                                                height: '40px',
                                            }}
                                        ></TextSkeleton>
                                    ) : (
                                        <div className='flex flex-row'>
                                            <Box
                                                flex
                                                flexDirection='column'
                                                justifyContent='center'
                                                className='min-w-[120px] flex-none'
                                            >
                                                <div className='flex flex-col gap-1'>
                                                    <div className='text-danger me-1 text-lg'>
                                                        {isAbleToAddToCart ||
                                                        prices.minPrice === prices.maxPrice ? (
                                                            <>
                                                                {toThousandSeparator(
                                                                    prices.price || 0,
                                                                )}
                                                                ₫
                                                            </>
                                                        ) : (
                                                            <>
                                                                {toThousandSeparator(
                                                                    prices.minPrice || 0,
                                                                )}
                                                                ₫ -{' '}
                                                                {toThousandSeparator(
                                                                    prices.maxPrice || 0,
                                                                )}
                                                                ₫
                                                            </>
                                                        )}
                                                    </div>
                                                    {prices.promotionPrice && (
                                                        <div
                                                            className='text-grey-400 text-xs'
                                                            style={{
                                                                textDecoration: 'line-through',
                                                            }}
                                                        >
                                                            {toThousandSeparator(
                                                                prices.promotionPrice,
                                                            )}
                                                            ₫
                                                        </div>
                                                    )}
                                                </div>
                                                {getDetailListingState.isError && (
                                                    <>
                                                        {product.HasVariationUsingDate ? (
                                                            <span className='text-danger-dark text-xs'>
                                                                Đã hết hàng, vui lòng chọn ngày
                                                                khác.
                                                            </span>
                                                        ) : (
                                                            <span className='text-danger-dark text-xs'>
                                                                Đã hết hàng
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                            </Box>
                                        </div>
                                    )}
                                </>
                            )}
                            <Button
                                loading={
                                    isLoadingAddItemToCart ||
                                    getAvailableUsingDateState.isFetching ||
                                    isLoading ||
                                    getPriceByVariationState.isLoading ||
                                    getPriceByVariationState.isFetching
                                }
                                disabled={
                                    getDetailListingState.isError ||
                                    !quantity ||
                                    !isAbleToAddToCart ||
                                    !detailListing
                                }
                                variant='primary'
                                type='highlight'
                                fullWidth
                                onClick={addToCart}
                                // className='rounded-lg'
                            >
                                Thêm vào giỏ hàng
                            </Button>
                        </Box>
                    </div>
                </Sheet>,
                document.body,
            )}
        </>
    );
};
export default ProductPicker;
