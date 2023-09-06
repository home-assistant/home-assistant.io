---
title: Russound RIO
description: Instructions on how to integrate Russound RIO devices into Home Assistant.
ha_category:
  - Media Player
ha_release: 0.49
ha_iot_class: Local Push
ha_domain: russound_rio
ha_platforms:
  - media_player
ha_integration_type: integration
---

The `russound_rio` platform allows you to control Russound devices that make use of the RIO protocol.

The platform automatically discovers all enabled zones and sources. Each zone is added as a media player device with the enabled sources available as inputs. Media information is supported if the selected source reports it.

To add a device to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: russound_rio
    host: 192.168.1.10
    name: Russound
```

{% configuration %}
host:
  description: The IP of the TCP gateway.
  required: true
  type: string
port:
  description: The port of the TCP gateway.
  required: false
  default: 9621
  type: integer
name:
  description: The name of the device.
  required: true
  type: string
{% endconfiguration %}
