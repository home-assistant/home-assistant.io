---
layout: page
title: "Configure Home Assistant"
description: "Instructions to get Home Assistant configured."
date: 2016-09-26 21:00
sidebar: true
comments: false
sharing: true
footer: true
---

<p class='Note'>
This guide applies only if you've installed Home Assistant via Hass.io. If you've used any other install method then [see here](/docs/configuration/) instead.
</p>

If you made it here, awesome! That means that you got Home Assistant up and running. It might have already found some of your networked devices. This is going to be fun!

Home Assistant stores its configuration in a file called `configuration.yaml`. A default one is created when Home Assistant is started for the first time. Some of the things in the configuration file can be edited via the user interface, other parts require you to edit the configuration file directly.

There are two common approaches to edit your configuration: via Samba/Windows Networking and via the HASS Configurator. Both of these are [official add-ons for Hass.io](/addons/).

## {% linkable_title Installing Hass.io add-ons %}

Hass.io add-ons are installed from the add-on store embedded in the Hass.io panel:

 - Open Home Assistant by navigating to [http://hassio.local:8123][local].
 - Click on the menu icon in the top left and select Hass.io in the sidebar.
 - The Hass.io panel opens, now open the add-on store by clicking the shopping bag.

[local]: http://hassio.local:8123

<p class='img'>
<img src='/images/hassio/screenshots/main_panel_addon_store.png' />
From the Hass.io main panel open the add-on store.
</p>

### {% linkable_title Editing config via HASS Configurator %}

The first add-on we should install is the HASS Configurator. With the HASS Configurator, you'll be able to edit your Home Assistant configuration from the web interface.

Go to the add-on store (see the previous step), click on Configurator and click on "INSTALL". When installation is complete, the UI will go to the add-on details page for the configurator. Here you will be able to change settings, start and stop the add-on. Follow the steps below to setup the add-on.

 - Set a password on the Config box, don't forget to use quotes on your password
 
 ```json
{
  "username": "admin",
  "password": "YOUR_PASSWORD_WITH_QUOTES",
  "certfile": "fullchain.pem",
  "keyfile": "privkey.pem",
  "ssl": false,
  "allowed_networks": [
    "192.168.0.0/16"
  ],
  "banned_ips": [
    "8.8.8.8"
  ],
  "banlimit": 0,
  "ignore_pattern": [
    "__pycache__"
  ],
  "dirsfirst": false
}
```

 - Click on "SAVE" to save your new password
 - "START" the add-on
 - You will be able to click the "OPEN WEB UI" link to open the Web UI on a new window
 - Type your username and password that you recently saved

Time for the first practice with the configurator. Add the following to `configuration.yaml` file to add a link to the Configurator in the sidebar:

```yaml
panel_iframe:
  configurator:
    title: Configurator
    icon: mdi:wrench
    url: http://hassio.local:3218
```

Now restart Home Assistant for the changes to the configuration to take effect. You can do this by going to the config panel (Configuration in the sidebar) -> General -> Restart Home Assistant.

### {% linkable_title Editing config via Samba/Windows Networking %}

Maybe you are not a big fan of our web editor and want to use a text editor on your computer instead. This is possible by sharing the configuration over the network using the Samba add-on, which can be installed from the Hass.io add-on store.

After you have installed it, click on START. Hass.io should now be available in the networking tab on your computer. Use a text editor like the free [Visual Studio Code](https://code.visualstudio.com/) to edit `configuration.yaml`.

## {% linkable_title Configuring integrations %}

Now that you are able to edit the configuration, it's time to set up some of your devices and services. Each service and device will have its own instructions on how to be integrated. Find  your devices and services on the [components overview page](/components/).

<p class='note'>YAML can be a little daunting at first. A lot is possible! [Here is some more info.](/docs/configuration/devices/)</p>

For a sensor that is showing [random values](/components/sensor.random/), the entry would look like the sample below:

```yaml
sensor:
  - platform: random
```

### [Next step: Automate Home Assistant &raquo;](/getting-started/automation/)
