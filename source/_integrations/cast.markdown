---
title: Google Cast
description: Instructions on how to integrate Google Cast into Home Assistant.
ha_category:
  - Media Player
featured: true
ha_release: pre 0.7
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: cast
---

You can enable the Cast integration by going to the Integrations page inside the configuration panel.

## Home Assistant Cast

Home Assistant has its own Cast application to show the Home Assistant UI on any Chromecast device.  You can use it by adding the [Cast entity row](/lovelace/entities/#cast) to your Lovelace UI, or by calling the `cast.show_lovelace_view` service. The service takes the path of a Lovelace view and an entity ID of a Cast device to show the view on. A `path` has to be defined in your Lovelace YAML for each view, as outlined in the [views documentation](/lovelace/views/#path).

```json
{
  "entity_id": "media_player.office_display_4",
  "view_path": "lights"
}
```

Note that Home Assistant Cast requires your Home Assistant installation to be accessible via `https://`. If you're using Home Assistant Cloud, you don't need to do anything. Otherwise you must make sure that you have configured the `base_url` for [the `http` integration](/integrations/http/).

## Advanced use

### Manual configuration
By default, any discovered Cast device is added to Home Assistant. This can be restricted by supplying a white list of wanted chrome casts.

```yaml
# Example configuration.yaml entry
cast:
  media_player:
    - host: 192.168.1.10
```

{% configuration %}
media_player:
  description: A list that contains all Cast devices.
  required: true
  type: list
  keys:
    host:
      description: IP-address of a Cast device to add to Home Assistant. Use only if you don't want to add all available devices. The device won't be added until discovered through mDNS.
      required: false
      type: string
    ignore_cec:
      description: >
        A list of Chromecasts that should ignore CEC data for determining the
        active input. [See the upstream documentation for more information.](https://github.com/balloob/pychromecast#ignoring-cec-data)
      required: false
      type: list
{% endconfiguration %}

### Cast devices and Home Assistant on different subnets

Cast devices can only be discovered and connected to if they are on the same subnet as Home Assistant. If this is not the case, it's necessary to:

- Enable mDNS forwarding between the subnets.
- Enable source NAT to make requests from Home Assistant to the Chromecast appear to come from the same subnet as the Chromecast.

Setups with cast devices on a different subnet than Home Assistant are not recommended and not supported.
