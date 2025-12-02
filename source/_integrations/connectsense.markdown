---
title: ConnectSense
description: Integrates the ConnectSense Rebooter Pro network recovery power cycler.
ha_release: 2025.11.3
ha_iot_class: Local Push
ha_codeowners:
  - '@JonathanWitthoeft'
ha_domain: connectsense
ha_integration_type: device
---

The **ConnectSense** {% term integration %} integrates the [Rebooter Pro](https://www.gridconnect.com/products/rebooter-pro) from [Grid Connect Inc](https://www.gridconnect.com). It discovers devices via Zeroconf or by manually entering hostname/IP. The integration exposes the outlet switch, a reboot button, an optional Intelligent Reboot configuration, device triggers for reboot events, and optional push notifications.

## Supported devices

- ConnectSense Rebooter Pro (CS-REBOOTER-PRO)

## Prerequisites

The Rebooter Pro should be added to your network using one of the following methods.

### Local Configuration via Web Browser
1. Power the Rebooter Pro.
2. Connect to its Wi-Fi (CS-RBTR-*).
3. Open a browser and visit [http://192.168.250.1/](http://192.168.250.1/).
4. Follow remaining instructions in the browser.

### ConnectSense App (cloud access and account required)
1. Open the app store and install the **ConnectSense** app.
2. Create an account.
3. Click the **+** sign to Add a Device.
4. Select **Rebooter Pro**.
5. Follow remaining instructions in the app.



{% include integrations/config_flow.md %}

{% configuration_basic %}
Host or IP:
  description: Hostname (e.g., `rebooter-pro.local`) or IP address of the Rebooter Pro.
{% endconfiguration_basic %}

## Configuration options

The integration provides the following configuration options:

{% configuration_basic %}
Power Cycle Time:
  description: When rebooting, keep the power off for this many seconds (10–65535).
Auto-reboot after Power Outage:
  description: If enabled, the equipment will reboot after power is restored.
Intelligent Reboot:
  description: If enabled, the equipment will reboot on Internet/Ping failures.
Outage Time:
  description: Reboot after unsuccessfully reaching the monitored addresses for this long in minutes (2–10).
Redetection Delay:
  description:  After restoring power, wait this long, in minutes, before resuming Internet/Ping monitoring (0–10).
Maximum Reboot Attempts:
  description: If Internet/Ping monitoring never detects a recovery, reboot at most this many times (or unlimited).
Outage Condition:
  description: Choose whether to reboot if ANY of the addresses are unreachable or if ALL addresses are unreachable.
Addresses 1–5:
  description: IP Addresses or hostnames to ping to determine if your device is offline.
Notifications:
  description: Enable/disable, choose notify service, and per-event toggles (OFF/ON/REBOOT).
{% endconfiguration_basic %}

## Supported functionality

### Controls

- **Reboot Now Button**: Immediately power-cycles the outlet.
- **Toggle Power Switch**: Turns the controlled outlet on/off.

### Configuration

- **Power Outage Auto Reboot Switch**: If enabled, the equipment will reboot after power is restored.
- **Intelligent Reboot Switch**: If enabled, the equipment will reboot on Internet/Ping failures.

### Device triggers

- `reboot_started_any`
- `reboot_started_power_fail`
- `reboot_started_ping_fail`

### Services

- `connectsense.send_test_notification`
  - `entry_id` (optional): Target config entry (auto-selected if only one exists).
  - `title`, `message` (optional): Custom text.
  - `code` (optional): 1=OFF, 2=ON, 3=REBOOTING (auto message).
  - Uses the notify service configured in options.

## Diagnostics

Diagnostics are available per config entry. Sensitive fields (host, webhook IDs/tokens) are redacted.

## Known limitations

- No device actions or entity events are exposed.
- Ensure Home Assistant can generate a reachable webhook URL (set an internal/external URL if needed) so the device can send notifications back to HA.

## Troubleshooting

### Cannot connect during setup

- Verify the device is reachable at the provided host/IP over HTTPS.
- If zeroconf is not offered, add manually; mDNS may be blocked on the network.
- Check SSL settings if using an IP/hostname that differs from the certificate.

### Notifications not working

- Ensure a working notify service is set in options.
- Make sure Home Assistant has an internal/external URL configured so the device can receive webhook callbacks.

## Removing the integration

Remove via Settings → Devices & Services → ConnectSense → Delete. The webhook is unregistered and entities are removed.
