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
  type: LS50
```

{% configuration %}
host:
  description: "IP address of the device. Example: 192.168.1.32"
  required: true
  type: string
type:
  description: The speaker type, either `LS50` or `LSX`.
  required: true
  type: string
name:
  description: The name of the device
  required: false
  default: KEF
  type: string
maximum_volume:
  description: Maximum volume allowed. Number between 0 and 1.
  required: false
  default: 0.5
  type: float
volume_step:
  description: Volume step when increasing volume.
  required: false
  default: 0.05
  type: float
inverse_speaker_mode:
  description: Switch channels from L/R to R/L.
  required: false
  default: false
  type: boolean
standby_time:
  description: The speakers automatically turn to standby mode after either `20` or `60` minutes. Leave out for the speaker to never go into standby mode.
  required: false
  type: integer
{% endconfiguration %}

## Advanced configuration example

```yaml
# Example configuration.yaml entry
- platform: kef
  host: IP_ADDRESS
  type: LS50
  name: My KEF speakers
  maximum_volume: 0.6
  volume_step: 0.05
```

Notes:

- The LS50 Wireless is tested with the latest firmware of 19-11-2019: `p6.3001902221.105039422` and older firmware: `p6.2101809171.105039422`

[KEF Speakers]: /integrations/kef/
