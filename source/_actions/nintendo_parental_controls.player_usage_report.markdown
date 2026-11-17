---
title: "Get player usage report"
action: nintendo_parental_controls.player_usage_report
domain: nintendo_parental_controls
description: "Get today's application usage details for one player on a device."
related_actions:
  - nintendo_parental_controls.device_usage_report
  - nintendo_parental_controls.player_usage_report
---

The **Nintendo Switch parental controls: Get player usage report** action retrieves which Nintendo applications one player has used today on a specified Nintendo Switch device, and for how long.

This action returns response data containing the player's application usage. To get the usage of every player on the device at once, use [Get device usage report](/actions/nintendo_parental_controls.device_usage_report/).

This action does not support targets. In the UI, you are not prompted to choose an area, entity, or label. Instead, you select the Nintendo Switch through the **Device** option and the player through the **Player** option.

{% include actions/ui_header.md %}

To retrieve a player usage report from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Nintendo Switch parental controls: Get player usage report**.
6. Choose the **Device**.
7. Under **Player**, choose the player's screen time sensor, for example **Alex used screen time**.
8. In the **Response variable** field, enter a name to store the result, for example `player_report`.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The ID of the device to get player usage details for.
Player:
  description: "The player entity to get usage for. This is the player's used screen time sensor on that device."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `nintendo_parental_controls.player_usage_report`. Because this action returns data, supply a `response_variable` to capture the output:

{% example %}
action: |
  action: nintendo_parental_controls.player_usage_report
  data:
    device_id: 1b4a46c6d0f3406c80d275f5b0c6483b
    entity_id: sensor.example_player_used_screen_time
  response_variable: player_report
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The ID of the device to get player usage details for.
  required: true
  type: string
entity_id:
  description: >
    The player entity to get usage for. This is the player's used screen time sensor on that device. Any other entity, or a player on another device, returns an error.
  required: true
  type: string
{% endoptions_yaml %}

### Response data

The action returns the applications the player has played today. `playing_time` is in minutes, and `whitelisted` is `true` when the application is on the Allow List of the parental controls:

```json
{
  "apps": [
    {
      "name": "Super Mario Odyssey",
      "playing_time": 45,
      "image": "https://example.com/image.png",
      "whitelisted": true
    }
  ]
}
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
