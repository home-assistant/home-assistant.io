---
title: Folder
description: Sensor for monitoring the contents of a folder.
ha_category:
  - Sensor
  - Utility
ha_iot_class: Local Polling
ha_release: 0.64
ha_domain: folder
ha_platforms:
  - sensor
ha_integration_type: integration
ha_quality_scale: legacy
---

Sensor for monitoring the contents of a folder. Note that folder paths must be added to [allowlist_external_dirs](/integrations/homeassistant/#allowlist_external_dirs). Optionally a [wildcard filter](https://docs.python.org/3.6/library/fnmatch.html) can be applied to the files considered within the folder. The state of the sensor is the size in MB of files within the folder that meet the filter criteria.
The sensor exposes the number of filtered files in the folder, total size in bytes of those files and a comma separated list of the file paths as attributes.

## Configuration

To enable the `folder` sensor in your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
sensor:
  - platform: folder
    folder: /config
```

{% configuration %}
folder:
  description: The folder path
  required: true
  type: string
filter:
  description: Filter to apply
  required: false
  default: "`*`"
  type: string
{% endconfiguration %}
