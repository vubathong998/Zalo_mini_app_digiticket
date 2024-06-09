import ShopListItem from 'components/Shop/ShopListItem';
import { ShopListItemSkeleton } from 'components/Skeletons';
import ListRenderer from 'components/Softcom/ListRenderer';
import AuthContext from 'contexts/Auth/AuthContext';
import { AuthDispatchEnum } from 'contexts/Auth/AuthContext.type';
import debounce from 'lodash/debounce';
import { ListAccessibleAgentRequest } from 'models/Agent/AgentRequest';
import { AgentDetailModel } from 'models/Agent/AgentResponse';
import React, { FC, useCallback, useState } from 'react';
import { generatePath } from 'react-router-dom';
import { paths } from 'routes/routeConfig';
import { useLazyGetListAgentQuery, useLazySelectSalePointOrAgentQuery } from 'services/auth';
import { useLazyGetShopDetailQuery } from 'services/shop';
import { removeDataStorageByKey } from 'utils/nativeStorage';
import { scanQRCode } from 'zmp-sdk';
import { Box, Input, Page, useNavigate } from 'zmp-ui';
import appConfig from '../../../app-config.json';

interface IProps {}

const ListShop: FC<IProps> = (props) => {
    const navigate = useNavigate();
    const { dispatch } = React.useContext(AuthContext);
    const [getListAgent, getListAgentState] = useLazyGetListAgentQuery();
    const [getShopDetail, getShopDetailState] = useLazyGetShopDetailQuery();
    const [selectAgent, selectAgentState] = useLazySelectSalePointOrAgentQuery();
    const [shops, setShops] = useState<Array<AgentDetailModel>>([]);
    const [request, setRequest] = useState<ListAccessibleAgentRequest>({
        Filter: [],
        Keyword: '',
        CreateBy: 0,
        PageSize: 12,
        PageIndex: 1,
        FieldName: 'CreatedDate',
        Orderby: 'desc',
    });

    const openScan = async () => {
        try {
            const { content } = await scanQRCode({});
            if (content) {
                getShopDetail({
                    Id: content,
                })
                    .unwrap()
                    .then((res: AgentDetailModel) => {
                        onSelectWorkgroup(res);
                    })
                    .catch((e) => {
                        onSelectWorkgroup({
                            Id: content,
                            Avatar: '',
                            Code: '',
                            Name: 'Digiticket App Test',
                            WorkgroupId: -1,
                        });
                    });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onSelectWorkgroup = async (data: AgentDetailModel) => {
        selectAgent({ Id: data.Id })
            .unwrap()
            .then(async (r) => {
                await dispatch({
                    type: AuthDispatchEnum.updateSelectedShop,
                    payload: data,
                });
                // setDataStorageByKey({
                //     key: appConfig.nativeKey.scToken,
                //     data: r.AccessToken,
                // }).then(() => {
                navigate(generatePath(paths.Shop));
                // });
            })
            .catch((e) => {});
    };
    const clearAllToken = async () => {
        await removeDataStorageByKey(appConfig.nativeKey.scToken);
        await removeDataStorageByKey(appConfig.nativeKey.zToken);
        await removeDataStorageByKey(appConfig.nativeKey.selectedShop);
    };

    const handleChange = useCallback(
        debounce((keyword: string) => {
            setRequest({
                ...request,
                PageIndex: 1,
                Keyword: keyword,
            });
        }, 500),
        [],
    );

    // useEffect(() => {
    //     getDataStorageByKey(appConfig.nativeKey.scToken)
    //         .then(async (r: Record<string, string>) => {
    //             if (appConfig.nativeKey.scToken in r && r[appConfig.nativeKey.scToken]) {
    //                 getListAgent({
    //                     ...request,
    //                 })
    //                     .unwrap()
    //                     .then(async (r) => {
    //                         await dispatch(updateListAgent(r));
    //                         setShops(r.Result);
    //                     })
    //                     .catch(async (e) => {
    //                         await clearAllToken();
    //                         navigate(paths.Greeting);
    //                     });
    //             } else {
    //                 await clearAllToken();
    //                 navigate(paths.Greeting);
    //             }
    //         })
    //         .catch(async (e) => {});
    // }, []);

    // useEffect(() => {
    //     getListAgent({
    //         ...request,
    //     })
    //         .unwrap()
    //         .then(async (r) => {
    //             await dispatch(updateListAgent(r));
    //             setShops([...shops, ...r.Result]);
    //         })
    //         .catch(async (e) => {
    //             await clearAllToken();
    //             navigate(paths.Greeting);
    //         });
    // }, [request.Keyword]);

    return (
        <Page className='flex flex-col bg-background h-full relative' hideScrollbar>
            {/* <Header
                showBackIcon
                title='Danh sách gian hàng'
                backIcon={<Icon icon='zi-chevron-left-header' className='text-5xl text-dark' />}
            /> */}
            <Box className='flex gap-2 p-4 sticky top-0 bg-white z-10'>
                <div className='w-5/6'>
                    <Input.Search
                        autoFocus={false}
                        defaultValue={request.Keyword}
                        onChange={(e) => handleChange(e.target.value)}
                        placeholder='Tìm kiếm gian hàng...'
                        clearable
                        allowClear
                    />
                </div>
                <span
                    className='rounded-xl bg-white shadow-xl border border-grey-400 p-1 items-center justify-center h-full'
                    onClick={openScan}
                >
                    {selectAgentState.isLoading ||
                    getShopDetailState.isLoading ||
                    getShopDetailState.isFetching ? (
                        <svg
                            className='animate-spin w-auto h-full text-primary'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                        >
                            <circle
                                className='opacity-25'
                                cx='12'
                                cy='12'
                                r='10'
                                stroke='currentColor'
                                stroke-width='4'
                            ></circle>
                            <path
                                className='opacity-75'
                                fill='currentColor'
                                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                            ></path>
                        </svg>
                    ) : (
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-auto h-full text-primary'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z'
                            />
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z'
                            />
                        </svg>
                    )}
                </span>
            </Box>
            <div className='flex-1'>
                {getListAgentState.isFetching ? (
                    <Box className='p-2'>
                        <ListRenderer
                            title=''
                            renderItem={(item) => {
                                return <ShopListItemSkeleton />;
                            }}
                            items={[1, 2, 3, 4, 5, 6]}
                        />
                    </Box>
                ) : (
                    <Box className=''>
                        {getListAgentState?.data &&
                        getListAgentState.isSuccess &&
                        shops.length > 0 ? (
                            <ListRenderer
                                title=''
                                limit={request.PageSize}
                                onViewMore={
                                    getListAgentState.data.Total / request.PageSize >
                                    request.PageIndex
                                        ? () => {
                                              setRequest({
                                                  ...request,
                                                  PageIndex: request.PageIndex + 1,
                                              });
                                          }
                                        : undefined
                                }
                                onLoadingMoreData={getListAgentState?.isFetching}
                                renderItem={(item) => {
                                    return (
                                        <ShopListItem
                                            data={item}
                                            onClick={
                                                selectAgentState.isLoading
                                                    ? () => {}
                                                    : onSelectWorkgroup
                                            }
                                            isLoading={
                                                selectAgentState.isLoading &&
                                                selectAgentState.originalArgs?.Id === item.Id
                                            }
                                            isDisabled={selectAgentState.isLoading}
                                        />
                                    );
                                }}
                                items={shops}
                            />
                        ) : (
                            <div className='bg-white rounded-xl py-8 px-4 text-center text-grey-400 text-base flex flex-col items-center justify-center'>
                                Chưa có gian hàng nào, vui lòng sử dụng tính năng
                                <span className='text-primary mx-1' onClick={openScan}>
                                    quét mã QR gian hàng
                                </span>
                                bên dưới
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
                    </Box>
                )}
            </div>
        </Page>
    );
};
export default ListShop;
