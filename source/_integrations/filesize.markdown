---
title: File size
description: Integration for monitoring the size of a file.
ha_category:
  - Sensor
  - Utility
ha_iot_class: Local Polling
ha_release: 0.64
ha_domain: filesize
ha_platforms:
  - sensor
ha_codeowners:
  - '@gjohansson-ST'
ha_config_flow: true
ha_integration_type: integration
---

The **File size** {% term integration %} is for displaying the size in MB of a file.

{% important %}

File paths must also be added to [allowlist_external_dirs](/integrations/homeassistant/#allowlist_external_dirs) in your `configuration.yaml`.

File paths should be absolute paths. For example: `/config/home-assistant_v2.db` to monitor the size of the default database.

{% endimportant %}

{% include integrations/config_flow.md %}
