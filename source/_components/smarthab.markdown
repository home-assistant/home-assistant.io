---
layout: page
title: "SmartHab"
description: "Instructions on how to integrate SmartHab devices into Home Assistant"
date: 2019-02-13 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: smarthab.png
ha_release: 0.89
ha_category:
  - Hub
  - Cover
  - Light
ha_iot_class: "Cloud Polling"
redirect_from:
  - /components/cover.smarthab/
  - /components/light.smarthab/
---

If your home is equiped with [SmartHab](http://www.smarthab.fr/en/home/)'s 
services, you will be able to control your lights and shutters with the 
SmartHab component for Home Assistant.

Once you've added a `smarthab` entry to your configuration, your devices will
automatically be discovered and made available on your dashboard.

<p class='note warning'>
  To prevent being automatically logged out of your SmartHab mobile app, you
  might want to create a secondary user in the app's settings and grant it
  access to your home. You can then configure the component using this account's
  credentials.
</p>

```yaml
# Example configuration.yaml entry
smarthab:
  email: EMAIL_ADDRESS
  password: PASSWORD
```

{% configuration %}
email:
    description: The username associated to the SmartHab account.
    required: true
    type: string
password:
    description: The password.
    required: true
    type: string
url:
    description: The base URL of the API.
    required: false
    type: string
{% endconfiguration %}
