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
  - '@jeeftor'
ha_domain: flume
ha_dhcp: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `flume` sensor will show you the current [flume](https://portal.flumewater.com) status for the given Device ID.

Flume monitors the real-time status of your home water meter. Allowing the end-user to detect small leaks, gain real-time information on household water consumption, set water goals and budgets, and receive push notifications when suspicious water activities occur. 

{% include integrations/config_flow.md %}

You can find your Client ID and Client Secret under "API Access" on the [settings page](https://portal.flumewater.com/#settings).

The Flume API access is available to Flume Insight users only, which may require a paid subscription.

To add `Flume` to your installation, go to **Settings** -> **Devices & Services** in the UI, click the button with `+` sign and from the list of integrations select **Flume**.

## Configuration for Binary Sensor

The following YAML creates a binary sensor. This requires the default sensor to be configured successfully.

{% raw %}

```yaml
# Example configuration.yaml entry
template:
  - binary_sensor:
    - name: "Flume Flow Status"
      state: >-
        {{ states('sensor.flume_sensor') != "0" }}
```

{% endraw %}
