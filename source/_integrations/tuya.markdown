---
title: Tuya
description: Instructions on how to setup the Tuya hub within Home Assistant.
ha_category:
  - Hub
  - Climate
  - Cover
  - Fan
  - Light
  - Scene
  - Switch
ha_iot_class: Cloud Polling
ha_release: 0.74
ha_domain: tuya
---

The `tuya` integration is the main integration to integrate all [Tuya Smart](https://www.tuya.com) related platforms, except the Zigbee hub. You will need your Tuya account information (username, password and account country code) to discover and control devices which related to your account.

There is currently support for the following device types within Home Assistant:

- **Climate** - The platform supports the air conditioner and heater.
- **Cover** - The platform supports curtains.
- **Fan** - The platform supports most kinds of Tuya fans.
- **Light** - The platform supports most kinds of Tuya light.
- **Scene** - The device state in frontend panel will not change immediately after you activate a scene.
- **Switch** - The platform supports switch and socket.

## Configuration via frontend

To add your Tuya devices into your Home Assistant installation, go to **Configuration** -> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **Tuya**.<br/>
During configuration, be careful to select the [country code](https://www.countrycode.org/) and the platform corresponding to those used by you in the app.<br/>
Once configuration flow is completed, the devices configured in your app will be automatically discovered.

### Configuration via YAML

YAML configuration is still around for people that prefer YAML, but it's deprecated and you should not use it anymore.

To add your Tuya devices into your Home Assistant installation, add the following to your `configuration.yaml` file:

```yaml
tuya:
  username: YOUR_TUYA_USERNAME
  password: YOUR_TUYA_PASSWORD
  country_code: YOUR_ACCOUNT_COUNTRYCODE
  platform: YOUR_ACCOUNT_PLATFORM
```

{% configuration %}
username:
  description: Your username to log in to Tuya. This may be your phone number which needs to be enquoted as this is a string.
  required: true
  type: string
password:
  description: Your password to log in to Tuya.
  required: true
  type: string
country_code:
  description: "Your account [country code](https://www.countrycode.org/), e.g., 1 for USA or 86 for China, again enquoted."
  required: true
  type: string
platform:
  description: "The app where your account register. `tuya` for Tuya Smart, `smart_life` for Smart Life, `jinvoo_smart` for Jinvoo Smart."
  required: false
  type: string
  default: tuya
{% endconfiguration %}

## Service

These services are available for the `tuya` component:

- force_update
- pull_devices

Devices state data and new devices will refresh automatically. If you want to refresh all devices information or get new devices related to your account manually, you can call the `force_update` or `pull_devices` service.
