---
title: "Upload image"
action: opendisplay.upload_image
domain: opendisplay
description: "Uploads an image to an OpenDisplay device."
---

Use this action to upload an image to an OpenDisplay device. The image is resized and dithered to match the display's resolution and color palette.

{% include actions/ui_header.md %}

To upload an image from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **OpenDisplay: Upload image**.
6. Select the OpenDisplay device in the **Device** field, then choose the **Image** to upload.
7. To control how the image is processed, open **Additional options** and set the **Rotation**, **Dither mode**, **Refresh mode**, **Fit mode**, and **Tone compression** as needed.
8. Select **Save**.

This action does not support targets. In the UI, you select the OpenDisplay device through the **Device** field instead of choosing an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Device:
  description: The OpenDisplay device to upload the image to.
  required: true
Image:
  description: The image to upload to the display.
  required: true
Rotation:
  description: The rotation angle in degrees, applied clockwise. One of 0, 90, 180, or 270.
  required: false
Dither mode:
  description: The dithering algorithm to use for converting the image to the display's color palette.
  required: false
Refresh mode:
  description: The display refresh mode. Full refresh clears ghosting but is slower. Fast refresh is not supported on all displays.
  required: false
Fit mode:
  description: How the image is fitted to the display dimensions.
  required: false
Tone compression:
  description: Dynamic range compression strength, as a percentage from 0 to 100. Leave empty for automatic.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `opendisplay.upload_image`. A basic example looks like this:

{% example %}
action: |
  action: opendisplay.upload_image
  data:
    device_id: a1b2c3d4e5f6
    image:
      media_content_id: media-source://media_source/local/artwork.png
      media_content_type: image/png
    fit_mode: contain
{% endexample %}

This uploads the image and scales it to fit within the display.

### Options in YAML

{% options_yaml %}
device_id:
  description: The OpenDisplay device to upload the image to.
  required: true
  type: string
image:
  description: The image to upload to the display, selected from a media source.
  required: true
  type: map
rotation:
  description: The rotation angle in degrees, applied clockwise. One of 0, 90, 180, or 270.
  required: false
  type: integer
  default: 0
dither_mode:
  description: >
    The dithering algorithm to use for converting the image to the display's
    color palette. One of `none`, `burkes`, `ordered`, `floyd_steinberg`,
    `atkinson`, `stucki`, `sierra`, `sierra_lite`, or `jarvis_judice_ninke`.
  required: false
  type: string
  default: burkes
refresh_mode:
  description: >
    The display refresh mode. `full` clears ghosting but is slower. `fast` is
    not supported on all displays.
  required: false
  type: string
  default: full
fit_mode:
  description: >
    How the image is fitted to the display dimensions. `contain` scales to fit
    and pads the remaining space, `cover` scales to fill and crops the
    overflow, `stretch` distorts to the exact dimensions, and `crop`
    center-crops at native resolution without scaling.
  required: false
  type: string
  default: contain
tone_compression:
  description: >
    Dynamic range compression strength, as a percentage from 0 to 100. Leave
    empty for automatic.
  required: false
  type: float
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: show a daily image every morning

Upload a fresh image to your display every morning, for example a daily artwork or a generated dashboard that you store in your media folder.

- **Trigger**: Time: 07:00:00
- **Action**: OpenDisplay: Upload image
  - **Device**: Your OpenDisplay device
  - **Image**: The image to show
  - **Fit mode**: Contain

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Show the daily image on the display"
    triggers:
      - trigger: time
        at: "07:00:00"
    actions:
      - action: opendisplay.upload_image
        data:
          device_id: a1b2c3d4e5f6
          image:
            media_content_id: media-source://media_source/local/daily.png
            media_content_type: image/png
          fit_mode: contain
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
