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
ha_codeowners:
  - '@gjohansson-ST'
---

The `filesize` sensor is for displaying the size in MB of a file.

<div class='note'>

File paths must also be added to [allowlist_external_dirs](/docs/configuration/basic/) in your `configuration.yaml`.

</div>

{% include integrations/config_flow.md %}
