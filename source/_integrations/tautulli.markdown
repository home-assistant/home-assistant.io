---
title: Tautulli
description: Instructions on how to set up Tautulli sensors in Home Assistant.
ha_category:
  - Sensor
ha_config_flow: true
ha_release: 0.82
ha_iot_class: Local Polling
ha_codeowners:
  - '@ludeeus'
  - '@tkdrob'
ha_domain: tautulli
ha_platforms:
  - sensor
ha_integration_type: hub
---

The Tautulli integration will monitor activity on a given [Tautulli Server][tautulli]. It will create a sensor that shows the number of currently active streams as the state. If you click the sensor for more details, it will show you more statistics.

## Setup

To find your `api_key`, open the Tautulli web interface and navigate to `Settings` and then to `Web interface`. The `api_key` will be at the bottom of that page.

{% include integrations/config_flow.md %}

The following stats are available by default:

- LAN bandwidth
- Number of direct plays
- Number of direct streams
- Stream count
- Top Movie
- Top TV Show
- Top User
- Total bandwidth
- Transcode count
- WAN bandwidth

[tautulli]: https://tautulli.com
