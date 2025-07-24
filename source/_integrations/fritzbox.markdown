---
title: AVM FRITZ!SmartHome
description: Instructions on how to integrate AVM Smart Home (former AVM FRITZ!DECT) components into Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Climate
  - Light
  - Sensor
  - Switch
ha_release: 0.68
ha_iot_class: Local Polling
ha_domain: fritzbox
ha_config_flow: true
ha_ssdp: true
ha_platforms:
  - binary_sensor
  - button
  - climate
  - cover
  - diagnostics
  - light
  - sensor
  - switch
ha_codeowners:
  - '@mib1185'
  - '@flabbamann'
ha_integration_type: hub
---

The AVM FRITZ!SmartHome integration for Home Assistant allows you to integrate [AVM Smart Home](https://en.fritz.com/products/smart-home/) (_former AVM FRITZ!DECT_) devices like plugs, thermostats or shutter drivers as also trigger so called smart home templates (_contains settings for Smart Home devices of the same type_).

#### Tested devices

- FRITZ!Box routers
  - [FRITZ!Box 5590 Fiber][fritzbox_5590_fiber]
  - FRITZ!Box 6490 Cable
  - FRITZ!Box 6591 Cable
  - FRITZ!Box 7590
  - FRITZ!Box 7490
  - FRITZ!Box 7430
  - [FRITZ!Box 7590 AX][fritzbox_7590_ax]
  - [FRITZ!Box 7530 AX][fritzbox_7530_ax]
- [FRITZ!Smart Gateway][fritz_smart_gateway]
- FRITZ!SmartHome devices
  - [FRITZ!Smart Energy 200][fritzdect_200] (_former FRITZ!DECT 200_)
  - [FRITZ!Smart Energy 210][fritzdect_210] (_former FRITZ!DECT 210_)
  - FRITZ!Smart Thermo 301 (_former FRITZ!DECT 301_)
  - [FRITZ!Smart Thermo 302][fritzdect_302] (_former FRITZ!DECT 302_)
  - FRITZ!DECT 500
- Smart home devices from other vendors
  - Eurotronic Comet DECT
  - Magenta SmartHome LED E27 Color
  - Magenta SmartHome LED E27 warmwhite
  - [Homepilot RolloTron DECT 1213][rademacher_rollotron_dect_1213] (_former Rademacher RolloTron DECT 1213_)

## Prerequisites

Please note that in a [mesh](https://en.fritz.com/service/knowledge-base/dok/FRITZ-Box-7590/3329_Mesh-with-FRITZ/) setup, only the FRITZ!Box with the mesh master role should be added with the AVM FRITZ!SmartHome integration.

### Username

It is recommended to create a separate user to connect Home Assistant to your FRITZ!Box. To create a user, in the FRITZ!Box go to **System** > **FRITZ!Box Users** > **Users** > **Add User**. Make sure the user has the **Smart Home** permission.

{% note %}
If you still want to use the predefined user, please note that as of FRITZ!OS 7.24, the FRITZ!Box creates a random username for the admin user if you didn't set one yourself. This can be found after logging into the FRITZ!Box and visit **System** > **FRITZ!Box Users** > **Users**. The username starts with `fritz` followed by four random numbers. Under properties on the right it says `created automatically`. Prior to FRITZ!OS 7.24, the default username was `admin`.
{% endnote %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname or IP address of your FRITZ!Box router."
Username:
  description: "Name of the user to connect Home Assistant to your FRITZ!Box (_see [Username](#username)_)"
Password:
  description: "Password for the user to connect Home Assistant to your FRITZ!Box (_see [Username](#username)_)"
{% endconfiguration_basic %}

## Data fetching and limitations

Since the API of the FRITZ!Box does not provide a push mechanism, this integration polls the data every 30 seconds from the FRITZ!Box. Because of this, the integration can't support the main features of event-based devices like the [FRITZ!Smart Control 350][fritzdect_350] door/window contact sensors or the [FRITZ!Smart Control 440][fritzdect_440] buttons (_see the [other devices](#other-devices) section for details_).

## Devices

### Light bulbs

Light bulbs like the FRITZ!DECT 500 or Magenta SmartHome LED E27 Color will be integrated as {% term light %} entities.

{% note %}
The FRITZ!DECT 500 light bulb supports only 36 colors. When a color is picked in Home Assistant that is not supported by the device, a color that comes close will be activated.
{% endnote %}

### Plugs

Plugs like the [FRITZ!Smart Energy 200][fritzdect_200] or [FRITZ!Smart Energy 210][fritzdect_210] will be integrated as {% term switch %} entities.

Further there are additional {% term sensor %} and {% term binary_sensor "binary sensor" %} entities created for each device, based on its capabilities:

- Button lock via UI
- Button lock on device
- Electric Current
- Power Consumption
- Temperature
- Total Energy
- Voltage

### Shutter drivers

Shutter drivers like the [Homepilot RolloTron DECT 1213][rademacher_rollotron_dect_1213] will be integrated as {% term cover %} entities.

### Templates

Self defined [templates](https://en.fritz.com/guide/three-smart-home-templates-that-will-make-your-life-easier) within the FRITZ!Box smart home configuration menu, will be integrated as {% term button %} entities and those can be triggered from within Home Assistant.

### Thermostats

Thermostats like the FRITZ!Smart Thermo series or Eurotronic Comet DECT will be integrated as {% term climate %} entities.

Further there are additional {% term sensor %} and {% term binary_sensor "binary sensor" %} entities created for each device which can be useful for {% term automations %} and {% term templates %}, based on its capabilities:

- Battery
- Battery low
- Button lock via UI
- Button lock on device
- Comfort Temperature
- Current Scheduled Preset
- Eco Temperature
- Holiday mode
- Next Scheduled Change Time
- Next Scheduled Preset
- Next Scheduled Temperature
- Open window detected
- Summer mode

### Other devices

Event based devices like motion detection sensors or window/door contacts or buttons (_for example, [FRITZ!Smart Control 350][fritzdect_350] or the [FRITZ!Smart Control 440][fritzdect_440]_) cannot be controlled or used via this integration, but their sensors can still be integrated.

The availability of these {% term sensor %} and {% term binary_sensor "binary sensor" %} entities depends on the features and capabilities of the connected device and can be one or multiple of:

- Battery
- Battery low
- Button lock via UI
- Button lock on device
- Humidity
- Open window detected
- Temperature

[fritzbox_5590_fiber]: https://en.fritz.com/products/fritzbox/fritzbox-5590-fiber
[fritzbox_7590_ax]: https://en.fritz.com/products/fritzbox/fritzbox-7590-ax
[fritzbox_7530_ax]: https://en.fritz.com/products/fritzbox/fritzbox-7530-ax
[fritzdect_200]: https://en.fritz.com/products/smart-home/fritzsmart-energy-200
[fritzdect_210]: https://en.fritz.com/products/smart-home/fritzsmart-energy-210
[fritzdect_302]: https://en.fritz.com/products/smart-home/fritzsmart-thermo-302
[fritzdect_350]: https://en.fritz.com/products/smart-home/fritzsmart-control-350
[fritzdect_440]: https://en.fritz.com/products/smart-home/fritzsmart-control-440
[fritz_smart_gateway]: https://en.fritz.com/products/smart-home/fritzsmart-gateway
[rademacher_rollotron_dect_1213]: https://www.rademacher.de/shop/rollladen-sonnenschutz/elektrischer-gurtwickler/rollotron-dect-1213

## Troubleshooting

In any case, when reporting an issue, please enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), restart the integration, and as soon as the issue re-occurs stop the debug logging again (_download of debug log file will start automatically_). Further _if still possible_, please also download the [diagnostics](/integrations/diagnostics) data. If you have collected the debug log and the diagnostics data, provide them with the issue report.

## Remove the integration

{% include integrations/remove_device_service.md %}

If you don't use the separate created FRITZ!Box user anymore, than remove it from the FRITZ!Box under to **System** > **FRITZ!Box Users** > **Users**.
