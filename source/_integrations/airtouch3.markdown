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
ha_quality_scale: bronze
---

The **AirTouch 3** {% term integration %} allows you to control AirTouch 3 ducted air conditioning systems from Home Assistant.

The integration connects locally to the AirTouch 3 controller and creates climate entities for the air conditioner and its configured zones.

## Prerequisites

The AirTouch 3 controller must be connected to the same local network as Home Assistant and must be reachable from Home Assistant on TCP port `8899`.

Before setting up the integration, make sure you know the IP address or hostname of the AirTouch 3 controller. Set up a static IP address or DHCP reservation for the controller.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The IP address or hostname of the AirTouch 3 controller.
{% endconfiguration_basic %}

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
- Viewing the current temperature when a zone sensor or touchpad temperature is assigned to the zone.

## Data updates

The integration polls the AirTouch 3 controller locally.

Commands are sent to the controller over the local network. When multiple commands are issued, they are queued and sent with a short delay between commands.

## Known limitations

AirTouch 3 zone temperature reporting depends on the temperature sensors configured in the AirTouch system. Zones without an assigned or available temperature sensor may show the system room temperature instead of a zone-specific current temperature.

The integration does not discover controllers automatically. You must enter the controller host manually during setup.

## Troubleshooting

### The integration cannot connect

Make sure the AirTouch 3 controller is powered on, connected to the same local network as Home Assistant, and reachable at the configured host address.

If your network uses VLANs or firewall rules, make sure Home Assistant can connect to the controller on TCP port `8899`.

### Some zones do not show their own current temperature

AirTouch 3 only reports zone temperatures for zones that have an assigned or available temperature sensor. Check the sensor and touchpad configuration in your AirTouch system.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
