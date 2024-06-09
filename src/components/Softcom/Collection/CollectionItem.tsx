import React, { FC } from 'react';

interface IProps {
    title: string;
    image: string | null;
    onClick: (data: any) => void;
}

const CollectionItem: FC<IProps> = (props) => {
    const { title, image, onClick } = props;
    return (
        <div onClick={onClick} className='flex items-center flex-col'>
            <img
                className='w-[50px] h-[50px] rounded-lg mb-1'
                src={image ? image : ''}
                style={{ objectFit: 'cover' }}
            />
            <span className='text-grey-700 text-sm text-center'>{title}</span>
        </div>
    );
};
export default CollectionItem;
