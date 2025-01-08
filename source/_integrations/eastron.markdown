---
title: Eastron
description: Connect and control your Eastron devices using the HomeWizard Energy integration
ha_category:
  - Energy
ha_domain: eastron
ha_release: 2022.2
ha_integration_type: virtual
ha_supporting_domain: homewizard
ha_supporting_integration: HomeWizard Energy
ha_codeowners:
  - '@DCSBL'
ha_config_flow: true
ha_platforms:
  - button
  - diagnostics
  - number
  - sensor
  - switch
ha_iot_class: Local Polling
ha_dhcp: true
ha_zeroconf: true
---

{% include integrations/supported_brand.md %}
