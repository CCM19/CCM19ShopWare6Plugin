import CookiePermissionCompat from './cookie-permission-compat/cookie-permission-compat.plugin';

import { COOKIE_CONFIGURATION_UPDATE } from 'src/plugin/cookie/cookie-configuration.plugin';

const PluginManager = window.PluginManager;
PluginManager.override('CookiePermission', CookiePermissionCompat, '[data-cookie-permission]');

$(window).on('ccm19CookieAccepted', function () {
    var updatedCookies = {};
    for (const cookieName of window.CCM.acceptedCookies)
    {
        updatedCookies[cookieName] = {
            cookie: cookieName
        };
    }
    if ('_ga' in updatedCookies) {
        updatedCookies['google-analytics-enabled'] = updatedCookies['_ga'];
    }

    document.$emitter.publish(COOKIE_CONFIGURATION_UPDATE, updatedCookies);
});

// Necessary for the webpack hot module reloading server
if (module.hot) {
    module.hot.accept();
}
