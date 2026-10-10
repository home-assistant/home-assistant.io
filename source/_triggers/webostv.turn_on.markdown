---
title: "TV turn on requested"
trigger: webostv.turn_on
domain: webostv
description: "Triggers when one or more LG webOS TVs are requested to turn on."
related_triggers:
  - media_player.turned_on
---

The **TV turn on requested** trigger fires when Home Assistant requests an LG webOS TV to power on. Use it to react to that request and carry out the actual turn-on step, such as sending a Wake-on-LAN packet or an HDMI-CEC command.

LG webOS TVs cannot be powered on by the integration itself. Instead, Home Assistant fires this trigger when something (an automation, a script, or the UI) calls the turn-on action for the TV. You then use an automation to run whichever method your TV supports. Without such an automation, the TV appears as unavailable while it is off.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Search for **TV turn on requested** and select it.
5. Under **Devices**, **Entities**, or both, select the LG webOS TVs you want to monitor.
6. Select **Save**.

### Options in the UI

Select at least one device or entity.

{% options_ui %}
Devices:
  description: The LG webOS TVs to monitor.
Entities:
  description: The LG webOS TV media players to monitor.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `webostv.turn_on`. A basic example looks like this:

{% example %}
trigger: |
  trigger: webostv.turn_on
  entity_id: media_player.lg_webos_tv
{% endexample %}

This fires every time Home Assistant requests `media_player.lg_webos_tv` to turn on.

### Options in YAML

At least one of `device_id` or `entity_id` is required.

{% options_yaml %}
trigger:
  description: The trigger type. For this trigger, use `webostv.turn_on`.
  required: true
  type: string
device_id:
  description: One or more device IDs of LG webOS TVs to monitor.
  required: false
  type: [string, list]
entity_id:
  description: One or more entity IDs of LG webOS TV media players to monitor.
  required: false
  type: [string, list]
{% endoptions_yaml %}

## Good to know

- This trigger fires when Home Assistant _requests_ the TV to turn on, not when the TV reports that it turned on. To react to the TV actually reporting that it is on, use [Media player turned on](/triggers/media_player.turned_on/) instead.
- To turn on the TV from this trigger, add an action that can power it on, such as [Wake-on-LAN](/integrations/wake_on_lan/) or [HDMI-CEC](/integrations/hdmi_cec/).
- For Wake-on-LAN, enable **LG Connect Apps** in the TV's **Network** settings, or **Mobile App** in the **General** settings on older models. The exact setting name varies by model and webOS version.
- Wake-on-LAN works best when the TV is connected to your network with Ethernet, and usually only works when Home Assistant is on the same network as the TV.
- On the TV's device page, the same trigger is listed as **Device is requested to turn on**. It works the same way.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn on the TV with Wake-on-LAN

When something requests the LG webOS TV to turn on, send a Wake-on-LAN magic packet to power it on over the network. Set up the [Wake-on-LAN integration](/integrations/wake_on_lan/) before using this example.

- **Trigger**: TV turn on requested
  - **Entities**: Living room LG TV (`media_player.lg_webos_tv`)
- **Action**: Send magic packet
  - **MAC address**: `AA:BB:CC:DD:EE:FF`

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
        mac: "AA:BB:CC:DD:EE:FF"
{% endexample %}

{% enddetails %}

### Automation: send a notification when the TV is requested to turn on

When something requests the LG webOS TV to turn on, send a notification to your phone.

- **Trigger**: TV turn on requested
  - **Entities**: Living room LG TV (`media_player.lg_webos_tv`)
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
