import CookiePermissionPlugin from 'src/plugin/cookie/cookie-permission.plugin';

export default class CookiePermissionCompat extends CookiePermissionPlugin {
    init() {
        if ('CCM' in window) {
            // do nothing -> disable cookie permission bar
        } else {
            super.init();
        }
    }
}
