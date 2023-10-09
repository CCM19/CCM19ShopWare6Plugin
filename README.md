CCM19 plugin for Shopware 6
===========================

To install, copy the folder `PapooCcm19Integration` to `custom/plugins/` .

Make changes to the administration JS
------------------------------------------

If changes are made to the administration Javascript code, these must be compiled.

Install the plugin in a Shopware installation.

Run `./bin/build-administration.sh`

After that the compiled JS can be found in `custom/plugins/papooCcm19Integration6/src/Resources/public` and can be committed.

Make changes to the storefront JS
------------------------------------------

If changes are made to the storefront Javascript code, these must be compiled.

Install the plugin in a Shopware installation.

Run `./bin/build-storefront.sh`

After that the compiled JS can be found in `custom/plugins/papooCcm19Integration6/src/Resources/app/storefront/dist` and can be committed.
