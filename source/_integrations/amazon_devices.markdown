---
title: Amazon Devices
description: Instructions on how to integrate Amazon Devices into Home Assistant.
ha_category:
  - Binary Sensor
ha_release: '2025.6'
ha_domain: amazon_devices
ha_config_flow: true
ha_codeowners:
  - '@chemelli74'
ha_iot_class: Local Polling
ha_platforms:
  - binary_sensor
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Amazon Devices** {% term integration %} allows you to control your [Amazon Echo dots](https://www.amazon.com/echo-dot/).

The integration provides information on connected devices and enables control of the main features.

## Supported devices

There is support for the following devices within Home Assistant:

- **Amazon Echo Dot**
- **Amazon Fire TV**

{% include integrations/config_flow.md %}

{% configuration_basic %}
  country:
    description: The country of your Amazon account.
  username:
    description: The email address of your Amazon account.
  password:
    description: The password of your Amazon account.
  otp:
    description: One-time password.
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
        entity_id: notify.announce_echo_dot_livingroom
```

### Automation: Start Radio on all Echo dots

```yaml
automation:
- alias: Start Radio B.B.C.
  id: "start_radio_bbc"
  trigger:
   - platform: sun
     event: sunset
  condition:
    conditions:
      - alias: "condition alias (home)"
        condition: state
        entity_id: group.person_family
        state: "home"
  action:
    - action: notify.send_message
      data:
        message: Play B.B.C. on Tunein
      target:
        entity_id: notify.custom_everywhere
```

## Data updates

This integration {% term polling polls %} data from the device every 30 seconds by default.

## Supported functionality

The **Amazon Devices** {% term integration %} provides the following entities:

- Binary sensor - main and Bluetooth connectivity

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
