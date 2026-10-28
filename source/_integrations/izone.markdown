---
description: Instructions on how to integrate iZone climate control devices with Home Assistant.
ha_release: '0.100'
ha_domain: izone
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **iZone** {% term integration %} lets you monitor and control local [iZone](https://izone.com.au/) ducted reverse-cycle climate control systems. These systems are largely available in Australia.

## Supported hardware

Any current iZone unit with ducted reverse cycle air-conditioning, and the CB wired or wireless bridge device installed should currently work. There is currently no support for the iZone lights, reticulation, or other devices.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Setup method:
  description: Choose **Search for devices** to look for controllers on your local network, or **Enter host** to type the controller IP address or hostname.
Controller IP address or hostname:
  description: The address of your iZone bridge. Shown when you choose **Enter host**, or when **Search for devices** does not find a controller.
{% endconfiguration_basic %}

If **Search for devices** does not find a controller, Home Assistant opens the **Enter host** form so you can type the address instead. Use **Enter host** when UDP discovery traffic is blocked between Home Assistant and the bridge.

{% tip %}
iZone bridges also advertise themselves for Apple HomeKit. Home Assistant may therefore show a separate [HomeKit Device](/integrations/homekit_controller/) discovery for the same bridge. Set up the **iZone** discovery (or add iZone manually) and ignore the HomeKit Device discovery. The HomeKit Device path does not provide working climate control for these bridges.
{% endtip %}

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

Once set up, Home Assistant controls the iZone bridge over HTTP on TCP port `80`. Your Home Assistant host must be able to reach the bridge by IP address or hostname on your local network.

UDP broadcast discovery is used to find controllers on the LAN (for example **Search for devices**), to notice new bridges, and to pick up IP address changes. For discovery to work reliably, Home Assistant and the bridge usually need to be on the same local network segment, like the same VLAN. If they are on different segments, standard routing is usually not enough. Your network must support a UDP broadcast relay, directed broadcast, or a similar feature to forward this traffic between segments.

Discovery uses outbound UDP packets to destination port `12107` and listens locally for inbound UDP iZone messages on port `7005`. The integration currently listens on `0.0.0.0` and sends discovery to local IPv4 broadcast addresses, which is not configurable.

If UDP discovery traffic is blocked, you can still set up a controller by choosing **Enter host** and providing the bridge IP address or hostname, as long as HTTP on port `80` works. Without working UDP discovery, Home Assistant will not automatically find new controllers or follow IP address changes.

## Master controller

Unit modes off, heat, cool, dry, and fan only are supported. For units fitted with the iSave system, which vents external air into the house, this is available as the **Eco** preset.

The entity exposes a `supply_temperature` attribute. Use the **Supply temperature** sensor entity (below) instead.

### Zone control mode

In zone control mode, a zone drives the air conditioner instead of the unit's return air sensor. Each zone with a temperature sensor has its own target temperature. Depending on the system setting, iZone either picks the zone that is furthest from its target (zones mode), or always uses the zone selected as the control zone (master mode).

Home Assistant mirrors this on the controller climate entity:

- The controller's current temperature follows the room sensor of the controlling zone.
- The `control_zone_source` attribute contains the entity ID of the controlling zone's climate entity.
- The controller has no target temperature. Set the target temperature on the zone climate entities instead.

When iZone selects a different zone, the controller's current temperature can jump.

### Return air sensor mode

The controller uses the unit's return air sensor, and you set the target temperature on the controller, when:

- The system is set to return air sensor (RAS) mode.
- The system is in master mode, and the control zone is set to the unit itself.
- A climate-controlled (auto) zone has no room temperature reading, for example because its sensor stopped reporting. The controller switches back to zone control when the sensor reports again.

In this mode, the controller's current temperature is the return air temperature, and the `control_zone_source` attribute is not present.

When the **Eco** preset is on, the controller's current temperature is the supply air temperature in both modes.

### Legacy attributes

The controller climate entity also has the attributes `control_zone`, `control_zone_name`, and `control_zone_setpoint`. For new automations and dashboards, use `control_zone_source` instead. To get the target temperature of the controlling zone, read the `temperature` attribute of the climate entity it names.

### Sensors

The integration creates the following {% term sensor %} entities for each controller:

- **Supply temperature**: (diagnostic) The temperature of the air leaving the indoor unit into the ductwork.
- **Return temperature**: (diagnostic) The temperature of the air returning to the indoor unit.

These sensors always report the unit duct temperatures. They do not change when a different zone is controlling the system.

## Zones

Zones have three modes available, closed, open, and auto. These are mapped to Home Assistant modes off, fan only, and auto, respectively. Only the auto mode supports setting the temperature.

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
