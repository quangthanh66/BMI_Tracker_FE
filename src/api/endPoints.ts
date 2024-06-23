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

  GET_CERTIFICATE_BY_ADVISOR: '/api/certificates/getAllByID',
  CERTIFICATE: '/api/certificates/getAll',
  UPDATE_CERTIFICATE: 'api/certificates/update',
  DELETE_CERTIFICATE: '/api/certificates/delete',

  CATEGORY: '/api/category',
  INGREDIENT: '/api/ingredients/getAll',
  DELETE_INGREDIENTS: '/api/ingredients/delete',
  UPDATE_INGREDIENT: '/api/ingredients/update',
  ADD_NEW_INGREDIENTS: '/api/ingredients/createNew',

  MENU: '/api/menus/getAllMenu',
  ADD_NEW_MENU: '/api/menus/createNew',
  UPDATE_MENU: '/api/menus/update',
  DELETE_MENU: '/api/menus/deactivate',
  MENU_ADVISOR: '/api/menus/getMenuByAdvisor',

  PLAN: '/api/plans/getAll',
  ADD_NEW_PLAN: '/api/menus/createNew',
  UPDATE_PLAN: '/api/menus/update',
  DELETE_PLAN: '/api/menus/deactivate',
  PLAN_MANAGEMENT: {
    DEACTIVE: '/api/menus/delete',
    VIEW_DETAIL: '/api/menus/getMenuByID',
  },

  WORKOUT: '/api/workouts/getAll',
  ADD_NEW_WORKOUT: '/api/foods/createNew',
  DELETE_WORKOUT: '/api/foods/deactive',
  UPDATE_WORKOUT: '/api/foods/update',

  CREATE_USER: '/api/accounts/createNew',
  UPDATE_USER: '/api/accounts/update',

  EXERCISE: '/api/exercses/getAll',
  ADD_NEW_EXERCISE: '/api/foods/createNew',
  DELETE_EXERCISE: '/api/foods/deactive',
  UPDATE_EXERCISE: '/api/foods/update',

  NOTIFICATIONS: '/api/notification',

  TAGS: {
    ADD_NEW: '/api/tags/createNew',
    GET_ALL: '/api/tags/getAll',
  },
};
