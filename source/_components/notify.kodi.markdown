---
layout: page
title: "Kodi"
description: "Instructions on how to add Kodi notifications to Home Assistant."
date: 2016-09-12 16:00
sidebar: true
comments: false
sharing: true
footer: true
logo: kodi.png
ha_category: Notifications
ha_release: 0.29
---


The `kodi` platform allows you to send messages to your [Kodi](https://kodi.tv/) multimedia system from Home Assistant.

## {% linkable_title Configuration %}

To add Kodi to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - platform: kodi
    name: NOTIFIER_NAME
    host: 192.168.0.123
```

- **name** (*Optional*): Name displayed in the frontend. The notifier will bind to the service `notify.NOTIFIER_NAME`.
- **host** (*Required*): The host name or address of the device that is running Kodi.
- **port** (*Optional*): The HTTP port number. Defaults to 8080.
- **proxy_ssl** (*Optional*): Connect to kodi with HTTPS. Defaults to `false`. Useful if Kodi is behind an SSL proxy.
- **username** (*Optional*): The XBMC/Kodi HTTP username.
- **password** (*Optional*): The XBMC/Kodi HTTP password.

### {% linkable_title Script example %}

```yaml
kodi_notification:
  sequence:
  - service: notify.NOTIFIER_NAME
    data:
      title: "Home Assistant"
      message: "Message to KODI from Home Assistant!"
      data:
        displaytime: 20000
        icon: "warning"
```

#### {% linkable_title Message variables %}

- **title** (*Optional*): Title that is displayed on the message.
- **message** (*Required*): Message to be displayed.
- **data** (*Optional*)
  - **icon** (*Optional*): Kodi comes with 3 default icons: `info`, `warning` and `error`, an URL to an image is also valid. *Defaults to `info`*
  - **displaytime** (*Optional*): Length in milliseconds the message stays on screen. *Defaults to `10000` ms*

To use notifications, please see the [getting started with automation page](/getting-started/automation/).

