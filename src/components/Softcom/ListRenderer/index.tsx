import isFunction from 'lodash/isFunction';
import React, { Fragment, ReactNode, useMemo, useState } from 'react';
import { Box, Button, Icon } from 'zmp-ui';

interface IProps<T> {
    title?: string;
    classNameItemContainer?: string;
    limit?: number;
    items: T[];
    renderItem: (item: T) => ReactNode;
    // renderRight: (item: T) => ReactNode;
    renderKey?: (item: T) => string;
    onViewMore?: () => void;
    noDivider?: boolean;
    onLoadingMoreData?: boolean;
}

const ListRenderer = <T,>(props: IProps<T>) => {
    const {
        title,
        items,
        limit,
        renderItem,
        renderKey,
        onViewMore,
        noDivider,
        onLoadingMoreData,
        classNameItemContainer,
    } = props;

    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
    const collapsedItems = useMemo(() => {
        return items.slice(0, limit);
    }, [items]);

    return (
        <Box className='rounded-2xl'>
            {title && <span className='p-2 pb-0'>{title}</span>}
            <Box className=''>
                {(isCollapsed ? collapsedItems : items).map((item, i, list) => (
                    <Fragment key={renderKey ? renderKey(item) : i}>
                        <div
                            className={`flex space-x-4 p-2 last:pb-0 ${
                                classNameItemContainer || ''
                            }`}
                        >
                            {renderItem(item)}
                        </div>

                        {!noDivider && i < list.length - 1 && (
                            <div className='h-[0.5px] bg-grey-300 w-full'></div>
                        )}
                    </Fragment>
                ))}
            </Box>
            {(isCollapsed && collapsedItems.length < items.length) || isFunction(onViewMore) ? (
                <Box className='p-2'>
                    <Button
                        loading={onLoadingMoreData}
                        onClick={() => {
                            if (isFunction(onViewMore)) {
                                onViewMore();
                            }
                            setIsCollapsed(false);
                        }}
                        fullWidth
                        suffixIcon={<Icon icon='zi-chevron-down' />}
                        variant='tertiary'
                        type='neutral'
                    >
                        Xem thêm
                    </Button>
                </Box>
            ) : (
                <Box className='w-full h-4'></Box>
            )}
        </Box>
    );
};
export default ListRenderer;
