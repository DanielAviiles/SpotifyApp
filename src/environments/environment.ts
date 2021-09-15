// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  grant_type: 'client_credentials',
  client_id: '4ea5b45351e6447', /// ------------ d9b83d76e9bcc4b7c
  client_secret: 'a945a22cbbd249e', /// ------ 0a28b00922f5c4b02
  tokenUrl: 'https://accounts.spotify.com/api/token',
  api: '	https://api.spotify.com/v1',
  defaultIMG: 'https://marketing4ecommerce.net/wp-content/plugins/accelerated-mobile-pages/images/SD-default-image.png'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
