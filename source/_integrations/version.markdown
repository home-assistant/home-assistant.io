---
title: Version
description: Instructions on how to integrate the Version integration into Home Assistant.
ha_category:
  - Sensor
  - Utility
ha_iot_class: Local Push
ha_release: 0.52
ha_quality_scale: internal
ha_codeowners:
  - '@ludeeus'
ha_domain: version
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
ha_config_flow: true
ha_integration_type: integration
---

The **Version** {% term integration %} can display the current Home Assistant Core versions.

{% include integrations/config_flow.md %}

## Version sources

With this {% term integration %} you can select various sources to get a version from.

{% configuration_basic %}
Local installation:
  description: This will get the version you are currently running.
Home Assistant Versions:
  description: This will use the same source that are used by the Supervisor to check for updates based on the channel and image you choose.
Home Assistant Website:
  description: This will check the website you are reading this on to find the latest version.
Docker Hub:
  description: This will check the latest tag published to Docker Hub based on the channel and image you choose.
Python Package Index (PyPI):
  description: This will check PyPI for the latest published package.
{% endconfiguration_basic %}

## Entities

The entities created by this {% term integration %} depends on which source you set it up with (you can also set up the {% term integration %} multiple times to use more sources).

### Sensor

For all sources the {% term integration %} will create a [sensor](/integrations/sensor) {% term entity %} that displays the newest version published to that source.

### Binary Sensor

For all sources (except for the ["Local installation"](#local-installation) source) the {% term integration %} will create a [binary_sensor](/integrations/binary_sensor) {% term entity %} that show if there is a newer version than the one you are currently running published to that source.
