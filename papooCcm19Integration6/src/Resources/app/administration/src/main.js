import './extension/sw-settings-index';

import deDE from './snippet/de-DE.json';
import enGB from './snippet/en-GB.json';

const { Module } = Shopware;

Module.register('papoo-ccm19integration', {
    type: 'plugin',
    name: 'PapooCcm19Integration',
    title: 'papoo-ccm19integration.title',
    description: 'papoo-ccm19integration.description',
    version: '1.0.0',
    targetVersion: '1.0.0',
    color: '#A8B9BE',
    icon: 'default-action-settings',

    snippets: {
        'de-DE': deDE,
        'en-GB': enGB
    }
});
