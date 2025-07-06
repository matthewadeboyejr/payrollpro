/* import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import enviroment from "../../configuration/siteConfig";
import { logoutUser } from "../../redux/slices/user.slice";
import { showAlert } from "../../static/alert";

const baseQuery = fetchBaseQuery({
  baseUrl: enviroment.API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    headers.set("Content-Type", "application/json");
    const token = getState().user.token;
    //console.log(`Token: ${token}`);
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    } else {
      const token = getState().register.token;
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const customBaseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // console.log(result, "res");
  if (result.error && result.error.status === 406) {
    api.dispatch(logoutUser());
    showAlert("", result.error.data.message, "error");

    return;
  } else if (result.error && result.error.status === 401) {
    api.dispatch(logoutUser());
    showAlert("", result.error.data.message, "error");
  }
  return result;
};

export default customBaseQuery;
 */
