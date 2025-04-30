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
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The `iZone` {% term integration %} allows access of control of a local [iZone](https://izone.com.au/) ducted reverse-cycle climate control devices. These are largely available in Australia.

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

With multiple climate-controlled zones, you can't set the target temperature of the control but set the target temperature
for each individual zone.

The climate controller then selects the zone that is furthest away from the target and feeds the current temperature and
target temperature into the air conditioner unit, closing any other zones that have already reached their target.

In this mode the current control zone that has been selected is reported, as is the read-only target temperature for that 
zone (read-only, set the value via the individual zones). The current temperature will also be that of the control
zone.

You can add configure to read these values into sensors (in {% term "`configuration.yaml`" %}), 
along with the supply temperature (use the ID of your unit):

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

### Action `izone.airflow_min`

Set the minimum airflow for a particular zone.

| Data attribute | Optional | Description                                    |
| ---------------------- | -------- | ---------------------------------------------- |
| `entity_id`            | yes      | izone Zone entity. For example `climate.bed_2` |
| `airflow`              | no       | Airflow percent in 5% increments               |

### Action `izone.airflow_max`

Set the maximum airflow for a particular zone.

| Data attribute | Optional | Description                                    |
| ---------------------- | -------- | ---------------------------------------------- |
| `entity_id`            | yes      | izone Zone entity. For example `climate.bed_2` |
| `airflow`              | no       | Airflow percent in 5% increments               |
