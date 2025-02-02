import { createSlice, current } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loggeduserid: null,
    loggedusername: null,
    selectedusername: null,
    selecteduserid: null,
    alluser: [],
    filtereduser: [],
    currentconversation: {},
  },
  reducers: {
    setloggeduserid: (state, action) => {
      state.loggeduserid = action.payload;
    },
    setloggedusername: (state, action) => {
      state.loggedusername = action.payload;
    },
    setallusers: (state, action) => {
      state.alluser = action.payload;
    },
    setFilteredUsers: (state, action) => {
      state.filtereduser = action.payload;
    },
    setselectedusername: (state, action) => {
      state.selectedusername = action.payload;
    },
    setselecteduserid: (state, action) => {
      state.selecteduserid = action.payload;
    },
    setcurrentconversation: (state, action) => {
      state.currentconversation = action.payload;
    },
    pushingmessage: (state, action) => {
      state.currentconversation.messages.push(action.payload);
    },
    resetstate: (state) => {
      (state.loggeduserid = null),
        (state.loggedusername = null),
        (state.selectedusername = null),
        (state.selecteduserid = null),
        (state.alluser = []),
        (state.filtereduser = []),
        (state.currentconversation = {});
    },
    resetback: (state) => {
      state.selecteduserid = null;
      state.currentconversation = {};
    },
  },
});

export const {
  resetback,
  pushingmessage,
  setloggeduserid,
  setloggedusername,
  setallusers,
  setFilteredUsers,
  setselectedusername,
  setcurrentconversation,
  setselecteduserid,
  resetstate,
} = userSlice.actions;
export default userSlice.reducer;
