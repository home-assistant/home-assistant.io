---
title: "Introducing Hass.io Ingress"
description: "Ingress allows Hass.io add-ons to seamlessly integrate their user interface with Home Assistant"
date: 2019-04-15 00:00:00
date_formatted: "April 15, 2019"
author: Pascal Vizeli
author_twitter: pvizeli
categories: Announcements
og_image: /images/blog/2019-04-hassio-ingress/blogpost.png
---

Today we are proud to introduce a new feature for Hass.io called Ingress. Ingress allows Hass.io add-ons to seamlessly integrate their user interface with Home Assistant. Home Assistant will take care of the authentication and the secure connection, so users can start using the add-on directly, without any configuration necessary by the users. It just works. Even with Nabu Casa’s Home Assistant Cloud Remote UI!

<p class='img'>
<img src='/images/blog/2019-04-hassio-ingress/ingress-demo.gif' alt='Ingress demo on Hass.io'>
Demo with an add-on on Ingress.
</p>

## Add-ons that already support Ingress

Some add-ons already have been upgraded to support the new Ingress feature. Here are a couple of add-ons that support Ingress and are available on the add-on store right now:

Core add-ons:
- [Configurator](/addons/configurator/)
- [deCONZ](https://github.com/home-assistant/hassio-addons/tree/master/deconz#readme)

Community add-ons:
- [Node-RED](https://github.com/hassio-addons/addon-node-red#readme)
- [Visual Studio Code](https://github.com/hassio-addons/addon-vscode#readme)
- [InfluxDB](https://github.com/hassio-addons/addon-influxdb#readme)
- [SSH & Web Terminal](https://github.com/hassio-addons/addon-ssh#readme)
- [AdGuard Home](https://github.com/hassio-addons/addon-adguard-home#readme)

You can recognize add-ons that support the Ingress feature by the Ingress icon on the add-on information tab:

<p class='img'>
<img src='/images/blog/2019-04-hassio-ingress/ingress_sign.png' alt='Add-on view with Ingress support'>
Screenshot of an Add-on view with ingress support.
</p>

Please note, that in order to upgrade or install these Ingress enabled add-ons, you need to be running Home Assistant 0.91.3.

## What’s next

Releasing the Ingress feature is just a start. It allows us to make even better integrations in the future. For the upcoming Home Assistant 0.92 release, we will be adding support to add links to your add-ons to the Home Assistant sidebar via a toggle on the add-on details page. The link will open the add-on Ingress interface, embedding the add-on in the Home Assistant UI. This will make it look and feel like a single system.

## Other new things

While adding Ingress support, we have tweaked and polished some other things in the Hass.io user interface:

- Network ports in the add-on view now have a description, so you know what they are being used for.
- Reloading the add-on store will now show a spinner to indicate that reloading is being done.

## For add-on developers

Ingress is added as an additional feature that add-on authors can choose to support starting today, granted that the application in the add-on supports it. The old approach of exposing add-ons on different ports will remain available. It will be up to add-on authors to choose what to support, including an option to support both.

If an add-on is going to support both, you should not have the add-on exposed on a port enabled by default. Instead, allow users to enable the port access by assigning a port number in the “Network” section of the add-on configuration panel.

Are you an add-on developer looking to support Ingress on your add-on? [Check the developer documentation][dev-docs].

## FAQ & Known Issues

Hass.io Ingress is a new and complex technology. Without a doubt, now that everybody starts using it, we will discover new issues. Here are some frequently asked questions and some currently known issues with the Ingress feature.

- **After upgrading the add-on, I’m unable to access it directly.**<br>
Direct access to the add-on might now be disabled by default by the add-on developer. If the add-on supports running Ingress + direct access, you can re-enable direct access by setting a port number in the “Network” section of the add-on configuration.

- **After upgrading the add-on, my `panel_iframe` doesn’t work anymore.**<br>
This is related to the question above. Once you enable direct access again, your iFrame panel will start working again. Until the automated panel integration lands in 0.92, you can also manually add a panel that points at Ingress.

- **I cannot upgrade my add-on: “This update is no longer compatible with your system.”**<br>
Please update your Home Assistant installation to 0.91.3 or higher.

- **I cannot access the add-on via Ingress using the Tor Browser or Firefox.**<br>
We found a last minute issue impacting Firefox based browsers (including the Tor Browser). There are some issues accessing add-ons that use WebSockets. We have identified the issue and expect it to be solved with the release of Home Assistant 0.91.4.


[Configurator]: /addons/configurator/
[deCONZ]: https://github.com/home-assistant/hassio-addons/tree/master/deconz#readme
[Node-RED]: https://github.com/hassio-addons/addon-node-red#readme
[Visual Studio Code]: https://github.com/hassio-addons/addon-vscode#readme
[InfluxDB]: https://github.com/hassio-addons/addon-influxdb#readme
[SSH & Web Terminal]: https://github.com/hassio-addons/addon-ssh#readme
[AdGuard Home]: https://github.com/hassio-addons/addon-adguard-home#readme
[dev-docs]: https://developers.home-assistant.io/docs/add-ons/presentation/#ingress
