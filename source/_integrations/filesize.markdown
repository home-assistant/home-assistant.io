---
title: File Size
description: Component for monitoring the size of a file.
ha_category:
  - Utility
  - Sensor
ha_iot_class: Local Polling
ha_release: 0.64
ha_config_flow: true
ha_domain: filesize
ha_platforms:
  - sensor
---

The `filesize` sensor is for displaying the size of a file.

<div class='note'>

File paths must also be added to [allowlist_external_dirs](/docs/configuration/basic/) in your `configuration.yaml`.

</div>

{% include integrations/config_flow.md %}

## YAML Configuration

As an alternative to the configuration via the user interface, you can define `filesize` sensors manually in your `configuration.yaml`:

```yaml
sensor:
  - platform: filesize
    file_path: /config/home-assistant_v2.db
  ```

{% configuration %}
file_path:
  description: The absolute path to the file.
  required: true
  type: string
  
unit_of_measurement:
  description: The output unit of measurement for the file size.
  required: false
  type: string
  default: MB (Megabytes)
{% endconfiguration %}

## Valid `unit` values
SI based units (step size 1000 = 10^3): 
B, kB, MB, GB, TB, PB, EB, ZB, YB

IEC based units (step size 1024 = 2^10): 
B, KiB, MiB, GiB, TiB, PiB, EiB, ZiB, YiB

