---
title: "Play ringtone"
action: xiaomi_aqara.play_ringtone
domain: xiaomi_aqara
description: "Plays a specific ringtone on a Xiaomi Aqara Gateway."
related_actions:
  - xiaomi_aqara.stop_ringtone
  - xiaomi_aqara.add_device
  - xiaomi_aqara.remove_device
---

The **Play ringtone** action plays a specific ringtone on a Xiaomi Aqara Gateway.

This is useful for turning the gateway into a doorbell or an alarm sound, for example playing a chime when someone presses a button or an alert when a door opens.

The gateway firmware must be at least version `1.4.1_145`.

{% include actions/ui_header.md %}

To play a ringtone from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Xiaomi Gateway (Aqara): Play ringtone**.
6. Enter the **Gateway MAC** and the **Ringtone ID**, and optionally a **Ringtone volume**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Gateway MAC:
  description: The MAC address of the gateway. When you have a single gateway, it is selected automatically.
  required: true
Ringtone ID:
  description: "The ID of the ringtone to play. See [available ringtone IDs](#available-ringtone-ids)."
  required: true
Ringtone volume:
  description: The volume to play the ringtone at, in percent.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `xiaomi_aqara.play_ringtone`. A basic example looks like this:

{% example %}
action: |
  action: xiaomi_aqara.play_ringtone
  data:
    gw_mac: aa:bb:cc:dd:ee:ff
    ringtone_id: 8
    ringtone_vol: 8
{% endexample %}

### Options in YAML

{% options_yaml %}
gw_mac:
  description: The MAC address of the gateway. When you have a single gateway, it is used automatically.
  required: true
  type: string
ringtone_id:
  description: "The ID of the ringtone to play. See [available ringtone IDs](#available-ringtone-ids)."
  required: true
  type: integer
ringtone_vol:
  description: The volume to play the ringtone at, in percent.
  required: false
  type: integer
{% endoptions_yaml %}

### Available ringtone IDs

- Alarms
  - 0: Police car 1
  - 1: Police car 2
  - 2: Accident
  - 3: Countdown
  - 4: Ghost
  - 5: Sniper rifle
  - 6: Battle
  - 7: Air raid
  - 8: Bark
- Doorbells
  - 10: Doorbell
  - 11: Knock at a door
  - 12: Amuse
  - 13: Alarm clock
- Alarm clock
  - 20: MiMix
  - 21: Enthusiastic
  - 22: GuitarClassic
  - 23: IceWorldPiano
  - 24: LeisureTime
  - 25: ChildHood
  - 26: MorningStreamLiet
  - 27: MusicBox
  - 28: Orange
  - 29: Thinker
- Custom ringtones uploaded through the Mi Home app, starting from 10001

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Play a ringtone when a button is held

This example plays a barking sound when a first-generation round button is held down.

{% example %}
automation: |
  triggers:
    - trigger: event
      event_type: xiaomi_aqara.click
      event_data:
        entity_id: binary_sensor.switch_158d000xxxxxc2
        click_type: long_click_press
  actions:
    - action: xiaomi_aqara.play_ringtone
      data:
        gw_mac: aa:bb:cc:dd:ee:ff
        ringtone_id: 8
        ringtone_vol: 8
{% endexample %}

{% include actions/stuck.md %}

{% include actions/related.md %}
