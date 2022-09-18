---
title: Starlink
description: Instructions on how to integrate Starlink into Home Assistant.
ha_category:
  - Sensor
ha_release: 2022.9
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@boswelja'
ha_domain: starlink
ha_dhcp: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

The Starlink integration allows you to integrate your [Starlink](https://www.starlink.com/) into Home Assistant.

{% include integrations/config_flow.md %}

### Sensor

The following sensors are added for each Starlink system:

- Ping - The ping that Starlink has measured, in ms
- Azimuth - The direction Dishy is facing in degrees
- Elevation - Dishy's current elevation in degrees
- Uplink throughput - The amount of data being uploaded through Starlink in Mbit/s
- Downlink throughput - The amount of data being downloaded through Starlink in Mbit/s
- Last boot time - The time Starlink was last turned on
