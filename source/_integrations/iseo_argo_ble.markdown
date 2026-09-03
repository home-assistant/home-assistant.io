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
  - binary_sensor
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
4. Decide whether to leave **Enable user management** turned on.
5. Select **Submit** and within 30 seconds, scan the Master Card on the lock to authorize Home Assistant.
   - **Result**: The lock's LED will blink green when the card is successfully read.

{% configuration_basic %}
Enable user management:
  description: "Register a second, administrator identity for Home Assistant, so it can list the people enrolled on your lock and turn each of them on or off. Both identities have to be registered during the same Master Card scan, so this can only be turned on while you set the lock up. Defaults to on."
{% endconfiguration_basic %}

## Supported functionality

- **Lock**: Controls the lock (unlock only). Reflects the current locked/unlocked state.
- **Credential sensors**: One sensor per credential enrolled on the lock, such as a card, a PIN, or a phone. Each shows whether that credential may currently open the door. These sensors are only created if you enabled user management during setup.

The credential type is part of each sensor's name, because one person often holds several and the lock allows them to share a name. The two identities Home Assistant registered for itself do not get sensors, so you cannot lock yourself out of your own lock.

The sensors are read-only. To suspend or restore a credential, use the [**Set credential enabled**](/actions/iseo_argo_ble.set_credential_enabled/) action, which only Home Assistant administrators can run.

{% include integrations/actions.md %}

## ISEO Argo BLE automation examples

Credentials do not have to be managed by hand. Home Assistant can suspend and restore them for you.

{% include docs/paste_yaml_tip.md %}

### Automation: Suspend a lost card straight away

When you mark a card as lost with a toggle helper you created yourself, the card stops opening the door.

- **Trigger**: State of the **Card lost** toggle changes to **On**
- **Action**: ISEO Argo BLE: Set credential enabled
  - **Target**: Alice's card (`binary_sensor.front_door_alice_card`)
  - **Enabled**: off

{% details "YAML example for suspending a lost card" %}

{% example %}
automation: |
  alias: "Suspend the lost card"
  triggers:
    - trigger: state
      entity_id: input_boolean.card_lost
      to: "on"
  actions:
    - action: iseo_argo_ble.set_credential_enabled
      target:
        entity_id: binary_sensor.front_door_alice_card
      data:
        enabled: false
{% endexample %}

{% enddetails %}

The **Card lost** toggle is an `input_boolean` {% term helper %} you have to create yourself, under **Settings** > **Devices & services** > **Helpers**.

## Data updates

Home Assistant reads the list of enrolled credentials once, while it sets the lock up. It is not read again on a timer, because repeatedly running administrator commands over Bluetooth eventually stops recent ISEO firmware from responding at all. After you suspend or restore a credential, Home Assistant applies that change to the list it already holds rather than reading it again.

To pick up credentials that were added or removed in the Argo app, reload the integration: go to {% my integrations title="**Settings** > **Devices & services**" %}, select the lock, and select **Reload** from the three-dot menu.

## Known limitations

- The lock only supports _one active Bluetooth connection_ at a time. Close the Argo app on all phones before unlocking or during setup.
- The ISEO X1R is a momentary actuator: it re-latches automatically after every unlock. The `lock` action is therefore not supported.
- User management can only be turned on while you set the lock up, because the administrator identity has to be registered during the Master Card scan. If you set your lock up without it, delete the integration and add it again.
- Credentials added or removed in the Argo app appear after you reload the integration, not straight away. Asking Home Assistant to update a credential sensor does nothing on purpose, because re-reading the list is the operation that upsets the lock's firmware.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
