import CookiePermissionPlugin from 'src/plugin/cookie/cookie-permission.plugin';
import { COOKIE_CONFIGURATION_UPDATE } from 'src/plugin/cookie/cookie-configuration.plugin';
import CookieStorage from 'src/helper/storage/cookie-storage.helper';

export default class CookiePermissionCompat extends CookiePermissionPlugin {
    init() {
        if ('CCM' in window) {
            // not calling parent init() -> disable cookie permission bar
            setupShopwareCookieEvents();
        } else {
            super.init();
        }
    }
}

function setupShopwareCookieEvents() {
    // == Cause Shopware cookie consent signals when CCM19 consent changed and set special marker cookies ==
    var timer = null;
    var knownCookies = {};

    // Cookie names for which a special marker cookie needs to be set
    const specialCookies = {
        'cookie-preference': ['cookie-preference'], // Shopware Cookie-Banner
        '_ga': ['google-analytics-enabled'], // Google Analytics
        '_swag_ga_ga*': ['google-analytics-enabled'], // Google Analytics (Shopware integration)
        '_dis_ga': ['_dis_ga'], // Google Analytics (D-I-S integration)
        '_gcl_aw': ['google-ads-enabled'], // Google Ads
        '__gads': ['google-ads-enabled'], // Google Ads
        '_dis_gads': ['_dis_gads'], // Google Ads (D-I-S integration)
        '_dc_gtm_UA-.*': ['wbm-tagmanager-enabled', 'shopstudio-google-tag-manager-cloud-cookie-consent', 'dtgsAllowGtmTracking'], // Google Tag Manager
        '_dc_gtm_UA-*': ['wbm-tagmanager-enabled', 'shopstudio-google-tag-manager-cloud-cookie-consent', 'dtgsAllowGtmTracking'], // Google Tag Manager
        '_dc_gtm_*': ['wbm-tagmanager-enabled', 'shopstudio-google-tag-manager-cloud-cookie-consent', 'dtgsAllowGtmTracking'], // Google Tag Manager
        'wishlist-*': ['wishlist-enabled'], // Shopware Wishlist
        'wishlist-enabled': ['wishlist-enabled'], // Shopware Wishlist
        '_swa_anonymousId': ['_swa_consent_enabled'], // Shopware Analytics
        'df-random-userid': ['df-session'], // DooFinder
        'df-session': ['df-session'], // DooFinder
        YSC: ['youtube-video'], // Youtube
        '_fbp': ['mediameets-facebook-pixel-enabled', '_dis_meta'], // Facebook/Meta Pixel
        'mediameets-facebook-pixel-enabled': ['mediameets-facebook-pixel-enabled'], // Facebook/Meta Pixel
        '_dis_meta': ['_dis_meta'], // Facebook/Meta Pixel (D-I-S integration)
        'atl_newsletter_modal_closed': ['atl_newsletter_modal_closed'], // Atloss Newsletter Pop-Up
        'moorl-location-map': ['moorl-location-map'], // Moori Store Locator
        'moorl-fb-store': ['moorl-fb-store'],
        '_dis_mads': ['_dis_mads'], // Microsoft Ads (D-I-S integration)
        '_dis_pinterest': ['_dis_pinterest'], // Pinterest Ads (D-I-S integration)
        '_dis_tiktok': ['_dis_tiktok'], // Tiktok Ads (D-I-S integration)

    };
    // Values for these special cookies (default: '1')
    const specialCookieValues = {
        'atl_newsletter_modal_closed': '0',
        '_dis_ga': '_ga',
        '_dis_gads': '_gads',
        '_dis_meta': '_fbp',
        '_dis_mads': '_microsoft',
        '_dis_pinterest': '_pinterest',
        '_dis_tiktok': '_tiktok',
    };

    // Check which of the marker cookies are already set
    // eslint-disable-next-line javascript:S1535
    for (const key in specialCookies) {
        specialCookies[key].forEach(function (item) {
            if (CookieStorage.getItem(item) != false) {
                knownCookies[item] = true;
            }
        });
    }

    function emitShopwareCookieSignal() {
        timer = null;
        var activeCookies = {};
        window.CCM.acceptedCookies.forEach(function (cookieName) {
            activeCookies[cookieName] = true;
        });

        // Process special marker cookies
        for (const key in specialCookies) {
            if (key in activeCookies) {
                specialCookies[key].forEach(function (item) {
                    activeCookies[item] = true;
                    if (CookieStorage.getItem(item) == false) {
                        // Set the marker cookie with a short lifetime (~30m)
                        const value = (item in specialCookieValues) ? specialCookieValues[item] : '1';
                        CookieStorage.setItem(item, value, 0.02);
                    }
                });
            } else if (key in knownCookies) {
                specialCookies[key].forEach(function (item) {
                    if (CookieStorage.getItem(item) !== false) {
                        // Unset marker cookies, if the matching embedding was disabled
                        CookieStorage.removeItem(item);
                    }
                });
            }
        }

        // Set previously set cookies that are no longer active to `false`
        for (const key in knownCookies) {
            if (!(key in activeCookies)) {
                activeCookies[key] = false;
            }
        }

        // Compute which cookies have changed
        var updatedCookies = {};
        for (const key in activeCookies) {
            if (activeCookies[key] !== knownCookies[key]) {
                updatedCookies[key] = (key in activeCookies) ? activeCookies[key] : false;
            }
        }

        knownCookies = activeCookies;
        if (Object.keys(updatedCookies).length > 0) {
            document.$emitter.publish(COOKIE_CONFIGURATION_UPDATE, updatedCookies);
        }
    }


    function delayEmitShopwareCookieSignal() {
        if (timer !== null) {
            window.clearTimeout(timer);
        }
        timer = window.setTimeout(emitShopwareCookieSignal, 30);
    }

    window.addEventListener('ccm19CookieAccepted', delayEmitShopwareCookieSignal);
    window.addEventListener('ccm19EmbeddingAccepted', delayEmitShopwareCookieSignal);
    window.addEventListener('ccm19WidgetClosed', delayEmitShopwareCookieSignal);

    if (window.CCM.consent) {
        timer = window.setTimeout(emitShopwareCookieSignal, 60);
    }
}
