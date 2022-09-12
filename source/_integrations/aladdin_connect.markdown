---
title: Aladdin Connect
description: Instructions how to integrate Genie Aladdin Connect garage door covers into Home Assistant.
ha_category:
  - Cover
ha_release: 0.75
ha_iot_class: Cloud Polling
ha_domain: aladdin_connect
ha_platforms:
  - cover
  - sensor
ha_integration_type: integration
ha_codeowners:
  - '@mkmer'
ha_config_flow: true
---

The `aladdin_connect` cover platform lets you control Genie Aladdin Connect garage doors through Home Assistant.

<div class='note'>
Only doors that are owned by your Aladdin Connect account will be available. Doors that your account has been granted shared access to are not yet supported.
</div>

{% include integrations/config_flow.md %}
