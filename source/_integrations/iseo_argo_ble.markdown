---
title: ISEO Argo BLE
description: Instructions on how to integrate your ISEO Argo smart lock into Home Assistant via Bluetooth.
ha_category:
  - Lock
ha_release: 2026.9
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@FezVrasta'
ha_domain: iseo_argo_ble
ha_platforms:
  - lock
ha_bluetooth: true
ha_integration_type: device
ha_quality_scale: bronze
---

The **ISEO Argo BLE** {% term integration %} connects Home Assistant to [ISEO](https://www.iseo.com) Argo smart locks over Bluetooth Low Energy. ISEO is an Italian security manufacturer specializing in high-security cylinders and electronic access control, widely used in residential and commercial buildings across Italy and Switzerland.

Home Assistant registers itself as an Argo Gateway, giving it the same privileges as the official Argo app: unlocking the lock and receiving real-time access log entries.

All communication is direct Bluetooth, with no cloud dependency or bridge hardware required.

## Prerequisites

- A Bluetooth adapter accessible to Home Assistant (built-in or via [ESPHome Bluetooth proxy](/integrations/bluetooth/#remote-adapters-bluetooth-proxies)).
- An ISEO Argo smart lock, such as x1R Smart or AGB Smart.
- The physical Master Card that was supplied with the lock. It is required during the setup process to authorize Home Assistant.
- The official **Argo** app must be closed on all phones during each setup step, as the lock only accepts one Bluetooth connection at a time.

{% include integrations/config_flow.md %}

### Adding your ISEO lock to Home Assistant

1. As soon as you add the integration to Home Assistant, Home Assistant scans for nearby ISEO locks and presents them in a list.
2. In Home Assistant, go to {% my integrations title="**Settings** > **Devices & services**" %}.
3. From the list, select the lock you want to set up.
4. Select **Submit** and within 30 seconds, scan the Master Card on the lock to authorize Home Assistant. 
   - **Result**: The lock's LED will blink green when the card is successfully read.

## Supported functionality

- **Lock**: Controls the lock (unlock only). Reflects the current locked/unlocked state.

## Known limitations

- The lock only supports _one active Bluetooth connection_ at a time. Close the Argo app on all phones before unlocking or during setup.
- The ISEO X1R is a momentary actuator: it re-latches automatically after every unlock. The `lock` action is therefore not supported.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
