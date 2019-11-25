---
title: "KEF Speakers"
description: "Instructions on how to integrate KEF Speakers into Home Assistant."
logo: kef.png
ha_category:
  - Media Player
ha_iot_class: Local Polling
ha_release: 0.103
---

The `kef` platform allows you to control the [KEF LS50 Wireless](https://international.kef.com/products/ls50-wireless) and [KEF LSX](https://international.kef.com/products/lsx) speakers from Home Assistant.

Supported devices:

- KEF LS50 Wireless
- KEF LSX (untested)

To add KEF Speakers to your installation, add the following to your `configuration.yaml` file:

## Configuration

```yaml
# Example configuration.yaml entry
- platform: kef
  host: IP_ADDRESS
  name: My KEF speakers
  maximum_volume: 0.6
  volume_step: 0.05
```

{% configuration %}
host:
  description: "IP address of the device. Example: 192.168.1.32"
  required: true
  type: string
name:
  description: The name of the device
  required: false
  type: string
maximum_volume:
  description: Maximum volume allowed. Number between 0 and 1.
  required: false
  type: float
volume_step:
  description: Volume step when increasing volume. By default 0.05
  required: false
  type: float
{% endconfiguration %}

Notes:

- The LS50 Wireless is tested with the latest firmware at 08-11-2019: `p6.2101809171.105039422`

[KEF Speakers]: /integrations/kef/
