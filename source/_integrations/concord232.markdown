---
title: Concord232
description: Instructions on how to integrate Interlogix/GE Concord4 into Home Assistant.
ha_category:
  - Alarm
  - Binary sensor
ha_iot_class: Local Polling
ha_release: 0.31
ha_domain: concord232
ha_platforms:
  - alarm_control_panel
  - binary_sensor
ha_integration_type: integration
ha_quality_scale: legacy
---

The `concord232` platform provides integration with GE, Interlogix (and other brands) alarm panels that support the RS-232 Automation Control Panel interface module (or have it built in). Supported panels include Concord 4.

To use this platform, you will need to have the external concord232 client and server installed. The server must be running on the device which is connected to the automation module's serial port. The client must be installed on the machine running Home Assistant. These may often be the same machine, but do not have to be. For additional details in setting up and testing the client and server, see <https://github.com/JasonCarter80/concord232>.

There is currently support for the following device types within Home Assistant:

- [Alarm](#alarm-control-panel)
- [Binary sensor](#binary-sensor)

## Alarm control panel

To enable the alarm control panel platform, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  - platform: concord232
```

{% configuration %}
host:
  description: The host where the concord232 server process is running.
  required: false
  type: string
  default: localhost
port:
  description: The port where the Alarm panel is listening.
  required: false
  type: integer
  default: 5007
code:
  description: If defined, specifies a code to enable or disable the alarm in the frontend.
  required: false
  type: string
mode:
  description: audible/silent if defined, specifies whether Alarm Panel should be audible or silent when armed in Home Mode.
  required: false
  type: string
  default: audible
{% endconfiguration %}

## Binary sensor

To enable the binary sensor platform, add the following lines to your {% term "`configuration.yaml`" %}:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: concord232
```

{% configuration %}
host:
  description: The host where the concord232 server process is running.
  required: false
  type: string
  default: localhost
port:
  description: The port where the Alarm panel is listening.
  required: false
  type: integer
  default: 5007
{% endconfiguration %}
