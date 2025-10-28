export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apis = {
  auth: {
    login: `${API_BASE_URL}/api/v1/admin/auth/login`,
    loggedIn: `${API_BASE_URL}/api/v1/admin/auth/loggedin-user`,
  },
  category: {
    create: `${API_BASE_URL}/api/v1/admin/category`,
    update: `${API_BASE_URL}/api/v1/admin/category`,
    getAll: `${API_BASE_URL}/api/v1/admin/category`,
    getSingle: `${API_BASE_URL}/api/v1/admin/category`,
    deleteSingle: `${API_BASE_URL}/api/v1/admin/category`,
  },
  subCategory: {
    create: `${API_BASE_URL}/api/v1/admin/sub-category`,
    update: `${API_BASE_URL}/api/v1/admin/sub-category`,
    getAll: `${API_BASE_URL}/api/v1/admin/sub-category`,
    getSingle: `${API_BASE_URL}/api/v1/admin/sub-category`,
    deleteSingle: `${API_BASE_URL}/api/v1/admin/sub-category`,
  },
  subSubCategory: {
    create: `${API_BASE_URL}/api/v1/admin/sub-sub-category`,
    update: `${API_BASE_URL}/api/v1/admin/sub-sub-category`,
    getAll: `${API_BASE_URL}/api/v1/admin/sub-sub-category`,
    getSingle: `${API_BASE_URL}/api/v1/admin/sub-sub-category`,
    deleteSingle: `${API_BASE_URL}/api/v1/admin/sub-sub-category`,
  },
  color: {
    create: `${API_BASE_URL}/api/v1/admin/color`,
    update: `${API_BASE_URL}/api/v1/admin/color`,
    getAll: `${API_BASE_URL}/api/v1/admin/color`,
    getSingle: `${API_BASE_URL}/api/v1/admin/color`,
    deleteSingle: `${API_BASE_URL}/api/v1/admin/color`,
  },
};

export default apis;
