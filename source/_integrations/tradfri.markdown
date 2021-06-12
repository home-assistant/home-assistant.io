---
title: IKEA TRÅDFRI
description: Access and control your IKEA Trådfri Gateway and its connected Zigbee-based devices.
featured: true
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: 0.43
ha_category:
  - Cover
  - Light
  - Sensor
  - Switch
ha_domain: tradfri
ha_homekit: true
ha_platforms:
  - cover
  - light
  - sensor
  - switch
---

The `tradfri` integration allows you to connect your IKEA Trådfri Gateway to Home Assistant. The gateway can control compatible Zigbee-based lights (certified Zigbee Light Link products) connected to it. Home Assistant will automatically discover the gateway's presence on your local network if `discovery:` is present in your `configuration.yaml` file.

You will be prompted to configure the gateway through the Home Assistant interface. The configuration process is very simple: when prompted, enter the security key printed on the sticker on the bottom of the IKEA Trådfri Gateway, then click *configure*.

<div class='note'>
If you see an "Unable to connect" message, restart the gateway and try again. Don't forget to assign a permanent IP address to your IKEA Trådfri Gateway on your router or DHCP server.
</div>

## Configuration

You can add the following to your `configuration.yaml` file if you are not using the [`discovery:`](/integrations/discovery/) component:

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

### Incorrect security key

`Fatal DTLS error: code 20` might indicate a missing or incorrect security key. Pay close attention as e.g., "I" and "l" can easily be confused.

### Firmware updates

After updating your IKEA Trådfri Gateway firmware it might be necessary to repeat the configuration process. One error you might experience after a firmware update is `Fatal DTLS error: code 115`. If you encounter problems:
- when configured using the integration: remove the integration through Settings > Integrations > Tradfri > delete (trash can icon)
- with manual configuration: delete the `.tradfri_psk.conf` file in your `/config` directory (`/.homeassistant` directory if using Home Assistant Core)

Then restart Home Assistant. When prompted, enter the security key and click *configure*, just like during initial setup.

### Compilation issues

<div class='note'>
  This does not apply to Home Assistant running in Docker Containers, including the default Home Assistant install.
</div>

Please make sure you have `autoconf` installed (`$ sudo apt-get install autoconf`) if you want to use this component. Also, installing some dependencies might take considerable time (more than one hour) on slow devices.

### Setting the `api_key`

Do not use the `api_key` variable in `configuration.yaml`. The API key is only needed once at initial setup and will be stored.
