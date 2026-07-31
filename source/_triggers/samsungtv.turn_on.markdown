---
title: "Device is requested to turn on"
trigger: samsungtv.turn_on
domain: samsungtv
description: "Triggers when a Samsung TV device is requested to turn on."
---

The **Device is requested to turn on** trigger fires when Home Assistant requests a Samsung TV to turn on. This happens when a turn-on action is called by an automation, a script, or from the UI, targeting a Samsung TV entity.

Use it when the built-in Wake-on-LAN (WoL) support in the Samsung TV integration is not sufficient for your setup. For example, when the TV is connected to a smart strip, when WoL is not supported on the TV model, or when you want to run additional actions alongside the turn-on sequence, such as switching on a connected AV receiver or adjusting the room lighting.

## Prerequisites

- To turn on the TV from this trigger, add an action that can power on the TV, such as Wake-on-LAN, HDMI-CEC, or turning on a connected smart plug.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Under **By device**, select your Samsung TV device.
5. Select the available trigger **Device is requested to turn on**.
6. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: >
    The Samsung TV media player device that should be watched for a turn-on request. Only Samsung TV devices can be selected.
  required: true
Trigger:
  description: >
    The trigger **Device is requested to turn on**.
  required: true
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `samsungtv.turn_on`. A basic example looks like this:

{% example %}
triggers:
  - trigger: samsungtv.turn_on
    entity_id: media_player.samsung_smart_tv
{% endexample %}

This fires every time Home Assistant requires `media_player.samsung_smart_tv` to turn on.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
trigger:
  description: The trigger `samsungtv.turn_on`.
  required: true
  type: string
device_id:
  description: One or more device IDs of Samsung TV devices to watch. At least one of `device_id` or `entity_id` must be set. To use more than one device ID, enter them as a list.
  required: false
  type: string
entity_id:
  description: One or more entity IDs of Samsung TV entities to watch. At least one of `device_id` or `entity_id` must be set. To use more than one entity ID, enter them as a list.
  required: false
  type: string
{% endoptions_yaml %}

## Good to know

- This trigger fires when the [Turn on media player](/actions/media_player.turn_on/) action is called targeting the TV entity, not when the TV turns on by itself (for example, after a power cut). It represents a request from Home Assistant, not a state change on the TV.
- If the TV supports Wake-on-LAN (WoL) and it is enabled in the integration, Home Assistant will attempt WoL automatically without needing this trigger. Use this trigger only when you need to override or supplement that built-in behavior.
- Set up the [Wake-on-LAN integration](/integrations/wake_on_lan/) before using this trigger to send a Wake-on-LAN packet manually.
- The trigger does not include a **For at least** option or a **Trigger when** option, which means that it fires immediately on every turn-on request and targets a single device, not a group.
- This trigger is the recommended way to handle Samsung TVs connected to a smart power strip, where the TV cannot be woken by WoL alone and the strip must be switched on first.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn on a smart power strip before waking the TV to avoid standby energy waste

When the TV is requested to turn on, this automation first switches on the smart power strip the TV is connected to, then sends a Wake-on-LAN packet. This avoids leaving the strip switched on permanently, which would power all connected devices in standby, while still ensuring the TV receives power before the WoL packet is sent.

- **Trigger**: Device is requested to turn on
  - **Targeted device**: `my_samsungtv_device_id`
- **Action**: Switch: Turn on (living room AV strip)
- **Action**: Delay: 5 seconds (to allow the TV to receive power)
- **Action**: Wake-on-LAN: Send magic packet

{% details "YAML example for turning on a smart strip and sending a WoL packet when the TV is requested to turn on" %}

{% example %}
automation: |
  alias: "Turn on AV strip and wake TV on turn-on request"
  triggers:
    - trigger: samsungtv.turn_on
      device_id: my_samsungtv_device_id
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.living_room_av_strip
    - delay:
        seconds: 5
    - action: wake_on_lan.send_magic_packet
      data:
        mac: "AA:BB:CC:DD:EE:FF"
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
