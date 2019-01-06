




export const environment = {
  production: true,
  rootUrl: 'https://expenses.knowledgespike.local',
  apiUrl: 'https://expensesapi.knowledgespike.local',
  expensesUrl: '/api/expenseclaims',
  authorityUrl: 'https://ids.knowledgespike.local',
  authRedirectUrl: 'https://expenses.knowledgespike.local/auth-callback',
  postLogoutRedirectUrl: 'https://expenses.knowledgespike.local/signout-callback',
  responseType: 'id_token token',
  scope: 'openid profile expenses_api',
  clientId: 'expenses'
};
