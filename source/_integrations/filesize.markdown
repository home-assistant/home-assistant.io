---
title: File Size
description: Component for monitoring the size of a file.
logo: file.png
ha_category:
  - Utility
ha_iot_class: Local Polling
ha_release: 0.64
---

The `filesize` sensor for displaying the size in MB of a file. Note that paths must be added to [whitelist_external_dirs](/docs/configuration/basic/).

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
