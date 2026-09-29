---
title: "Display a chart"
action: lametric.chart
domain: lametric
description: "Display a chart on a LaMetric device from a list of numeric data points."
related_actions:
  - lametric.message
---

The **Display a chart** action plots a list of numbers as a small chart on your LaMetric device. It is handy for showing trends at a glance, such as recent energy usage, temperature, or any other numeric value from your home.

{% include actions/ui_header.md %}

To display a chart from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **LaMetric: Display a chart**.
6. Select the LaMetric device to display the chart on.
7. Enter the data points to plot in the **Data** field.
8. _Optional_: set a sound, the number of cycles, an icon type, and a priority.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The LaMetric device to display the chart on.
Data:
  description: "The list of data points to plot, as numbers. For example, `[1, 2, 3, 2, 1]`."
Sound:
  description: "The notification sound to play. See [Notification sounds](/integrations/lametric/#notification-sounds) for the full list."
  required: false
Cycles:
  description: "How many times to display the chart. Set to 0 to keep it on screen until it is dismissed."
  required: false
Icon type:
  description: "The type of icon to display, indicating the nature of the notification. One of none, info, or alert."
  required: false
Priority:
  description: "The priority of the notification. When the device is running in screensaver or kiosk mode, only critical notifications are accepted. One of info, warning, or critical."
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lametric.chart`. A basic example looks like this:

{% example %}
action: |
  action: lametric.chart
  data:
    device_id: 1234567890abcdef1234567890abcdef
    data: [1, 2, 3, 2, 1]
{% endexample %}

This plots a five-point chart on the LaMetric device with the given ID.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The ID of the LaMetric device to display the chart on.
  required: true
  type: string
data:
  description: >
    The list of data points to plot, as numbers. For example, `[1, 2, 3, 2, 1]`.
  required: true
  type: list
sound:
  description: >
    The notification sound to play. See [Notification sounds](/integrations/lametric/#notification-sounds) for the full list.
  required: false
  type: string
cycles:
  description: >
    How many times to display the chart. Set to `0` to keep it on screen until it is dismissed.
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

{% include actions/more_examples.md %}

### Automation: show a temperature chart every 10 minutes

Plot the last few temperature readings on the LaMetric device on a schedule.

- **Trigger**: Time pattern: every 10 minutes
- **Action**: LaMetric: Display a chart
  - **Device**: LaMetric TIME
  - **Data**: `[18, 19, 20, 21, 20, 19]`
  - **Priority**: info

{% details "YAML example for a temperature chart" %}

{% example %}
automation: |
  alias: "Show temperature chart on LaMetric"
  triggers:
    - trigger: time_pattern
      minutes: "/10"
  actions:
    - action: lametric.chart
      data:
        device_id: 1234567890abcdef1234567890abcdef
        data: [18, 19, 20, 21, 20, 19]
        priority: info
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
