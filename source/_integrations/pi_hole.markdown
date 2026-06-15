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
ha_integration_type: device
---

The **Pi-hole** {% term integration %} allows you to retrieve statistics and interact with a
[Pi-hole](https://pi-hole.net/) system.

{% include integrations/config_flow.md %}

During the setup, it will ask for the following:

| Item | Description | Example |
| ---- | ----------- | ------- |
| `Host` | The IP or domain name of your Pi-hole. | 192.168.1.1 |
| `Port` | Port used to get to the admin page, typically `80` for `http` connections and `443` for `https` connections. | 80 |
| `Name` | Name for this Pi-hole. | Pi-hole |
| `Location` | The path to the admin page. This is ignored for the Pi-hole version 6 API. | /admin |
| `App password or API key` | The credential used to authenticate with Pi-hole. See below for details on where to find it for Pi-hole v6 and for older versions. | `585a2fe...` |
| `Uses an SSL certificate` | Whether your Pi-hole uses a certificate, typically true for `https` connections and false for `http`. | {% icon "openmoji:check-mark" %} |
| `Verify SSL certificate` | Whether to verify your Pi-hole's certificate. Ignored in Pi-hole API version 5. | {% icon "openmoji:check-mark" %} |

The combined host, port, and location should take you to the login page of Pi-hole. Using the example above, it would be `http://192.168.1.1:80/admin`.

### Pi-hole v6 and later


For Pi-hole v6 and later, the integration uses an app password. To find it, log into your Pi-hole and go to **Settings** > **Web Interface/API**. Switch from **Basic** to **Expert** mode, then select **Configure app password**. Your admin login password may be used instead, but this is not recommended. 

For Pi-hole v5 and earlier, see below.


### Pi-hole v5 and earlier

For Pi-hole versions before v6, the integration uses an _API token_ if the Pi-hole was password-protected. To find it, go to **Settings** > **API** and select **Show API token**.

## Actions

The platform provides the following actions to interact with your Pi-hole. Use switch entities when calling the actions.

### Action: Disable

The `pi_hole.disable` action disables configured Pi-hole(s) for the specified amount of time.

| Data attribute | Required | Type | Description |
| ---------------------- | -------- | -------- | ----------- |
| `entity_id` | `False` | string | Target switch entity. Use `all` to target all Pi-hole services. |
| `duration` | `True` | timedelta | Time for which Pi-hole should be disabled. `'0'` will enable blocking indefinitely. |

Example action:

```yaml
# Example action to disable Pi-hole for 30 minutes
action: pi_hole.disable
data:
  duration: "00:30"
target:
  entity_id: all
```

## Switches

The integration creates a switch for the Pi-hole allowing you to toggle ad-blocking on and off.

## Sensors

The integration creates several sensors that report various ad-blocking metrics as well as diagnostic information about the Pi-hole itself.
