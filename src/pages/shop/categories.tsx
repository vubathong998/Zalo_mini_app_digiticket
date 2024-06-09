import { CollectionListItemSkeleton } from 'components/Skeletons';
import CollectionItem from 'components/Softcom/Collection/CollectionItem';
import { CATEGORIES } from 'constants/categories';
import intersectionBy from 'lodash/intersectionBy';
import take from 'lodash/take';
import { CategoryEnum } from 'models/Category/CategoryEnum';
import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import { generatePath } from 'react-router-dom';
import { paths } from 'routes/routeConfig';
import { useGetCategoriesQuery } from 'services/category';
import { Box } from 'zmp-ui';

export const Categories: FC = () => {
    const navigate = useNavigate();

    const { data, isFetching, isSuccess, isError, refetch } = useGetCategoriesQuery({}, {});

    const gotoCategory = (categoryId: string) => {
        navigate(
            generatePath(paths.Category, {
                categoryId: categoryId,
            }),
        );
    };

    return (
        <Box className='bg-white grid grid-cols-4 gap-2'>
            {isFetching ? (
                <>
                    {take(CATEGORIES, 7).map((item) => {
                        return <CollectionListItemSkeleton />;
                    })}
                </>
            ) : (
                <>
                    {isSuccess && data ? (
                        <>
                            {take(intersectionBy(CATEGORIES, data, 'Id'), 7).map((category, i) => (
                                <div key={i}>
                                    <CollectionItem
                                        onClick={() => gotoCategory(category.value)}
                                        title={category.label}
                                        image={category.icon}
                                    />
                                </div>
                            ))}
                        </>
                    ) : (
                        <></>
                    )}
                </>
            )}

            <CollectionItem
                onClick={() => gotoCategory(CategoryEnum.EMPTY)}
                title={'Tất cả'}
                image={
                    'https://images.unsplash.com/photo-1678778012416-36b2443c332e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNhdGVnb3J5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
                }
            />
        </Box>
    );
};
