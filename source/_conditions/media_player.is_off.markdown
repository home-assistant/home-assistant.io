---
title: "Media player is off"
condition: media_player.is_off
domain: media_player
description: "Tests if one or more media players are off."
related_conditions:
  - media_player.is_on
  - media_player.is_not_playing
---

The **Media player is off** condition passes when the selected media player is turned off. Use it when an automation should continue only if the device is powered down.

Use **Media player is off** to avoid powering on related equipment too early, to run quiet-time routines only when a TV is off, or to decide whether another action still needs to happen.

{% include conditions/ui_header.md %}

To use **Media player is off** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the media player you want to evaluate. You can also select an area, a floor, a device, or a label.
5. From the conditions shown for that target, select **Media player is off**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), choose how multiple targeted media players should behave. The default is **Any**.
7. Under **For at least**, enter how long the media player must stay off before the condition passes. The default is `0`.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: |
    When multiple media players are targeted, controls how results combine:

    - **Any**: Passes if at least one targeted media player is off (default).
    - **All**: Passes only when every targeted media player is off.
For at least:
  description: How long the media player must stay off before the condition passes. The default is `0` (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `media_player.is_off`. A basic example looks like this:

{% example %}
condition: |
  condition: media_player.is_off
  target:
    entity_id: media_player.bedroom_tv
{% endexample %}

This passes when the bedroom TV is off.

To require all targeted media players to stay off for 10 minutes:

{% example %}
condition: |
  condition: media_player.is_off
  target:
    area_id: upstairs
  options:
    behavior: all
    for: "00:10:00"
{% endexample %}

### Options in YAML

{% options_yaml %}
behavior:
  description: |
    When multiple media players are targeted, controls how results combine:

    - `any` (**Any** in the UI, default): passes if at least one targeted media player is off.
    - `all` (**All** in the UI): passes only when every targeted media player is off.
  required: false
  type: string
  default: any
for:
  description: How long the media player must stay off before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- This condition checks whether the device is powered off. If the device is still on but playback has ended, use [Media player is not playing](/conditions/media_player.is_not_playing/) instead.
- Media players that are `unavailable` or `unknown` are skipped for **Any** and fail for **All**.
- If you want the opposite test, use [Media player is on](/conditions/media_player.is_on/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: only run the vacuum when the TV is off

When everyone leaves home, start the vacuum only if the bedroom TV is off.

- **Trigger**: Person leaves home
- **Condition**: Media player is off
  - **Target**: Bedroom TV
- **Action**: Start vacuuming
  - **Target**: Robot vacuum

{% details "YAML example for starting the vacuum only when the TV is off" %}

{% example %}
automation: |
  alias: "Start the vacuum only when the TV is off"
  triggers:
    - trigger: zone
      entity_id: person.alex
      zone: zone.home
      event: leave
  conditions:
    - condition: media_player.is_off
      target:
        entity_id: media_player.bedroom_tv
  actions:
    - action: vacuum.start
      target:
        entity_id: vacuum.main_floor
{% endexample %}

{% enddetails %}

### Automation: lock up only when all media players are off

At night, lock the media room door only if every media player in that room is off.

- **Trigger**: Time: 23:30
- **Condition**: Media player is off
  - **Target**: Media room
  - **Condition passes if**: All
- **Action**: Lock lock
  - **Target**: Media room door

{% details "YAML example for locking up when all media players are off" %}

{% example %}
automation: |
  alias: "Lock the media room when all media players are off"
  triggers:
    - trigger: time
      at: "23:30:00"
  conditions:
    - condition: media_player.is_off
      target:
        area_id: media_room
      options:
        behavior: all
  actions:
    - action: lock.lock
      target:
        entity_id: lock.media_room_door
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
