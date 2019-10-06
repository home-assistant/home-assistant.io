---
title: "flume"
description: "Documentation about the flume sensor."
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 0.99.3
---

The `flume` sensor will show you the current [flume](https://portal.flumetech.com/) status for the given Device ID.

Flume monitors real-time status of your home water meter. Allowing the end user to detect small leaks, gain real-time information on household water consumption, set water goals and budgets, and receive push notifications when suspicious water activities occur. 

## Configuration

You can find your Client ID and Client Secret under "API Access" on the [settings page](https://https://portal.flumetech.com/#settings). 

You can find your Device ID using the [Dashboard](https://portal.flumetech.com/#dashboard). Review this page using Chrome inspect Network Tab. Refresh the page and select the "query" that loads. Review the Request URL in the Header field. Copy the Device ID from the URL listed in the Header field: "https://api.flumetech.com/users/'user_id'/devices/'device_id'/query"

The timezone is configure using the 'pytz' library. For a list of available time zones please reference this [StackOverFlow](https://stackoverflow.com/questions/13866926/is-there-a-list-of-pytz-timezones) Article. 

To enable the flume sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  # Flume
  - platform: Flume
    username: YOUR_FLUME_USERNAME
    password: YOUR_FLUME_PASSWORD
    client_id: YOUR_FLUME_CLIENT_ID
    client_secret: YOUR_FLUME_CLIENT_SECRET
    time_zone: YOUR_TIME_ZONE
    device_id: YOUR_FLUME_DEVICE_ID
```

# Configuration Variables

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
device_id:
  description: Your flume Device ID.
  required: true
  type: string
time_zone:
  description: The time zone your flume device is reporting in.
  required: true
  type: string
name:
  description: A name to display on the sensor.
  required: false
  default: Flume Sensor
  type: string
{% endconfiguration %}

# Configuration for Binary Sensor

Following YAML will create a binary sensor. This requires the default sensor to be configured successfully.

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
