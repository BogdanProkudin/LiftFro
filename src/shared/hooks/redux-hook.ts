import { AppDispatch, RootState } from "@/config/store/store";

import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppDispatch, useAppSelector };

export default {
  useAppDispatch,
  useAppSelector,
};
