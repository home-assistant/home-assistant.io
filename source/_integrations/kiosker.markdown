---
title: Kiosker
description: Instructions on how to integrate Kiosker with Home Assistant
ha_category:
  - Sensor
  - Switch
ha_release: 2025.10.0
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@claeysson'
ha_domain: kiosker
ha_platforms:
  - sensor
  - switch
ha_integration_type: integration
ha_dhcp: true
ha_quality_scale: silver
---

[Kiosker](https://kiosker.io) is a powerful yet easy-to-use web kiosk for iPad and iPhone. This integration gives you control over your Kiosker app via the Kiosker API.

## Requirements

This integration requires that you have bought Kiosker Pro or have a valid Kiosker subscription. You can try Kiosker, including this integration for free for 7 days.

You need to enable the API server in Kiosker settings. You also need to generate an access token, and find the IP address of the device. Please refer to the [Kiosker documentation](https://docs.kiosker.io/#/api) for further information on how to configure the Kiosker App.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The IP address or hostname of the device.
Port:
  description: The port on which the Kiosker API is running (default 8081).
API Token:
  description: The generated API token from the Kiosker App.
Use SSL:
  description: Connect to the Kiosker App using HTTPS. The Kiosker API has to be configured for SSL.
Verify certificate:
  description: Verify SSL certificate. Enable for valid certificates only.
{% endconfiguration_basic %}

## Capabilities

{% note %}
Due to Apple's restrictive approach to device control, it's not possible to control any physical features like the screen or device sleep through this integration.
{% endnote %}

The following is available as sensors:

- Battery level
- Battery state
- Blackout state
- Last interaction
- Last motion (if a screensaver with motion detection is scheduled or if camera sensor is enabled)
- Ambient light (if a screensaver with motion detection is scheduled or if camera sensor is enabled)
- Last poll
- Screensaver visibility

The following controls are available:

- Disable screensaver

## Actions

**Action `navigate_url`**

Navigate to a specific URL.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `url` | no | The URL to navigate to |

Example:

```yaml
action: kiosker.navigate_url
data:
  url: "https://home-assistant.io"
target:
  device_id: fc9269e63ceba7bab14d5368ab688be9
```

**Action `navigate_refresh`**

Refresh the current page.

Example:

```yaml
action: kiosker.navigate_refresh
target:
  device_id: fc9269e63ceba7bab14d5368ab688be9
```

**Action `navigate_home`**

Navigate to the home page.

Example:

```yaml
action: kiosker.navigate_home
target:
  device_id: fc9269e63ceba7bab14d5368ab688be9
```

**Action `navigate_backward`**

Navigate to the previous page in history.

Example:

```yaml
action: kiosker.navigate_backward
target:
  device_id: fc9269e63ceba7bab14d5368ab688be9
```

**Action `navigate_forward`**

Navigate to the next page in history.

Example:

```yaml
action: kiosker.navigate_forward
target:
  device_id: fc9269e63ceba7bab14d5368ab688be9
```

**Action `print`**

Print the current page.

Example:

```yaml
action: kiosker.print
target:
  device_id: fc9269e63ceba7bab14d5368ab688be9
```

**Action `clear_cookies`**

Clear all cookies.

Example:

```yaml
action: kiosker.clear_cookies
target:
  device_id: fc9269e63ceba7bab14d5368ab688be9
```

**Action `clear_cache`**

Clear the browser cache.

Example:

```yaml
action: kiosker.clear_cache
target:
  device_id: fc9269e63ceba7bab14d5368ab688be9
```

**Action `screensaver_interact`**

Interact with the screensaver. This simulates a tap on the screen.

Example:

```yaml
action: kiosker.screensaver_interact
target:
  device_id: fc9269e63ceba7bab14d5368ab688be9
```

**Action `blackout_set`**

Set blackout screen with custom message.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `visible` | yes | Whether the blackout is visible |
| `text` | yes | Text to display on blackout screen |
| `background` | yes | Background color in hex format |
| `foreground` | yes | Text color in hex format |
| `icon` | yes | Icon to display (SF Symbols name) |
| `expire` | yes | Time in seconds before the blackout expires |
| `dismissible` | yes | Whether the blackout can be dismissed by user interaction |
| `button_background` | yes | Background color of the dismiss button in hex format |
| `button_foreground` | yes | Text color of the dismiss button in hex format |
| `button_text` | yes | Text to display on the dismiss button |
| `sound` | yes | Sound to play when the blackout is displayed (SystemSoundID, e.g., 1007) |

Example:

```yaml
action: kiosker.blackout_set
data:
  visible: true
  text: "Maintenance in progress"
  background: "#000000"
  foreground: "#ffffff"
  icon: "wrench"
  expire: 300
  dismissible: true
  button_text: "Dismiss"
target:
  device_id: fc9269e63ceba7bab14d5368ab688be9
```

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}