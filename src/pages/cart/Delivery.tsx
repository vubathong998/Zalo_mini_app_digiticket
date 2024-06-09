import { ElasticTextarea } from 'components/ElasticTextarea';
import React, { FC, Suspense } from 'react';
import { Box, Icon, Text } from 'zmp-ui';
import { ReceiverPicker, RequestReceiverPickerPhone } from './ReceiverPicker';
import { RequestStorePickerLocation, StorePicker } from './StorePicker';
import { TimePicker } from './TimePicker';

export const Delivery: FC = () => {
    return (
        <Box className='space-y-3 px-4'>
            <Text.Header>Hình thức nhận hàng</Text.Header>
            <div className='flex flex-col'>
                <div className='flex justify-between'>
                    <Icon icon='zi-location' className='my-auto' />
                    <Suspense fallback={<RequestStorePickerLocation />}>
                        <StorePicker />
                    </Suspense>
                </div>
                <div className='flex justify-between'>
                    <Icon icon='zi-clock-1' className='my-auto' />
                    <Box flex className='space-x-2'>
                        <Box className='flex-1 space-y-[2px]'>
                            <TimePicker />
                            <Text size='xSmall' className='text-grey'>
                                Thời gian nhận hàng
                            </Text>
                        </Box>
                        <Icon icon='zi-chevron-right' />
                    </Box>
                </div>
                <div className='flex justify-between'>
                    <Icon icon='zi-user' className='my-auto' />
                    <Suspense fallback={<RequestReceiverPickerPhone />}>
                        <ReceiverPicker />
                    </Suspense>
                </div>
                <div className='flex justify-between'>
                    <Icon icon='zi-note' className='my-auto' />
                    <Box flex>
                        <ElasticTextarea
                            placeholder='Nhập ghi chú...'
                            className='border-none px-0 w-full focus:outline-none'
                            maxRows={4}
                        />
                    </Box>
                </div>
            </div>
        </Box>
    );
};
