import Raven from 'raven-js';

const sentry_key = 'f2f1fd2cb86b4e12bed0fb90915069d4';
const sentry_app = '211934';
export const sentry_url = `https://${sentry_key}@sentry.io/${sentry_app}`;

export function logException(ex, context) {
  Raven.captureException(ex, {
    extra: context
  });
  /*eslint no-console:0*/
  window && window.console && console.error && console.error(ex);
}
