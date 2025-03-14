---
title: Local file
description: Instructions how to use local file as a camera within Home Assistant.
ha_category:
  - Camera
ha_iot_class: Local Polling
ha_release: 0.22
ha_domain: local_file
ha_platforms:
  - camera
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_config_flow: true
---

The **Local file** camera {% term integration %} allows you to integrate an image file from disk into Home Assistant as a camera. If the image is updated on the file system, the image displayed in Home Assistant will also be updated. The `local_file.update_file_path` action can be used to update the image using an automation.

The `local_file` camera can for example be used with various camera platforms that save a temporary images locally. It can also be used to display a graph that you render periodically and will then be displayed in Home Assistant.

{% note %}
The file path must be added to [allowlist_external_dirs](/integrations/homeassistant/#allowlist_external_dirs) for the integration to be able to read it.
{% endnote %}

{% include integrations/config_flow.md %}

### Action `local_file.update_file_path`

Use this action to change the file displayed by the camera.

| Data attribute | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| `entity_id`            | String of the `entity_id` of the camera to update.   |
| `file_path`            | The full path to the new image file to be displayed. |
