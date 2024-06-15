export const END_POINTS = {
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
    MAIN: '/api/test/blogs/getAll',
    DELETE_BLOGS: '/api/test/blogs/delete',
  },

  FEEDBACKS: '/api/feedback',
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
  ADD_NEW_MENU: '/api/menus/createNew',
  UPDATE_MENU: '/api/menus/update',
  SERVICES: '/api/service',
  DELETE_MENU: '/api/menus/deactivate',
  NOTIFICATIONS: '/api/notification',
  ADD_NEW_INGREDIENTS: '/api/ingredients/createNew',

  CREATE_USER: '/api/accounts/createNew',
  UPDATE_USER: '/api/accounts/update',

  TAGS: {
    ADD_NEW: '/api/tags/createNew',
    GET_ALL: '/api/tags/getAll',
  },
};
