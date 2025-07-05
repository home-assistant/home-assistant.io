---
title: Alexa Devices
description: Instructions on how to integrate Alexa Devices into Home Assistant.
ha_category:
  - Binary Sensor
  - Notify
  - Sensor
  - Switch
ha_release: '2025.6'
ha_domain: alexa_devices
ha_config_flow: true
ha_codeowners:
  - '@chemelli74'
ha_iot_class: Cloud Polling
ha_platforms:
  - binary_sensor
  - diagnostics
  - notify
  - sensor
  - switch
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Alexa Devices** {% term integration %} lets you control Alexa-enabled devices connected to your Amazon account.

The integration provides information on connected devices and enables control of the main features.

## Supported devices

There is support for the following device families within Home Assistant:

- **Amazon Echo Auto**
- **Amazon Echo Dot**
- **Amazon Echo Flex**
- **Amazon Echo Plus**
- **Amazon Echo Show**
- **Amazon Fire TV Stick**
- **Amazon Fire Tablet**

- **Third-party devices** with built-in Alexa capabilities.

{% warning %}

This integration requires multifactor authentication using an authentication app (such as Microsoft Authenticator, for example). To enable MFA, in your Amazon account settings select **Login & Security** > **2-step verification** > **Backup methods** > **Add new app**. See [Amazon's documentation](https://www.amazon.com/gp/help/customer/display.html?nodeId=G9MX9LXNWXFKMJYU) for more information.

{% endwarning %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
  country:
    description: The country of your Amazon account.
  username:
    description: The email address of your Amazon account.
  password:
    description: The password of your Amazon account.
  otp:
    description: One-time password via Authenticator App.
{% endconfiguration_basic %}

{% note %}
When trying to set up the integration, the form may show the message "Cannot connect".
This means that the specified country may need a special setting.
Open a issue with all details to investigate
{% endnote %}

## Examples

### Automation: Announce welcome when you arrive home

```yaml
automation:
- alias: "Alexa Announce"
  id: "alexa_announce"
  triggers:
    - platform: state
      entity_id: person.simone
      to: "home"
  actions:
    - action: notify.send_message
      data:
        message: Welcome home Simone
      target:
        entity_id: notify.echo_dot_livingroom_announce
```

## Data updates

This integration {% term polling polls %} data from the device every 30 seconds by default.

## Supported functionality

The **Alexa Devices** {% term integration %} provides the following entities:

- Binary sensor - main and Bluetooth connectivity
- Notify - Speak and Announce notifications
- Sensor - temperature and illuminance sensors
- Switch - Do not disturb

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
