---
title: ColorExtractor
description: Instructions how to integrate the Color Extractor into Home Assistant.
ha_release: 0.118
ha_categories:
  - lighting
ha_domain: color_extractor
ha_codeowners:
  - '@GenericStudent'
ha_config_flow: true
ha_integration_type: integration
---

The **ColorExtractor** {% term integration %} will extract the predominant color from a given image and apply that color to a target light.
Useful as part of an {% term automation %}.

{% include integrations/config_flow.md %}


{% include integrations/actions.md %}

## Minimum brightness

By default, ColorExtractor returns the predominant color without filtering. To ignore very dark regions of an image, both the `color_extractor.get_color` and `color_extractor.turn_on` actions accept an optional `min_brightness` parameter between 0 and 100.

The threshold is based on the HSV value component, expressed as a percentage. Pixels below the specified threshold are excluded *before* extracting the predominant color. This helps identify colorful details in an otherwise dark image, such as album artwork.

For example, to apply a predominant color that is at least 30% bright:

```yaml
action: color_extractor.turn_on
target:
  entity_id: light.living_room
data:
  color_extract_url: "https://example.com/album-cover.png"
  min_brightness: 30
```

To retrieve a color without modifying a light:

```yaml
action: color_extractor.get_color
data:
  color_extract_url: "https://example.com/album-cover.png"
  min_brightness: 30
response_variable: extracted_color
```

The response includes `color` with the RGB values. If no sufficiently bright pixels exist, `get_color` returns `{"color": null}`; `turn_on` does not change the target light. Omitting `min_brightness` preserves the existing predominant-color behavior.
