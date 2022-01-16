CCM19 plugin for Shopware 6
===========================

To install, copy the folder `PapooCcm19Integration` to `custom/plugins/` .

Make changes to the administration JS
------------------------------------------

If changes are made to the administration Javascript code, these must be compiled.

The development version of Shopware is required for this:

https://github.com/shopware/development

Install this (and if necessary create `.psh.yaml` along the lines of `.psh.yaml.dist` with the correct database and mailer settings).

Dependencies: `apt install composer npm webpack node-webpack-merge node-copy-webpack-plugin`

The plugin must be installed and activated in the installation.

Then:

```
./psh.phar administration:install-dependencies # only needed once (installs npm dependencies)

./psh.phar administration:build

```

After that the compiled JS can be found in `PapooCcm19Integration/src/Resources/public` and can be committed.


Translated with www.DeepL.com/Translator (free version)