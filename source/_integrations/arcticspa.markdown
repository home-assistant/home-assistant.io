---
title: Arctic Spa
description: Instructions on how to integrate Arctic Spa within Home Assistant.
ha_category:
  - Light
ha_release: 2024.1
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@greg-szabo'
ha_domain: arcticspa
ha_quality_scale: No score
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: integration
---

The **ArcticSpa** {% term integration %} allows you to view and control [Arctic Spas](https://www.arcticspas.com/)
hot tubs in Home Assistant.

## Prerequisites

- [My Arctic Spa](https://myarcticspa.com) account and a registered hot tub with Internet connection
- [API key](https://myarcticspa.com/spa/SpaAPIManagement.aspx) created for the account

{% include integrations/config_flow.md %}

<div class="note warning">

The ArcticSpa API only allow 15 status requests per minute. If this is exceeded, the API returns a `too many requests` error. This disables controls on the integration for a few seconds until the limitation is lifted.

</div>
