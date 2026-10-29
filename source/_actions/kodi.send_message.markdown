---
title: "Send message"
action: kodi.send_message
domain: kodi
description: "Shows a notification on a Kodi device. Optionally set the icon and how long the notification is shown."
since: "2026.12"
related_actions:
  - notify.send_message
---

The **Send message** action shows a notification on a Kodi device. You can choose the icon of the notification and how long it stays on screen.

{% include actions/ui_header.md %}

To show a notification from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Kodi notify entity.
6. From the actions shown for that target, under **Kodi**, select **Send message**.
7. In **Message**, enter the text of the notification.
8. Optionally, enter a **Title**, select an **Icon**, or set the **Display time**.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Message:
  description: The message body of the notification.
  required: true
Title:
  description: Title of the notification. Defaults to **Home Assistant**.
  required: false
Icon:
  description: Icon of the notification. Select **Info**, **Warning**, or **Error**, or enter an image that the Kodi device can open, as a URL or as a path on the Kodi device. Defaults to **Info**.
  required: false
Display time:
  description: How long the notification is shown, in milliseconds. At least 1500. Defaults to 10000.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `kodi.send_message`. A basic example looks like this:

{% example %}
action: |
  action: kodi.send_message
  target:
    entity_id: notify.kodi
  data:
    title: "Reminder"
    message: "Have you considered frogs?"
{% endexample %}

### Options in YAML

{% options_yaml %}
message:
  description: >
    The message body of the notification.
  required: true
  type: string
title:
  description: >
    Title of the notification. Defaults to `Home Assistant`.
  required: false
  type: string
icon:
  description: >
    Icon of the notification. Possible values are `info`, `warning`, `error`, or an image that the Kodi device can open, as a URL or as a path on the Kodi device, such as `special://home/media/doorbell.png`. Defaults to `info`.
  required: false
  type: string
displaytime:
  description: >
    How long the notification is shown, in milliseconds. At least `1500`. Defaults to `10000`.
  required: false
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="notify" entity_type="Kodi notify entity" example="notify.kodi" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: show a warning on Kodi when someone rings the doorbell

When someone rings the doorbell, show a warning on Kodi for 5 seconds, so you notice it while watching a movie.

- **Trigger**: State
  - **Entity**: Doorbell (`binary_sensor.doorbell`)
  - **To**: On
- **Action**: Send message
  - **Target**: Kodi (`notify.kodi`)
  - **Title**: Doorbell
  - **Message**: Someone is at the door.
  - **Icon**: Warning
  - **Display time**: 5000

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Kodi: doorbell"
  triggers:
    - trigger: state
      entity_id: binary_sensor.doorbell
      to: "on"
  actions:
    - action: kodi.send_message
      target:
        entity_id: notify.kodi
      data:
        title: "Doorbell"
        message: "Someone is at the door."
        icon: warning
        displaytime: 5000
{% endexample %}

{% enddetails %}

### Automation: remind you to put out the bins with a picture

Every Sunday evening, show a reminder with a picture of the bins. Replace `https://homeassistant.example.com/local/bins.png` with the URL of an image that your Kodi device can reach.

- **Trigger**: Time
  - **At**: 20:00
- **Condition**: Day of the week is Sunday
- **Action**: Send message
  - **Target**: Kodi (`notify.kodi`)
  - **Title**: Bins
  - **Message**: Put out the bins for tomorrow.
  - **Icon**: `https://homeassistant.example.com/local/bins.png`
  - **Display time**: 20000

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Kodi: bins reminder"
  triggers:
    - trigger: time
      at: "20:00:00"
  conditions:
    - condition: time
      weekday: sun
  actions:
    - action: kodi.send_message
      target:
        entity_id: notify.kodi
      data:
        title: "Bins"
        message: "Put out the bins for tomorrow."
        icon: "https://homeassistant.example.com/local/bins.png"
        displaytime: 20000
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
