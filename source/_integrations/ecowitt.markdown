---
title: Ecowitt
description: Instructions on how to integrate Ecowitt Weather Station within Home Assistant.
ha_category:
  - Binary sensor
  - Sensor
  - Weather
ha_release: 2022.9
ha_iot_class: Local Push
ha_domain: ecowitt
ha_config_flow: true
ha_codeowners:
  - '@pvizeli'
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
ha_integration_type: integration
---

{% include integrations/config_flow.md %}

## Ecowitt Weather Station configuration

The **Ecowitt** {% term integration %} works by first creating a callback endpoint on your Home Assistant instance and then adding this configuration to the Ecowitt console so that it starts sending data.

The integration will display a Server IP / Host Name, Path, and Port. You can input it into the Ecowitt configuration in one of two ways:

1. Use the Ecowitt App (on your phone):
    - Select the Menu Icon ({% icon "mdi:menu" %}) on the upper left, then **My Devices** → **Pick your station**
    - Select the Ellipsis Icon ({% icon "mdi:dots-horizontal" %}) → **Others**
    - Select **DIY Upload Servers** → **Customized**
    - Make sure to choose 'Protocol Type Same As: Ecowitt'
    - Enter the Server IP / Host Name, Path, and Port from the integration. _Note: The path has to match! Remove the first forward slash from the path, as the app will prepend one._
    - Save
1. Navigate to the Ecowitt web UI in a browser at the station IP address:
    - Select **Weather Services** then scroll down to 'Customized'
    - Make sure to select 'Customized: 🔘 Enable' and 'Protocol Type Same As: 🔘 Ecowitt'
    - Enter the Server IP / Host Name, Path, and Port from the integration.
    - Save

Ecowitt doesn't support TLS/SSL, you can use the NGINX TLS Proxy Add-on to support HTTPS and HTTP at the same time.
