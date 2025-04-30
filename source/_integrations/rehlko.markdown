---
title: Rehlko
description: Documentation about the Rehlko devices.
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 2025.5
ha_config_flow: true
ha_codeowners:
  - '@bdraco'
  - '@peterager'
ha_dhcp: true
ha_domain: rehlko
ha_platforms:
  - sensor
ha_integration_type: integration
---

The Rehlko (formerly Kohler Energy) integration monitors the state of your [Enabled Kohler generator](https://www.kohlerhomeenergy.rehlko.com/kohler-energy-management-app). This integration replaces the Oncue integration.

To configure the integration you will need your log in credentials (email and password) for the Kohler app.

Note: The set of sensors avaiable depends on the specific instrumentation installed on your generator and transfer switch. There is wide variation within the same model.

## Tested generators

There are the geneator models that have been tested.

- [20RESA](https://resources.kohler.com/power/kohler/residential/pdf/tp6804.pdf)
- [20RCA](https://www.kohlerhomeenergy.rehlko.com/products/home+generators/20rca)
- [14RESA](https://www.kohler.com/content/dam/kohler-com-NA/Lifestyle/PDF/PDF-tp6803.pdf)

{% include integrations/config_flow.md %}
