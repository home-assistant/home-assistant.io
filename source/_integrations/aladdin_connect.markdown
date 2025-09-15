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
  - '@swcloudgenie'
ha_config_flow: true
---

The Aladdin Connect integration lets you control Genie Aladdin Connect garage doors through Home Assistant.

{% note %}
Only doors that are owned by your Aladdin Connect account will be available. Doors that your account has been granted shared access to are not yet supported.
{% endnote %}

## Prerequisites

1. Open the app store and install the **AladdinConnect** app.
2. Create an account.
3. Add a device to the app.

{% note %}
For help with setup, see the [AladdinConnect documentation](https://www.geniecompany.com/aladdin-connect-support).
{% endnote %}

{% include integrations/config_flow.md %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

## Troubleshooting
If you see the below attached screen instead of the login page, please ensure that your
{% term "`configuration.yaml`" %} file includes either a [`default_config:`](/integrations/default_config/) or [`cloud:`](/integrations/cloud/) section.

![OAuth Error Screen](/images/integrations/aladdin_connect/oauth-screenshot.png)
