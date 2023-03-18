---
title: Local File
description: Instructions how to use Local File as a Camera within Home Assistant.
ha_category:
  - Camera
ha_iot_class: Local Polling
ha_release: 0.22
ha_domain: local_file
ha_platforms:
  - camera
ha_integration_type: integration
---

The `local_file` camera platform allows you to integrate an image file from disk into Home Assistant as a camera. If the image is updated on the file system the image displayed in Home Assistant will also be updated. The service `local_file.update_file_path` can be used to update the image using an automation.

The `local_file` camera can for example be used with various camera platforms that save a temporary images locally. It can also be used to display a graph that you render periodically and will then be displayed in Home Assistant.

## Configuration

To enable this camera in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: local_file
    file_path: /tmp/image.jpg
```

{% configuration %}
file_path:
  description: "File to serve as the camera. Use a full path, e.g., `/config/www/images/image.jpg `."
  required: true
  type: string
name:
  description: Name of the camera.
  required: false
  type: string
{% endconfiguration %}

### Service `local_file.update_file_path`

Use this service to change the file displayed by the camera.

| Service data attribute | Description |
| -----------------------| ----------- |
| `entity_id` | String of the `entity_id` of the camera to update. |
| `file_path` | The full path to the new image file to be displayed. |
