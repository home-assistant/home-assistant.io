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

You will need to set up the [Dexcom Share](https://provider.dexcom.com/education-research/cgm-education-use/videos/setting-dexcom-share-and-follow) feature in your Dexcom G6 App to use this integration. Enabling the Dexcom Share service requires setup of at least one follower. The integration will use the Dexcom user's credentials, not the follower's credentials.

{% include integrations/config_flow.md %}

<div class='note warning'>
Some people have had problems with connecting when their Dexcom passwords are entirely numeric. If you have connection issues in that case, try changing your password to something with a mix of numbers and letters.
</div>

### Server

There are two Dexcom Share servers, `US` for United States customers, and `OUS` for all customers outside of the United States.

### Unit of measurement

The integrations allows both `mg/dL` and `mmol/l` units of measurement for blood glucose values. To change your preferred unit of measurement, go to **Settings** -> **Devices & Services** in the UI, and click `OPTIONS`.

## Sensor

If you have a sensor session running, and once you have enabled the Dexcom integration, you should see the following sensors:

- Blood glucose value sensor
- Blood glucose trend sensor

## Example Automation

```yaml
- id: '1234567890123'
  alias: "overnight_low_kitchen_lights"
  description: Turn on the lights in the kitchen if my blood sugar drops low overnight
  trigger:
  - below: '65'
    entity_id: sensor.dexcom_YOUR_USERNAME_glucose_value
    platform: numeric_state
  condition: time
    after: "22:00:00"
    before: "06:00:00"
  action:
  - service: light.turn_on
      target:
        entity_id: light.kitchen
```
