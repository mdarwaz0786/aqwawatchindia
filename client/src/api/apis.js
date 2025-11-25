export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apis = {
  auth: {
    login: `${API_BASE_URL}/api/v1/user/auth/login`,
    signup: `${API_BASE_URL}/api/v1/user/auth/signup`,
    loggedIn: `${API_BASE_URL}/api/v1/user/auth/loggedin-user`,
  },
  home: {
    getAll: `${API_BASE_URL}/api/v1/user/home-page`,
  },
  product: {
    getAll: `${API_BASE_URL}/api/v1/user/product`,
    getSingle: `${API_BASE_URL}/api/v1/user/product`,
    related: `${API_BASE_URL}/api/v1/user/product/related`,
    relatedByCategory: `${API_BASE_URL}/api/v1/user/product/related-category`,
  },
  cart: {
    add: `${API_BASE_URL}/api/v1/user/cart/add`,
    get: `${API_BASE_URL}/api/v1/user/cart`,
    update: `${API_BASE_URL}/api/v1/user/cart/update`,
    remove: `${API_BASE_URL}/api/v1/user/cart/remove`,
    clear: `${API_BASE_URL}/api/v1/user/cart/clear`,
  },
};

export default apis;
