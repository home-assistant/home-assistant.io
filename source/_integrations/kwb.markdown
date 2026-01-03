---
title: KWB Easyfire
description: Instructions on how to integrate the KWB Easyfire sensor into Home Assistant.
ha_category:
  - Sensor
ha_iot_class: Local Polling
ha_release: '0.40'
ha_domain: kwb
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `kwb` {% term integration %} integrates the sensors of KWB Easyfire pellet central heating units with the Comfort3 controller (https://www.kwb.net/produkte/) into Home Assistant.

Direct connection via serial (RS485) or via telnet terminal server is supported. The serial cable has to be attached to the control unit port 25 (which is normally used for detached control terminals).

Since this serial protocol is proprietary and closed, only most temperature sensors and a few control relays are supported, the rest is still WIP (see <https://www.mikrocontroller.net/topic/274137>).

To enable the KWB Easyfire {% term integration %}, add it to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

Direct connection via serial port:

```yaml
# Example configuration.yaml entry
- platform: kwb
    name: kwb
    device: "/dev/ttyUSB0"
    type: serial
    raw: false
```

Telnet terminal server with a serial-ethernet converter:

```yaml
# Example configuration.yaml entry
  - platform: kwb
    name: kwb
    host: <ip>
    port: 23
    type: tcp
    raw: false
```

Take a good look at which configuration variables are for `TCP` use or for `serial` use.

{% configuration %}
raw:
  description: Should the raw serial output be shown as a sensor.
  required: false
  default: false
  type: boolean
name:
  description: The name of the device used in the frontend.
  required: false
  default: KWB
  type: string
device:
  description: (For serial use) The serial device of the machine.
  required: true
  type: string
host:
  description: (For tcp use) The IP-address of the serial server.
  required: true
  type: string
port:
  description: (For tcp use) The TCP-port of the serial server.
  required: true
  type: integer
type:
  description: "Type of sensor, you can choose between: `serial` and `tcp`."
  required: true
  type: string
{% endconfiguration %}
