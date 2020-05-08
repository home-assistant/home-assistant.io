---
title: Hunter Douglas PowerView
description: Instructions on how to setup Hunter Douglas PowerView scenes within Home Assistant.
ha_category:
  - Scene
ha_release: 0.15
ha_domain: hunterdouglas_powerview
---

Implements the [Hunter Douglas PowerView](https://www.hunterdouglas.com/operating-systems/powerview-motorization/support) platform scene control. It queries the PowerView Hub and Home Assistant displays them as scenes.

Scenes can be activated using the service `scene.turn_on`.

```yaml
# Example configuration.yaml entry
scene:
  platform: hunterdouglas_powerview
  address: IP_ADDRESS
```

{% configuration %}
address:
  description: IP address of the PowerView Hub, e.g., 192.168.1.10.
  required: true
  type: string
{% endconfiguration %}

## Example Automations

``` yaml
- alias: "blinds closed at night"
  trigger:
    platform: time
    at: "18:00:00"
  action:
    - service: scene.turn_on
      entity_id: scene.10877
```
