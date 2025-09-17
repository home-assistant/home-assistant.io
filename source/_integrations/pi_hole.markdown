---
title: Pi-hole
description: Instructions on how to integrate Pi-hole with Home Assistant.
ha_category:
  - Sensor
  - Switch
  - System monitor
  - Update
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: 0.28
ha_codeowners:
  - '@shenxn'
ha_domain: pi_hole
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
  - switch
  - update
ha_integration_type: integration
---

The Pi-hole integration allows you to retrieve statistics and interact with a
[Pi-hole](https://pi-hole.net/) system.

{% include integrations/config_flow.md %}

During the setup, it will ask for the following:

| Item | Description | Example |
| ---- | ----------- | ------- |
| `Host` | The IP or domain name to Pi-Hole. | 192.168.1.1 |
| `Port` | Port used to get to the admin page, typically `80` for `http` connections and `443` for `https` connections. | 80 |
| `Name` | Name to for this Pi-Hole. | Pi-Hole |
| `Location` | the path to the admin page. In the version 6 API this will be ignored. | /admin |
| `API Key or App Password` | This can be found in your Pi-hole's **Settings** > **API (expert mode)**. | `585a2fe...` |
| `Uses an SSL certificate` | Whether your Pi-hole has an Certificate, typically true for `https` connections and false for `http`. | {% icon "openmoji:check-mark" %} |
| `Verify SSL certificate` | Whether to use verify your Pi-hole's certificate, ignored in Pi-hole API version 5. | {% icon "openmoji:check-mark" %} |

The combined host, port and location should take you to the login page of Pi-Hole. Using the example above, it would be `http://192.168.1.1:80/admin`.

To find your App Password, log into your Pi-Hole and go to **Settings** > **Web Interface/API**. Switch from **Basic** to **Expert** mode, then select **Configure app password**.

Versions of Pi-hole before version 6 (released in Feb 2025) use an API Key if the Pi-hole was password protected, this can be found in _Settings > API Tab_ and clicking **Show API token**

## Actions

The platform provides the following actions to interact with your Pi-hole. Use switch entities when calling the actions.

### Action `pi_hole.disable`

Disables configured Pi-hole(s) for the specified amount of time.

| Data attribute | Required | Type | Description |
| ---------------------- | -------- | -------- | ----------- |
| `entity_id` | `False` | string | Target switch entity. Use `all` to target all Pi-hole services. |
| `duration` | `True` | timedelta | Time for which Pi-hole should be disabled. `'0'` will enable blocking indefinitely. |

Example action:

```yaml
# Example action to disable Pi-Hole for 30 minutes
action: pi_hole.disable
data:
  duration: '00:30'
target:
  entity_id: all
```

## Switches

The integration creates a switch for the Pi-hole allowing you to toggle the Pi-hole on and off.
