export const END_POINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    SIGN_UP: '/api/user/SignUp',
  },

  USERS: {
    MAIN: '/api/accounts/getAll',
  },

  BLOGS: {
    MAIN: '/api/blog',
  },

  FEEDBACKS: '/api/feedback',
  FOOD: '/api/foods/getAll',
  ADD_NEW_FOOD: '/api/foods/createNew',

  CATEGORY: '/api/category',
  INGREDIENT: '/api/ingredient',
  MENU: '/api/menu',
  SERVICES: '/api/service',
  NOTIFICATIONS: '/api/notification',

  CREATE_USER: '/api/accounts/createNew',
  UPDATE_USER: '/api/accounts/update',

  TAGS: {
    ADD_NEW: '/api/tags/createNew',
    GET_ALL: '/api/tags/getAll',
  },
};
