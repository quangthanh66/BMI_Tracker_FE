export const END_POINTS = {
  STATISTIC: {
    TOTAL_WORKOUT: '/api/statistics/get-total-workout',
    TOTAL_SUBSCRIPTION: '/api/statistics/get-total-subscription',
    TOTAL_MENU: '/api/statistics/get-total-menu',
    TOTAL_ADVISOR_MEMBER: '/api/statistics/get-total-advisor-member',
    COMMISSION_SUMMARY: '/api/statistics/commission-summary',
  },

  CERTIFICATE_MANAGEMENT: {
    CREATE_NEW: '/api/certificates/createNew',
    DETAIL: '/api/certificates/getByID',
  },

  MENU_MANAGEMENT: {
    DEACTIVE: '/api/menus/delete',
    VIEW_DETAIL: '/api/menus/getMenuByID',
  },

  ADVISOR: {
    MAIN: '/api/advisors/getAll',
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
    DELETE_BLOGS: '/api/blogs/deactivate',
  },

  FEEDBACKS: {
    MAIN: '/api/feedbacks/getAll',
    UPDATE_FEEDBACK: '/api/feedbacks/approve',
  },

  COMMISSION: {
    MAIN: '/api/commissions/getAll',
    UPDATE_COMMISSION: '/api/commissions/update-paid',
  },

  SUBSCRIPTION: {
    MAIN: '/api/subscriptions/getAll',
  },

  FOOD: '/api/foods/getAll',
  ADD_NEW_FOOD: '/api/foods/createNew',
  DELETE_FOOD: '/api/foods/deactivate',
  UPDATE_FOOD: '/api/foods/update',
  TAGS_FOOD: '/api/tags/food/getAll',

  GET_CERTIFICATE_BY_ADVISOR: '/api/certificates/getAllByID',
  CERTIFICATE: '/api/certificates/getAll',
  UPDATE_CERTIFICATE: 'api/certificates/update',
  DELETE_CERTIFICATE: '/api/certificates/delete',

  CATEGORY: '/api/category',
  INGREDIENT: '/api/ingredients/getAll',
  DELETE_INGREDIENTS: '/api/ingredients/delete',
  UPDATE_INGREDIENT: '/api/ingredients/update',
  ADD_NEW_INGREDIENTS: '/api/ingredients/createNew',
  TAG_INGREDIENT: '/api/tags/ingredient/getAll',

  MENU: '/api/menus/getAllMenu',
  ADD_NEW_MENU: '/api/menus/createNew',
  UPDATE_MENU: '/api/menus/update',
  DELETE_MENU: '/api/menus/deactivate',
  MENU_ADVISOR: '/api/menus/getMenuByAdvisor',

  PLAN: '/api/plans/getAll',
  ADD_NEW_PLAN: '/api/plans/createNew',
  UPDATE_PLAN: '/api/plans/update',
  DELETE_PLAN: '/api/plans/deactivate',
  PLAN_MANAGEMENT: {
    DEACTIVE: '/api/plans/delete',
    VIEW_DETAIL: '/api/plans/getMenuByID',
  },

  WORKOUT: '/api/workouts/getAll',
  ADD_NEW_WORKOUT: '/api/workouts/createNew',
  DELETE_WORKOUT: '/api/workouts/deactivate',
  UPDATE_WORKOUT: '/api/workouts/update',

  CREATE_USER: '/api/accounts/createNew',
  UPDATE_USER: '/api/accounts/update',

  EXERCISE: '/api/exercises/getAll',
  ADD_NEW_EXERCISE: '/api/exercises/createNew',
  DELETE_EXERCISE: '/api/exercises/deactivate',
  UPDATE_EXERCISE: '/api/exercises/update',
  TAG_EXERCISE: '/api/tags/exercise/getAll',

  NOTIFICATIONS: '/api/notifications/get-all-for-user',

  TAGS: {
    ADD_NEW: '/api/tags/createNew',
    GET_ALL: '/api/tags/getAll',
  },
};
