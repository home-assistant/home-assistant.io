---
title: Image
description: Instructions on how to integrate images within Home Assistant.
ha_category:
  - Image
ha_release: 2023.7
ha_quality_scale: internal
ha_domain: image
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

The **Image** {% term integration %} allows other integrations to display a static image.

{% include integrations/building_block_integration.md %}

## The state of an image entity

The state of an image entity is a timestamp, showing the date and time when the image was last changed.

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

### Actions

Once loaded, the `image` platform will expose services that can be called to perform various actions.

Available services: `snapshot`.

#### Action `snapshot`

Take a snapshot from an image.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      no  | Name(s) of entities to create a snapshot from, e.g., `image.my_image`. |
| `filename`             |      no  | Template of a file name. Variable is `entity_id`, e.g., {% raw %}`/tmp/snapshot_{{ entity_id.name }}`{% endraw %}. |

The path part of `filename` must be an entry in the `allowlist_external_dirs` in your [`homeassistant:`](/docs/configuration/basic/) section of your `configuration.yaml` file.

For example, the following action in an automation would take a snapshot from "yourimage" and save it to /tmp with a timestamped filename.

{% raw %}

```yaml
action:
  service: image.snapshot
  target:
    entity_id: image.yourimage
  data:
    filename: '/tmp/{{ entity_id.name }}_{{ now().strftime("%Y%m%d-%H%M%S") }}.jpg'
```

{% endraw %}
