---
title: eQ-3 Bluetooth Smart Thermostats
description: Instructions on how to integrate EQ3 Bluetooth Smart Thermostats into Home Assistant.
ha_category:
  - Climate
ha_iot_class: Local Polling
ha_release: 0.18
ha_codeowners:
  - '@rytilahti'
ha_domain: eq3btsmart
ha_platforms:
  - climate
ha_integration_type: integration
---

The `eq3btsmart` climate platform allows you to integrate EQ3 Bluetooth Smart Thermostats.

The current functionality allows setting the temperature as well as controlling the supported modes with help of [python-eq3bt](https://github.com/rytilahti/python-eq3bt) library.
As the device doesn't contain a temperature sensor ([read more](https://forum.fhem.de/index.php/topic,39308.15.html)),
we report target temperature also as current one.

### Testing the connectivity

Before configuring Home Assistant you should check that connectivity with the thermostat is working, which can be done with the eq3cli tool:

```bash
eq3cli --mac 00:11:22:33:44:55

[00:1A:22:XX:XX:XX] Target 17.0 (mode: auto dst, away: no)
Locked: False
Batter low: False
Window open: False
Boost: False
Current target temp: 21.0
Current mode: auto dst
Valve: 0
```

### Configuration

```yaml
# Example configuration.yaml entry
climate:
  - platform: eq3btsmart
    devices:
      room1:
        mac: "00:11:22:33:44:55"
```

{% configuration %}
devices:
  description: List of thermostats.
  required: true
  type: list
  keys:
    name:
      description: The name to use for the thermostat.
      required: true
      type: string
      keys:
        mac:
          description: MAC address of the thermostat.
          required: true
          type: string
{% endconfiguration %}
