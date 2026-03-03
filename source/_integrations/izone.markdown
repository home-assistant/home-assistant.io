---
title: iZone
description: Instructions on how to integrate iZone climate control devices with Home Assistant.
ha_category:
  - Climate
ha_release: '0.100'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@Swamp-Ig'
ha_domain: izone
ha_homekit: true
ha_platforms:
  - climate
ha_integration_type: hub
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **iZone** {% term integration %} allows access of control of a local [iZone](https://izone.com.au/) ducted reverse-cycle climate control devices. These are largely available in Australia.

## Supported hardware

Any current iZone unit with ducted reverse cycle air-conditioning, and the CB wired or wireless bridge device installed should currently work. There is currently no support for the iZone lights, reticulation, or other devices.

{% include integrations/config_flow.md %}

## Manual configuration

Alternatively, the iZone integration can be configured manually via the
{% term "`configuration.yaml`" %} file if there is more than one iZone system on the local
network and one or more must be excluded use manual configuration.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Full manual example configuration.yaml entry
izone:
  exclude:
    - "000013170"
```

{% configuration %}
exclude:
  description: Exclude particular units from integration with Home Assistant.
  required: false
  type: list
{% endconfiguration %}

## Network settings

The iZone system uses UDP broadcasts over the local network to find and communicate with iZone devices. For this to work properly, UDP port  12107 must be able to be broadcasted on, 7005 needs to be listened to for broadcasted messages, and TCP port 80 for HTTP data to the bridge. The integration currently listens on `0.0.0.0` and broadcasts to all broadcast IPv4 local addresses, which is not configurable.

## Master controller

Unit modes off, heat, cool, dry, and fan only are supported. For units fitted with the 'iSave' system, which vents in external air into the house, this is available as 'eco' mode.

## Zones

Zones have three modes available, closed, open, and auto. These are mapped to Home Assistant modes off, fan only, and auto, respectively. Only the auto mode supports setting the temperature.

## Control zone (climate control mode)

When your iZone system has multiple climate-controlled zones, the target temperature behavior depends on your system configuration:

### When you can set the controller's target temperature

You can set the target temperature directly on the controller in these situations:

- Your system is in RAS mode (return air sensor mode, not master/slave mode)
- Your system is in master mode, but the control zone is set to zone 13 (the master unit itself) or an invalid zone number
- Any of your zones don't have a temperature sensor installed

In these cases, you can set the target temperature on the controller entity just like any other climate entity.

### When you set temperatures on individual zones

When your system is in master mode with a valid control zone (and all zones have temperature sensors), you set the target temperature for each individual zone instead of the controller.

The climate controller automatically selects the zone that is furthest from its target temperature and uses that zone's current and target temperatures to control the air conditioner unit, closing zones that have already reached their target.

In this mode, the controller entity reports:

- The current control zone that has been selected
- The target temperature for that zone (read-only on the controller; set it via the individual zone entities)
- The current temperature of the control zone

You can configure sensors to read these values (in {% term "`configuration.yaml`" %}), along with the supply temperature (use the ID of your unit):

{% raw %}

```yaml
# Example configuration.yaml entry to create sensors
# from the izone controller state attributes
template:
  - sensor:
    - name: "Control zone"
      state: "{{ state_attr('climate.izone_controller_0000XXXXX','control_zone_name') }}"
    - name: "Target temperature"
      state: "{{ state_attr('climate.izone_controller_0000XXXXX','control_zone_setpoint') }}"
      unit_of_measurement: "°C"
    - name : "Supply temperature"
      state: "{{ state_attr('climate.izone_controller_0000XXXXX','supply_temperature') }}"
      unit_of_measurement: "°C"
```

{% endraw %}

And then graph them on a dashboard, along with the standard values such as the current temperature. Either add the sensor entities via the visual editor, or cut and paste this
snippet into the code editor:

```yaml
# Example snippet for dashboard card configuration (code editor)
entities:
  - entity: sensor.control_zone_target
  - entity: sensor.control_zone
  - entity: sensor.temperature_supply
  - entity: climate.izone_controller_0000XXXXX
hours_to_show: 24
refresh_interval: 0
type: history-graph
```

## Debugging

If you're trying to track down issues with the integration, set up logging for it:

```yaml
# Example configuration.yaml with logging for iZone
logger:
  default: warning
  logs:
    homeassistant.components.izone: debug
    pizone: debug
```

This will help you to find network connection issues etc.

## Actions

### Action: Set minimum airflow

The `izone.airflow_min` action sets the minimum airflow for a particular zone.

| Data attribute | Optional | Description                                    |
| -------------- | -------- | ---------------------------------------------- |
| `entity_id`    | yes      | izone Zone entity. For example `climate.bed_2` |
| `airflow`      | no       | Airflow percent in 5% increments               |

### Action: Set maximum airflow

The `izone.airflow_max` action sets the maximum airflow for a particular zone.

| Data attribute | Optional | Description                                    |
| -------------- | -------- | ---------------------------------------------- |
| `entity_id`    | yes      | izone Zone entity. For example `climate.bed_2` |
| `airflow`      | no       | Airflow percent in 5% increments               |
