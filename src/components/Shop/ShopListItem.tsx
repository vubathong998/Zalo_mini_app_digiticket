import { clsx } from 'clsx';
import { AgentDetailModel } from 'models/Agent/AgentResponse';
import React, { FC } from 'react';
import { Box, Text } from 'zmp-ui';

interface IProps {
    data: AgentDetailModel;
    isLoading?: boolean;
    isDisabled?: boolean;
    onClick: (data: AgentDetailModel) => void;
}

const ShopListItem: FC<IProps> = (props) => {
    const { data, onClick, isLoading, isDisabled } = props;
    return (
        <div
            onClick={() => {
                if (!isLoading && !isDisabled) onClick(data);
            }}
            className='flex space-x-2 p-2 items-start w-full hover:bg-primary-lighter rounded-xl'
        >
            {data?.Avatar && data?.Avatar?.length > 0 ? (
                <div
                    className='bgi-no-repeat bgi-position-center bgi-size-cover ratio-1x1 w-[50px] h-[50px] border border-grey-300 rounded-xl'
                    style={{
                        backgroundImage: `url(https://digipost.digiticket.vn/cdn/Content/ShowImage?url=${
                            data?.Avatar || ''
                        })`,
                        backgroundSize: 'cover',
                    }}
                />
            ) : (
                <div className=' w-[50px] h-[50px] border border-grey-300 font-bold text-primary bg-white flex justify-center items-center rounded-xl text-xl'>
                    {data.Name.charAt(0).toUpperCase()}
                </div>
            )}
            <Box className='flex-1 relative'>
                <Box className='flex'>
                    <div className='flex flex-col flex-1'>
                        <Text.Header className='items-center font-semibold text-base'>
                            {data.Name}
                        </Text.Header>
                        <Text className='items-center text-grey-400 text-sm'>{data.Code}</Text>
                    </div>
                    {isLoading ? (
                        <svg
                            className='animate-spin w-6 h-6 text-primary self-center'
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
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke-width='1.5'
                            stroke='currentColor'
                            className={clsx('w-6 h-6 text-primary self-center', {
                                '!text-grey-400': isDisabled,
                            })}
                        >
                            <path
                                stroke-linecap='round'
                                stroke-linejoin='round'
                                d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
                            />
                        </svg>
                    )}
                </Box>
            </Box>
        </div>
        // <div>
        //     <Box className='overlay overlay-show rounded-xl w-full' onClick={() => onClick(data)}>
        //         <div
        //             className='bgi-no-repeat bgi-position-center bgi-size-cover rounded-xl ratio-3x2'
        //             style={{
        //                 backgroundImage:
        //                     data?.Avatar && data?.Avatar?.length > 0
        //                         ? `url(https://digipost.digiticket.vn/cdn/Content/ShowImage?url=${
        //                               data?.Avatar || ''
        //                           })`
        //                         : 'url(https://images.unsplash.com/photo-1691424024432-c3dac1b74ab2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60)',
        //                 backgroundSize: 'cover',
        //             }}
        //         />
        //         <div
        //             className='rounded-xl overlay-layer'
        //             style={{
        //                 background: `linear-gradient(180deg,transparent 80%,rgba(0,0,0,0.25))`,
        //             }}
        //         />
        //     </Box>
        //     <Box className='grid'>
        //         <span className='text-grey-800 font-semibold text__ellipsis_2 min-h-40px'>
        //             {data.Name}
        //             {isLoading ? (
        //                 <svg
        //                     className='animate-spin ml-3 h-5 w-5 text-primary'
        //                     xmlns='http://www.w3.org/2000/svg'
        //                     fill='none'
        //                     viewBox='0 0 24 24'
        //                 >
        //                     <circle
        //                         className='opacity-25'
        //                         cx='12'
        //                         cy='12'
        //                         r='10'
        //                         stroke='currentColor'
        //                         stroke-width='4'
        //                     ></circle>
        //                     <path
        //                         className='opacity-75'
        //                         fill='currentColor'
        //                         d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        //                     ></path>
        //                 </svg>
        //             ) : (
        //                 <></>
        //             )}
        //         </span>
        //     </Box>
        // </div>
    );
};
export default ShopListItem;
