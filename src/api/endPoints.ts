export const END_POINTS = {
  CERTIFICATE_MANAGEMENT: {
    CREATE_NEW: '/api/certificates/createNew',
    DETAIL: '/api/certificates/getByID',
  },

  MENU_MANAGEMENT: {
    DEACTIVE: '/api/menus/delete',
    VIEW_DETAIL: '/api/menus/getMenuByID',
  },

  ADVISOR: {
    GET_ALL: '/api/advisors/getAll',
  },

  AUTH: {
    LOGIN: '/api/auth/login',
    SIGN_UP: '/api/user/SignUp',
  },

  USERS: {
    MAIN: '/api/accounts/getAll',
  },

  BLOGS: {
    MAIN: '/api/blogs/getAll',
    DELETE_BLOGS: '/api/test/blogs/delete',
  },

  FEEDBACKS: {
    MAIN: '/api/feedbacks/getAll',
    UPDATE_FEEDBACK: '/api/feedbacks/approve',
  },

  FOOD: '/api/foods/getAll',
  ADD_NEW_FOOD: '/api/foods/createNew',
  DELETE_FOOD: '/api/foods/deactive',
  UPDATE_FOOD: '/api/foods/update',
  CERTIFICATE: '/api/certificates/getAll',
  UPDATE_CERTIFICATE: 'api/certificates/update',
  DELETE_CERTIFICATE: '/api/certificates/delete',
  CATEGORY: '/api/category',
  INGREDIENT: '/api/ingredients/getAll',
  DELETE_INGREDIENTS: '/api/ingredients/delete',
  UPDATE_INGREDIENT: '/api/ingredients/update',
  MENU: '/api/menus/getAllMenu',
  MENU_ADVISOR: '/api/menus/getMenuByAdvisor',
  ADD_NEW_MENU: '/api/menus/createNew',
  UPDATE_MENU: '/api/menus/update',
  SERVICES: '/api/service',
  DELETE_MENU: '/api/menus/deactivate',
  NOTIFICATIONS: '/api/notification',
  ADD_NEW_INGREDIENTS: '/api/ingredients/createNew',

  CREATE_USER: '/api/accounts/createNew',
  UPDATE_USER: '/api/accounts/update',
  GET_CERTIFICATE_BY_ADVISOR: '/api/certificates/getAllByID',

  TAGS: {
    ADD_NEW: '/api/tags/createNew',
    GET_ALL: '/api/tags/getAll',
  },
};
