import { createSlice } from '@reduxjs/toolkit';
import { AgentDetailModel } from 'models/Agent/AgentResponse';
import { ConfigTagsModel } from 'models/ConfigTags/ConfigTagsModel';

const initialState: {
    selectedShop: AgentDetailModel | null;
    configs: Array<ConfigTagsModel>;
} = {
    selectedShop: null,
    configs: [],
};

const slice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        updateSelectedShop: (state, action) => {
            const currentState = JSON.parse(JSON.stringify(state));
            return {
                ...currentState,
                selectedShop: action.payload,
            };
        },
        updateShopConfigs: (state, action) => {
            const currentState = JSON.parse(JSON.stringify(state));
            return {
                ...currentState,
                configs: action.payload,
            };
        },
    },
    extraReducers: (builder) => {},
});

export default slice;
