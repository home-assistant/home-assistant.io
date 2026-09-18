---
title: "Upload image"
action: opendisplay.upload_image
domain: opendisplay
description: "Uploads an image to an OpenDisplay device."
---

Use this action to upload an image to an OpenDisplay device. Home Assistant resizes and dithers the image to match the display resolution and color palette.

{% include actions/ui_header.md %}

To upload an image from an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **OpenDisplay: Upload image**.
6. Select the OpenDisplay device in the **Device** field, then select the image to upload in the **Image** field.
7. To control how the image is processed, open **Additional options** and set the available options: **Rotation**, **Dither mode**, **Refresh mode**, **Fit mode**, and **Tone compression**.
8. Select **Save**.

This action does not support targets. Select the OpenDisplay device in the **Device** field instead of choosing an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Device:
  description: The OpenDisplay device to upload the image to.
  required: true
Image:
  description: The image to upload to the display.
  required: true
Rotation:
  description: The clockwise rotation in degrees. Select 0, 90, 180, or 270. The default is 0.
  required: false
Dither mode:
  description: The dithering algorithm that converts the image to the display color palette. Available options are None, Burkes, Ordered, Floyd-Steinberg, Atkinson, Stucki, Sierra, Sierra Lite, and Jarvis-Judice-Ninke. The default is Burkes.
  required: false
Refresh mode:
  description: The display refresh mode. Full refresh clears ghosting but is slower. Fast refresh is not supported on all displays. The default is Full.
  required: false
Fit mode:
  description: How the image fits the display dimensions. Available options are Stretch, Contain, Cover, and Crop. The default is Contain.
  required: false
Tone compression:
  description: The dynamic range compression strength, from 0 to 100 percent. Leave this option empty for automatic compression.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `opendisplay.upload_image`. A basic example looks like this:

{% example %}
action: |
  action: opendisplay.upload_image
  data:
    device_id: "a1b2c3d4e5f6"
    image:
      media_content_id: "media-source://media_source/local/artwork.png"
      media_content_type: "image/png"
{% endexample %}

This uploads an image from your media folder to the OpenDisplay device.

### Options in YAML

{% options_yaml %}
device_id:
  description: The ID of the OpenDisplay device to upload the image to.
  required: true
  type: string
image:
  description: The image to upload to the display, selected from a media source.
  required: true
  type: map
rotation:
  description: The clockwise rotation in degrees. One of `0`, `90`, `180`, or `270`.
  required: false
  type: integer
  default: 0
dither_mode:
  description: The dithering algorithm that converts the image to the display color palette. One of `none`, `burkes`, `ordered`, `floyd_steinberg`, `atkinson`, `stucki`, `sierra`, `sierra_lite`, or `jarvis_judice_ninke`.
  required: false
  type: string
  default: burkes
refresh_mode:
  description: The display refresh mode. `full` clears ghosting but is slower. `fast` is not supported on all displays.
  required: false
  type: string
  default: full
fit_mode:
  description: How the image fits the display dimensions. `contain` scales to fit and pads the remaining space, `cover` scales to fill and crops the overflow, `stretch` distorts the image to the display dimensions, and `crop` center-crops at native resolution without scaling.
  required: false
  type: string
  default: contain
tone_compression:
  description: The dynamic range compression strength, from 0 to 100 percent. Omit this option for automatic compression.
  required: false
  type: float
{% endoptions_yaml %}

## Good to know

- If an image includes EXIF orientation information, Home Assistant uses it to rotate the image to its intended orientation before resizing and dithering it. This helps photos taken in portrait orientation appear correctly on the display.
- Starting a new upload cancels an upload that is already in progress for the same integration entry.
- If authentication fails, Home Assistant starts reauthentication so that you can enter the current encryption key.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: Show a daily image every morning

Show an image from your media folder on the display each morning.

- **Trigger**: Time: 07:00:00
- **Action**: OpenDisplay: Upload image
  - **Device**: Your OpenDisplay device
  - **Image**: The image to show

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Show the daily image on the display"
  triggers:
    - trigger: time
      at: "07:00:00"
  actions:
    - action: opendisplay.upload_image
      data:
        device_id: "a1b2c3d4e5f6"
        image:
          media_content_id: "media-source://media_source/local/daily.png"
          media_content_type: "image/png"
{% endexample %}

{% enddetails %}

### Automation: Show an image at sunset

Change the display image when the sun sets.

- **Trigger**: Sun: sunset
- **Action**: OpenDisplay: Upload image
  - **Device**: Your OpenDisplay device
  - **Image**: The image to show

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Show a sunset image on the display"
  triggers:
    - trigger: sun
      event: sunset
  actions:
    - action: opendisplay.upload_image
      data:
        device_id: "a1b2c3d4e5f6"
        image:
          media_content_id: "media-source://media_source/local/sunset.png"
          media_content_type: "image/png"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
