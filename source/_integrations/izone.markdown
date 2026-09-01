---
title: iZone
description: Instructions on how to integrate iZone climate control devices with Home Assistant.
ha_category:
  - Climate
  - Sensor
ha_release: '0.100'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@Swamp-Ig'
ha_domain: izone
ha_homekit: true
ha_platforms:
  - climate
  - sensor
ha_integration_type: hub
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **iZone** {% term integration %} lets you monitor and control local [iZone](https://izone.com.au/) ducted reverse-cycle climate control systems. These systems are largely available in Australia.

## Supported hardware

Any current iZone unit with ducted reverse cycle air-conditioning, and the CB wired or wireless bridge device installed should currently work. There is currently no support for the iZone lights, reticulation, or other devices.

{% include integrations/config_flow.md %}

## Multiple iZone systems

If you have more than one iZone system on your local network, the iZone integration discovers all available controllers and shows them during setup. You can then choose the controller you want to configure.

Any other controllers found during the search will become available as discovered controllers.

## Legacy YAML configuration

YAML configuration is now deprecated, it will be removed in a future update. 

For legacy setups, or if you need to exclude specific controllers from Home Assistant, you can configure the iZone integration via the {% term "`configuration.yaml`" %} file with the `exclude` option.

{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry with excluded controllers
izone:
  exclude:
    - "000013170"
```

{% configuration %}
exclude:
  description: Exclude specific units from Home Assistant. This option applies only to YAML-based configuration.
  required: false
  type: list
{% endconfiguration %}

## Network settings

The iZone system uses UDP broadcast discovery on the local network to find and communicate with iZone devices. For discovery to work reliably, Home Assistant must be able to receive this broadcast discovery traffic. In most cases, this means Home Assistant and the iZone bridge need to be on the same local network segment, like the same VLAN. If they are on different segments, standard routing is usually not enough. Your network must support a UDP broadcast relay, directed broadcast, or a similar feature to forward this traffic between segments.

For connectivity, Home Assistant must be able to send outbound UDP discovery packets to destination port `12107`, listen locally for inbound UDP iZone messages on port `7005`, and use TCP port `80` for HTTP communication with the bridge. The integration currently listens on `0.0.0.0` and sends discovery to local IPv4 broadcast addresses, which is not configurable.

## Master controller

Unit modes off, heat, cool, dry, and fan only are supported. For units fitted with the 'iSave' system, which vents in external air into the house, this is available as 'eco' mode.

The entity exposes a `supply_temperature` attribute. Use the **Supply temperature** sensor entity (below) instead.

## Zones

Zones have three modes available, closed, open, and auto. These are mapped to Home Assistant modes off, fan only, and auto, respectively. Only the auto mode supports setting the temperature.

## Sensors

The integration creates the following {% term sensor %} entities for each controller:

- **Supply temperature**: (diagnostic) The temperature of the air leaving the indoor unit into the ductwork.
- **Return temperature**: (diagnostic) The temperature of the air returning to the indoor unit.

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

You can configure template sensors to read the control zone values (in {% term "`configuration.yaml`" %}; use the ID of your unit). Prefer the native **Supply temperature** sensor for supply air readings:

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
```

And then graph them on a dashboard, along with the supply temperature sensor and the standard values such as the current temperature. Either add the sensor entities via the visual editor, or cut and paste this
snippet into the code editor:

```yaml
# Example snippet for dashboard card configuration (code editor)
entities:
  - entity: sensor.control_zone
  - entity: sensor.target_temperature
  - entity: sensor.izone_controller_0000XXXXX_supply_temperature
  - entity: climate.izone_controller_0000XXXXX
hours_to_show: 24
refresh_interval: 0
type: history-graph
```

## Diagnostics

The iZone {% term integration %} provides diagnostics to help with troubleshooting. The download includes:

- Redacted config entry data
- A snapshot of the discovery service (when it is running)
- A snapshot of the controller state

Hosts and IP addresses are redacted in the file.

To download diagnostics:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select the **iZone** integration.
3. Open the three-dot {% icon "mdi:dots-vertical" %} menu on the integration entry and select **Download diagnostics**.

Attach the downloaded file when reporting an issue. For more information, see [Download diagnostics](/docs/configuration/troubleshooting/#download-diagnostics).

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

This will help you to find network connection issues.

{% include integrations/actions.md %}

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
