---
title: Volumio
description: How to set up the Volumio media player platform
ha_category:
  - Media Player
ha_release: 0.41
ha_domain: volumio
---

The `Volumio` platform allows you to control a [Volumio](https://volumio.org/) media player from Home Assistant.

The preferred way to set up the Volumio platform is by enabling the [discovery component](/integrations/discovery/).

In case the discovery does not work, or you need specific configuration variables, you can add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: volumio
    host: homeaudio.local
    port: 3000
```

{% configuration %}
name:
  description: The name of the device.
  required: false
  default: Volumio
  type: string
host:
  description: The IP address or hostname of the device.
  required: true
  default: localhost
  type: string
port:
  description: The Port number of Volumio service.
  required: true
  default: 3000
  type: integer
{% endconfiguration %}
