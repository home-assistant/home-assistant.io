---
title: IKEA TRÅDFRI
description: Access and control your IKEA Trådfri Gateway and its connected Zigbee-based devices.
featured: true
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: 0.43
ha_category:
  - Cover
  - Fan
  - Light
  - Sensor
  - Switch
ha_domain: tradfri
ha_homekit: true
ha_platforms:
  - cover
  - diagnostics
  - fan
  - light
  - sensor
  - switch
ha_integration_type: integration
---

The IKEA TRÅDFRI integration allows you to connect your IKEA Trådfri Gateway to Home Assistant. The gateway can control compatible Zigbee-based lights (certified Zigbee Light Link products) connected to it.

{% include integrations/config_flow.md %}

You will be prompted to configure the gateway through the Home Assistant interface. The configuration process is very simple: when prompted, enter the security key printed on the sticker on the bottom of the IKEA Trådfri Gateway, then click *configure*.

{% tip %}
If you see an "Unable to connect" message, restart the gateway and try again. Don't forget to assign a permanent IP address to your IKEA Trådfri Gateway on your router or DHCP server.
{% endtip %}

{% note %}
There is currently no dedicated core integration for the Dirigera hub released in October 2022.

The Dirigera hub can, however, be integrated directly via the [HomeKit device](/integrations/homekit_controller/) integration or the [Matter](/integrations/matter/#using-a-matter-bridge) integration. As of Hub version 2.615.8 (September 2024), there is support for the following device types via Matter Bridge: lights (including drivers), smart plugs/outlets, connected blinds, remotes, motion sensors, open/close sensors, air purifiers, and air quality sensors.
{% endnote %}


## Troubleshooting

### Incorrect security key

`Fatal DTLS error: code 20` might indicate a missing or incorrect security key. Pay close attention as e.g., "I" and "l" can easily be confused.

### Firmware updates

After updating your IKEA Trådfri Gateway firmware it might be necessary to repeat the configuration process. One error you might experience after a firmware update is `Fatal DTLS error: code 115`. If you encounter problems:
- when configured using the integration: remove the integration through Settings > Integrations > Tradfri > delete (trash can icon)

Then restart Home Assistant. When prompted, enter the security key and click *configure*, just like during initial setup.

### Compilation issues

{% note %}
This does not apply to Home Assistant running in Docker Containers, including the default Home Assistant install.
{% endnote %}

Please make sure you have `autoconf` installed (`$ sudo apt-get install autoconf`) if you want to use this integration. Also, installing some dependencies might take considerable time (more than one hour) on slow devices.

## Known limitations

- The TRÅDFRI Shortcut button, Remotes and motion sensor only send information about their battery status, no events, to Home Assistant and thus can't be used to automate with. If you want to automate with these devices, you need to use something like [ZHA](/integrations/zha/), or the [HomeKit device](/integrations/homekit_controller) integration as mentioned above.
- The groups you find in the app are not imported into Home Assistant as they are known to cause stability issues. We recommend that you use the native [light groups](/integrations/light.group/) instead.
