---
title: EOL Tracker
description: Monitor end-of-life status for devices and software.
ha_category:
  - Sensor
ha_platforms:
  - sensor
ha_iot_class: Local Polling
ha_codeowners:
  - '@joshsh02'
ha_domain: eol_tracker
ha_config_flow: true
ha_integration_type: integration
ha_release: "2025.7"
---

The **EOL Tracker** {% term integration %} allows you to track whether a device or software is nearing or past its end-of-life (EOL). This helps users stay proactive with software and hardware support lifecycles, especially for security- or compliance-sensitive setups.

{% include integrations/config_flow.md %}

## Configuration

This integration is configured through the Home Assistant UI — no YAML configuration is required.

1. Go to **Settings → Devices & Services**

2. Click **Add Integration**

3. Search for **EOL Tracker**

4. Select **Add Entry**

5. Follow the prompts to add your product or device

## Entities

The integration provides a set of sensor and boolean entities for each device or product configured by the user.

### Sensor

Each product will generate a sensor entity that shows its EOL status and related metadata.

#### Attributes

- **Product Name**: Product or device name
- **Release Date**: Original release date (e.g., `March 6, 2013`)
- **Latest**: Most recent version name (e.g., `1.9.16`)
- **Latest Version Date**: Release date of the most recent version (e.g., `2021-07-10`)
- **End of Life From**: Official end-of-life date (e.g., `June 18, 2024`)
- **Status**: Current support status, e.g., `maintained`, `eol`, `discontinued`
- **Endoflife.date Link**: Reference link to the product's page on [endoflife.date](https://endoflife.date/)
- **Release Policy**: Description of the vendor’s release policy, if available
- **Supported OS Versions**: Supported operating system versions, if available
