import React, { PropsWithChildren, ReactNode } from 'react';
import { FC } from 'react';
import { Box, Text } from 'zmp-ui';
import { BoxProps } from 'zmp-ui/box';

interface IToolbar {
    toolbar?: () => ReactNode;
}
export interface SectionProps extends BoxProps {
    title: string;
    padding?: 'all' | 'none' | 'title-only';
}

export const Section: FC<PropsWithChildren<SectionProps & IToolbar>> = ({
    children,
    title,
    padding = 'all',
    toolbar,
    action,
    ...props
}) => {
    return (
        <Box
            className={`bg-background ${padding === 'all' ? 'p-4 space-y-4' : ''} ${
                padding === 'title-only' ? 'py-4 space-y-4' : ''
            }`}
            {...props}
        >
            <div className='flex flex-row justify-between'>
                <Text.Title className={`${padding === 'title-only' ? 'px-4' : ''}`}>
                    {title}
                </Text.Title>
                {toolbar && <>{toolbar()}</>}
            </div>
            {children}
        </Box>
    );
};
