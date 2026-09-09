---
title: "Learn sendevent"
action: androidtv.learn_sendevent
domain: androidtv
description: "Translates a remote button press into a faster ADB sendevent command."
related_actions:
  - androidtv.adb_command
---

Use this action to learn the `sendevent` command for a button on your remote. Sending key commands like `UP`, `DOWN`, and `HOME` over ADB can be slow, because the Android `input` command behind them is slow. The Android `sendevent` command is faster, but it is device-specific. This action learns the matching `sendevent` command so you can reuse it with the [ADB command](/actions/androidtv.adb_command/) action.

{% include actions/ui_header.md %}

To learn a command from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Android or Fire TV device you want to control.
6. From the actions shown for that target, select **Learn sendevent**.
7. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `androidtv.learn_sendevent`. A basic example looks like this:

{% example %}
action: |
  action: androidtv.learn_sendevent
  target:
    entity_id: media_player.fire_tv_living_room
{% endexample %}

After you run the action, press a single button on your remote within 8 seconds.

{% include actions/targets.md domain="media_player" %}

## Good to know

- After you run the action, press a single button on your remote within 8 seconds.
- After 8 seconds, a notification appears with the equivalent command you can send through the [ADB command](/actions/androidtv.adb_command/) action. The same command is stored in the `adb_response` attribute of the media player entity and logged at the info level.
- Replace a slow `command: UP` with the learned `sendevent` command to make remote actions respond faster.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
