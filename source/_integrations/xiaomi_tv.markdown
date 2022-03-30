---
title: Xiaomi TV
description: Instructions on how to integrate a Xiaomi TV into Home Assistant.
ha_category:
  - Media Player
ha_release: 0.64
ha_iot_class: Assumed State
ha_codeowners:
  - '@simse'
ha_domain: xiaomi_tv
ha_platforms:
  - media_player
ha_integration_type: integration
---

The `xiaomi_tv` platform allows you to control a [Xiaomi TV](https://www.mi.com/en/mitv3s/65flat/).

You need to make sure the TV is connected to the internet, and that your Home Assistant instance is on the same network.

To add a TV to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: xiaomi_tv
```

<div class='note warning'>
When starting or restarting Home Assistant make sure your TV is off. This is a flaw in the TV itself.
</div>

{% configuration %}
host:
  description: "The IP of the Xiaomi TV, e.g., `192.168.0.10`."
  required: false
  type: string
name:
  description: The name to use on the frontend.
  required: false
  default: Xiaomi TV
  type: string
{% endconfiguration %}

If you do not set a host in the configuration file, local TVs will automatically be discovered.

To manually add a TV you can use the following configuration:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: xiaomi_tv
    host: YOUR_TV_IP
    name: YOUR_TV_NAME
```

<div class='note info'>
The platform will never turn your TV off. Instead, it will be put to sleep and woken up. This can be useful, because the selected source of the TV will remain the same. It will essentially turn your TV into a dumb TV.
</div>
