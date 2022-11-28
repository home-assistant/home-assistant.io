---
title: CoolAutomation
description: Instructions on how to integrate CoolAutomation (CoolMasterNet, CoolPlug, CooLinkHub) devices within Home Assistant.
ha_category:
  - Climate
ha_release: 0.88
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@OnFreund'
  - '@Rjevski'
ha_domain: coolmaster
ha_platforms:
  - climate
ha_integration_type: integration
---

The `coolmaster` climate platform lets you control HVAC through [CoolAutomation](https://coolautomation.com) devices such as [CoolMasterNet](https://coolautomation.com/products/coolmasternet/) and [CoolPlug & CooLinkHub](https://coolautomation.com/products/coolplug-coolinkhub/).

{% include integrations/config_flow.md %}

## Services

### Service `coolmaster.suggest_ambient_temperature`

You can use the service `coolmaster.suggest_ambient_temperature` to send a value as the ambient temperature to the CoolMasterNet-controlled HVAC device.

This would allow you to use any value available within Home Assistant as the current ambient temperature for the HVAC device instead of its built-in sensor - useful if the built-in sensor is not positioned optimally.

Note that support for this depends on the make/model of HVAC device, the connection method between the CoolMasterNet gateway and HVAC device and the configuration (physical DIP switches?) of the HVAC device. Refer to the Programmer's Reference Manual (PRM) for your CoolAutomation gateway or contact CoolAutomation or your HVAC installer for details.

The last received value is cached by the CoolAutomation gateway until power loss so you only need to call this service when you need to change the value, though sending it at regular intervals regardless of changes is recommended to account for cases where the CoolAutomation device loses power.

Sending a value of 0 clears the cached value and prompts the CoolAutomation gateway to stop sending the value to the HVAC device - if you really need to send a value of zero degrees a workaround is to go one degree either side of that.

#### Mitsubishi Electric devices with CoolPlug via P1P2 connection

For Mitsubishi Electric HVAC devices with a CoolPlug connected to the P1P2 lines (same lines as the official Mitsubishi thermostat), this is confirmed to work with the following prerequisites:

* the Mitsubishi unit's control board has a DIP switch to determine whether it will use the internal return air temperature sensor or the "wired remote controller" (the thermostat in Mitsubishi jargon). It should be set to the latter as the CoolPlug emulates a controller in this setup, otherwise any temperature sent by usage of this service will have no effect.
* all the wired controllers on the bus should all be set to secondary, slave or "sub" controllers - on the controllers, go to Initial Settings -> Basic Setting -> Enter admin password (default is 0000 and there's a backdoor/way to reset it, search around) -> Main/Sub and set to Sub.

The reason for the latter is that the official controller, when set to "main" mode, will broadcast the reading of its internal sensor on the bus every few seconds - if using this service then the CoolPlug will do the same and you'll have a conflict. This can be seen by the ambient temperature value on the official controller jumping back and forth every few seconds between the controller's sensor and the value provided by Home Assistant.

A downside of setting the controllers to secondary/sub/slave is that you might lose built-in scheduling features of the official controller (it tells you to set this on the "main" controller) but they can be replicated by a Home Assistant automation. In effect, you are essentially following the directions given by the controller to set this on your "main" controller which just so happens to be Home Assistant!

| Service data attribute | Optional | Description                                                            |
| ---------------------- | -------- | ---------------------------------------------------------------------- |
| `entity_id`            | no       | String, Name of entity e.g., `climate.aircon`                          |
| `temperature`          | no       | Float, Temperature value to send, in the HVAC device's temp. unit      |

Examples:

{% raw %}
```yaml
# Example automation to set ambient temperature based on another thermostat value
trigger:
  # Trigger on change of current room temp
  - platform: state
    entity_id: sensor.room_temperature_sensor
  # If the gateway is rebooted the cached value is lost, so also send the value every 10 minutes regardless of changes
  - platform: time_pattern
    hours: '*'
    minutes: /10
    seconds: '0'
action:
  - service: coolmaster.suggest_ambient_temperature
    data:
      entity_id: climate.aircon
      temperature: '{{ states(''sensor.room_temperature_sensor'') }}'
```
{% endraw %}

