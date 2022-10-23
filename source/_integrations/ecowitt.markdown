---
title: Ecowitt
description: Instructions on how to integrate Ecowitt Weather Station within Home Assistant.
ha_category:
  - Binary Sensor
  - Sensor
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

The following steps must be performed to set up this integration. For security reason, use the token path that you get from the Home Assistant config flow.

1. Use the Ecowitt App (on your phone) or access the Ecowitt WebUI in a browser at the station IP address.
2. Pick your station -> Menu Others -> DIY Upload Servers.
3. Hit next and select 'Customized'
4. Pick the protocol Ecowitt, and put in the ip/hostname of your Home Assistant server.
5. Path have to match!
6. Save configuration.

Ecowitt doesn't support TLS/SSL, you can use the NGINX TLS Proxy Add-on to support HTTPS and HTTP at the same time.
