---
title: "Button"
action: webostv.button
domain: webostv
description: "Simulates a button press on the remote of an LG webOS TV."
related_actions:
  - webostv.command
  - webostv.select_sound_output
---

Use this action to simulate a press of a button on the remote of your LG webOS TV. This is handy when you want to navigate the on-screen menus from an automation or script, for example to open the home menu or move the selection with the arrow keys.

{% include actions/ui_header.md %}

To press a button from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the TV you want to control.
6. From the actions shown for that target, select **Button**.
7. Set the **Button** you want to press.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Button:
  description: "The name of the button to press. Known values are: LEFT, RIGHT, DOWN, UP, HOME, MENU, BACK, ENTER, DASH, INFO, ASTERISK, CC, EXIT, MUTE, RED, GREEN, BLUE, YELLOW, VOLUMEUP, VOLUMEDOWN, CHANNELUP, CHANNELDOWN, PLAY, PAUSE, and 0 to 9. Other buttons supported by your TV may also work."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `webostv.button`. A basic example looks like this:

{% example %}
action: |
  action: webostv.button
  target:
    entity_id: media_player.lg_webos_tv
  data:
    button: "HOME"
{% endexample %}

### Options in YAML

{% options_yaml %}
button:
  description: "The name of the button to press. Known values are: LEFT, RIGHT, DOWN, UP, HOME, MENU, BACK, ENTER, DASH, INFO, ASTERISK, CC, EXIT, MUTE, RED, GREEN, BLUE, YELLOW, VOLUMEUP, VOLUMEDOWN, CHANNELUP, CHANNELDOWN, PLAY, PAUSE, and 0 to 9. Other buttons supported by your TV may also work."
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

## Good to know

- The button names match the keys on the TV remote. The list above covers the commonly known buttons, but your TV may accept other button names as well.
- To send a generic command to the TV instead of a button press, use the [Command](/actions/webostv.command/) action.

{% include actions/stuck.md %}

{% include actions/related.md %}
