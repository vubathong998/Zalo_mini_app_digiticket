/* #region hooks */
import { ProductModel } from 'models/Product/ProductModel';
import React, { FC } from 'react';
import toThousandSeparator from 'utils/toThousandSeparator';
import { Box } from 'zmp-ui';
import ProductPicker from '../BottomSheetPicker/ProductPicker';
import { NewProductModel } from 'models/NewListing/NewListingModel';
import { NewCartListItemModel } from 'models/NewCart/NewCartModel';
/* #endregion */

interface IProps {
    data: NewProductModel;
    itemInCart?: NewCartListItemModel;
    onClick: (data: ProductModel) => void;
}

const ProductItem: FC<IProps> = (props) => {
    const { data, onClick, itemInCart } = props;
    const isSale = data.PromotionPrice > 0;

    return (
        <ProductPicker product={data} selected={itemInCart}>
            {({ open }) => (
                <div onClick={open}>
                    <Box className='overlay overlay-show rounded-xl w-full max-h-44 relative'>
                        <div
                            className='bgi-no-repeat bgi-position-center bgi-size-cover rounded-xl ratio-3x2 max-h-44'
                            style={{
                                backgroundImage: `url(https://digipost.digiticket.vn/cdn/Content/ShowImage?url=${
                                    data?.Images[0]?.Url || ''
                                })`,
                                backgroundSize: 'cover',
                            }}
                        />
                        <div
                            className='rounded-xl overlay-layer'
                            style={{
                                background: `linear-gradient(180deg,transparent 80%,rgba(0,0,0,0.25))`,
                            }}
                        />
                        {itemInCart && (
                            <span className='w-fit font-bold px-[8px] py-[2px] flex items-center gap-1 bg-primary shadow rounded-full bottom-[4px] right-[4px] text-white absolute'>
                                <svg
                                    width='16px'
                                    height='16px'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        fillRule='evenodd'
                                        clipRule='evenodd'
                                        d='M1 3C1 2.44772 1.44772 2 2 2C3.62481 2 5.06733 3.03971 5.58114 4.58114L5.72076 5L18.03 5C18.6859 4.99998 19.2437 4.99996 19.6951 5.04029C20.165 5.08226 20.6347 5.17512 21.064 5.43584C21.6667 5.80183 22.1211 6.36838 22.3477 7.03605C22.5091 7.51168 22.4978 7.99036 22.4369 8.45816C22.3783 8.90755 22.2573 9.45209 22.115 10.0924L21.8088 11.4704C21.664 12.1218 21.5435 12.6641 21.4106 13.1043C21.2716 13.5649 21.1006 13.9803 20.8231 14.36C20.4058 14.931 19.8446 15.3812 19.1967 15.6646C18.7658 15.8532 18.3232 15.93 17.8434 15.9658C17.3849 16 16.8295 16 16.1621 16H10.8379C10.1705 16 9.61512 16 9.15656 15.9658C8.67678 15.93 8.23421 15.8532 7.80328 15.6646C7.15536 15.3812 6.59418 14.931 6.17692 14.36C5.89941 13.9803 5.72844 13.5649 5.58939 13.1043C5.45649 12.6641 5.33602 12.1219 5.19125 11.4704L4.035 6.26729L3.68377 5.21359C3.44219 4.48885 2.76395 4 2 4C1.44772 4 1 3.55228 1 3ZM6.24662 7L7.13569 11.0008C7.29042 11.6971 7.39528 12.166 7.50404 12.5263C7.60908 12.8742 7.69899 13.0531 7.79172 13.18C8.00035 13.4655 8.28094 13.6906 8.6049 13.8323C8.74888 13.8953 8.94301 13.9443 9.30546 13.9713C9.68076 13.9994 10.1612 14 10.8745 14H16.1255C16.8388 14 17.3192 13.9994 17.6945 13.9713C18.057 13.9443 18.2511 13.8953 18.3951 13.8323C18.7191 13.6906 18.9997 13.4655 19.2083 13.18C19.301 13.0531 19.3909 12.8742 19.496 12.5263C19.6047 12.166 19.7096 11.6971 19.8643 11.0008L20.153 9.70159C20.3075 9.00651 20.408 8.54985 20.4536 8.19974C20.4982 7.858 20.4722 7.73312 20.4537 7.67868C20.3782 7.45613 20.2267 7.26728 20.0259 7.14528C19.9767 7.11544 19.8605 7.06302 19.5172 7.03235C19.1655 7.00094 18.6979 7 17.9859 7H6.24662Z'
                                        fill='white'
                                    />
                                    <path
                                        d='M11 19C11 20.1046 10.1046 21 9 21C7.89543 21 7 20.1046 7 19C7 17.8954 7.89543 17 9 17C10.1046 17 11 17.8954 11 19Z'
                                        fill='white'
                                    />
                                    <path
                                        d='M18 21C19.1046 21 20 20.1046 20 19C20 17.8954 19.1046 17 18 17C16.8954 17 16 17.8954 16 19C16 20.1046 16.8954 21 18 21Z'
                                        fill='white'
                                    />
                                </svg>
                                {itemInCart?.Count}
                            </span>
                        )}
                    </Box>
                    <Box className='grid'>
                        <span className='text-grey-800 text-sm font-semibold text__ellipsis_2 min-h-40px'>
                            {data.Name}
                        </span>
                        <span className='pb-2 flex items-start'>
                            <div className='flex flex-col grow'>
                                <span
                                    className={`${
                                        isSale
                                            ? 'text-grey-400 text-xs'
                                            : 'text-primary font-semibold text-sm'
                                    }`}
                                    style={isSale ? { textDecoration: 'line-through' } : {}}
                                >
                                    {toThousandSeparator(data.Price)}₫
                                </span>
                                {isSale ? (
                                    <span className='text-danger font-semibold text-sm'>
                                        {toThousandSeparator(data.PromotionPrice)}₫
                                    </span>
                                ) : null}
                            </div>
                            {isSale ? (
                                <span className='rounded-xl font-bold px-[8px] py-[2px] flex items-center bg-danger'>
                                    <span className='text-xs text-white'>
                                        {Math.round(
                                            ((data.Price - data.PromotionPrice) / data.Price) *
                                                100 *
                                                -1,
                                        )}
                                        %
                                    </span>
                                </span>
                            ) : (
                                <></>
                            )}
                        </span>
                    </Box>
                </div>
            )}
        </ProductPicker>
    );
};
export default ProductItem;
