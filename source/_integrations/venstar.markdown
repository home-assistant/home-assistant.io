---
title: Venstar
description: Instructions for how to integrate Venstar WiFi thermostats within Home Assistant.
ha_category:
  - Binary sensor
  - Climate
  - Sensor
ha_release: 0.62
ha_iot_class: Local Polling
ha_domain: venstar
ha_platforms:
  - binary_sensor
  - climate
  - sensor
ha_codeowners:
  - '@garbled1'
  - '@jhollowe'
ha_config_flow: true
ha_integration_type: integration
---

The **Venstar** climate {% term integration %} allows you to control [Venstar](https://www.venstar.com/) thermostats from Home Assistant.
Venstar thermostats feature a local API that allows for automation without the need for their Skyport cloud service.

Currently supported and tested thermostats:

- ColorTouch T7900  
- ColorTouch T7850  (No Humidity control)
- Explorer Mini T2000
- Explorer IAQ T3950

Currently supported functionality:

- Setting heat/cool temperature when the thermostat is in the appropriate mode.
- Changing the operation mode of the thermostat (heat/cool/off/auto)
- Turning the fan on/off
- Reading and setting the humidity level and limits (T7900 only)
- Turning on away preset
- Turning on hold mode preset
- Remote temperature sensors
- Thermostat alerts (Filter replacement/etc)
- Reading IAQ and CO2 levels (on supported devices, e.g. T3950, only)
- Reading the current schedule state (morning/day/evening/night/inactive)

The following values are supported for the preset_mode state attribute:

- `none`: *Enables* the scheduling functionality.
- `temperature`: *Disables* the schedule and holds the set temperature indefinitely.
- `away`: Places the thermostat in away mode

Note - Please ensure that you update your thermostat to the latest firmware. Initially tested on firmware 5.10 and currently VH6.79.  

### Enabling local API

Local API mode needs to be enabled on the thermostat itself. It cannot be enabled using the Venstar mobile apps or Skyport cloud service. Exact steps vary across different [series](https://venstar.com/thermostats/) of thermostats:

- [ColorTouch](https://venstar.com/thermostats/colortouch/)
  - **Menu** > **WiFi** > **Local API Option** > **[Local API - ON](https://www.youtube.com/watch?v=kB_HcJ3kqCg&t=51s)**.

- [EXPLORER](https://venstar.com/thermostats/explorer/) / [EXPLORER IAQ](https://venstar.com/thermostats/explorer-iaq/)
  - Press **SETUP**.
  - Press **MODE** repeatedly until you see [LOCAL API](https://www.youtube.com/watch?v=HRmWFwfQAhU&t=276s).
  - Press **WARMER** to toggle "ON".
  - Press **SETUP** to exit.

- [EXPLORER Mini](https://venstar.com/thermostats/explorermini/)
  - Press and hold **MODE** + **FAN** together for 5 seconds.
  - Press **MODE** repeatedly until you see "API".
  - Press **WARMER** to toggle "ON".
  - Press **MODE** + **FAN** together to exit.

If the local API is successfully enabled on the thermostat, you should see some basic API info when you navigate to its IP address in a web browser:

```json
{"api_ver":7,"type":"commercial","model":"VYG-4800","firmware":"2.22.19"}
```

{% include integrations/config_flow.md %}

{% configuration_basic %}
host:
  description: Address of your thermostat, e.g., `192.168.1.32`.
username:
  description: Username for the thermostat.
password:
  description:  Password for the thermostat.
pin:
  description: Pin for Lockscreen (required if lock screen enabled)
ssl:
  description: Whether to use SSL or not when communicating.
{% endconfiguration_basic %}
