---
layout: page
title: "IKEA Trådfri (Tradfri)"
description: "Access and control your IKEA Trådfri Gateway (a.k.a. IKEA Tradfri hub/bridge) and via it its connected Zigbee-based devices."
date: 2017-04-12 22.04
sidebar: true
featured: true
comments: false
sharing: true
footer: true
logo: ikea.svg
ha_category: Hub
ha_iot_class: "Local Polling"
ha_release: 0.43
---

The `tradfri` component support the IKEA Trådfri Gateway (a.k.a. IKEA Tradfri hub/bridge). The gateway can control compatible Zigbee-based lights (certified ZigBee Light Link products) connected to it and Home Assistant will automatically discover the gateways presence on your local network, if `discovery:` is present in your `configuration.yaml` file.

You will be prompted to configure the gateway through the Home Assistant interface. The configuration process is very simple, when prompted, enter the security key printed on the physical sticker that is on the bottom of the IKEA Trådfri Gateway, then click configure.

<p class='note'>
If you see an "Unable to connect" message, restart the gateway and try again. Don't forget to assign a permanent IP to your IKEA Trådfri Gateway in your router / DHCP-server.
</p>

## {% linkable_title Configuration %}

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

## {% linkable_title Troubleshooting %}

### {% linkable_title Firmware updates %}

After updating the firmware of your IKEA Trådfri Gateway it might be necessary to repeat the configuration process. If you encounter problems, delete the `.tradfri_psk.conf` file in your `.homeassistant` directory, restart Home Assistant, when prompted enter the security key and click configure, just like during initial setup. Possible errors: `Fatal DTLS error: code 115`.

### {% linkable_title Compilation issues %}

Please make sure you have `autoconf` installed (`$ sudo apt-get install autoconf`) if you want to use this component. Also, installing some dependencies might take considerable time (>1 h) on slow devices.

### {% linkable_title Setting the `api_key` %}

Do not use the `api_key` variable in `configuration.yaml`. The API key is only needed once at initial setup and will be stored.
