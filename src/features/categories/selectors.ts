import { RootState } from '../../components/store'
import { CategoriesType } from './types'

export const getCategories = (state: RootState): CategoriesType[] => state.categoriesList
