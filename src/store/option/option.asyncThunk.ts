import api from "@/shared/api/axios";
import { AxiosResponse } from "axios";

import { createAppAsyncThunk } from "@/store/redux-utils";

import type {
  ProductCategoryResDTO,
  GenderResDTO,
} from "@/shared/DTOs/option.dtos";

export const fetchOptionProductCategoriesAsync = createAppAsyncThunk<
  AxiosResponse<ProductCategoryResDTO>,
  void
>("option/fetchOptionMainCategories", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get(`/option/product-category`);

    return res;
  } catch (e: any) {
    const error = e;

    if (!error.response) {
      throw e;
    }

    return rejectWithValue(error);
  }
});

export const fetchOptionGendersAsync = createAppAsyncThunk<
  AxiosResponse<GenderResDTO>,
  void
>("option/fetchOptionGender", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get(`/option/gender`);

    return res;
  } catch (e: any) {
    const error = e;

    if (!error.response) {
      throw e;
    }

    return rejectWithValue(error);
  }
});
