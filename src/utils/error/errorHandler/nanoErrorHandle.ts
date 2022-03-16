import { HttpException } from '@nestjs/common';
import { logger } from 'src/utils/logger';
const slack = require('../../../services/notification/slack/slack-notif.service');

export const nanoCodeHandle = (res) => {
  let statusCode;
  if (res.code) {
    statusCode = res.code;
  } else {
    statusCode = res.response.status ? res.response.status : res.code;
  }

  switch (statusCode) {
    case 400:
      // notif to send to us
      slack.sendNotification('NANO BAD REQUEST', 400);
      logger.error('NANO ERROR 400');
      return { errorMessage: 'NANO BAD REQUEST', code: String(statusCode) };
    case 401:
      slack.sendNotification('NANO UNAUTHORIZED', 401);
      logger.error('NANO ERROR 401');
      return { errorMessage: 'NANO UNAUTHORIZED', code: String(statusCode) };
    case 403:
      slack.sendNotification('NANO FORBIDDEN', 403);
      logger.error('NANO ERROR 403');
      return { errorMessage: 'NANO FORBIDDEN', code: String(statusCode) };
    case 404:
      slack.sendNotification('NANO  NOT FOUND', 404);
      logger.error('NANO ERROR 404');
      return { errorMessage: 'NANO NOT FOUND', code: String(statusCode) };
    case 500:
      slack.sendNotification('NANO SERVER ERROR', 500);
      logger.error('NANO ERROR 500');
      return { errorMessage: 'NANO SERVER ERROR', code: String(statusCode) };
    case 502:
      slack.sendNotification('NANO BAD GATEWAY', 502);
      logger.error('NANO BAD GATEWAY 502');
      return { errorMessage: 'NANO BAD GATEWAY', code: String(statusCode) };
    case 409:
      slack.sendNotification('NANO CONFLICTED ENTITY', 409);
      logger.error('NANO CONFLICTED ENTITY 502');
      return {
        errorMessage: 'NANO CONFLICTED ENTITY',
        code: String(statusCode),
      };
    default:
      logger.error('UNKNOWN ERROR');
  }
};
