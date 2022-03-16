import * as pino from 'pino';
export const logger = require('pino')({
  prettyPrint: {
    colorize: true,
  },
});;
//  const logger = pino({
//   prettyPrint: {
//     colorize: true,
//   },
// });
