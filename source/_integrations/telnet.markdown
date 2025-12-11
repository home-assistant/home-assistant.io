---
title: Telnet
description: Instructions on how to integrate telnet switches into Home Assistant.
ha_category:
  - Switch
ha_release: 0.54
ha_iot_class: Local Polling
ha_domain: telnet
ha_platforms:
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `telnet` switch {% term integration %} allows you to control devices with telnet commands.

To enable this {% term integration %}, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

{% raw %}

```yaml
# Example configuration.yaml entry
switch:
  - platform: telnet
    switches:
      projector:
        resource: THE_IP_ADDRESS
        port: 4002
        command_on: "PWR ON"
        command_off: "PWR OFF"
        command_state: "PWR?"
        value_template: '{{ value == "PWR=01" }}'
        timeout: 0.9
```

{% endraw %}

{% configuration %}
switches:
  description: The array that contains all switches.
  required: true
  type: list
  keys:
    identifier:
      description: Name of the switch as slug. Multiple entries are possible.
      required: true
      type: list
      keys:
        resource:
          description: Host name or IP address of the device.
          required: true
          type: string
        port:
          description: Port to connect to.
          required: false
          default: 23
          type: integer
        command_on:
          description: Command to turn device on.
          required: true
          type: string
        command_off:
          description: Command to turn device off.
          required: true
          type: string
        command_state:
          description: Command to determine the state of the switch. If not defined the switch will assume successful state changes.
          required: false
          type: string
        value_template:
          description: The template evaluating to `true` will indicate that the switch is on.
          required: false
          type: template
        name:
          description: The name used to display the switch in the frontend.
          required: false
          type: string
        timeout:
          description: How long to wait for a reply after a telnet command is sent. 
          required: false
          default: 0.2
          type: float
{% endconfiguration %}
