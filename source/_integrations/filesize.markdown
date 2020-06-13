---
title: File Size
description: Component for monitoring the size of a file.
ha_category:
  - Utility
ha_iot_class: Local Polling
ha_release: 0.64
ha_domain: filesize
---

The `filesize` sensor is for displaying the size of a file.

<div class='note'>

File paths must also be added to [whitelist_external_dirs](/docs/configuration/basic/) in your `configuration.yaml`.

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
  
unit:
  description: The output unit of measurement for the file sizes.
  required: false
  type: string
  default: MB (Megabytes)
{% endconfiguration %}

## Valid `unit` values
SI based units (step size 1000 = 10^3): 
B, kB, MB, GB, TB, PB, EB, ZB, YB

IEC based units (step size 1024 = 2^10): 
B, KiB, MiB, GiB, TiB, PiB, EiB, ZiB, YiB

