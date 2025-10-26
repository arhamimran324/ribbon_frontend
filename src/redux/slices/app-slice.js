import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    expandedIndex: null,
  isDrawerOpen: false,
  isLogoutModal: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsDrawerOpen: (state, action) => {
      state.isDrawerOpen = action.payload;
    },
    resetIsDrawerOpen: (state) => {
      state.isDrawerOpen = false;
    },
    setExpandedIndex: (state, action) => {
        state.expandedIndex = action.payload;
      },
    setIsLogoutModal: (state, action) => {
      state.isLogoutModal = action.payload;
    },
    resetIsLogoutModal: (state) => {
      state.isLogoutModal = false;
    },
    resetLogoutState: (state) => {
        state.isLogoutModal = false;
      },
  },
});

export const {
  setIsDrawerOpen,
  resetIsDrawerOpen,
  setIsLogoutModal,
  setExpandedIndex,
  resetIsLogoutModal,
  resetLogoutState,
} = appSlice.actions;

export default appSlice.reducer;
