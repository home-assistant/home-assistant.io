---
title: "Get predominant color"
action: color_extractor.get_color
domain: color_extractor
description: "Returns the predominant RGB color found in an image provided by URL or file path."
related_actions:
  - color_extractor.turn_on
---

The **Get predominant color** action extracts the predominant color from an image and returns it as response data. Unlike [Turn on](/actions/color_extractor.turn_on/), this action does not change any light. It only reports the color, so you can use the result however you like, for example to set a different light, store it, or drive another action.

To use the returned color in later steps, store it in a response variable. This action does not target an entity. Instead, you provide the image as a web URL or as a file on the system running Home Assistant.

{% include actions/ui_header.md %}

To get the predominant color from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **ColorExtractor: Get predominant color**.
6. Enter either an **Image URL** or an **Image path**.
7. Select **Save**.

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

In YAML, refer to this action as `color_extractor.get_color`. A basic example looks like this:

{% example %}
action: |
  action: color_extractor.get_color
  data:
    color_extract_url: "https://www.example.com/images/logo.png"
  response_variable: extracted_color
{% endexample %}

This extracts the predominant color and stores it in the `extracted_color` response variable.

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

## Response data

The response data is a mapping with a single `color` field. It holds the predominant color as a list of three RGB values, each from 0 to 255, such as `[255, 128, 0]`.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

## Good to know

Before using this action, make sure any external URLs are added to [`allowlist_external_urls`](/integrations/homeassistant/#allowlist_external_urls) and any local file paths are added to [`allowlist_external_dirs`](/integrations/homeassistant/#allowlist_external_dirs). Without this, the action cannot access the image and returns an error.

{% include actions/related.md %}
