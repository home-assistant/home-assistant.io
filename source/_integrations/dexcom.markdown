---
title: Dexcom
description: Instructions on how to integrate your Dexcom CGM data into Home Assistant.
ha_category:
  - Sensor
ha_release: 0.113
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@gagebenne'
ha_domain: dexcom
ha_platforms:
  - sensor
ha_integration_type: integration
---

The Dexcom integration allows you to view your CGM data from [Dexcom](https://www.dexcom.com/) in Home Assistant.

## Prerequisites

You will need to set up the Dexcom Share feature in your Dexcom [G6](https://provider.dexcom.com/education-research/cgm-education-use/videos/setting-dexcom-share-and-follow) or [G7](https://www.dexcom.com/faqs/how-do-i-share-my-dexcom-g7-glucose-data-with-followers) app to use this integration. Enabling the Dexcom Share service requires setup of at least one follower. The integration will use the Dexcom user's credentials, not the follower's credentials.

Your Dexcom account must have an email address—not a phone number—as its primary user ID. If you normally log into your Dexcom account using a phone number, then this integration will not work. It is unfortunately not possible to change from a phone to email user ID after an account is created, so you will need to create a new Dexcom account in this case.

{% include integrations/config_flow.md %}

{% note %}
Some people have had problems with connecting when their Dexcom passwords are entirely numeric. If you have connection issues in that case, try changing your password to something with a mix of numbers and letters.
{% endnote %}

### Server

There are two Dexcom Share servers, `US` for United States customers, and `OUS` for all customers outside of the United States.

### Unit of measurement

The integrations allow both `mg/dL` and `mmol/l` units of measurement for blood glucose values. To change your preferred unit of measurement, go to **Settings** -> **Devices & services** in the UI, and click `OPTIONS`.

## Sensor

If you have a sensor session running, and once you have enabled the Dexcom integration, you should see the following sensors:

- Blood glucose value sensor
- Blood glucose trend sensor

## Example automation

```yaml
- alias: "Overnight low kitchen lights"
  description: "Turn on the lights in the kitchen if my blood sugar drops low overnight"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.dexcom_YOUR_USERNAME_glucose_value
      below: 65
  conditions:
    - condition: time
      after: "22:00:00"
      before: "06:00:00"
  actions:
    - action: light.turn_on
        target:
          entity_id: light.kitchen
```
