---
title: ConnectSense
description: Integrates the ConnectSense Rebooter Pro network recovery power cycler.
ha_release: 2026.1
ha_iot_class: Local Push
ha_codeowners:
  - '@JonathanWitthoeft'
ha_domain: connectsense
ha_integration_type: device
---

The **ConnectSense** {% term integration %} integrates the [Rebooter Pro](https://www.gridconnect.com/products/rebooter-pro) from [Grid Connect Inc](https://www.gridconnect.com). Devices can be discovered automatically or you can manually enter hostname/IP. The integration exposes a reboot button for the outlet.

## Supported devices

- ConnectSense Rebooter Pro (CS-REBOOTER-PRO)

## Prerequisites

The Rebooter Pro should be added to your network using one of the following methods.

### Local configuration via web browser

1. Power the Rebooter Pro.
2. Connect to its Wi-Fi (CS-RBTR-*).
3. Open a browser and visit [http://192.168.250.1/](http://192.168.250.1/).
4. Follow remaining instructions in the browser.

### ConnectSense App (cloud access and account required)

1. Open the app store and install the **ConnectSense** app.
2. Create an account.
3. Select the **+** sign to **Add a Device**.
4. Select **Rebooter Pro**.
5. Follow remaining instructions in the app.



{% include integrations/config_flow.md %}

{% configuration_basic %}
Host or IP:
  description: Hostname (e.g., `rebooter-pro.local`) or IP address of the Rebooter Pro.
{% endconfiguration_basic %}

## Supported functionality

### Controls

- **Reboot now** button: Immediately power-cycles the outlet.

## Known limitations

- No device actions or entity events are exposed.
- Ensure Home Assistant can generate a reachable webhook URL (set an internal/external URL if needed) so the device can send notifications back to Home Assistant.

## Troubleshooting

### Cannot connect during setup

- Verify the device is reachable at the provided host/IP over HTTPS.
- If the device is not discovered automatically, add it manually. mDNS may be blocked on the network.
- Check SSL settings if using an IP/hostname that differs from the certificate.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
