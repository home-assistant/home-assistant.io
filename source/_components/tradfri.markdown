---
title: "IKEA Trådfri (Tradfri)"
description: "Access and control your IKEA Trådfri Gateway (a.k.a. IKEA Tradfri hub/bridge) and via it its connected Zigbee-based devices."
featured: true
logo: ikea.svg
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: 0.43
ha_category:
  - Light
  - Sensor
  - Switch
redirect_from:
  - /components/light.tradfri/
  - /components/sensor.tradfri/
  - /components/switch.tradfri/
---

The `tradfri` integration support the IKEA Trådfri Gateway (a.k.a. IKEA Tradfri hub/bridge). The gateway can control compatible Zigbee-based lights (certified ZigBee Light Link products) connected to it and Home Assistant will automatically discover the gateways presence on your local network, if `discovery:` is present in your `configuration.yaml` file.

You will be prompted to configure the gateway through the Home Assistant interface. The configuration process is very simple, when prompted, enter the security key printed on the physical sticker that is on the bottom of the IKEA Trådfri Gateway, then click configure.

<div class='note'>
If you see an "Unable to connect" message, restart the gateway and try again. Don't forget to assign a permanent IP address to your IKEA Trådfri Gateway in your router / DHCP-server.
</div>

## Configuration

You can add the following to your `configuration.yaml` file if you are not using the [`discovery:`](/components/discovery/) component:

```yaml
# Example configuration.yaml entry
tradfri:
  host: IP_ADDRESS
```

{% configuration %}
host:
  description: "The IP address or hostname of your IKEA Trådfri Gateway."
  required: true
  type: string
allow_tradfri_groups:
  description: "Set this to `true` to allow Home Assistant to import the groups defined on the IKEA Trådfri Gateway."
  required: false
  type: boolean
  default: false
{% endconfiguration %}

## Troubleshooting

### Firmware updates

After updating the firmware of your IKEA Trådfri Gateway it might be necessary to repeat the configuration process. Possible errors: `Fatal DTLS error: code 115`. If you encounter problems:
- when configured using the integration: remove the integration through Settings > Integrations > Tradfri > delete using trash can icon;
- with manual configuration: delete the `.tradfri_psk.conf` file in your `.homeassistant` directory;

Then restart Home Assistant, when prompted enter the security key and click configure, just like during initial setup.

### Compilation issues

<div class='note'>
  This does not apply to Hass.io or Docker.
</div>

Please make sure you have `autoconf` installed (`$ sudo apt-get install autoconf`) if you want to use this component. Also, installing some dependencies might take considerable time (>1 h) on slow devices.

### Setting the `api_key`

Do not use the `api_key` variable in `configuration.yaml`. The API key is only needed once at initial setup and will be stored.
