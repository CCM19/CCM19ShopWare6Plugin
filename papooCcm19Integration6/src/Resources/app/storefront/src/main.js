import CookiePermissionCompat from './cookie-permission-compat/cookie-permission-compat.plugin';

// == Replace standard Shopware Cookie Banner if neccessary  ==
const PluginManager = window.PluginManager;
try {
    var pluginIsAsync;
    try {
        var pluginData = PluginManager.getPlugin('CookiePermission', true);
        pluginIsAsync = !('prototype' in pluginData.get('class'));
    } catch (_ignore) {
        pluginIsAsync = false;
    }

    if (pluginIsAsync) {
        PluginManager.override('CookiePermission',  () => import('./cookie-permission-compat/cookie-permission-compat.plugin'), '[data-cookie-permission]');
    } else {
        PluginManager.override('CookiePermission', CookiePermissionCompat, '[data-cookie-permission]');
    }
    var data = PluginManager.getPlugin('CookiePermission', true);
} catch (_ignore) {
    // Could not override CookiePermission plugin -> Banner probably disabled
    window.console.debug("[CCM19 Plugin] Shopware default cookie banner not enabled -> not integrating into Shopware's CookiePermission infrastructure.")
}

// Necessary for the webpack hot module reloading server
if (module.hot) {
    module.hot.accept();
}
