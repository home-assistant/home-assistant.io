---
title: "Upload AI Art Frame image"
action: switchbot_cloud.upload_art_frame_image
domain: switchbot_cloud
description: "Uploads an image from a web address to one or more SwitchBot AI Art Frame devices."
since: "2026.7"
---

Use this action to show a new image on a SwitchBot AI Art Frame. You provide the web address of the image, and the SwitchBot cloud downloads it and sends it to the frame.

Use it to rotate through artwork on a schedule, show a photo when someone comes home, or put a generated image on the frame from an automation.

{% include actions/ui_header.md %}

To upload an image from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **SwitchBot Cloud: Upload AI Art Frame image**.
6. Under **Devices**, select one or more AI Art Frame devices.
7. In **Image URL**, enter the web address of the image you want to show.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Devices:
  description: One or more AI Art Frame devices to show the image on.
Image URL:
  description: The web address of the image to upload. The address must be reachable from the internet, because the SwitchBot cloud downloads the image.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `switchbot_cloud.upload_art_frame_image`. A basic example looks like this:

{% example %}
action: |
  action: switchbot_cloud.upload_art_frame_image
  data:
    device_id: 1234567890abcdef1234567890abcdef
    image_url: "https://example.com/artwork.png"
{% endexample %}

To show the same image on several frames, pass a list of device IDs:

{% example %}
action: |
  action: switchbot_cloud.upload_art_frame_image
  data:
    device_id:
      - 1234567890abcdef1234567890abcdef
      - fedcba0987654321fedcba0987654321
    image_url: "https://example.com/artwork.png"
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The ID of the AI Art Frame device to show the image on. To use several
    frames, pass a list of device IDs.
  required: true
  type: [string, list]
image_url:
  description: >
    The web address of the image to upload. The address must be reachable from
    the internet, because the SwitchBot cloud downloads the image.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- The SwitchBot cloud fetches the image itself, so a local Home Assistant address does not work here. Use an address that is reachable from the internet.
- Each upload counts towards the SwitchBot Cloud API request limit. See [Important considerations](/integrations/switchbot_cloud/#important-considerations) on the integration page.

{% include actions/try_it.md %}

{% include actions/stuck.md %}
