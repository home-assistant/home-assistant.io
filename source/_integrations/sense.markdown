---
title: Sense
description: Instructions on how to integrate Sense within Home Assistant.
logo: sense.png
ha_category:
  - Energy
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 0.82
ha_codeowners:
  - '@kbickar'
---

Integrate your [Sense](https://sense.com) meter information into Home Assistant.

<div class='note warning'>
In version 0.107, the binary sensors for each detected device are now sensors that show their power usage in Watts.

If you still need a binary sensor, you can create a `Template Binary Sensor` for each device you need. The following example does this:

```yaml
binary_sensor:
  - platform: template
    sensors:
      fridge:
        value_template: "{{ states('sensor.fridge') }}"
        friendly_name: 'Fridge'
        device_class: power
        icon_template: "{{ state_attr('sensor.fridge','icon') }}"
```
</div>

There is currently support for the following device types within Home Assistant:

- Sensor

## Configuration

To enable this sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sense:
  email: CLIENT_ID
  password: CLIENT_SECRET
```

{% configuration %}
email:
  description: The email associated with your Sense account/application.
  required: true
  type: string
password:
  description: The password for your Sense account/application.
  required: true
  type: string
timeout:
  description: Seconds for timeout of API requests.
  required: false
  type: integer
{% endconfiguration %}

Sensors are added for both usage and production with the following names:

- **Active Usage/Production**: Current active power usage/production in Watts. Updated every 60 seconds.
- **Daily/Weekly/Monthly Usage/Production**: Daily/Weekly/Monthly power usage/production in kWh. Updated every 5 minutes.

Sensors are created for each of the devices detected by your Sense monitor to show their power usage in Watts.
