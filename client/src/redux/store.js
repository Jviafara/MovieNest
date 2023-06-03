import { configureStore } from '@reduxjs/toolkit';
import appStateSlice from './features/appStateSlice';
import authModalSlice from './features/authModalSlice';
import globalLoadinSlice from './features/globalLoadinSlice';
import themeModeSlice from './features/themeModeSlice';
import userSlice from './features/userSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        themeMode: themeModeSlice,
        appState: appStateSlice,
        authModal: authModalSlice,
        globalLoading: globalLoadinSlice,
    },
});

export default store;
