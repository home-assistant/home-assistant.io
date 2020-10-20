---
layout: page
title: "ColorThief"
ha_release: "0.117.0"
description: "Instructions how to call ColorThief RGB extraction service."
date: 2020-10-20 21:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: "Image Processing"
ha_domain: "colorthief"
ha_codeowners:
  - @GenericStudent
---

The ColorThief component will extract the predominant color from a given image and apply that color to a target light.
Useful as part of an automation.


To enable the colortheif service in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
colorthief:
```

### URL Service Call

Service name: `colorthief.predominant_color_url`

This service allows you to pass in the URL of an image, get the predominant color from it, and then set a light's RGB value to it.

------------------|----------|---------------------------------------|-------------------------------------------------------------------------------
Key               | Required | Example                               | Description
------------------|----------|---------------------------------------|-------------------------------------------------------------------------------
`url`             | **Yes**  | `https://example.com/images/logo.png` | The full URL (including schema, `http://`, `https://`) of the image to process
------------------|----------|---------------------------------------|-------------------------------------------------------------------------------
`light_entity_id` | **Yes**  | `light.shelf_leds`                    | The RGB capable light we'll set our color to
------------------|----------|---------------------------------------|-------------------------------------------------------------------------------
`transistion`     | **No**   | `10`                                  | The number of seconds to transition from current color to new color
------------------|----------|---------------------------------------|-------------------------------------------------------------------------------
`brightness_pct`  | **No**   | `75`                                  | The percentage (`0` - `100`) of brightness we'll set the light to
------------------|----------|---------------------------------------|-------------------------------------------------------------------------------

Example usage in an automation, taking the album art present on a Chromecast and supplying it to `light.shelf_leds` whenever it changes.

```yaml
id: chromecast_shelf_lights
alias: Chromecast to Shelf Lights

trigger:
  - platform: state
    entity_id: media_player.chromecast

action:
  - service: colorthief.predominant_color_url
    data_template:
      url: '{{ states.media_player.chromecast.attributes.entity_picture }}'
      light_entity_id: light.shelf_leds
```

With a nicer transition period of 5 seconds and setting brightness to 100% each time.

```yaml
id: chromecast_shelf_lights
alias: Chromecast to Shelf Lights

trigger:
  - platform: state
    entity_id: media_player.chromecast

action:
  - service: colorthief.predominant_color_url
    data_template:
      url: '{{ states.media_player.chromecast.attributes.entity_picture }}'
      light_entity_id: light.shelf_leds
      brightness_pct: 100
      transition: 5
```

## File Service Call

Service name: `colorthief.predominant_color_file`

This service is very similar to the URL service above, except it processes a file from the local file storage.

------------------|----------|--------------------|--------------------------------------------------------------------
Key               | Required | Example            | Description
------------------|----------|--------------------|--------------------------------------------------------------------
`file_path`       | **Yes**  | `/tmp/album.png`   | The full path to the image file we'll process
------------------|----------|--------------------|--------------------------------------------------------------------
`light_entity_id` | **Yes**  | `light.shelf_leds` | The RGB capable light we'll set our color to
------------------|----------|--------------------|--------------------------------------------------------------------
`transistion`     | **No**   | `10`               | The number of seconds to transition from current color to new color
------------------|----------|-----------------------------------------------------------------------------------------
`brightness_pct`  | **No**   | `75`               | The percentage (`0` - `100`) of brightness we'll set the light to
------------------|----------|--------------------|--------------------------------------------------------------------
