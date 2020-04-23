---
title: Neptune Apex
description: Instructions on how to integrate a Neptune Systems Apex aquarium controller within Home Assistant.
ha_category:
  - Hub
  - Sensor
  - Light
ha_release: "0.109"
ha_iot_class: "Local Polling"
ha_config_flow: true
ha_codeowners:
  - '@jpelzer'
ha_domain: neptune_apex
---

The Neptune Apex integration provides connectivity to a Neptune Systems Apex Aqaucontroller.

There is currently support for the following device types within Home Assistant:

- [Sensor](#sensor)
- [Light](#light)

## Configuration

Home Assistant offers Neptune Apex integration through **Configuration** -> **Integrations** -> **Neptune Apex**. Follow the instructions to get it set up.

{% configuration %}
host:
  description: The domain name or IP address of the Apex, e.g., 192.168.1.1.
  required: true
  type: string
username:
  description: The username required to connect to the Apex.
  required: true
  type: string
password:
  description: The password required to connect to the Apex.
  required: true
  type: string
{% endconfiguration %}

## Sensor

Once you have enabled the **Neptune Apex** component, your available Apex probes will automatically populate and be refreshed every 30 seconds. Apex probes can report data about temperature, pH, ORP, amperage, flow rate, water detection, and many others. Rather than create custom types for every possible data option, this integration reports the raw probe type as reported by the Apex as the sensor's `unit_of_measurement`. If the probe type is reported as 'Temp', the sensor's `device_class` will be set to 'temperature'. If the probe type is reported as 'Amps', the sensor's `device_class` will be set to 'power'.

## Light
After enabling the **Neptune Apex** component, your available Apex outlets will automatically populate and be refreshed every 30 seconds. Since the Apex technically has a total of five states for a switched outlet (On, Off, Automatic-unknown, Automatic-on, Automatic-off), along with any number of profiles for control of lighting, pumps, and other analog devices, this integration does a bit of shoehorning to make the Apex outlet fit into the Light device type. 

We use the combination of `is_on` and `effect` properties to represent the outlet state. If the outlet is off, either due to Apex program state or manually, `is_on` will be false and `effect` will be hidden in the UI. The actual `effect` when the outlet is off will be `AOF` or `OFF`. We consider the outlet to be 'on' any time the outlet is not explicitly off, so manually on (`effect:ON`), automatically on (`effect:AON`) or any analog profile, regardless of the on-level that profile specifies.

If you use the UI toggle switch to turn an outlet on or off, any profile or Apex program (`AUTO`) will be disabled, and the outlet will manually set to whatever state you've chosen. To re-enable auto mode, set the `effect` property to `AUTO`. The UI hides the effect dropdown if the outlet is off, so you have the choice of turning the outlet on and then choosing the `AUTO` effect, or you can add an automation with an action type of `Call service` that will call `light.turn_on` with service data of `effect: AUTO`. In this case, the turn_on will be ignored and the outlet will be directly placed into `AUTO` mode.

