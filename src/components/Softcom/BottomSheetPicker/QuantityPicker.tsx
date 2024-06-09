import React, { FC } from 'react';
import { Box, Button } from 'zmp-ui';

const QuantityPicker: FC<{
    value: number;
    onChange: (quantity: number) => void;
}> = ({ value, onChange }) => {
    return (
        <Box flex className='border border-grey-400 rounded-xl p-2'>
            <Button
                size='small'
                disabled={value <= 1}
                onClick={() => onChange(value - 1)}
                variant='secondary'
                type='neutral'
                icon={
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke-width='1.5'
                        stroke='currentColor'
                        className='w-4 h-4'
                    >
                        <path stroke-linecap='round' stroke-linejoin='round' d='M19.5 12h-15' />
                    </svg>
                }
            />
            <Box flex justifyContent='center' alignItems='center' className='flex-1'>
                <span className=''>Số lượng: {value}</span>
            </Box>
            <Button
                size='small'
                onClick={() => onChange(value + 1)}
                variant='secondary'
                type='neutral'
                icon={
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke-width='1.5'
                        stroke='currentColor'
                        className='w-4 h-4'
                    >
                        <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            d='M12 4.5v15m7.5-7.5h-15'
                        />
                    </svg>
                }
            />
        </Box>
    );
};
export default QuantityPicker;
