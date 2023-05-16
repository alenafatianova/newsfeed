import { RootState } from '@components/store';
import { CategoriesType } from '../categories/types';

export const getCategories = (state: RootState): CategoriesType[] => state.categoriesList;
