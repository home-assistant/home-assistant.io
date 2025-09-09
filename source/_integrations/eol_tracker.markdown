---
title: EOL Tracker
description: Monitor end-of-life status for devices and software.
ha_category:
  - Sensor
ha_platforms:
  - sensor
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@joshsh02'
ha_domain: eol_tracker
ha_config_flow: true
ha_integration_type: integration
ha_release: "2025.9"
---

The **EOL Tracker** {% term integration %} allows you to track whether a device or software is nearing or past its end-of-life (EOL). This helps users stay proactive with software and hardware support lifecycles, especially for security- or compliance-sensitive setups. All lifecycle metadata is retrieved directly from the public [endoflife.date](https://endoflife.date/) API. 

{% include integrations/config_flow.md %}


## Entities

The integration provides a set of sensor and boolean entities for each device or product configured by the user.

### Sensor

Each product will generate a sensor entity that shows its EOL status and related metadata.

#### Attributes

- **Product name**: Product or device name
- **Release date**: Original release date. For example, `March 6, 2013`.
- **Latest**: Most recent version name. For example, `1.9.16`.
- **Latest version date**: Release date of the most recent version. For example, `2021-07-10`.
- **End of life from**: Official end-of-life date. For example, `June 18, 2024`.
- **Status**: Current support status. For example, `maintained`, `eol`, or `discontinued`.
- **Endoflife.date link**: Reference link to the product's page on [endoflife.date](https://endoflife.date/)
- **Release policy**: Description of the vendor’s release policy, if available.
- **Supported OS versions**: Supported operating system versions, if available.
