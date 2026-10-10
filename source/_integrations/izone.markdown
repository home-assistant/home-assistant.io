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
  - diagnostics
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

When zones that have a temperature sensor are available, the unit can be put into zone control mode as a system setting. In this mode each individual zone has a temperature target, and the device chooses the zone furthest from its setpoint to control the air conditioner. Home Assistant mirrors that choice on the controller climate entity:

- The controller’s current temperature follows the controlling zone’s room sensor.
- The `control_zone_source` attribute is the climate entity ID of the controlling zone when a zone is driving the unit.
- Set the temperature target on the individual zone climate entities.

Because the controlling zone can change, the controller’s current temperature can jump when the selection changes.

### Return air sensor mode

Without automatic zones, or with certain system settings, the device targets the return air sensor. In this mode the controller is used to set the target temperature, and the current temperature reported is equal to the return air sensor. The `control_zone_source` attribute is not present on the controller climate entity in this mode.

### Legacy attributes

The controller climate entity exposes older attributes such as `control_zone`, `control_zone_name`, and `control_zone_setpoint`. Prefer `control_zone_source` and the controller’s current temperature, and set targets on the zone or controller climate entity as above. Those legacy attributes will be removed in a future release.

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
