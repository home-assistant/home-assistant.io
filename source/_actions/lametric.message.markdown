---
title: "Display a message"
action: lametric.message
domain: lametric
description: "Display a message, with an optional icon, on a LaMetric device."
related_actions:
  - lametric.chart
---

The **Display a message** action shows a short text message on your LaMetric device. You can enrich the message with an icon or animation and play a sound alongside it.

{% include actions/ui_header.md %}

To display a message from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **LaMetric: Display a message**.
6. Select the LaMetric device to display the message on.
7. Enter the text to show in the **Message** field.
8. _Optional_: add an icon, a sound, the number of cycles, an icon type, and a priority.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The LaMetric device to display the message on.
Message:
  description: The message to display.
Icon ID:
  description: "The ID number of the icon or animation to display. The full list of icons and their IDs is at [developer.lametric.com/icons](https://developer.lametric.com/icons)."
  required: false
Sound:
  description: "The notification sound to play. See [Notification sounds](/integrations/lametric/#notification-sounds) for the full list."
  required: false
Cycles:
  description: "How many times to display the message. Set to 0 to keep it on screen until it is dismissed."
  required: false
Icon type:
  description: "The type of icon to display, indicating the nature of the notification. One of none, info, or alert."
  required: false
Priority:
  description: "The priority of the notification. When the device is running in screensaver or kiosk mode, only critical notifications are accepted. One of info, warning, or critical."
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lametric.message`. A basic example looks like this:

{% example %}
action: |
  action: lametric.message
  data:
    device_id: 1234567890abcdef1234567890abcdef
    message: "Hello there!"
{% endexample %}

This shows the text "Hello there!" on the LaMetric device with the given ID.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The ID of the LaMetric device to display the message on.
  required: true
  type: string
message:
  description: >
    The message to display.
  required: true
  type: string
icon:
  description: >
    The ID number of the icon or animation to display. The full list of icons and their IDs is at [developer.lametric.com/icons](https://developer.lametric.com/icons).
  required: false
  type: string
sound:
  description: >
    The notification sound to play. See [Notification sounds](/integrations/lametric/#notification-sounds) for the full list.
  required: false
  type: string
cycles:
  description: >
    How many times to display the message. Set to `0` to keep it on screen until it is dismissed.
  required: false
  type: integer
  default: 1
icon_type:
  description: >
    The type of icon to display, indicating the nature of the notification. One of `none`, `info`, or `alert`.
  required: false
  type: string
  default: none
priority:
  description: >
    The priority of the notification. When the device is running in screensaver or kiosk mode, only `critical` notifications are accepted. One of `info`, `warning`, or `critical`.
  required: false
  type: string
  default: info
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
