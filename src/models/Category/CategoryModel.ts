import { CategoryEnum } from './CategoryEnum';

export type CategoryModel = {
    Id: CategoryEnum;
    Name: string;
    Code: string;
    Description: string;
    IconPath: string | null;
    Level: 1 | 2 | 3 | 4 | 5 | 6;
    IsView: boolean;
    ParentId: string;
    ProfileType: number;
    subCategories: Array<CategoryModel>;
};
