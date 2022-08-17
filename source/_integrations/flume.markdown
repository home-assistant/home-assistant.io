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
  - binary_sensor
  - sensor
---

The `flume` sensor will show you the current [flume](https://portal.flumewater.com) status for the given Device ID.

Flume monitors the real-time status of your home water meter. Allowing the end-user to detect small leaks, gain real-time information on household water consumption, set water goals and budgets, and receive push notifications when suspicious water activities occur. 

{% include integrations/config_flow.md %}

You can find your Client ID and Client Secret under "API Access" on the [settings page](https://portal.flumewater.com/#settings).

The Flume API access is available to Flume Insight users only, which may require a paid subscription.

To add `Flume` to your installation, go to **Configuration** >> **Devices & Services** in the UI, click the button with `+` sign and from the list of integrations select **Flume**.

## Notifications

Flume notifications are available via 3 binary sensors. These senors will read the notification state from flume, and if there is an active notification they will report its state. In order to clear the notifications you will need to use your flume app or go to: [https://portal.flumewater.com/notifications]([https://portal.flumewater.com/notifications]) and clear the notification in question.

The sensors are:

* Bridge disconnected
* High flow
* Leak detected


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
