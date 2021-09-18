import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  ADMIN_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  SET_LOADING_AUTH,
  LOGOUT,
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alertsAction";

// Load Admin
export const loadAdmin = () => async (dispatch) => {
  dispatch({ type: SET_LOADING_AUTH });

  if (localStorage.adminToken) {
    setAuthToken(localStorage.adminToken);
  }
  try {
    const res = await axios.get("/v1/admins/auth");
    dispatch({
      type: ADMIN_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Register Admin
export const register =
  ({ username, phone_number, password }) =>
  async (dispatch) => {
    dispatch({ type: SET_LOADING_AUTH });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ username, phone_number, password });

    try {
      const res = await axios.post("/v1/admins", body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      dispatch(loadAdmin());
    } catch (err) {
      console.error("Auth error:", err);
      dispatch({ type: REGISTER_FAIL });
    }
  };

// Login Admin
export const login = (obj) => async (dispatch) => {
  dispatch({ type: SET_LOADING_AUTH });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(obj);

  try {
    const res = await axios.post("/v1/admins/login", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadAdmin());
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch(setAlert(errors, "error"));
    dispatch({ type: LOGIN_FAIL });
  }
};

// Login Admin
export const updateAdmin = (obj) => async (dispatch) => {
  dispatch({
    type: SET_LOADING_AUTH,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(obj);

  try {
    const res = await axios.patch("/v1/admins", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadAdmin());
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch(setAlert(errors, "error"));
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
