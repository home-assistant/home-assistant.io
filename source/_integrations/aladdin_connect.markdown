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
ha_integration_type: hub
ha_codeowners:
  - '@swcloudgenie'
ha_config_flow: true
ha_dhcp: true
---

The **Aladdin Connect** {% term integration %} lets you control Genie Aladdin Connect garage doors through Home Assistant.

{% note %}
Only doors that are owned by your Aladdin Connect account will be available. Doors that your account has been granted shared access to are not yet supported.
{% endnote %}

## Prerequisites

1. Open the app store and install the **AladdinConnect** app.
2. Create an account.
3. Add a device to the app.


{% include integrations/config_flow.md %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
