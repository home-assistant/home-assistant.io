---
title: Midea ccm15 AC Controller
description: Instructions on how to integrate a Midea CCM15 module into Home Assistant.
ha_category:
  - Climate
ha_iot_class: Local Polling
ha_release: 2024.1
ha_config_flow: true
ha_codeowners:
  - '@ocalvo'
ha_domain: ccm15
ha_platforms:
  - climate
  - diagnostics
ha_integration_type: hub
---

The **CCM15** {% term integration %} lets you control [Midea CCM15](https://mbt.midea.com/hvac-goods/midea-products-category/vrfs/vrf-controller/central-controller-ccm-15) central controllers from Home Assistant.

Each controller manages up to 64 indoor units. Every unit shows up as its own `climate` entity, so you can change mode, target temperature, fan speed, and swing per room.

{% include integrations/config_flow.md %}

## Configuration options

{% configuration_basic %}
Host:
    description: "The IP address or hostname of the CCM15 controller on your local network."
Port:
    description: "The TCP port the controller listens on. Defaults to `80`."
Device password:
    description: "Optional. Only set this if your CCM15 firmware requires a password for control commands. See [Finding the device password](#finding-the-device-password)."
Minimum target temperature:
    description: "Lower bound of the thermostat slider, in degrees Celsius. Defaults to `18`."
Maximum target temperature:
    description: "Upper bound of the thermostat slider, in degrees Celsius. Defaults to `30`."
{% endconfiguration_basic %}

You can edit any of these settings later by going to {% my integrations title="**Settings** > **Devices & services**" %}, selecting the CCM15 entry, and choosing **Reconfigure**.

### Finding the device password

Some CCM15 firmwares require a password on control requests. If yours does, you can read it off the controller's own web interface:

1. Open the CCM15 web interface in your browser.
2. Press F12 to open the browser developer tools.
3. Switch to the **Network** tab.
4. Change any setting in the web UI, for example the fan speed.
5. In the network requests list, select the new `ctrl.xml` request.
6. Copy the value of the `pwd` parameter from the request URL. It is a 6-digit number.

## Supported functionality

Each indoor unit is exposed as a `climate` entity with these controls:

- HVAC mode: off, heat, cool, dry, fan only, auto.
- Target temperature, bounded by the minimum and maximum you set in the configuration options.
- Fan mode: auto, low, medium, high.
- Swing mode: on, off.

## Data updates

Home Assistant polls the controller every 30 seconds. When you change a value from the UI, the integration briefly keeps showing the value you set so it does not appear to snap back while the controller is still committing the change.

## Removing the integration

This integration follows the standard procedure to remove an integration. See [Remove an integration](/common-tasks/general/#removing-an-integration-instance-from-home-assistant).
