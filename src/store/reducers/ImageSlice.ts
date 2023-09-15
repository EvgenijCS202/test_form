import { createSlice } from "@reduxjs/toolkit";
import { IPost } from "../../models/IPosts";

const initialState: IPost[] = [];

export const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {},
  extraReducers: {},
});
