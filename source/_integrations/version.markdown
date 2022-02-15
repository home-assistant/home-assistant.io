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
ha_config_flow: true
---

The Version integration can display the current Home Assistant Core versions.

{% include integrations/config_flow.md %}

## Version sources

With this integration you can select various sources to get a version from.

{% configuration_basic %}
  "Local installation":
    description: The will get the version you are currently running.

  "Home Assistant Versions":
    description: This will use the same source that are used by the Supervisor to check for updates based on the channel and image you choose..

  "Home Assistant Website":
    description: This will check the website you are reading this on to find the latest version.

  "Docker Hub":
    description: This will check the latest tag published to Docker Hub based on the channel and image you choose.

  "Python Package Index (PyPI)":
    description: This will check PyPI for the latest published package.

{% endconfiguration_basic %}
