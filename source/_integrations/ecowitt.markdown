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

To set up this integration:

1. Add the Ecowitt integration to your Home Assistant instance. When doing so, the config flow will display a Server IP, Path, and Port.
2. Use the Ecowitt App (on your phone) or access the Ecowitt WebUI in a browser at the station IP address.
3. Select your station > Menu **Others** > **DIY Upload Servers**.
4. Select **Next**, then select **Customized**.
5. Select the protocol **Ecowitt**.
6. Enter the Server IP, Path, and Port that were displayed in step 1.
    - The path has to match! If using the Ecowitt app, remove the first forward slash from the path, as the app will prepend one.
7. Save the configuration.

Ecowitt doesn't support TLS/SSL, you can use the NGINX TLS Proxy Add-on to support HTTPS and HTTP at the same time.
