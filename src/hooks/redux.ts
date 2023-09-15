import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { formActions } from "../store/reducers/FormSlice";

const rootActions = {
  ...formActions,
};
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useActions = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
