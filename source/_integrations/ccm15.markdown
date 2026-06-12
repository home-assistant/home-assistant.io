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

{% configuration_basic %}
Host:
    description: "The IP address or hostname of the CCM15 controller on your local network."
Port:
    description: "The TCP port the controller listens on. Leave at `80` unless you have changed it."
Device password:
    description: "Optional. Only needed if your CCM15 firmware requires a password for control commands. To find it, open the controller's web interface, press F12 to open browser developer tools, switch to the **Network** tab, change any setting in the web UI, then select the new `ctrl.xml` request and copy the value of the `pwd` parameter from the URL. It is a 6-digit number."
Minimum target temperature:
    description: "Lower bound of the thermostat slider, in degrees Celsius. Defaults to `18`."
Maximum target temperature:
    description: "Upper bound of the thermostat slider, in degrees Celsius. Defaults to `30`."
{% endconfiguration_basic %}

You can edit any of these settings later by going to {% my integrations title="**Settings** > **Devices & services**" %}, selecting the CCM15 entry, and choosing **Reconfigure**.

## Supported functionality

Each indoor unit is exposed as a `climate` entity with these controls:

- HVAC mode: off, heat, cool, dry, fan only, auto.
- Target temperature, bounded by the minimum and maximum you set above.
- Fan mode: auto, low, medium, high.
- Swing mode: on, off.

The integration polls the controller every 30 seconds. A short cache keeps the UI on the value you just set, so changes don't appear to snap back while the controller is still committing them.

## Removing the integration

This integration follows the standard procedure to remove an integration. See [Remove an integration](/common-tasks/general/#removing-an-integration-instance-from-home-assistant).
