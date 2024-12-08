---
title: ColorExtractor
description: Instructions how to integrate the Color Extractor into Home Assistant.
ha_release: 0.118
ha_category:
  - Image processing
ha_domain: color_extractor
ha_codeowners:
  - '@GenericStudent'
ha_config_flow: true
ha_integration_type: integration
---

The **ColorExtractor** {% term integration %} will extract the predominant color from a given image and apply that color to a target light.
Useful as part of an {% term automation %}.

{% include integrations/config_flow.md %}

## Actions

Because `color_extractor.turn_on` will then call `light.turn_on`, you can pass any valid [`light.turn_on`](/integrations/light#action-lightturn_on) parameters (`rgb_color` will be set for you though) as those will be passed along.

Passing the key `color_extract_url` to the {% term action %} call will download the linked image and extract the predominant color from it. Passing the key `color_extract_path` to the action will process the image file from local storage instead. `color_extract_url` and `color_extract_path` are exclusive and cannot be used together.

| Key                  | Example                               | Description                                                                    |
| -------------------- | ------------------------------------- | ------------------------------------------------------------------------------ |
| `color_extract_url`  | `https://example.com/images/logo.png` | The full URL (including schema, `http://`, `https://`) of the image to process |
| `color_extract_path` | `/tmp/album.png`                      | The full path to the image file on local storage we'll process                 |
| `entity_id`          | `light.shelf_leds`                    | The RGB capable light we'll set the color of                                   |

{% important %}
Ensure any [external URLs](/integrations/homeassistant/#allowlist_external_urls) or [external files](/integrations/homeassistant/#allowlist_external_dirs) are authorized for use. You will receive error messages if this {% term integration %} is not allowed access to these external resources.
{% endimportant %}

### URL Action

Add the parameter key `color_extract_url` to the action.

This {% term action %} allows you to pass in the URL of an image, have it downloaded, get the predominant color from it, and then set a light's RGB value to it.

### File Action

Add the parameter key `color_extract_path` to the action.

This {% term action %} is very similar to the URL action above, except it processes a file from the local file storage.

## Example Automations

Example usage in an {% term automation %}, taking the album art present on a Chromecast and supplying it to `light.shelf_leds` whenever it changes:

{% raw %}

```yaml
#automation.yaml
- alias: "Chromecast to Shelf Lights"

  triggers:
    - trigger: state
      entity_id: media_player.chromecast

  actions:
    - action: color_extractor.turn_on
      data_template:
        color_extract_url: "{{ states.media_player.chromecast.attributes.entity_picture }}"
        entity_id: light.shelf_leds
```

With a nicer transition period of 5 seconds and setting brightness to 100% each time (part of the [`light.turn_on`](/integrations/light#action-lightturn_on) action parameters):

```yaml
#automation.yaml
- alias: "Nicer Chromecast to Shelf Lights"

  triggers:
    - trigger: state
      entity_id: media_player.chromecast

  actions:
    - action: color_extractor.turn_on
      data_template:
        color_extract_url: "{{ states.media_player.chromecast.attributes.entity_picture }}"
        entity_id: light.shelf_leds
        brightness_pct: 100
        transition: 5
```

{% endraw %}
