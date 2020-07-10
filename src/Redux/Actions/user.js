import Axios from "axios";
import { API_URL } from "../../Constants/API";
import Cookies from "universal-cookie";
import userTypes from "../Types/user";
import swal from "sweetalert";

const { ON_LOGIN_SUCCESS, ON_LOGOUT_SUCCESS, FILL_CART, COOKIE_CHECK } = userTypes;

const cookieObj = new Cookies();

export const loginHandler = (userData) => {
  return(dispatch) => {
    const { username, password} = userData

    Axios.get(`${API_URL}/members`, {
      params: {
        username, password,
      },
    })
    .then((res) => {
      console.log(res.data)
        dispatch({
          type: ON_LOGIN_SUCCESS,
          payload: res.data,
        })
    })
    .catch((err) => {
      console.log(err)
      swal("Failed", err.response.data.message , "error")
    })
  }
}

export const cookieChecker = () => {
  return {
    type: COOKIE_CHECK
  };
};

export const userKeepLogin = (userData) => {
  return (dispatch) => {
    Axios.post(`${API_URL}/members/login/${userData.id}`)
    .then((res) => {
      dispatch({
        type: ON_LOGIN_SUCCESS,
        payload: res.data,
      })
    })
    .catch((err) => {
      console.log(err)
    })
  };
};

export const logoutHandler =()=>{
  cookieObj.remove("authData",{path:"/"})
  return{
    type: ON_LOGOUT_SUCCESS
  }
}



// export const fillCart = (userId) => {
//   return (dispatch) => {
//     Axios.get(`${API_URL}/carts`, {
//       params: {
//         userId,
//       },
//     })
//       .then((res) => {
//         dispatch({
//           type: "FILL_CART",
//           payload: res.data.length,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// };
