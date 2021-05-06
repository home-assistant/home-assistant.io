---
title: File Size
description: Component for monitoring the size of a file.
ha_category:
  - Utility
  - Sensor
ha_iot_class: Local Polling
ha_release: 0.64
ha_domain: filesize
ha_platforms:
  - sensor
---

The `filesize` sensor is for displaying the size in MB of a file.

<div class='note'>

File paths must also be added to [allowlist_external_dirs](/docs/configuration/basic/) in your `configuration.yaml`.

</div>

## Configuration

To enable the `filesize` sensor, add the following lines to your `configuration.yaml`:

```yaml
sensor:
  - platform: filesize
    file_paths:
      - /config/home-assistant_v2.db
  ```

{% configuration %}
file_paths:
  description: The absolute path to the file.
  required: true
  type: list
{% endconfiguration %}
