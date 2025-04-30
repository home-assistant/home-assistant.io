---
title: ThermoWorks Smoke
description: Pulls temperature data for a ThermoWorks Smoke Thermometer connected with Smoke Gateway.
ha_category:
  - Sensor
ha_release: 0.81
ha_iot_class: Cloud Polling
ha_domain: thermoworks_smoke
ha_platforms:
  - sensor
ha_integration_type: integration
ha_quality_scale: legacy
---

The `thermoworks_smoke` sensor platform pulls data for your [ThermoWorks Smoke Thermometer](https://www.thermoworks.com/Smoke).
This requires a [Smoke WiFi Gateway](https://www.thermoworks.com/Smoke-Gateway) with an internet connection.

You will need to have previously registered your smoke to your account via the mobile app and provide
the email and password you used to in the configuration for this sensor in order to connect and pull your data.

## Configuration

To add the sensors to your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: thermoworks_smoke
    email: "your email here"
    password: !secret thermoworks_pass
```

{% configuration %}
email:
  description: The email address with the device registered in the thermoworks smoke mobile app.
  required: true
  type: string
password:
  description: The password registered in the thermoworks smoke mobile app.
  required: true
  type: string
monitored_conditions:
  description: The sensors to add. Default is `probe1` and `probe2`. The full list is `probe1`, `probe2`, `probe1_min`, `probe1_max`, `probe2_min`, `probe2_max`.
  required: false
  type: list
exclude:
  description: Device serial numbers to ignore.
  required: false
  type: list
{% endconfiguration %}

## Examples

This section includes some examples of how to use this sensor.

### Only Probe 1

This will show only Probe 1 with min and max data.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: thermoworks_smoke
    email: "your email here"
    password: !secret thermoworks_pass
    monitored_conditions:
    - probe1
    - probe1_min
    - probe1_max
```

### Ignore a Device

This will exclude a device from creating sensors. You would replace `"00:00:00:00:00:00"` with your device's serial number.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: thermoworks_smoke
    email: "your email here"
    password: !secret thermoworks_pass
    exclude:
    - "00:00:00:00:00:00"
```

### Notify when Probe 1 goes above a certain temperature

This will use an automation to trigger a notification when Probe 1 goes above a temperature stored in an input_number variable.
By default, your smoke is named "My Smoke" in the app. If you have changed it you will need to change the sensor name from `my_smoke_probe_1` to `your_name_probe_1`.

{% raw %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: thermoworks_smoke
    email: "your email here"
    password: !secret thermoworks_pass

input_number:
  smoke_probe_1_threshold:
    name: Smoke Probe 1 Threshold
    min: -40
    max: 500
    step: 0.5
    unit_of_measurement: "°F"
    icon: mdi:thermometer

automation:
  - alias: "Alert when My Smoke Probe 1 is above threshold"
    triggers:
      - trigger: template
        value_template: >-
          {% if (states("sensor.my_smoke_probe_1") | float) > (states("input_number.smoke_probe_1_threshold") | float) %}
            True
          {% else %}
            False
          {% endif %}
    actions:
      - action: notify.all
        data:
          message: >
            {{- state_attr('sensor.my_smoke_probe_1','friendly_name') }} is above
            {{- ' '+states("input_number.smoke_probe_1_threshold") -}}
            {{- state_attr('sensor.my_smoke_probe_1','unit_of_measurement') }} at
            {{- ' '+states("sensor.my_smoke_probe_1") -}}
            {{- state_attr('sensor.my_smoke_probe_1','unit_of_measurement') }}
```

{% endraw %}
