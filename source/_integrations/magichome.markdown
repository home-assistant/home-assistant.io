---
title: "MagicHome"
description: "Instructions on how to setup the MagicHome hub within Home Assistant."
logo: https://brands.home-assistant.io/magichome/logo.png
ha_category:
  - Light
  - Switch
ha_iot_class: Cloud Polling
ha_release: 0.106
ha_domain: magichome
---

The `magichome` integration is the main integration to integrate all [Zengge Smart](http://zengge.com/) related platforms. You will need your Magic Home Pro account information (username, password and account country code) to discover and control devices which related to your account.

There is currently support for the following device types within Home Assistant:

- **Light** - The platform supports most kinds of MagicHome light and controller.
- **Switch** - The platform supports switch and socket.

## Configuration

To add your MagicHome devices into your Home Assistant installation, add the following to your `configuration.yaml` file:

```yaml
magichome:
  username: YOUR_MAGICHOME_USERNAME
  password: YOUR_MAGICHOME_PASSWORD
```

{% configuration %}
username:
  description: Your username to log in to MagicHome.
  required: true
  type: string
password:
  description: Your password to log in to MagicHome.
  required: true
  type: string
{% endconfiguration %}

## Service

These services are available for the `magichome` component:

- force_update
- pull_devices

Devices state data and new devices will refresh automatically. If you want to refresh all devices information or get new devices related to your account manually, you can call the `force_update` or `pull_devices` service.
