---
title: AuroraWatch UK
description: Monitor aurora activity from AuroraWatch UK
ha_category:
  - Environment
ha_iot_class: Cloud Polling
ha_release: 2026.1
ha_domain: aurorawatch
ha_codeowners:
  - '@agentgonzo'
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: service
---

The **AuroraWatch UK** {% term integration %} uses the [AuroraWatch UK service](http://www.aurorawatch.lancs.ac.uk/) provided by Lancaster University to monitor geomagnetic activity and aurora alerts for the United Kingdom. This service helps you know when auroras (Northern Lights) might be visible from the UK.

The integration monitors the current aurora alert status, which indicates the likelihood of aurora visibility in the UK. The alert status ranges from green (no significant activity) through yellow and amber, to red (auroras very likely). It also provides the current geomagnetic activity measurement.

{% include integrations/config_flow.md %}

The AuroraWatch UK service is provided by Lancaster University and does not require any account or API key. The integration will automatically start monitoring aurora activity for the UK region once set up.

## Sensors

The integration provides two sensors:

### Aurora status

Shows the current aurora alert status for the UK.

**Possible values:**

- **Green**: No significant activity
- **Yellow**: Minor geomagnetic activity
- **Amber**: Amber alert - possible aurora
- **Red**: Red alert - auroras likely

**Additional attributes:**

- **Last updated**: Timestamp of the last data update from AuroraWatch UK
- **Project ID**: The AuroraWatch project identifier
- **Site ID**: The monitoring site identifier
- **Site URL**: URL to the AuroraWatch UK monitoring site
- **API version**: Version of the AuroraWatch API

### Geomagnetic activity

Shows the current geomagnetic activity level measured in nanoTesla (nT). Higher values indicate increased geomagnetic activity, which correlates with a higher likelihood of visible auroras.

## Data updates

The integration {% term polling polls %} data from the AuroraWatch UK service every 5 minutes. This ensures you receive timely updates about changes in aurora activity and alert status.
