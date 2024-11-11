---
title: Flick Electric
description: Instructions on how to set up the Flick Electric Pricing sensor in Home Assistant.
ha_category:
  - Energy
ha_release: '0.110'
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@ZephireNZ'
ha_domain: flick_electric
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: service
---

[Flick Electric Co](https://www.flickelectric.co.nz/) is a power company in New Zealand, based around a transparent pricing model where each component of pricing is provided. This integration uses the mobile app's API from Flick Electric Co to get the current power price as well as each of the components price.

{% include integrations/config_flow.md %}

{% note %}

The configuration uses the client ID and secret used by the app at the time of release. If this stops working, you can find the new ones by using a MITM proxy with the mobile app. The app will call `https://api.flick.energy/identity/oauth/token` with the `client_id` and `client_secret`.

You can then use these values during the configuration.

{% endnote %}
