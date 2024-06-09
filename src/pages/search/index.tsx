import React, { FC } from 'react';
import { Header, Icon, Page } from 'zmp-ui';
import { Inquiry } from './Inquiry';
import { SearchResult } from './result'; 

const SearchPage: FC = () => {
    return (
        <Page className='flex flex-col' hideScrollbar>
            <Header
                title='Tìm kiếm'
                showBackIcon
                backIcon={<Icon icon='zi-chevron-left-header' className='text-5xl text-dark' />}
            />
            <Inquiry />
            <SearchResult />
        </Page>
    );
};

export default SearchPage;
