// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  rootUrl: 'https://expenses.knowledgespike.local:5446',
  apiUrl: 'https://expensesapi.knowledgespike.local:5447',
  expensesUrl: '/api/expenseclaims',
  authorityUrl: 'https://ids.knowledgespike.local/',
  authRedirectUrl: 'https://expenses.knowledgespike.local:5446/auth-callback',
  postLogoutRedirectUrl: 'https://expenses.knowledgespike.local:5446/signout-callback',
  responseType: 'id_token token',
  scope: 'openid profile expenses_api',
  clientId: 'expenses'
};
