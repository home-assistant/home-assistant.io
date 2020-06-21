---
title: SmartHab
description: Instructions on how to integrate SmartHab devices into Home Assistant
ha_release: 0.94
ha_category:
  - Hub
  - Cover
  - Light
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@outadoc'
ha_domain: smarthab
---

If your home is fitted with [SmartHab](https://www.smarthab.fr/en/home/)'s 
devices and you have access to their app-based services, you will be able 
to control your lights and shutters with the SmartHab integration for Home 
Assistant.

Once you have added a `smarthab` entry to your configuration, your supported 
devices will automatically be discovered and made available on your dashboard.

<div class='note warning'>
  To prevent being automatically logged out of your SmartHab mobile app, you
  might want to create a secondary user in the app's settings and grant it
  access to your home. You can then configure the integration using this account's
  credentials. This is also more secure, as this user should be less priviledged.
</div>

```yaml
# Example configuration.yaml entry
smarthab:
  email: EMAIL_ADDRESS
  password: PASSWORD
```

{% configuration %}
email:
  description: The email address of your SmartHab account.
  required: true
  type: string
password:
  description: The SmartHab account's password.
  required: true
  type: string
{% endconfiguration %}
