---
title: Intergas gateway
description: Instructions on how to integrate an Intergas Lan2RF gateway with Home Assistant.
ha_category:
  - Binary sensor
  - Climate
  - Sensor
  - Water heater
ha_release: 0.93
ha_iot_class: Local Polling
ha_codeowners:
  - '@jbouwh'
ha_domain: incomfort
ha_platforms:
  - binary_sensor
  - climate
  - diagnostics
  - sensor
  - water_heater
ha_integration_type: integration
ha_config_flow: true
ha_dhcp: true
---

This integration links Home Assistant with your Intergas Lan2RF gateway, including the boiler and any room thermostats attached to it.
The integration uses the [incomfort-client](https://pypi.org/project/incomfort-client/) library.

### Supported devices

The Intergas Lan2RF Gateway connects thermostats based on the OpenTherm standard. An example of such a thermostat is the [Comfort Touch Thermostat](https://www.intergas-verwarming.nl/en/consumer/products/comfort-touch-thermostat/). The thermostats and LAN2RF gateway are often sold as a set. The gateway is suitable for use with Intergas Kombi Kompakt HRE and HReco appliances from year of manufacture 2014. If the Comfort Touch thermostat is used together with the gateway, then this will work in combination with Intergas Kombi Kompakt HRE, HReco, or Xtreme devices from year of manufacture 2017.

### Boiler

The boiler is represented as a **Water heater** device. It will report the boiler's `state` and `current_temperature`. The gateway does not expose any means to directly control the boiler or change its configuration.

Note that the `current_temperature` will switch between the CV (circulating volume) and Tap temperatures according to the current operating mode of the boiler.  If the boiler is neither pumping nor tapping, it will be reported as the higher of the two.

### Rooms

Any room thermostats (there can be 0, 1 or 2) are represented as **Climate** devices. They will report the thermostat's target `temperature` and `current_temperature` and the target temperature can be changed. This is similar to changing the target temperature override using the Comfort Touch App that comes with the thermostat/gateway. Note that any override will be reset when a new set point is reached on the thermostat's schedule.

{% include integrations/config_flow.md %}

{% configuration_basic %}
host:
    description: "Hostname or IP-address of the Intergas InComfort Lan2RF Gateway."
    required: true
    type: string
username:
    description: "The username to log into the gateway. This is `admin` in most cases."
    required: false
    type: string
password:
    description: "The password to log into the gateway, is printed at the bottom of the Lan2RF Gateway or is `intergas` for some older devices."
    required: false
    type: string
{% endconfiguration_basic %}

The hub does not have to be in the same network as HA, but must be reachable via port 80/HTTP.

The above configuration can also be adjusted later via
{% my integrations title="**Settings** > **Devices & services**" %},
select "Intergas InComfort/Intouch Lan2RF gateway" and click {% icon "mdi:dots-vertical" %} and select **Reconfigure**.

{% important %}

Some older room thermostats might report the wrong setpoint when the setpoint is manually changed on the room thermostat. If you encounter this behavior, you can enable the `Legacy setpoint handling` option.

{% endimportant %}

{% include integrations/option_flow.md %}

### Sensors for diagnostics

Note that **all** sensors are disabled by default.

- **Sensors**
  - Boiler Pressure: Indicates the boilers pressure.
  - Boiler Temperature: Indicates the central heating temperature.
  - Boiler Tap temperature: Indicates the tap water temperature.
- **Binary sensors**
  - Boiler Burner: Indicates if the burner is on.
  - Boiler Fault: Indicates if there is a problem. The fault code is set as an attribute.
  - Boiler Hot water tap: Indicates if the hot water tap is running.
  - Boiler Pump: Indicate the pump is running for cental heating.

## Troubleshooting

In case setting up an older gateway type fails, then try to leave `username` and `password` fields empty.

## Data updates

The Intergas Lan2RF Gateway will fetch state data from the gateway every 30 seconds. When the target temperature on the thermostat is changed, it might take some time for the set point to be updated on the Home Assistant climate {% term entity %}.

## Remove integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}

## Automation

To send an alert if the CV pressure is too low or too high, consider the following example:

{% raw %}

```yaml
- alias: "Low CV Pressure Alert"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.boiler_pressure
      below: 1.0
  actions:
    - action: notify.pushbullet_notifier
      data:
        title: "Warning: Low CH Pressure"
        message: >-
          {{ trigger.to_state.attributes.friendly_name }}
          is low, {{ trigger.to_state.state }} bar.
```

{% endraw %}

Other properties are available via each device's attributes.
