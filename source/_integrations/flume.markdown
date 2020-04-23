---
title: flume
description: Documentation about the flume sensor.
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 0.103
ha_config_flow: true
ha_codeowners:
  - '@ChrisMandich'
  - '@bdraco'
ha_domain: flume
---

The `flume` sensor will show you the current [flume](https://portal.flumetech.com/) status for the given Device ID.

Flume monitors the real-time status of your home water meter. Allowing the end-user to detect small leaks, gain real-time information on household water consumption, set water goals and budgets, and receive push notifications when suspicious water activities occur. 

## Configuration

You can find your Client ID and Client Secret under "API Access" on the [settings page](https://portal.flumetech.com/#settings). 

To add `Flume` to your installation, go to **Configuration** >> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **Flume**.

Alternatively, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  # Flume
  - platform: flume
    username: YOUR_FLUME_USERNAME
    password: YOUR_FLUME_PASSWORD
    client_id: YOUR_FLUME_CLIENT_ID
    client_secret: YOUR_FLUME_CLIENT_SECRET
```

{% configuration %}
username:
  description: Your flume user id.
  required: true
  type: string
password:
  description: Your flume password.
  required: true
  type: string
client_id:
  description: Your flume Client ID.
  required: true
  type: string
client_secret:
  description: Your flume Client Secret.
  required: true
  type: string
name:
  description: A name to display on the sensor.
  required: false
  default: Flume Sensor
  type: string
{% endconfiguration %}

# Configuration for Binary Sensor

The following YAML creates a binary sensor. This requires the default sensor to be configured successfully.

{% raw %}

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: template
    sensors:
      flume_status:
        friendly_name: "Flume Flow Status"
        value_template: >-
          {{ states.sensor.flume_sensor.state != "0" }}
```

{% endraw %}
