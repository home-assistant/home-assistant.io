---
layout: page
title: "Tuya"
description: "Instructions on how to setup the Tuya hub within Home Assistant."
date: 2018-07-09 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: tuya.png
ha_category: Hub
ha_iot_class: "Cloud Polling"
ha_release: 0.74
---

The `tuya` component is the main component to integrate all [Tuya Smart](https://www.tuya.com) related platforms. You will need your Tuya account information (username, password and account country code) to discover and control devices which related to your account.

## {% linkable_title Configuration %}

To add your Tuya devices into your Home Assistant installation, add the following to your `configuration.yaml` file:

```yaml
tuya:
  username: YOUR_TUYA_USERNAME
  password: YOUR_TUYA_PASSWORD
  country_code: YOUR_ACCOUNT_COUNTRYCODE
```

{% configuration %}
username:
  description: Your username to log in to Tuya. This may be your phone number.
  required: true
  type: string
password:
  description: Your password to log in to Tuya.
  required: true
  type: string
country_code:
  description: "Your account [country code](https://www.countrycode.org/), e.g., 1 for USA or 86 for China."
  required: true
  type: string
platform:
  description: "The app where your account register. `tuya` for Tuya Smart, `smart_life` for Smart Life, `jinvoo_smart` for Jinvoo Smart."
  required: false
  type: string
  default: tuya
{% endconfiguration %}

## {% linkable_title Service %}

These services are available for the `tuya` component:

- force_update
- pull_devices

Devices state data and new devices will refresh automatically. If you want to refresh all devices information or get new devices related to your account manually, you can call the `force_update` or `pull_devices` service.
