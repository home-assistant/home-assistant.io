---
title: "Alarm display message"
action: elkm1.alarm_display_message
domain: elkm1
description: "Displays a text message on the keypads of an Elk-M1 area."
related_actions:
  - elkm1.speak_phrase
  - elkm1.speak_word
---

The **Alarm display message** action shows up to two lines of text on the keypads of an Elk-M1 area. You can control how long the message stays on screen, whether the keypad beeps, and how it is cleared.

This is useful when you want an automation to leave a note on the keypad, for example a reminder, a status message, or a welcome-home greeting.

{% include actions/targets.md domain="alarm_control_panel" %}

{% include actions/ui_header.md %}

To display a message from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Elk-M1 Control: Alarm display message**.
6. Choose the Elk-M1 area, then enter the message text and any options.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Line 1:
  description: Up to 16 characters of text for the first line. Longer text is truncated.
  required: false
Line 2:
  description: Up to 16 characters of text for the second line. Longer text is truncated.
  required: false
Clear:
  description: "How the message is cleared: `0` clears the message, `1` clears the message with the `*` key, and `2` displays until timeout."
  required: false
Beep:
  description: Whether the keypad beeps when the message is shown.
  required: false
Timeout:
  description: How long to display the message, in seconds. Use `0` to display it forever. The maximum is 65535.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `elkm1.alarm_display_message`. A basic example looks like this:

{% example %}
action: |
  action: elkm1.alarm_display_message
  target:
    entity_id: alarm_control_panel.home
  data:
    line1: "Welcome home"
    line2: "Have a great day"
{% endexample %}

This shows a two-line message on the area's keypads until the timeout.

### Options in YAML

{% options_yaml %}
line1:
  description: >
    Up to 16 characters of text for the first line. Longer text is truncated.
  required: false
  type: string
  default: ""
line2:
  description: >
    Up to 16 characters of text for the second line. Longer text is truncated.
  required: false
  type: string
  default: ""
clear:
  description: >
    How the message is cleared: `0` clears the message, `1` clears the
    message with the `*` key, and `2` displays until timeout.
  required: false
  type: integer
  default: 2
beep:
  description: >
    Whether the keypad beeps when the message is shown.
  required: false
  type: boolean
  default: false
timeout:
  description: >
    How long to display the message, in seconds. Use `0` to display it
    forever. The maximum is 65535.
  required: false
  type: integer
  default: 0
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
