export const APP_ACTION_LOGIN = 'APP_LOGIN',
  APP_ACTION_LOGOUT = 'APP_LOGOUT'
;

export function actionLogin(token, user) {
  return {type: APP_ACTION_LOGIN, token, user};
}

export function actionLogout() {
  return {type: APP_ACTION_LOGOUT};
}


