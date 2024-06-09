import { CDN_SHOW_IMAGE } from 'constants/common';
import AuthContext from 'contexts/Auth/AuthContext';
import React, { FC } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { userState } from 'state';
import { Box, Header, Text } from 'zmp-ui';

export const Welcome: FC = () => {
    const user = useRecoilValueLoadable(userState);

    const { selectedShop } = React.useContext(AuthContext);

    return (
        <Header
            className='app-header no-border pl-4 flex-none pb-[6px]'
            showBackIcon={false}
            title={
                (
                    <Box flex alignItems='center' className='space-x-2'>
                        {selectedShop?.Avatar && selectedShop?.Avatar.length > 0 ? (
                            <img
                                className='w-8 h-8 rounded-lg border-inset'
                                src={`${CDN_SHOW_IMAGE}${selectedShop?.Avatar}`}
                            />
                        ) : (
                            <div className='w-8 h-8 rounded-lg border-inset bg-warning-dark text-white flex items-center justify-center'>
                                D
                            </div>
                        )}
                        <Box>
                            <Text.Title size='small'>
                                {selectedShop?.Name || '{App Name}'}
                            </Text.Title>
                            {user.state === 'hasValue' ? (
                                <Text size='xxSmall' className='text-grey'>
                                    Welcome, {user.contents.name}!
                                </Text>
                            ) : (
                                <Text>...</Text>
                            )}
                        </Box>
                    </Box>
                ) as unknown as string
            }
        />
    );
};
