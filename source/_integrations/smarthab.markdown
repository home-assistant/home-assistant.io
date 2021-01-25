---
title: SmartHab
description: Instructions on how to integrate SmartHab devices into Home Assistant
ha_release: 0.94
ha_category:
  - Hub
  - Cover
  - Light
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@outadoc'
ha_domain: smarthab
---

If your home is fitted with [SmartHab](https://smarthab.fr/index.php/home-en)'s 
devices and you have access to their app-based services, you will be able 
to control your lights and shutters with the SmartHab integration for Home 
Assistant.

## Configuration

<div class='note warning'>
  To prevent being automatically logged out of your SmartHab mobile app, you
  might want to create a secondary user in the app's settings and grant it
  access to your home. You can then configure the integration using this account's
  credentials. This is also more secure, as this user should be less priviledged.
</div>

To add the SmartHab integration to your installation, go to **Configuration** >> 
**Integrations** in the UI, click the button with `+` sign and from the list of 
integrations select **SmartHab**.

Alternatively, add the following lines to your `configuration.yaml` file:

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
