import userTypes from "../Types/user";

const { ON_LOGIN_SUCCESS, ON_LOGOUT_SUCCESS, ON_REGISTER_FAIL, COOKIE_CHECK, FILL_CART } = userTypes;

const init_state = {
  id: 0,
  username: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  province: "",
  city: "",
  district: "",
  zipCode: "",
  role: "",
  errMsg: "",
  cookieChecked: false,
  cartItems: 0,
};

export default (state = init_state, action) => {
  switch (action.type) {
    case ON_LOGIN_SUCCESS:
      const { username, name, email, phone, address, district, city, province, zipCode, role, id } = action.payload;
      return {
        ...state,
        username,name,email, phone, address, district, city, province, zipCode,
        role,id,cookieChecked: true,
      };
    case ON_LOGOUT_SUCCESS:
      return { ...init_state, cookieChecked: true };
    case COOKIE_CHECK:
      return { ...state, cookieChecked: true };
    case "FILL_CART":
      return { ...state, cartItems: action.payload };
    default:
      return { ...state };
  }
};
