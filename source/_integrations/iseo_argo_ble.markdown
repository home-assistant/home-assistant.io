---
title: ISEO Argo BLE
description: Instructions on how to integrate your ISEO Argo smart lock into Home Assistant via Bluetooth.
ha_category:
  - Lock
ha_release: 2026.9
ha_iot_class: Local Push
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

That same Master Card scan also enables the lock's **Door Status Advice** setting, which makes the lock broadcast its door state. Home Assistant reads the door state from those broadcasts, so it does not connect to the lock to check on it.

## Supported functionality

- **Lock**: Controls the lock (unlock only). Reflects the current locked/unlocked state.

## Door state updates

Home Assistant follows the door state the lock broadcasts in its Bluetooth advertisements. Changes are reported as they happen, and the lock is only connected to when you unlock it.

This needs two things: the lock must have a door sensor, and its **Door Status Advice** setting must be enabled. Setting the integration up enables it for you. If your lock was added before this was the case, you can also enable Door Status Advice for the lock in the official Argo app.

Locks without a door sensor report no door state at all. Their entity is marked as assumed state, and shows as locked between unlocks.

## Configuration options

{% configuration_basic %}
Connect to the lock to read door status:
  description: "Connect to the lock every 30 seconds and read the door state, in addition to following its broadcasts. Enable this only if the broadcasts do not reach Home Assistant reliably, for example at the edge of Bluetooth range or with no Bluetooth proxy nearby. It wakes the lock on every check, so it is off by default. It does not help if the lock reports no door state at all."
{% endconfiguration_basic %}

## Known limitations

- The lock only supports _one active Bluetooth connection_ at a time. Close the Argo app on all phones before unlocking or during setup.
- The ISEO X1R is a momentary actuator: it re-latches automatically after every unlock. The `lock` action is therefore not supported.
- Door state requires a lock with a door sensor and **Door Status Advice** enabled. Without it, the lock's state is assumed rather than reported.
- The lock broadcasts in bursts when something happens and then goes quiet for several minutes, so an unlock can take a few seconds while Home Assistant connects to it.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
