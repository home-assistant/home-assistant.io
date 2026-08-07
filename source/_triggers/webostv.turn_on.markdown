---
title: "TV is requested to turn on"
trigger: webostv.turn_on
domain: webostv
description: "Triggers when one or more LG webOS TVs are requested to turn on."
related_triggers:
  - media_player.turned_on
---

The **TV is requested to turn on** trigger fires when Home Assistant requests an LG webOS TV to power on. Use it to react to that request and carry out the actual turn-on step, such as sending a Wake-on-LAN packet or an HDMI-CEC command.

LG webOS TVs cannot be powered on by the integration itself. Instead, Home Assistant fires this trigger when something (an automation, a script, or the UI) calls the turn-on action for the TV. You then use an automation to run whichever method your TV supports. Without such an automation, the TV appears as unavailable while it is off.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), select the LG webOS TV you want to monitor. You can also select an area, a floor, a device, or a label.
5. From the triggers shown for that target, select **TV is requested to turn on**.
6. Select **Save**.

### Options in the UI

This trigger has no additional options beyond the target.

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `webostv.turn_on`. A basic example looks like this:

{% example %}
trigger: |
  trigger: webostv.turn_on
  target:
    entity_id: media_player.lg_webos_tv
{% endexample %}

This fires every time Home Assistant requests `media_player.lg_webos_tv` to turn on.

### Options in YAML

This trigger has no additional YAML options beyond the target.

{% include triggers/targets.md domain="media_player" %}

{% important %}
Earlier versions of this trigger used top-level `entity_id` and `device_id` options instead of a target. Those options still work, but support for them will be removed in a future release. If your configuration still uses them, Home Assistant creates a repair to point them out.

To update an automation or script, open it in the editor, select your TV under **By target**, and save it again. If you edit your configuration files directly, move the `entity_id` or `device_id` option into a `target` block.
{% endimportant %}

## Good to know

- This trigger fires when Home Assistant _requests_ the TV to turn on, not when the TV reports that it turned on. To react to the TV actually reporting that it is on, use [Media player turned on](/triggers/media_player.turned_on/) instead.
- To turn on the TV from this trigger, add an action that can power it on, such as [Wake-on-LAN](/integrations/wake_on_lan/) or [HDMI-CEC](/integrations/hdmi_cec/).
- For Wake-on-LAN, enable **LG Connect Apps** in the TV's **Network** settings, or **Mobile App** in the **General** settings on older models. The exact setting name varies by model and webOS version.
- Wake-on-LAN works best when the TV is connected to your network with Ethernet, and usually only works when Home Assistant is on the same network as the TV.
- This trigger needs a target. If you leave the target empty, the automation reports an error when it starts. Anything in the target that is not an LG webOS TV media player {% term entity %} is ignored.
- When you target an area, a floor, or a label, Home Assistant keeps track of which TVs belong to it. If you add a TV to that area later, the trigger starts watching it as well.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn on the TV with Wake-on-LAN

When something requests the LG webOS TV to turn on, send a Wake-on-LAN magic packet to power it on over the network. Set up the [Wake-on-LAN integration](/integrations/wake_on_lan/) before using this example.

- **Trigger**: TV is requested to turn on
  - **Target**: Living room LG TV (`media_player.lg_webos_tv`)
- **Action**: Send magic packet
  - **MAC address**: `AA:BB:CC:DD:EE:FF`

{% details "YAML example for turning on the TV with Wake-on-LAN" %}

{% example %}
automation: |
  alias: "Turn on LG webOS TV with Wake-on-LAN"
  triggers:
    - trigger: webostv.turn_on
      target:
        entity_id: media_player.lg_webos_tv
  actions:
    - action: wake_on_lan.send_magic_packet
      data:
        mac: "AA:BB:CC:DD:EE:FF"
{% endexample %}

{% enddetails %}

### Automation: turn on a power strip before waking the living room TV

When the LG webOS TV in the living room is requested to turn on, first switch on the smart power strip it is connected to, then send a Wake-on-LAN packet. This keeps the strip switched off while nothing is in use, and still gives the TV power before it is woken. The short wait gives the TV time to receive power before the packet arrives.

The trigger targets the living room area, so the automation keeps working if you replace the TV. It assumes that area has one LG webOS TV, because the magic packet goes to a single MAC address. If you have more, target each TV in its own automation.

- **Trigger**: TV is requested to turn on
  - **Target**: Living room area
- **Action**: Turn on switch
  - **Target**: Living room TV strip (`switch.living_room_tv_strip`)
- **Action**: Wait for time to pass
  - **Duration**: 5 seconds
- **Action**: Send magic packet
  - **MAC address**: `AA:BB:CC:DD:EE:FF`

{% details "YAML example for powering a strip before waking the TV" %}

{% example %}
automation: |
  alias: "Power the TV strip before waking the TV"
  triggers:
    - trigger: webostv.turn_on
      target:
        area_id: living_room
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.living_room_tv_strip
    # Give the TV time to receive power before waking it
    - delay:
        seconds: 5
    - action: wake_on_lan.send_magic_packet
      data:
        mac: "AA:BB:CC:DD:EE:FF"
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
