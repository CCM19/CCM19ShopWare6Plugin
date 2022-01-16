CCM19-Plugin für Shopware 6
===========================

Zur Installation den Ordner `PapooCcm19Integration` nach `custom/plugins/` kopieren.

Änderungen am Administrations-JS vornehmen
------------------------------------------

Wenn Änderungen am Javascript-Code für die Administration vorgenommen werden, müssen diese kompiliert werden.

Dafür wird die Development-Version von Shopware benötigt:

https://github.com/shopware/development

Diese installieren (und ggf. `.psh.yaml` nach dem Vorbild von `.psh.yaml.dist` anlegen mit den richtigen Datenbank- und Mailer-Einstellungen).

Abhängigkeiten: `apt install composer npm webpack node-webpack-merge node-copy-webpack-plugin`

Das Plugin muss in der Installation installiert und aktiviert werden.

Dann:

```
./psh.phar administration:install-dependencies # nur einmal nötig (installiert npm-Abhängigkeiten)

./psh.phar administration:build
```

Danach findet sich das compilierte JS in `PapooCcm19Integration/src/Resources/public` und kann committed werden.
