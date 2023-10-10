import './module/papoo-ccm19integration';

import iconComponents from './assets/icons';

const { Component } = Shopware;

export default (() => {
    return iconComponents.map((component) => {
        return Component.register(component.name, component);
    });
})();
