import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  staffs: "",
};

export const deteleStaff = createAsyncThunk("staff/deleteStaff", async (id) => {
  try {
    const res = await axios.post("/api/staffs", { id });
    console.log(res);
    return res.data;
  } catch (e) {
    console.log(e, "Error when delete staff");
  }
});

const searchSlice = createSlice({
  name: "staffs",
  initialState,
  reducers: {},
  extraReducers: {
    [deleteStaff.fulfilled]: (state, action) => {
      state.staffs = action.payload;
    },
  },
});

export const { handleSearch } = searchSlice.actions;
export default searchSlice.reducer;
