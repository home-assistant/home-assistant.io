---
title: Ecowitt
description: Instructions on how to integrate Ecowitt Weather Station within Home Assistant.
ha_category:
  - Binary sensor
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

The following steps must be performed to set up this integration. For security reasons, use the token path that you get from the Home Assistant config flow.

<div class='note'>

If you have taken additional steps to enable HTTPS (secure) access to your Home Assistant instance, the Ecowitt integration will require extra configuration.

Ecowitt devices do not support sending data to HTTPS URLs. A solution exists using the NGINX TLS Proxy Add-on to support HTTP and HTTPS at the same time (for more information read this [community discussion](https://community.home-assistant.io/t/nginx-tls-proxy-add-on-config-to-allow-simultaneous-https-and-http-access-required-by-ecowitt-integration/589276)).

</div>

1. Use the Ecowitt App (on your phone) or access the Ecowitt WebUI in a browser at the station IP address.
2. Pick your station -> Menu Others -> DIY Upload Servers.
3. Hit next and select 'Customized'
4. Pick the protocol Ecowitt, and put in the ip/hostname of your Home Assistant server.
5. The path has to match! If using the Ecowitt App, remove the first forward slash from the API token, as the app will prepend one.
6. Save configuration.
