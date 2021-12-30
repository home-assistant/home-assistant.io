---
title: Version
description: Instructions on how to integrate a version sensor into Home Assistant.
ha_category:
  - Utility
  - Sensor
ha_iot_class: Local Push
ha_release: 0.52
ha_quality_scale: internal
ha_codeowners:
  - '@fabaff'
  - '@ludeeus'
ha_domain: version
ha_platforms:
  - sensor
---

The `version` sensor platform that can display the current Home Assistant versions.

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: version
```

{% configuration %}
name:
  description: Name to use in the frontend.
  required: false
  type: string
  default: "`Current Version` in case of `source: local`, `Latest Version` otherwise."
beta:
  description: Flag to indicate that it will check for beta versions, only supported for the sources `pypi`, `supervisor` and `container`.
  required: false
  type: boolean
  default: false
image:
  description: The image you want to check against, this is only supported for `supervisor` and `container`, see full list under.
  required: false
  type: string
  default: default
source:
  description: The source you want to check against, possible values are `local`, `pypi`, `supervisor`, `haio` and `container`.
  required: false
  type: string
  default: local
{% endconfiguration %}

### Supported images for Home Assistant

`default`, `qemux86`, `qemux86-64`, `qemuarm`, `qemuarm-64`, `generic-x86-64`, `raspberrypi`, `raspberrypi2`, `raspberrypi3`, `raspberrypi3-64`, `raspberrypi4`, `raspberrypi4-64`, `tinker`, `odroid-c2`, `odroid-n2`, `odroid-xu`
