import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IForm } from "../../models/IForm";

interface FormState {
  form: IForm;
  isLoading: boolean;
  error: string;
}

const initialState: FormState = {
  form: { email: "", questions: [{ value: "" }] },
  isLoading: false,
  error: "",
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateForm(state, actions: PayloadAction<IForm>) {
      state.form = actions.payload;
    },
  },
});

export const { actions: formActions, reducer: formReducer } = formSlice;
