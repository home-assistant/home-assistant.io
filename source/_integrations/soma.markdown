---
title: Soma Connect
description: Instructions on how to set up the Soma Connect within Home Assistant.
ha_category:
  - Cover
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: '0.100'
ha_codeowners:
  - '@ratsept'
ha_domain: soma
---

The Soma integration will allow users to integrate their Soma Smarthome devices into Home Assistant using the Soma Connect hub.

You can build a Soma Connect yourself if you have a spare Raspberry Pi. You just need to follow the [ official instructions](https://somasmarthome.zendesk.com/hc/en-us/articles/360035521234-Install-SOMA-Connect-software-on-SOMA-Connect-Raspberry-Pi). After you have the SD card plug in the Pi and use an ethernet cable or [set up Wi-Fi](https://somasmarthome.zendesk.com/hc/en-us/articles/360026210333-Configuring-Wi-Fi-access). Then find the IP address by checking your routers DHCP table (we will work on this step).

The Connect will automatically find all your Smartshade devices in range and expose them through this integration and through Home Kit. This integration will only enumerate new shades when it is first set up. If you add shades after that you just need to restart Home Assistant or reconfigure this integration. Soma Connect will automatically discover new shades as they appear and expose them.

To actually move the shades you have to first set them up according to the instructions that come with them.

## Configuration

```yaml
# Example configuration.yaml entry
soma:
  host: CONNECT_IP_ADDR
  port: CONNECT_PORT
```

{% configuration %}
host:
  description: Your Soma Connect IP address.
  required: true
  type: string
port:
  description: Your Soma Connect port.
  required: true
  default: 3000
  type: string
{% endconfiguration %}
