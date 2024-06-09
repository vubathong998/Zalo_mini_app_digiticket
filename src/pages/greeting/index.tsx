import AuthContext from 'contexts/Auth/AuthContext';
import get from 'lodash/get';
import queryString from 'query-string';
import React, { FC } from 'react';
import { paths } from 'routes/routeConfig';
import { openWebview, scanQRCode } from 'zmp-sdk';
import { Button, Checkbox, Page, Text, useNavigate } from 'zmp-ui';
import appConfig from '../../../app-config.json';
//@ts-ignore
interface IProps {}

const GreetingPage: FC<IProps> = (props) => {
    const navigate = useNavigate();
    const queryParsed = queryString.parse(location.search);
    const showPolicies = get(queryParsed, 'viewmode', '') === 'policies';
    const { loginViaQR, isLoggingIn, login, affiliateCode } = React.useContext(AuthContext);
    const [isLoggingInWithQR, setIsLoggingInWithQR] = React.useState<boolean>(false);
    const [isChecked, setIsChecked] = React.useState<boolean>(false);

    const openScan = async () => {
        setIsLoggingInWithQR(true);
        // loginViaQR(
        //     'https://alpha.logi247.com/?aid=085a2708-d9e8-4085-95b6-161cbbaeedd3&affiliate_code=000744758531&z_miniapp=https://zalo.me/s/3464794594148177551&name=Logi247',
        //     () => navigate(paths.Shop),
        // );
        try {
            const { content } = await scanQRCode({});
            if (content) {
                loginViaQR(content, () => navigate(paths.Shop));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onContinue = () => {
        loginViaQR(`${location.host}${location.pathname}${location.search}`, () =>
            navigate(paths.Shop),
        );
    };

    const handleLogin = () => {
        setIsLoggingInWithQR(false);
        login(() => navigate(paths.Shop), appConfig.env.VITE_SHOP_ID);
    };

    return (
        <Page hideScrollbar className='h-full flex flex-col'>
            <div
                className='h-full w-auto'
                style={{
                    boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px`,
                    background: `url('https://cdn.digiticket.vn/Content/ShowFile/Images/09-11-2023/pngtreefluid-texture-vector-colorful-background-1023492_1699540612.jpg')`,
                    backgroundSize: 'cover',
                    filter: 'blur(8px)',
                    WebkitFilter: 'blur(8px)',
                }}
            ></div>
            <div
                className='w-full'
                style={{
                    position: 'absolute',
                }}
            >
                <div className='flex justify-center items-center h-[40vh]'>
                    <img
                        src='https://digiticket.vn/images/common/Digiticket-logo.svg'
                        width={'70%'}
                    />
                </div>
                <div
                    className='flex flex-col gap-14 px-6 shadow-2xl rounded-t-xl h-[60vh] bg-[#ffffffbd] pt-8 pb-8 justify-between  flex-1'
                    style={{
                        boxShadow: `#2b2b2b2f 0px 0px 48px`,
                        borderTopLeftRadius: 48,
                        borderTopRightRadius: 48,
                    }}
                >
                    <div className='flex flex-start flex-col gap-4'>
                        <Text className='text-3xl italic font-semibold'>Xin chào,</Text>
                        <Text className='text-sm text-justify'>
                            Digiticket mang tới cách thức mua vé trực tuyến một cách nhanh chóng và
                            dễ dàng nhất.
                            <br />
                            <span className='italic mt-2'>
                                Bạn cần cấp quyền truy cập số điện thoại để mua hàng trên
                                Digiticket.
                            </span>
                        </Text>
                    </div>
                    <div className='flex flex-col gap-4'>
                        {showPolicies && (
                            <>
                                {affiliateCode && affiliateCode !== '' ? (
                                    <Text className='text-sm'>
                                        Mã người giới thiệu:
                                        <br />
                                        <span className='text-secondary text-sm uppercase'>
                                            {affiliateCode}
                                        </span>
                                    </Text>
                                ) : (
                                    <></>
                                )}
                            </>
                        )}
                        {showPolicies ? (
                            <>
                                <Button
                                    size='medium'
                                    loading={isLoggingIn && !isLoggingInWithQR}
                                    disabled={!isChecked || (isLoggingIn && isLoggingInWithQR)}
                                    className='text-white font-semibold bg-primary hover:bg-primary-dark'
                                    onClick={onContinue}
                                >
                                    Tiếp tục mua hàng
                                </Button>
                            </>
                        ) : (
                            <div className='flex gap-4'>
                                <Button
                                    size='medium'
                                    fullWidth
                                    loading={isLoggingIn && !isLoggingInWithQR}
                                    disabled={!isChecked || (isLoggingIn && isLoggingInWithQR)}
                                    className='text-white font-semibold bg-primary hover:bg-primary-dark'
                                    onClick={handleLogin}
                                >
                                    Mua hàng ngay
                                </Button>

                                {/* <div className='flex flex-row w-full items-center justify-center'>
                                <div className='w-1/2 flex flex-row items-center'>
                                    <div className='h-[1px] rounded-full bg-grey-400 flex-1'></div>
                                    <span className='text-center text-sm text-grey-500 px-4'>
                                        hoặc
                                    </span>
                                    <div className='h-[1px] rounded-full bg-grey-400 flex-1'></div>
                                </div>
                            </div> */}
                                <Button
                                    size='medium'
                                    fullWidth
                                    loading={isLoggingIn && isLoggingInWithQR}
                                    disabled={!isChecked || (isLoggingIn && !isLoggingInWithQR)}
                                    className='text-secondary font-semibold bg-secondary-lighter hover:bg-secondary-dark hover:text-white'
                                    onClick={openScan}
                                >
                                    Quét mã
                                </Button>
                            </div>
                        )}

                        <Checkbox
                            value=''
                            onChange={() => setIsChecked(!isChecked)}
                            checked={isChecked}
                        >
                            <span className='text-xs text-center'>
                                Tôi đồng ý với
                                <span
                                    onClick={(e) => {
                                        e.preventDefault();
                                        openWebview({
                                            url: 'https://digiticket.vn/vi/Home/Policy',
                                            success: (res) => {},
                                            fail: (error) => {},
                                        });
                                    }}
                                    className='text-primary font-bold mx-1'
                                >
                                    Điều khoản & Điều kiện
                                </span>
                                của <span className='text-secondary font-bold'>Digiticket</span>
                            </span>
                        </Checkbox>
                    </div>
                </div>
            </div>
        </Page>
    );
};
export default GreetingPage;
