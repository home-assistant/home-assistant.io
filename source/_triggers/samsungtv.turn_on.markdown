---
title: "Device is requested to turn on"
trigger: samsungtv.turn_on
domain: samsungtv
description: "Triggers when a Samsung TV device is requested to turn on."
---

The **Device is requested to turn on** trigger fires when Home Assistant requests a Samsung TV to turn on. This happens when a turn_on action is called by an automation, a script or from the UI, targeting a Samsung TV entity.

Use it when the built-in Wake-on-LAN (WoL) support in the Samsung TV integration is not sufficient for your setup. For example, when the TV is connected to a smart strip, when WoL is not supported on the TV model, or when you want to run additional actions alongside the turn-on sequence, such as switching on a connected AV receiver or adjusting the room lighting.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Under **By type**, search and select **Device**.
5. From the **Device** list, select your Samsung TV device.
6. From the **Trigger** list, select **Device is requested to turn on**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: >
    The Samsung TV media player device that should be watched for a turn-on request. Only Samsung TV entities are valid targeted devices for this trigger.
  required: true
Trigger:
  description: >
    The trigger **Device is requested to turn on**.
  required: true
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `device` of type `samsungtv.turn_on`. A basic example looks like this:

{% example %}
trigger: |
  type: samsungtv.turn_on
  device_id: my_samsungtv_device_id
  entity_id: media_player.samsung_living_room
  domain: samsungtv
  trigger: device
{% endexample %}

This fires every time Home Assistant requests `media_player.samsung_living_room` to turn on.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
type:
  description: >
    The trigger `samsungtv.turn_on`.
  required: true
  type: string
device_id:
  description: >
    The ID of the Samsung TV media player device that should be watched for a turn-on request. Only Samsung TV devices are valid targets for this trigger.
  required: true
  type: string
entity_id:
  description: >
    The Samsung TV media player entity that should be watched for a turn-on request. Only Samsung TV entities are valid targets for this trigger.
  required: true
  type: string
domain:
  description: >
    Domain of the device entity: `samsungtv`.
  required: true
  type: string
trigger:
  description: >
    `device`
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- This trigger fires when `media_player.turn_on` is called targeting the TV entity, not when the TV turns on by itself (for example, after a power cut). It represents a request from Home Assistant, not a state change on the TV.
- If the TV supports Wake-on-LAN and it is enabled in the integration, Home Assistant will attempt WoL automatically without needing this trigger. Use this trigger only when you need to override or supplement that built-in behavior.
- The trigger does not include a **For at least** option or a **Trigger when** option, which means that it fires immediately on every turn-on request and targets a single device, not a group.
- If you use this trigger to send a Wake-on-LAN packet manually, make sure the `wake_on_lan` integration is enabled in your `configuration.yaml`.
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
    - type: samsungtv.turn_on
      device_id: my_samsungtv_device_id
      entity_id: media_player.samsung_living_room
      domain: samsungtv
      trigger: device
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
