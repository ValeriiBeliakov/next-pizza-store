import { ApiRoutes } from './constants';
import { axiosInstance } from "./axios"
import { Ingredient } from '@prisma/client';

export const getAll = async ():Promise<Ingredient[]>=>{
    return(await axiosInstance.get<Ingredient[]>(ApiRoutes.GET_INGREDIENTS)).data;
} 