---
title: "Get image URL"
action: skoda.get_image_url
domain: skoda
description: "Retrieves the URL of the vehicle render image."
---

The **Škoda: Get image URL** action retrieves the URL of the render image of your vehicle, as shown in the MyŠkoda app. The image shows the vehicle from the side, in its configured color and trim.

This action returns [response data](#response-data) and does not change anything on your vehicle.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

{% include actions/ui_header.md %}

To get the image URL from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Škoda: Get image URL**.
6. Select the **Vehicle** you want the image for.
7. In the **Response variable** field, enter a name to store the result, for example, `vehicle_image`.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Vehicle:
  description: The vehicle to retrieve the render image URL for.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `skoda.get_image_url`:

{% example %}
action: |
  action: skoda.get_image_url
  data:
    config_entry_id: YOUR_CONFIG_ENTRY_ID
  response_variable: vehicle_image
{% endexample %}

This retrieves the render image URL of the vehicle and stores the response in the `vehicle_image` variable.

Replace `YOUR_CONFIG_ENTRY_ID` with the config entry ID of your vehicle. To find it, select the vehicle in the action editor in the UI, then switch to YAML mode.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: The ID of the config entry of the vehicle to retrieve the render image URL for.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The action returns a response containing the `url` where the render image can be retrieved.

```yaml
url: "https://www.example.com/vehicle/render.png"
```

If the Škoda API does not provide a render image for the vehicle at the moment, the action fails with an error.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
