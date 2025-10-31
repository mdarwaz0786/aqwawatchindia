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
  size: {
    create: `${API_BASE_URL}/api/v1/admin/size`,
    update: `${API_BASE_URL}/api/v1/admin/size`,
    getAll: `${API_BASE_URL}/api/v1/admin/size`,
    getSingle: `${API_BASE_URL}/api/v1/admin/size`,
    deleteSingle: `${API_BASE_URL}/api/v1/admin/size`,
  },
  brand: {
    create: `${API_BASE_URL}/api/v1/admin/brand`,
    update: `${API_BASE_URL}/api/v1/admin/brand`,
    getAll: `${API_BASE_URL}/api/v1/admin/brand`,
    getSingle: `${API_BASE_URL}/api/v1/admin/brand`,
    deleteSingle: `${API_BASE_URL}/api/v1/admin/brand`,
  },
  product: {
    create: `${API_BASE_URL}/api/v1/admin/product`,
    update: `${API_BASE_URL}/api/v1/admin/product`,
    getAll: `${API_BASE_URL}/api/v1/admin/product`,
    getSingle: `${API_BASE_URL}/api/v1/admin/product`,
    deleteSingle: `${API_BASE_URL}/api/v1/admin/product`,
  },
};

export default apis;
