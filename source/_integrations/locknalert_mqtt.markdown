---
title: LocknAlert MQTT
description: Instructions on how to set up LocknAlert devices with Home Assistant using MQTT.
ha_category:
  - Alarm
ha_release: "2026.6"
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@rainepretorius'
  - 'LocknAlert-Pty-LTD'
ha_domain: locknalert_mqtt
ha_zeroconf: true
ha_platforms:
  - alarm_control_panel
ha_integration_type: hub
related:
  - docs: /integrations/locknalert_mqtt/
    title: MQTT integration
  - docs: /integrations/alarm_control_panel/
    title: Alarm control panel integration
---

The **LocknAlert MQTT** {% term integration %} connects your LocknAlert bridge to Home Assistant over your local network using MQTT. The LocknAlert bridge is a hardware device that connects to your compatible Paradox alarm panel, giving Home Assistant local control over your alarm system — no cloud account or subscription required.

Once set up, you can arm and disarm your Paradox alarm panel directly from Home Assistant. Home Assistant automatically discovers the LocknAlert bridge on your network using Zeroconf, and the integration provisions a dedicated MQTT username and password for the device automatically during setup.

## Prerequisites

Before setting up the integration, make sure:

1. Your LocknAlert bridge is connected to your Paradox alarm panel and powered on.
2. The LocknAlert bridge is connected to the same local network as Home Assistant.

{% include integrations/config_flow.md %}

## Adding your LocknAlert bridge

When a LocknAlert bridge is present on your network, Home Assistant will detect it automatically and prompt you to add it via a notification or the **Discovered** section on the integrations page.

To add the bridge using automatic discovery:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Under **Discovered**, find your LocknAlert bridge and select **Configure**.
3. Follow the on-screen steps to complete the setup.

If your bridge does not appear under **Discovered** — for example, if mDNS is blocked on your network — you can add it manually instead:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select **Add integration** and search for **LocknAlert MQTT**.
3. Enter the hostname or IP address of your LocknAlert bridge when prompted.
4. Follow the on-screen steps to complete the setup.

In both cases, the integration automatically generates and provisions a unique MQTT username and password for the bridge during setup. You do not need to create or manage these credentials yourself.

## Supported functionality

The **LocknAlert MQTT** integration provides the following entities.

### Alarm control panel

- **Security panel**
  - **Description**: Represents your Paradox alarm panel connected via the LocknAlert bridge. Use this entity to arm or disarm your alarm system from Home Assistant.
  - **Supported states**: Disarmed, Armed away, Armed home, Armed night, Arming, Pending, Triggered

## Data updates

The **LocknAlert MQTT** integration uses Local Push" — the LocknAlert bridge pushes state changes from your Paradox alarm panel to Home Assistant over MQTT in real time. There is no polling delay.

## Removing the integration

{% include integrations/remove_device_service_steps.md %}

After removing the integration, the provisioned MQTT credentials for the panel are also removed from the broker automatically.
