---
title: "KNX Scene"
description: "Instructions on how to integrate KNX Scenes into Home Assistant."
ha_category:
  - Scene
ha_release: 0.63
ha_domain: knx
---

<div class='note'>
  
The `knx` integration must be configured correctly to use this integration, see [KNX Integration](/integrations/knx).

</div>

The `knx` scenes platform allows you to trigger [KNX](https://www.knx.org/) scenes.

## Configuration

To use your KNX scence in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
scene:
  - name: Romantic
    platform: knx
    address: 8/8/8
    scene_number: 23
```

{% configuration %}
address:
  description: KNX group address for the scene.
  required: true
  type: string
scene_number:
  description: KNX scene number to be activated. ( 1 ... 64 )
  required: true
  type: integer
name:
  description: A name for this device used within Home Assistant.
  required: false
  type: string
{% endconfiguration %}
