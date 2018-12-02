---
layout: page
title: Repetier-Server Sensor
description: "Instructions how to add Repetier-Server sensors to Home Assistant."
date: 2018-12-02 22:12
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Sensor
ha_release: 0.84
ha_iot_class: "Local Polling"
---

This component creates one sensor for each devices in your Repetier-Server installation.
Each sensor contains information about the current state of the device, including job name, start time and percentage done.

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: repetier
    url: http://IP_ADDRESS
    port: PORT
    api_key: YOUR_API_KEY
```

Configuration options for the Repetier-Server Sensor:

- **url** (*Required*): The URL to connect to without the port part.
- **port** (*Required*): The port to connect to the host on (default Repetier-Server port is 3344).
- **api_key** (*Required*): API-Key for the Repetier-Server user to login as.
- **state_percent** (*Optional*): Show percent done as state of sensor. Defaults to `false` (On/Idle/Off)
- **decimals** (*Optional*): How many decimals to show in state if state_percent is true. Defaults to `1`.
