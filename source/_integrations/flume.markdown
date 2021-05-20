---
title: Flume
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
ha_dhcp: true
ha_platforms:
  - sensor
---

The `flume` sensor will show you the current [flume](https://portal.flumewater.com) status for the given Device ID.

Flume monitors the real-time status of your home water meter. Allowing the end-user to detect small leaks, gain real-time information on household water consumption, set water goals and budgets, and receive push notifications when suspicious water activities occur. 

{% include integrations/config_flow.md %}

You can find your Client ID and Client Secret under "API Access" on the [settings page](https://portal.flumewater.com/#settings). 

To add `Flume` to your installation, go to **Configuration** >> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **Flume**.

## Configuration for Binary Sensor

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
