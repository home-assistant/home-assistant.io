---
title: Yardian
description: Instructions on how to integrate Yardian device within Home Assistant.
ha_category:
  - Irrigation
  - Switch
ha_config_flow: true
ha_release: 2023.8
ha_iot_class: Local Polling
ha_codeowners:
  - '@h3l1o5'
ha_domain: yardian
ha_platforms:
  - switch
ha_integration_type: integration
---

This `yardian` integration allows you to control your [Yardian Smart Sprinkler Controller](https://aeonmatrix.com/products/yardian-pro-smart-sprinkler-controller/).

There is currently support for the following platform within Home Assistant:

- [Switch](#switch) - Allows you to view the status of each zone and control them.

They will be automatically added if the Yardian integration is correctly configured and loaded.

{% include integrations/config_flow.md %}

During the configuration, you will have to manully set the **Device IP Address** and the **Access Token**. You can find them inside your [Yardian App](https://aeonmatrix.com/app/).

<p class='img'>
<img src='/images/screenshots/yardian_config_flow.jpg' />
</p>
