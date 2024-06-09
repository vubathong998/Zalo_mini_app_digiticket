import { Sheet } from 'components/BottomSheet';
import React, { FC, ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import { Box, Text } from 'zmp-ui';

export interface CollectionInfoProps {
    description: string;
    name: string;
    children: (methods: { open: () => void; close: () => void }) => ReactNode;
}

const CollectionInfo: FC<CollectionInfoProps> = (props) => {
    const { children, name, description } = props;
    const [visible, setVisible] = useState(false);

    return (
        <>
            {children({
                open: () => setVisible(true),
                close: () => setVisible(false),
            })}
            {createPortal(
                <Sheet visible={visible} onClose={() => setVisible(false)} autoHeight>
                    <div className='mb-4'>
                        <Box className='px-4'>
                            <Text.Header>{name}</Text.Header>
                            <Box
                                className='mt-2 overflow-y-scroll'
                                style={{ height: 'calc(90vh - 300px)' }}
                            >
                                <div
                                    className='text-justify'
                                    dangerouslySetInnerHTML={{
                                        __html: description,
                                    }}
                                ></div>
                            </Box>
                        </Box>
                    </div>
                </Sheet>,
                document.body,
            )}
        </>
    );
};
export default CollectionInfo;
