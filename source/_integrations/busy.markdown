---
title: BUSY Bar
description: Monitor the battery and Wi-Fi connection of your BUSY Bar in Home Assistant.
ha_categories:
  - sensors
ha_release: 2026.11
ha_iot_class: Local Polling
ha_codeowners:
  - '@truetug'
  - '@gornekich'
ha_domain: busy
ha_config_flow: true
ha_zeroconf: true
ha_platforms:
  - sensor
ha_integration_type: device
---

The **BUSY Bar** {% term integration %} monitors the battery and Wi-Fi connection of your [BUSY Bar](https://busy.app). It communicates directly with the bar over your local network. No cloud account is required.

## Supported devices

- BUSY Bar

## Prerequisites

1. Set up your bar through the BUSY app and connect it to the same network as Home Assistant.
2. Connect the bar to your computer by USB and open its web interface at `http://10.0.4.20`.
3. Under **Network** > **HTTP API**, enable HTTP API access over Wi-Fi. If password protection is enabled, use that password as the API key in Home Assistant.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address or hostname of your bar. You can find its IP address in your router. This field is only required when adding a bar manually."
API key:
  description: "The password configured under **Network** > **HTTP API** in the bar’s web interface. This field appears only if password protection is enabled. Home Assistant exchanges it for an access token and uses that token for subsequent connections."
{% endconfiguration_basic %}

## Supported functionality

### Sensors

- **Battery**: The remaining battery charge, as a percentage.
- **Wi-Fi signal**: The Wi-Fi signal strength, in dBm.
- **Wi-Fi network**: The name of the connected Wi-Fi network.

## Data updates

The integration {% term polling polls %} your bar every 30 seconds for its status and Wi-Fi connection details.

## Known limitations

The integration monitors your bar. It does not control sessions, display notifications, or provide button events.

## Troubleshooting

{% details "The bar is discovered but cannot be added" %}

The bar announces itself on the network even when its HTTP API is disabled. Connect the bar by USB, open `http://10.0.4.20`, enable access under **Network** > **HTTP API**, and add it again.

{% enddetails %}

{% details "The bar cannot be reached" %}

Make sure the bar is powered on and connected to the same network as Home Assistant. Guest networks and separate subnets can prevent discovery or communication. If automatic discovery does not find the bar, add it manually using its IP address or hostname.

{% enddetails %}

{% details "The access token no longer works" %}

If you delete the Home Assistant token on the bar or reset the bar, the integration cannot authenticate. Remove the integration entry and add the bar again to obtain a new token.

{% enddetails %}

## Removing the integration

{% include integrations/remove_device_service.md %}

When you remove the integration, Home Assistant attempts to revoke its access token on the bar. If the bar is unreachable, you can delete the token on the bar in its Home Assistant settings.
