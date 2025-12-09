export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apis = {
  auth: {
    login: `${API_BASE_URL}/api/v1/admin/auth/login`,
    loggedIn: `${API_BASE_URL}/api/v1/admin/auth/loggedin-user`,
    getAll: `${API_BASE_URL}/api/v1/admin/auth/all-user`,
    update: `${API_BASE_URL}/api/v1/admin/auth/update-profile`,
  },
  dashboard: {
    getAll: `${API_BASE_URL}/api/v1/admin/dashboard`,
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
  blogCategory: {
    create: `${API_BASE_URL}/api/v1/admin/blog-category`,
    update: `${API_BASE_URL}/api/v1/admin/blog-category`,
    getAll: `${API_BASE_URL}/api/v1/admin/blog-category`,
    getSingle: `${API_BASE_URL}/api/v1/admin/blog-category`,
    deleteSingle: `${API_BASE_URL}/api/v1/admin/blog-category`,
  },
  blog: {
    create: `${API_BASE_URL}/api/v1/admin/blog`,
    update: `${API_BASE_URL}/api/v1/admin/blog`,
    getAll: `${API_BASE_URL}/api/v1/admin/blog`,
    getSingle: `${API_BASE_URL}/api/v1/admin/blog`,
    deleteSingle: `${API_BASE_URL}/api/v1/admin/blog`,
  },
  carousel: {
    create: `${API_BASE_URL}/api/v1/admin/carousel`,
    update: `${API_BASE_URL}/api/v1/admin/carousel`,
    getAll: `${API_BASE_URL}/api/v1/admin/carousel`,
    getSingle: `${API_BASE_URL}/api/v1/admin/carousel`,
    deleteSingle: `${API_BASE_URL}/api/v1/admin/carousel`,
  },
  client: {
    create: `${API_BASE_URL}/api/v1/admin/client`,
    update: `${API_BASE_URL}/api/v1/admin/client`,
    getAll: `${API_BASE_URL}/api/v1/admin/client`,
    getSingle: `${API_BASE_URL}/api/v1/admin/client`,
    deleteSingle: `${API_BASE_URL}/api/v1/admin/client`,
  },
  promotion: {
    create: `${API_BASE_URL}/api/v1/admin/promotion`,
    update: `${API_BASE_URL}/api/v1/admin/promotion`,
    getAll: `${API_BASE_URL}/api/v1/admin/promotion`,
    getSingle: `${API_BASE_URL}/api/v1/admin/promotion`,
    deleteSingle: `${API_BASE_URL}/api/v1/admin/promotion`,
  },
  testimonial: {
    create: `${API_BASE_URL}/api/v1/admin/testimonial`,
    update: `${API_BASE_URL}/api/v1/admin/testimonial`,
    getAll: `${API_BASE_URL}/api/v1/admin/testimonial`,
    getSingle: `${API_BASE_URL}/api/v1/admin/testimonial`,
    deleteSingle: `${API_BASE_URL}/api/v1/admin/testimonial`,
  },
  youTubeVideo: {
    create: `${API_BASE_URL}/api/v1/admin/youtube-video`,
    update: `${API_BASE_URL}/api/v1/admin/youtube-video`,
    getAll: `${API_BASE_URL}/api/v1/admin/youtube-video`,
    getSingle: `${API_BASE_URL}/api/v1/admin/youtube-video`,
    deleteSingle: `${API_BASE_URL}/api/v1/admin/youtube-video`,
  },
  shippingCharge: {
    create: `${API_BASE_URL}/api/v1/admin/shipping-charge`,
    update: `${API_BASE_URL}/api/v1/admin/shipping-charge`,
    getAll: `${API_BASE_URL}/api/v1/admin/shipping-charge`,
    getSingle: `${API_BASE_URL}/api/v1/admin/shipping-charge`,
    deleteSingle: `${API_BASE_URL}/api/v1/admin/shipping-charge`,
  },
  order: {
    update: `${API_BASE_URL}/api/v1/admin/order`,
    getAll: `${API_BASE_URL}/api/v1/admin/order`,
    getSingle: `${API_BASE_URL}/api/v1/admin/order`,
    deleteSingle: `${API_BASE_URL}/api/v1/admin/order`,
  },
  billingShippingPolicy: {
    create: `${API_BASE_URL}/api/v1/admin/billing-shipping-policy`,
    get: `${API_BASE_URL}/api/v1/admin/billing-shipping-policy`,
  },
  cookiePolicy: {
    create: `${API_BASE_URL}/api/v1/admin/cookie-policy`,
    get: `${API_BASE_URL}/api/v1/admin/cookie-policy`,
  },
  disclaimer: {
    create: `${API_BASE_URL}/api/v1/admin/disclaimer`,
    get: `${API_BASE_URL}/api/v1/admin/disclaimer`,
  },
  privacyPolicy: {
    create: `${API_BASE_URL}/api/v1/admin/privacy-policy`,
    get: `${API_BASE_URL}/api/v1/admin/privacy-policy`,
  },
  returnRefundPolicy: {
    create: `${API_BASE_URL}/api/v1/admin/return-refund-policy`,
    get: `${API_BASE_URL}/api/v1/admin/return-refund-policy`,
  },
  termCondition: {
    create: `${API_BASE_URL}/api/v1/admin/term-condition`,
    get: `${API_BASE_URL}/api/v1/admin/term-condition`,
  },
  aboutus: {
    create: `${API_BASE_URL}/api/v1/admin/aboutus`,
    get: `${API_BASE_URL}/api/v1/admin/aboutus`,
  },
  contactus: {
    create: `${API_BASE_URL}/api/v1/admin/contactus`,
    get: `${API_BASE_URL}/api/v1/admin/contactus`,
  },
  contactEnquiry: {
    getAll: `${API_BASE_URL}/api/v1/admin/contact-enquiry`,
    getSingle: `${API_BASE_URL}/api/v1/admin/contact-enquiry`,
    deleteSingle: `${API_BASE_URL}/api/v1/admin/contact-enquiry`,
  },
};

export default apis;
