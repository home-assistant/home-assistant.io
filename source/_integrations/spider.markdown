---
title: Itho Daalderop Spider
description: Instructions on how to setup the Spider hub within Home Assistant.
ha_category:
  - Hub
  - Climate
  - Switch
ha_iot_class: Cloud Polling
ha_release: 0.75
ha_codeowners:
  - '@peternijssen'
ha_domain: spider
ha_config_flow: true
ha_platforms:
  - climate
  - switch
---

The `spider` integration is the main integration to integrate all [Itho Daalderop Spider](https://www.ithodaalderop.nl/spider-thermostaat) related platforms. You will need your Spider account information (username, password) to discover and control devices which are related to your account.

There is currently support for the following device types within Home Assistant:

- Climate
- Switch

{% include integrations/config_flow.md %}

<div class='note warning'>
This integration is not affiliated with Itho Daalderop Spider and retrieves data from the endpoints of the mobile application. Use at your own risk.
</div>

### Climate

<div class='note'>
Although this integration lets you change the operation mode to heating or cooling, it doesn't necessarily mean your boiler can. Spider is not aware of your current situation.
</div>
