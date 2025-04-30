---
title: Rehlko
description: Support for Rehlko devices (formerly Oncue and Kohler Energy)
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

The Rehlko integration allows you to monitor the status of your [enabled Kohler generator](https://www.kohlerhomeenergy.rehlko.com/kohler-energy-management-app) through Home Assistant. This integration replaces the legacy Oncue integration.

### Configuration

To set up the integration, you’ll need your login credentials (email and password) for the manufacturer's app.

{% include integrations/config_flow.md %}

### Sensor Availability

The sensors exposed by this integration depend on the specific instrumentation installed on your generator and transfer switch. Sensor availability can vary significantly—even between units of the same model.

## Tested generators

These are the generator models that have been tested:

- [38RCLB](https://resources.kohler.com/power/kohler/residential/pdf/tp6908.pdf)
- [20RESA](https://resources.kohler.com/power/kohler/residential/pdf/tp6804.pdf)
- [20RCA](https://www.kohlerhomeenergy.rehlko.com/products/home+generators/20rca)
- [14RESA](https://www.kohler.com/content/dam/kohler-com-NA/Lifestyle/PDF/PDF-tp6803.pdf)

