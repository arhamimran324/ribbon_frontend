// store/slices/checkoutSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Delivery Information
  deliveryInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "United States",
  },

  // Payment Information
  paymentInfo: {
    paymentMethod: "card", // "card" or "paypal"
    cardholderName: "",
    cardNumber: "",
    expiryDate: null,
    cvv: "",
    saveCard: false,
  },

  // Product Customization (from product details page)
  productCustomization: {
    boxType: "White Box", // "White Box" or "Clear Box"
    noteCard: "None", // "None", "General", "Work", "Personal"
    personalization: {
      to: "",
      from: "",
      message: "",
      personalized: false, // "Yes" or "No"
    },
    quantity: 1,
  },

  // Order Summary
  orderSummary: {
    subtotal: 0,
    tax: 0,
    discount: 0,
    shippingFee: 0,
    total: 0,
    couponCode: "",
  },

  // Checkout Steps
  currentStep: 1, // 1: Delivery, 2: Payment, 3: Review
  isLoading: false,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    // Delivery Information Actions
    setDeliveryInfo: (state, action) => {
      state.deliveryInfo = { ...state.deliveryInfo, ...action.payload };
    },
    clearDeliveryInfo: (state) => {
      state.deliveryInfo = initialState.deliveryInfo;
    },

    // Payment Information Actions
    setPaymentInfo: (state, action) => {
      state.paymentInfo = { ...state.paymentInfo, ...action.payload };
    },
    setPaymentMethod: (state, action) => {
      state.paymentInfo.paymentMethod = action.payload;
    },
    clearPaymentInfo: (state) => {
      state.paymentInfo = initialState.paymentInfo;
    },

    // Product Customization Actions
    setProductCustomization: (state, action) => {
      state.productCustomization = {
        ...state.productCustomization,
        ...action.payload,
      };
    },
    setBoxType: (state, action) => {
      state.productCustomization.boxType = action.payload;
    },
    setNoteCard: (state, action) => {
      state.productCustomization.noteCard = action.payload;
    },
    setPersonalization: (state, action) => {
      state.productCustomization.personalization = {
        ...state.productCustomization.personalization,
        ...action.payload,
      };
    },
    setQuantity: (state, action) => {
      state.productCustomization.quantity = action.payload;
    },
    clearProductCustomization: (state) => {
      state.productCustomization = initialState.productCustomization;
    },

    // Order Summary Actions
    setOrderSummary: (state, action) => {
      state.orderSummary = { ...state.orderSummary, ...action.payload };
    },
    setSubtotal: (state, action) => {
      state.orderSummary.subtotal = action.payload;
      state.orderSummary.tax = action.payload * 0.1; // 10% tax
      state.orderSummary.total =
        state.orderSummary.subtotal +
        state.orderSummary.tax -
        state.orderSummary.discount +
        state.orderSummary.shippingFee;
    },
    setDiscount: (state, action) => {
      state.orderSummary.discount = action.payload;
      state.orderSummary.total =
        state.orderSummary.subtotal +
        state.orderSummary.tax -
        action.payload +
        state.orderSummary.shippingFee;
    },
    setCouponCode: (state, action) => {
      state.orderSummary.couponCode = action.payload;
    },
    setShippingFee: (state, action) => {
      state.orderSummary.shippingFee = action.payload;
      state.orderSummary.total =
        state.orderSummary.subtotal +
        state.orderSummary.tax -
        state.orderSummary.discount +
        action.payload;
    },
    calculateTotals: (state) => {
      state.orderSummary.tax = state.orderSummary.subtotal * 0.1;
      state.orderSummary.total =
        state.orderSummary.subtotal +
        state.orderSummary.tax -
        state.orderSummary.discount +
        state.orderSummary.shippingFee;
    },

    // Checkout Flow Actions
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      state.currentStep -= 1;
    },

    // Loading State
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    // Reset entire checkout state
    resetCheckout: (state) => {
      return initialState;
    },

    // Initialize checkout with cart data
    initializeCheckout: (state, action) => {
      const { cartTotal, items } = action.payload;
      state.orderSummary.subtotal = cartTotal;
      state.orderSummary.tax = cartTotal * 0.1;
      state.orderSummary.total = cartTotal + cartTotal * 0.1;
    },
  },
});

export const {
  setDeliveryInfo,
  clearDeliveryInfo,
  setPaymentInfo,
  setPaymentMethod,
  clearPaymentInfo,
  setProductCustomization,
  setBoxType,
  setNoteCard,
  setPersonalization,
  setQuantity,
  clearProductCustomization,
  setOrderSummary,
  setSubtotal,
  setDiscount,
  setCouponCode,
  setShippingFee,
  calculateTotals,
  setCurrentStep,
  nextStep,
  prevStep,
  setLoading,
  resetCheckout,
  initializeCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
