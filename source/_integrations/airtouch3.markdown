---
title: AirTouch 3
description: Instructions on how to integrate AirTouch 3 air conditioning systems with Home Assistant.
ha_category:
  - Climate
ha_release: 2026.6
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@L0rdCha0s'
ha_domain: airtouch3
ha_platforms:
  - climate
ha_homekit: true
ha_integration_type: hub
ha_quality_scale: gold
---

The **AirTouch 3** {% term integration %} allows you to control AirTouch 3 ducted air conditioning systems from Home Assistant.

The integration connects locally to the AirTouch 3 controller and creates climate entities for the air conditioner and its configured zones.

## Supported devices

This integration supports Polyaire AirTouch 3 controllers that are reachable on the local network. AirTouch 4 and AirTouch 5 systems use different protocols and are supported by separate Home Assistant integrations.

## Prerequisites

The AirTouch 3 controller must be connected to the local network and must be reachable from Home Assistant on TCP port `8899`.

Home Assistant can discover AirTouch 3 controllers by using local UDP broadcast on port `49003`. Home Assistant can also use matching DHCP or router-provided device information when the controller hostname contains `airtouch3` or `aritouch3`.

If your controller is on a different VLAN, subnet, or routed network, make sure broadcast traffic can pass between Home Assistant and the AirTouch 3 controller network. If broadcast traffic cannot cross the network boundary, automatic discovery may still work if Home Assistant receives matching DHCP or device tracker data from your router.

For local UDP discovery on a VLAN, the Home Assistant host must have a network interface or VLAN interface in the same VLAN as the AirTouch 3 controller. That network must also be enabled in Home Assistant under **Settings** > **System** > **Network**.

If discovery does not find your controller, make sure you know the IP address or hostname of the controller before setting up the integration. Set up a static IP address or DHCP reservation for the controller.

{% include integrations/config_flow.md %}

Home Assistant may show discovered AirTouch 3 controllers on the **Devices & services** page. If the controller is not shown automatically, add the integration manually. You can leave **Host** blank to search for controllers on the local network, or enter the controller IP address or hostname directly.

{% configuration_basic %}
Host:
  description: The IP address or hostname of the AirTouch 3 controller. Leave this blank to search for controllers on the local network.
{% endconfiguration_basic %}

## Reconfiguring the host

If the controller address changes and Home Assistant does not rediscover it automatically, reconfigure the integration from **Settings** > **Devices & services** > **AirTouch 3** > **Configure** and enter the new host.

## Use cases

You can use AirTouch 3 climate entities to:

- Control the whole ducted air conditioner from Home Assistant dashboards and automations.
- Turn individual zones on or off.
- Adjust target temperatures for individual zones.
- Use reported room or zone temperatures in automations.

## Supported functionality

The integration provides climate entities for the AirTouch 3 system.

### Air conditioner

The main air conditioner climate entity supports:

- Turning the air conditioner on and off.
- Changing the HVAC mode.
- Changing the fan mode.
- Viewing the current room temperature reported by the controller.

### Zones

The integration creates one climate entity for each configured AirTouch 3 zone.

Zone climate entities support:

- Turning the zone on and off.
- Viewing and changing the zone target temperature.
- Viewing the current temperature when an AirTouch zone sensor is assigned and available.

This integration does not provide custom actions. Use the standard climate actions such as `climate.turn_on`, `climate.turn_off`, `climate.set_hvac_mode`, `climate.set_fan_mode`, and `climate.set_temperature`.

## Data updates

The integration polls the AirTouch 3 controller locally every 60 seconds.

Commands are sent to the controller over the local network. When multiple commands are issued, they are queued and sent with a short delay between commands.

## Examples

The following example turns on cooling for the main air conditioner and sets a living zone target temperature. Replace the example entity IDs with the entity IDs from your installation.

```yaml
automation:
  - alias: "Cool the living area in the afternoon"
    triggers:
      - trigger: time
        at: "15:00:00"
    actions:
      - action: climate.set_hvac_mode
        target:
          entity_id: climate.airtouch_3_air_conditioner
        data:
          hvac_mode: cool
      - action: climate.turn_on
        target:
          entity_id: climate.living_zone
      - action: climate.set_temperature
        target:
          entity_id: climate.living_zone
        data:
          temperature: 23
```

## Known limitations

AirTouch 3 zone temperature reporting depends on the temperature sensors configured in the AirTouch system. Zones without an assigned or available temperature sensor may show the system room temperature instead of a zone-specific current temperature.

Local discovery uses UDP broadcast on port `49003`. It may not work across VLANs, routed networks, or VPNs unless broadcast traffic is allowed between Home Assistant and the AirTouch 3 controller network. DHCP or router-provided discovery depends on the controller hostname being reported to Home Assistant. If discovery fails, enter the controller host manually.

## Troubleshooting

### The integration cannot connect

Make sure the AirTouch 3 controller is powered on, connected to the same local network as Home Assistant, and reachable at the configured host address.

If your network uses VLANs or firewall rules, make sure Home Assistant can connect to the controller on TCP port `8899`. For local UDP discovery, Home Assistant also needs to send and receive UDP broadcast traffic on port `49003`.

If the controller is on a VLAN, make sure the Home Assistant host has an interface in that VLAN and that the interface is enabled in Home Assistant network settings.

### Some zones do not show their own current temperature

AirTouch 3 only reports zone temperatures for zones that have an assigned or available temperature sensor. Check the sensor and touchpad configuration in your AirTouch system.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
