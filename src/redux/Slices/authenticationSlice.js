import { createSlice } from "@reduxjs/toolkit";

const authenticationSlice = createSlice({
  name: "authSlice",
  initialState: {
    userDetails: {},
    forgotOTPVerificationMethod: "",
    isLoading: false
  },
  reducers: {
    saveUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    saveForgotOTPVerificationMethod: (state, action) => {
      state.forgotOTPVerificationMethod = action.payload;
    },
    setIsloading: (state, action) => {
      state.isLoading = action.payload;
      console.log(state.isLoading, "datfat");
    },

  },
});
export const { saveUserDetails, saveForgotOTPVerificationMethod , setIsloading } =
  authenticationSlice.actions;

export default authenticationSlice.reducer;
