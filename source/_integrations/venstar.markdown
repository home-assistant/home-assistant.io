---
title: Venstar
description: Instructions for how to integrate Venstar WiFi thermostats within Home Assistant.
ha_category:
  - Climate
ha_release: 0.62
ha_iot_class: Local Polling
ha_domain: venstar
ha_platforms:
  - climate
---

The `venstar` climate platform allows you to control [Venstar](https://www.venstar.com/) thermostats from Home Assistant.
Venstar thermostats feature a local API that allows for automation without the need for their Skyport cloud service.

Currently supported and tested thermostats:

- ColorTouch T7900  
- ColorTouch T7850  (No Humidity control)
- Explorer Mini T2000

Currently supported functionality:
- Setting heat/cool temperature when the thermostat is in the appropriate mode.
- Changing the operation mode of the thermostat (heat/cool/off/auto)
- Turning the fan on/off
- Reading and setting the humidity level and limits (T7900 only)
- Turning on away preset
- Turning on hold mode preset

The following values are supported for the preset_mode state attribute:
- `none`: *Enables* the scheduling functionality.
- `temperature`: *Disables* the schedule and holds the set temperature indefinitely.
- `away`: Places the thermostat in away mode

Note - Please ensure that you update your thermostat to the latest firmware. Initially tested on firmware 5.10 and currently VH6.79.  

Local API mode needs to be enabled via the thermostat's *Menu > WiFi > Local API Options > Local API - ON*

To set it up, add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
climate:
  - platform: venstar
    host: IP_OR_HOSTNAME_OF_THERMOSTAT
```

{% configuration %}
host:
  description: Address of your thermostat, e.g., 192.168.1.32.
  required: true
  type: string
username:
  description: Username for the thermostat.
  required: false
  type: string
password:
  description:  Password for the thermostat.
  required: false
  type: string
pin:
  description: Pin for Lockscreen (required if lock screen enabled)
  required: false
  type: string
ssl:
  description: Whether to use SSL or not when communicating.
  required: false
  type: boolean
  default: false
timeout:
  description: Number of seconds for API timeout.
  required: false
  type: integer
  default: 5
humidifier:
  description: Report humidity and expose humidifier setpoints.
  required: false
  type: boolean
  default: true
{% endconfiguration %}

## Full configuration sample

```yaml
# Example configuration.yaml entry
climate:
  - platform: venstar
    host: IP_OR_HOSTNAME_OF_THERMOSTAT
    ssl: true
    username: OPTIONAL_AUTH_USER_HERE
    password: OPTIONAL_AUTH_PASS_HERE
    pin: LOCKSCREEN_PIN
    timeout: 5
    humidifier: false
```
