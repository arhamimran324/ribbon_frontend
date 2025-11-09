// store/buildBoxSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // From SelectYourBox component
  selectedBoxIndex: 0,
  personalizationOption: "no",
  personalizationMessage: "",
  selectedBoxData: null,

  // For ChooseItems component
  boxSize: "Regular",
  reason: "",
  color: "",
  sort: "",
  searchQuery: "",
  selectedItems: [],
  orderSummary: {
    items: [],
    total: 0,
  },
  selectedCard: null,
  cardMessage: "",
  cardTo: "",
  cardFrom: "",
  leaveBlank: false,
  noNote: false,
  shippingAddress: "",
};

const buildBoxSlice = createSlice({
  name: "buildBox",
  initialState,
  reducers: {
    // SelectYourBox actions
    setSelectedBoxIndex: (state, action) => {
      state.selectedBoxIndex = action.payload;
    },
    setPersonalizationOption: (state, action) => {
      state.personalizationOption = action.payload;
    },
    setPersonalizationMessage: (state, action) => {
      state.personalizationMessage = action.payload;
    },
    setSelectedBoxData: (state, action) => {
      state.selectedBoxData = action.payload;
    },

    // ChooseItems actions
    setBoxSize: (state, action) => {
      state.boxSize = action.payload;
    },
    setReason: (state, action) => {
      state.reason = action.payload;
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    addSelectedItem: (state, action) => {
      // Ensure selectedItems is always an array
      if (!state.selectedItems) {
        state.selectedItems = [];
      }

      const existingItem = state.selectedItems.find(
        (item) => item.id === action.payload.id
      );
      if (!existingItem) {
        console.log("Adding item:", action.payload);
        state.selectedItems.push(action.payload);
      }
    },
    removeSelectedItem: (state, action) => {
      // Ensure selectedItems is always an array
      if (!state.selectedItems) {
        state.selectedItems = [];
      } else {
        state.selectedItems = state.selectedItems.filter(
          (item) => item.id !== action.payload
        );
      }
    },
    setSelectedItems: (state, action) => {
      state.selectedItems = action.payload || [];
    },
    updateOrderSummary: (state, action) => {
      state.orderSummary = action.payload;
    },

    // Reset actions
    resetBuildBox: (state) => {
      return initialState;
    },

    // Safety action to reset selectedItems if it becomes corrupted
    resetSelectedItems: (state) => {
      state.selectedItems = [];
    },
    setSelectedCard: (state, action) => {
      state.selectedCard = action.payload;
    },
    setCardMessage: (state, action) => {
      state.cardMessage = action.payload;
    },
    setCardTo: (state, action) => {
      state.cardTo = action.payload;
    },
    setCardFrom: (state, action) => {
      state.cardFrom = action.payload;
    },
    setLeaveBlank: (state, action) => {
      state.leaveBlank = action.payload;
    },
    setNoNote: (state, action) => {
      state.noNote = action.payload;
    },
    resetCardDetails: (state) => {
      state.selectedCard = null;
      state.cardMessage = "";
      state.cardTo = "";
      state.cardFrom = "";
      state.leaveBlank = false;
      state.noNote = false;
    },
  },
});

export const {
  setSelectedBoxIndex,
  setPersonalizationOption,
  setPersonalizationMessage,
  setSelectedBoxData,
  setBoxSize,
  setReason,
  setColor,
  setSort,
  setSearchQuery,
  addSelectedItem,
  removeSelectedItem,
  setSelectedItems,
  updateOrderSummary,
  resetBuildBox,
  resetSelectedItems,
  setSelectedCard,
  setCardMessage,
  setCardTo,
  setCardFrom,
  setLeaveBlank,
  setNoNote,
  setShippingAddress,
  resetCardDetails,
} = buildBoxSlice.actions;

export default buildBoxSlice.reducer;
