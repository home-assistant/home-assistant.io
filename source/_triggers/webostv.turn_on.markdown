---
title: "Device is requested to turn on"
trigger: webostv.turn_on
domain: webostv
description: "Triggers when something requests an LG webOS TV to turn on."
related_triggers:
  - media_player.turned_on
---

The **Device is requested to turn on** trigger fires when Home Assistant requests an LG webOS TV to power on. Use it to react to that request and perform the actual turn-on action, such as sending a Wake-on-LAN packet or an HDMI-CEC command.

LG webOS TVs cannot be turned on by Home Assistant directly. Instead, Home Assistant fires this trigger when something (an automation, a script, or the UI) calls the turn-on action for the device. You can then use an automation to carry out whichever method your TV supports, such as Wake-on-LAN.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Under **By device**, select your LG webOS TV device.
5. From the triggers shown for that device, select **Device is requested to turn on**.
6. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The LG webOS TV device to watch for a turn-on request.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `webostv.turn_on`. A basic example looks like this:

{% example %}
trigger: |
  trigger: webostv.turn_on
  entity_id: media_player.lg_webos_tv
{% endexample %}

This fires when something requests the LG webOS TV to turn on.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
trigger:
  description: The trigger type. For this trigger, use `webostv.turn_on`.
  required: true
  type: string
device_id:
  description: One or more device IDs of LG webOS TV devices to watch. At least one of `device_id` or `entity_id` must be set.
  required: false
  type: [string, list]
entity_id:
  description: One or more entity IDs of LG webOS TV entities to watch. At least one of `device_id` or `entity_id` must be set.
  required: false
  type: [string, list]
{% endoptions_yaml %}

## Good to know

- This trigger fires when Home Assistant *requests* the TV to turn on, not when the TV reports that it turned on. You need to provide an action (such as Wake-on-LAN or HDMI-CEC) to actually power on the device.
- For webOS 3.0 and higher, Wake-on-LAN works best when the TV is connected by Ethernet. You also need to enable **LG Connect Apps** in the TV's **Network** settings (or **Mobile App** in **General** settings on older models).
- If you want to react when the TV actually reports that it is on, use [Media player turned on](/triggers/media_player.turned_on/) instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn on the TV with Wake-on-LAN

When something requests the LG webOS TV to turn on, send a Wake-on-LAN magic packet to power it on over the network. The [Wake-on-LAN integration](/integrations/wake_on_lan/) must be set up before using this example.

- **Trigger**: Device is requested to turn on
  - **Device**: Living room LG TV (`media_player.lg_webos_tv`)
- **Action**: Send magic packet
  - **MAC address**: `aa:bb:cc:dd:ee:ff`

{% details "YAML example for turning on the TV with Wake-on-LAN" %}

{% example %}
automation: |
  alias: "Turn on LG webOS TV with Wake-on-LAN"
  triggers:
    - trigger: webostv.turn_on
      entity_id: media_player.lg_webos_tv
  actions:
    - action: wake_on_lan.send_magic_packet
      data:
        mac: "aa:bb:cc:dd:ee:ff"
{% endexample %}

{% enddetails %}

### Automation: send a notification when the TV is requested to turn on

When something requests the LG webOS TV to turn on, send a notification to your phone.

- **Trigger**: Device is requested to turn on
  - **Device**: Living room LG TV (`media_player.lg_webos_tv`)
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for sending a notification when the TV is requested to turn on" %}

{% example %}
automation: |
  alias: "Notify when LG webOS TV is requested to turn on"
  triggers:
    - trigger: webostv.turn_on
      entity_id: media_player.lg_webos_tv
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The living room TV was requested to turn on."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
