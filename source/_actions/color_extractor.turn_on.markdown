---
title: "Turn on"
action: color_extractor.turn_on
domain: color_extractor
description: "Sets a light to the predominant color found in an image provided by URL or file path."
related_actions:
  - color_extractor.get_color
---

The **Turn on** action extracts the predominant color from an image and turns on one or more lights set to that color. You provide the image as a web URL or as a file on the system running Home Assistant, and the action picks the most dominant color and applies it as the light's RGB color.

Because this action then calls [`light.turn_on`](/actions/light.turn_on/), you can also pass any valid `light.turn_on` options, such as `brightness_pct` or `transition`. The `rgb_color` is set for you from the extracted color.

## Prerequisites

Before using this action, make sure any external URLs are added to [`allowlist_external_urls`](/integrations/homeassistant/#allowlist_external_urls) and any local file paths are added to [`allowlist_external_dirs`](/integrations/homeassistant/#allowlist_external_dirs). Without this, the action cannot access the image and returns an error.

{% include actions/ui_header.md %}

To turn on a light with an extracted color from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the area, floor, device, label, or light entity you want to control.
6. From the actions shown for that target, select **ColorExtractor: Turn on**.
7. Enter either an **Image URL** or an **Image path**, and set any of the options you need.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Image URL:
  description: The URL of the image to extract the color from. The URL must be allowed in `allowlist_external_urls`. Cannot be combined with an image path.
  required: false
Image path:
  description: The full system path to the image to extract the color from. The path must be allowed in `allowlist_external_dirs`. Cannot be combined with an image URL.
  required: false
{% endoptions_ui %}

Provide either an image URL or an image path. You cannot use both in the same action call.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `color_extractor.turn_on`. A basic example looks like this:

{% example %}
action: |
  action: color_extractor.turn_on
  target:
    entity_id: light.shelf_leds
  data:
    color_extract_url: "https://www.example.com/images/logo.png"
{% endexample %}

This extracts the predominant color from the image and turns on `light.shelf_leds` set to that color.

### Options in YAML

{% options_yaml %}
color_extract_url:
  description: >
    The URL of the image to extract the color from. The URL must be allowed
    in `allowlist_external_urls`. Cannot be combined with `color_extract_path`.
  required: false
  type: string
color_extract_path:
  description: >
    The full system path to the image to extract the color from. The path
    must be allowed in `allowlist_external_dirs`. Cannot be combined with
    `color_extract_url`.
  required: false
  type: string
{% endoptions_yaml %}

Provide either `color_extract_url` or `color_extract_path`. The two options are mutually exclusive and cannot be used together.

{% include actions/targets.md domain="light" %}

## Good to know

- Make sure any external URL is added to [`allowlist_external_urls`](/integrations/homeassistant/#allowlist_external_urls) and any local file path is added to [`allowlist_external_dirs`](/integrations/homeassistant/#allowlist_external_dirs). Otherwise, the action cannot access the image and returns an error.
- You can pass any [`light.turn_on`](/actions/light.turn_on/) options along with this action, such as `brightness_pct` or `transition`. The RGB color is always set from the extracted color.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: match shelf lights to Chromecast album art

Use this automation to set your shelf lights to the predominant color of the album art whenever it changes on a Chromecast.

- **Trigger**: Chromecast state changes
- **Action**: ColorExtractor: Turn on
  - **Target**: Shelf lights
  - **Image URL**: The Chromecast album art

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Chromecast to shelf lights"
    triggers:
      - trigger: state
        entity_id: media_player.chromecast
    actions:
      - action: color_extractor.turn_on
        target:
          entity_id: light.shelf_leds
        data:
          color_extract_url: "{{ state_attr('media_player.chromecast', 'entity_picture') }}"
          brightness_pct: 100
          transition: 5
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
