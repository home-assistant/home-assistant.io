---
title: "Get image URL"
action: volvo.get_image_url
domain: volvo
description: "Retrieves the URL for one or more vehicle-specific images."
---

The **Get image URL** action retrieves the URLs of images of your vehicle from a specific angle. You can request all available images at once, or pick one or more specific angles.

This action returns [response data](#response-data) and does not change anything on your vehicle.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

{% include actions/ui_header.md %}

To get image URLs from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Volvo: Get image URL**.
6. Select the **Entry** for the vehicle you want the images for.
7. Optionally, select one or more image angles in **Images**. Leave this empty to get all images.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Entry:
  description: The vehicle to retrieve the images for.
  required: true
Images:
  description: The image angles to retrieve. Leave empty to get all images.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `volvo.get_image_url`:

{% example %}
action: |
  action: volvo.get_image_url
  data:
    entry: 01JVJ0RA387MWA938VE8HGXBMJ
    images:
      - exterior_front
      - interior
  response_variable: vehicle_images
{% endexample %}

This retrieves the front exterior and interior image URLs and stores the response in the `vehicle_images` variable.

### Options in YAML

{% options_yaml %}
entry:
  description: The vehicle to retrieve the images for.
  required: true
  type: string
images:
  description: >
    The image angles to retrieve. Leave empty to get all images. One or more of
    `exterior_back`, `exterior_back_left`, `exterior_back_right`,
    `exterior_front`, `exterior_front_left`, `exterior_front_right`,
    `exterior_side_left`, `exterior_side_right`, or `interior`.
  required: false
  type: list
{% endoptions_yaml %}

## Response data

The action returns a response containing an `images` list. Each item describes one image that is available for your vehicle:

- `type`: The angle of the image, for example `exterior_front`.
- `url`: The URL where the image can be retrieved.

Only images that actually exist for your vehicle are returned, so the list may be shorter than the angles you requested.

```yaml
images:
  - type: "exterior_front"
    url: "https://www.example.com/vehicle/exterior_front.png"
  - type: "interior"
    url: "https://www.example.com/vehicle/interior.png"
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
