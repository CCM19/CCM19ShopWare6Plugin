import './components/papoo-ccm19-settings-icon';
import deDE from './snippet/de-DE.json';
import enGB from './snippet/en-GB.json';

const { Module } = Shopware;

Module.register('papoo-ccm19integration', {
    type: 'plugin',
    name: 'papoo-ccm19integration.title',
    description: 'papoo-ccm19integration.description',
    color: '#9AA8B5',
    icon: 'default-device-server',
    favicon: 'icon-module-settings.png',
    routes: {
        settings: {
            component: 'sw-extension-config',
            props: {
                namespace: 'papooCcm19Integration6',
            },
            path: "settings",
            redirect: "/sw/extension/config/papooCcm19Integration6",
            meta: {
                parentPath: 'sw.settings.index'
            },
        },
    },

    snippets: {
        'de-DE': deDE,
        'en-GB': enGB
    },

    settingsItem: [{
        group: 'plugins',
        to: 'papoo.ccm19integration.settings',
        icon: 'default-object-rocket',
        iconComponent: 'papoo-ccm19-settings-icon',
        label: 'papoo-ccm19integration.title',
        privilege: 'system.plugin_maintain',
        backgroundEnabled: true,
    }],
});
