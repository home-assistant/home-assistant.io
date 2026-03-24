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
ha_integration_type: service
---

The **Dexcom** {% term integration %} allows you to view your CGM data from [Dexcom](https://www.dexcom.com/) in Home Assistant.

## Prerequisites

You will need to set up the Dexcom Share feature in your Dexcom [G6](https://provider.dexcom.com/education-research/cgm-education-use/videos/setting-dexcom-share-and-follow) or [G7](https://www.dexcom.com/faqs/how-do-i-share-my-dexcom-g7-glucose-data-with-followers) app to use this integration. Enabling the Dexcom Share service requires setup of at least one follower. The integration will use the Dexcom user's credentials, not the follower's credentials.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
    description: "Username, email address, or phone number. Format phone numbers with a `+`, your country code, then your phone number."
Region:
    description: "The Dexcom Share API endpoint, one of US, Outside of US, Japan."
{% endconfiguration_basic %}

## Troubleshooting

Validate your Dexcom account credentials by logging on to the Dexcom Account Management website for your region:

For users in the United States: [uam1.dexcom.com](uam1.dexcom.com).
For users outside of the United States: [uam2.dexcom.com](uam2.dexcom.com).
For users in Japan: [uam.dexcom.jp](uam.dexcom.jp).

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
