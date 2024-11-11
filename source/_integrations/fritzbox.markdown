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
ha_quality_scale: gold
---

The AVM FRITZ!SmartHome integration for Home Assistant allows you to integrate [AVM Smart Home](https://en.avm.de/products/smart-home/) (_former AVM FRITZ!DECT_) devices like plugs, thermostats or shutter drivers as also trigger so called smart home templates (_contains settings for Smart Home devices of the same type_).

#### Tested devices

- [FRITZ!Box 5590 Fiber][fritzbox_5590_fiber]
- FRITZ!Box 6490 Cable
- [FRITZ!Box 6591 Cable][fritzbox_6591_cable]
- [FRITZ!Box 7590][fritzbox_7590]
- [FRITZ!Box 7590 AX][fritzbox_7590_ax]
- [FRITZ!Box 7530 AX][fritzbox_7530_ax]
- FRITZ!Box 7490
- FRITZ!Box 7430
- [FRITZ!DECT 200][fritzdect_200]
- [FRITZ!DECT 210][fritzdect_210]
- [FRITZ!DECT 301][fritzdect_301]
- [FRITZ!DECT 302][fritzdect_302]
- [FRITZ!DECT 500][fritzdect_500]
- [Eurotronic Comet DECT][eurotronic_comet_dect]
- [Magenta SmartHome LED E27 Color][magenta_led_e27_color]
- Magenta SmartHome LED E27 warmwhite
- [Rademacher RolloTron DECT 1213][rademacher_rollotron_dect_1213]

{% include integrations/config_flow.md %}

{% note %}
The configuration asks for a username. Starting from FRITZ!OS 7.24 the FRITZ!Box creates a random username for the admin user if you didn't set one yourself. This can be found after logging into the FRITZ!Box and visiting **System** > **FRITZ!Box Users** > **Users**. The username starts with `fritz` followed by four random numbers. Under **Properties** on the right, it says **created automatically**. Prior to FRITZ!OS 7.24, the default username was `admin`.
{% endnote %}

### Light bulbs

Light bulbs like the [FRITZ!DECT 500][fritzdect_500] or [Magenta SmartHome LED E27 Color][magenta_led_e27_color] will be integrated as {% term light %} entities.

{% note %}
The [FRITZ!DECT 500][fritzdect_500] light bulb supports only 36 colors. When a color is picked in Home Assistant that is not supported by the device, a color that comes close will be activated.
{% endnote %}

### Plugs

Plugs like the [FRITZ!DECT 200][fritzdect_200] or [FRITZ!DECT 210][fritzdect_210] will be integrated as {% term switch %} entities.

Further there are additional {% term sensor %} and {% term binary_sensor "binary sensor" %} entities created for each device, based on its capabilities:

- Button lock via UI
- Button lock on device
- Electric Current
- Power Consumption
- Temperature
- Total Energy
- Voltage

### Shutter drivers

Shutter drivers like the [Rademacher RolloTron DECT 1213][rademacher_rollotron_dect_1213] will be integrated as {% term cover %} entities.

### Templates

Self defined templates within the FRITZ!Box smart home configuration menu, will be integrated as {% term button %} entities and those can be triggered from within Home Assistant.

### Thermostats

Thermostats like the [FRITZ!DECT 301][fritzdect_301], [FRITZ!DECT 302][fritzdect_302] or [Eurotronic Comet DECT][eurotronic_comet_dect] will be integrated as {% term climate %} entities.

These entities can have several attributes that can be useful for {% term automations %} and {% term templates %}:

| Attribute | Description |
| --------- | ----------- |
| `battery_low` | The low battery state indication. |
| `battery_level` | The battery level (only available since Fritz!OS 7). |
| `holiday_mode` | The state of the holiday mode (only available since Fritz!OS 7). |
| `summer_mode` | The state of the summer mode (only available since Fritz!OS 7). |
| `window_open` | The state of the window open detection (only available since Fritz!OS 7). |

Further there are additional {% term sensor %} and {% term binary_sensor "binary sensor" %} entities created for each device, based on its capabilities:

- Battery
- Button lock via UI
- Button lock on device
- Comfort Temperature
- Current Scheduled Preset
- Eco Temperature
- Next Scheduled Change Time
- Next Scheduled Preset
- Next Scheduled Temperature

### Other devices

Some devices like the [FRITZ!DECT 440][fritzdect_440] can't be controlled via this integration, but its sensors can still be integrated.

The availability of these {% term sensor %} and {% term binary_sensor "binary sensor" %} entities depends on the features and capabilities of the connected device and can be one or multiple of:

- Battery
- Button lock via UI
- Button lock on device
- Humidity
- Temperature

[fritzbox_5590_fiber]: https://en.avm.de/products/fritzbox/fritzbox-5590-fiber
[fritzbox_6591_cable]: https://en.avm.de/products/fritzbox/fritzbox-6591-cable
[fritzbox_7590]: https://en.avm.de/products/fritzbox/fritzbox-7590
[fritzbox_7590_ax]: https://en.avm.de/products/fritzbox/fritzbox-7590-ax
[fritzbox_7530_ax]: https://en.avm.de/products/fritzbox/fritzbox-7530-ax
[fritzdect_200]: https://en.avm.de/products/smart-home/fritzdect-200
[fritzdect_210]: https://en.avm.de/products/smart-home/fritzdect-210
[fritzdect_301]: https://en.avm.de/products/smart-home/fritzdect-301
[fritzdect_302]: https://en.avm.de/products/smart-home/fritzdect-302
[fritzdect_440]: https://en.avm.de/products/smart-home/fritzdect-440
[fritzdect_500]: https://en.avm.de/products/smart-home/fritzdect-500
[eurotronic_comet_dect]: https://eurotronic.org/produkte/dect-ule-heizkoerperthermostat/comet-dect
[magenta_led_e27_color]: https://www.smarthome.de/geraete/smarthome-led-lampe-e27-farbig-weiss
[rademacher_rollotron_dect_1213]: https://www.rademacher.de/shop/rollladen-sonnenschutz/elektrischer-gurtwickler/rollotron-dect-1213

## Troubleshooting

In any case, when reporting an issue, please enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), restart the integration, and as soon as the issue re-occurs stop the debug logging again (_download of debug log file will start automatically_). Further _if still possible_, please also download the [diagnostics](/integrations/diagnostics) data. If you have collected the debug log and the diagnostics data, provide them with the issue report.
