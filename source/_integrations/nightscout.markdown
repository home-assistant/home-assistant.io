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
ha_quality_scale: platinum
---

The Nightscout integration allows you to view your CGM data from [Nightscout](http://www.nightscout.info/) in Home Assistant.

## Configuration

To add `Nightscout` to your installation, go to **Configuration** >> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **Nightscout**.

Then input your server address in the `URL` field. For example:

- `https://localhost:5423`
- `https://your-app-name.herokuapp.com`

If your Nightscout instance requires authentication for API access, you are also required to input the API Key in the configuration form.

### Sensor

If you have a sensor session running, and you have enabled the Nightscout integration, you should see a `sensor.blood_glucose` entity.

The icon changes to indicate the direction or trend, of the glucose readings.
The state is the last reading from Nightscout, and you can see other information about the reading in the sensor's attributes.

### Example Automation

```yaml
- id: '1234567890123'
  alias: overnight_low_kitchen_lights
  description: Turn on the lights in the kitchen if my blood sugar drops low overnight
  trigger:
  - below: '65'
    entity_id: sensor.blood_glucose
    platform: numeric_state
  condition: time
    after: '22:00:00'
    before: '06:00:00'
  action:
  - service: light.turn_on
      data:
        entity_id: light.kitchen
```
