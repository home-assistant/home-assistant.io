---
title: "Bosch HomeCom"
description: "Integration with Bosch HomeCom system"
ha_release: "2023.4.0"
ha_category: Climate
ha_iot_class: "Cloud Polling"
ha_config_flow: true
ha_codeowners:
- '@neugartf'
ha_domain: homecom
---

This integration for Bosch allows you to connect devices that belong to the HomeCom system to the Home Assistant.
You'll need to provide your BoschID since Bosch hasn't opened their API.

<div class='note'>There are two smart home solutions that Bosch offers. HomeCom is focused on cooling and heating appliances only.</div>

There is currently support for the following device types within Home Assistant:
- [Climate](#climate)

{% include integrations/config_flow.md %}

### Climate
The integration was tested on a CL3000 and doesn't contain yet all functionality that the [HomeCom App](https://play.google.com/store/apps/details?id=com.bosch.tt.dashtt) offers.


