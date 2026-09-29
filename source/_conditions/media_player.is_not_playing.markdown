---
title: "Media player is not playing"
condition: media_player.is_not_playing
domain: media_player
description: "Tests if one or more media players are not playing."
related_conditions:
  - media_player.is_playing
  - media_player.is_paused
---

The **Media player is not playing** condition passes when the selected media player is not currently playing media. Use it when an automation should run only when audio or video is not actively in progress.

Use **Media player is not playing** to start a noisy appliance, begin cleaning, or run reminders only when a room is not actively being used for playback.

{% include conditions/ui_header.md %}

To use **Media player is not playing** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the media player you want to evaluate. You can also select an area, a floor, a device, or a label.
5. From the conditions shown for that target, select **Media player is not playing**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), choose how multiple targeted media players should behave. The default is **Any**.
7. Under **For at least**, enter how long the media player must stay in a non-playing state before the condition passes. The default is `0`.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: |
    When multiple media players are targeted, controls how results combine:

    - **Any**: Passes if at least one targeted media player is not playing (default).
    - **All**: Passes only when every targeted media player is not playing.
For at least:
  description: How long the media player must stay in a non-playing state before the condition passes. The default is `0` (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `media_player.is_not_playing`. A basic example looks like this:

{% example %}
condition: |
  condition: media_player.is_not_playing
  target:
    entity_id: media_player.living_room_tv
{% endexample %}

This passes when the living room TV is not playing media.

To require all targeted media players to stay in a non-playing state for 15 minutes:

{% example %}
condition: |
  condition: media_player.is_not_playing
  target:
    area_id: downstairs
  options:
    behavior: all
    for: "00:15:00"
{% endexample %}

### Options in YAML

{% options_yaml %}
behavior:
  description: |
    When multiple media players are targeted, controls how results combine:

    - `any` (**Any** in the UI, default): passes if at least one targeted media player is not playing.
    - `all` (**All** in the UI): passes only when every targeted media player is not playing.
  required: false
  type: string
  default: any
for:
  description: How long the media player must stay in a non-playing state before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- This condition covers any non-playing state. If you only want to check for paused playback, use [Media player is paused](/conditions/media_player.is_paused/).
- Media players that are `unavailable` or `unknown` are skipped for **Any** and fail for **All**.
- If you need to confirm that playback is active, use [Media player is playing](/conditions/media_player.is_playing/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: start the vacuum only when the TV is not playing

When everyone leaves home, start the vacuum only if the living room TV is not playing.

- **Trigger**: Person leaves home
- **Condition**: Media player is not playing
  - **Target**: Living room TV
- **Action**: Start vacuuming
  - **Target**: Robot vacuum

{% details "YAML example for starting the vacuum only when playback is idle" %}

{% example %}
automation: |
  alias: "Start the vacuum only when the TV is not playing"
  triggers:
    - trigger: zone
      entity_id: person.alex
      zone: zone.home
      event: leave
  conditions:
    - condition: media_player.is_not_playing
      target:
        entity_id: media_player.living_room_tv
  actions:
    - action: vacuum.start
      target:
        entity_id: vacuum.main_floor
{% endexample %}

{% enddetails %}

### Automation: open the blinds only when every player in the room is not playing

At sunrise, open the media room blinds only if every targeted media player is not playing.

- **Trigger**: Sun rises
- **Condition**: Media player is not playing
  - **Target**: Media room
  - **Condition passes if**: All
- **Action**: Open cover
  - **Target**: Media room blinds

{% details "YAML example for opening blinds when the room is quiet" %}

{% example %}
automation: |
  alias: "Open the blinds only when the media room is quiet"
  triggers:
    - trigger: sun
      event: sunrise
  conditions:
    - condition: media_player.is_not_playing
      target:
        area_id: media_room
      options:
        behavior: all
  actions:
    - action: cover.open_cover
      target:
        entity_id: cover.media_room_blinds
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
