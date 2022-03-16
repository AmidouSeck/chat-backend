import { HttpException } from '@nestjs/common';
import { logger } from 'src/utils/logger';
const slack = require('../../../services/notification/slack/slack-notif.service');

export const wizallCodeHandle = (res) => {
  let statusCode;
  if (res.code) {
    statusCode = res.code;
  } else {
    statusCode = res.response.status ? res.response.status : res.code;
  }

  switch (statusCode) {
    case 400:
      // notif to send to us
      slack.sendNotification('WIZALL BAD REQUEST', 400);
      logger.error('WIZALL ERROR 400');
      return { errorMessage: 'WIZALL BAD REQUEST', code: String(statusCode) };
    case 401:
      slack.sendNotification('WIZALL UNAUTHORIZED', 401);
      logger.error('WIZALL ERROR 401');
      return { errorMessage: 'WIZALL UNAUTHORIZED', code: String(statusCode) };
    case 403:
      slack.sendNotification('WIZALL FORBIDDEN', 403);
      logger.error('WIZALL ERROR 403');
      return { errorMessage: 'WIZALL FORBIDDEN', code: String(statusCode) };
    case 404:
      slack.sendNotification('WIZALL  NOT FOUND', 404);
      logger.error('WIZALL ERROR 404');
      return { errorMessage: 'WIZALL NOT FOUND', code: String(statusCode) };
    case 500:
      slack.sendNotification('WIZALL SERVER ERROR', 500);
      logger.error('WIZALL ERROR 500');
      return { errorMessage: 'WIZALL SERVER ERROR', code: String(statusCode) };
    case 502:
      slack.sendNotification('WIZALL BAD GATEWAY', 502);
      logger.error('WIZALL BAD GATEWAY 502');
      return { errorMessage: 'WIZALL BAD GATEWAY', code: String(statusCode) };
    case 504:
      slack.sendNotification('WIZALL GATEWAY TIME-OUT', 504);
      logger.error('WIZALL GATEWAY TIME-OUT 504');
      return {
        errorMessage: 'WIZALL GATEWAY TIME-OUT ',
        code: String(statusCode),
      };
    default:
      logger.error('UNKNOWN ERROR');
  }
};
