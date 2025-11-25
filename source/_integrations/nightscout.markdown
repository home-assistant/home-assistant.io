---
title: Nightscout
description: Instructions on how to integrate your Nightscout CGM data into Home Assistant.
ha_category:
  - Sensor
ha_release: 0.115
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@marciogranzotto'
ha_domain: nightscout
ha_platforms:
  - sensor
ha_integration_type: integration
---

The Nightscout integration allows you to view your CGM data from [Nightscout](http://www.nightscout.info/) in Home Assistant.

{% include integrations/config_flow.md %}

If your Nightscout instance requires authentication for API access, you are also required to input the API Key in the configuration form.

### Sensor

If you have a sensor session running, and you have enabled the Nightscout integration, you should see a `sensor.blood_glucose` entity.

The icon changes to indicate the direction or trend, of the glucose readings.
The state is the last reading from Nightscout, and you can see other information about the reading in the sensor's attributes.

### Example automation

```yaml
- alias: "overnight_low_kitchen_lights"
  description: Turn on the lights in the kitchen if my blood sugar drops low overnight
  triggers:
  - trigger: numeric_state
    entity_id: sensor.blood_glucose
    below: "65" 
  conditions:
    - condition: time
      after: "22:00:00"
      before: "06:00:00"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.kitchen
```
