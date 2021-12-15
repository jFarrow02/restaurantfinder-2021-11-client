import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';
import RestaurantInterface from '../models/RestaurantInterface';
import ErrorResponseInterface from '../models/ErrorResponseInterface';

interface RestaurantListState {
    fullList: RestaurantInterface[],
    paginatedList: RestaurantInterface[],
}

const initialState: RestaurantListState = {
    fullList: [],
    paginatedList: [],
};

export const restaurantListSlice = createSlice(
    {
        name: 'restaurantList',
        initialState,
        reducers: {
            setFullList: (state, action:PayloadAction<RestaurantInterface[]>) => {
                state.fullList = action.payload;
            },
            setPaginatedList: (state, action:PayloadAction<RestaurantInterface[]>) => { 
                state.paginatedList = action.payload;
            },
        }
    }
);

export const {
    setFullList,
    setPaginatedList,
} = restaurantListSlice.actions;

export const selectFullList = (state:RootState) => state.restaurantList.fullList;
export const selectPaginatedList = (state:RootState) => state.restaurantList.paginatedList;

export default restaurantListSlice.reducer;