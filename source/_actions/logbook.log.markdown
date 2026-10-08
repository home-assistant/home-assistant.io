---
title: "Log activity"
action: logbook.log
domain: logbook
description: "Adds a custom entry to the Activity panel."
---

Use this action to write a custom entry to the {% my logbook title="**Activity** panel" %}. This is useful when you want to record a meaningful event in your home's activity history that Home Assistant would not log automatically. For example, use it to record a custom script completing a task, a manual override being triggered, or a note about a condition worth tracking over time.

{% include actions/ui_header.md %}

To add a custom entry to the Activity panel from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Activity: Log activity**.
6. Enter a **Name** and a **Message** for the entry.
7. Optionally, select an **Entity** to associate the entry with a specific entity, and enter a **Domain** to assign an integration icon to the entry.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Name:
  description: The name shown as the subject of the activity entry.
  required: true
Message:
  description: The message shown as the body of the activity entry.
  required: true
Entity:
  description: The entity to associate with the activity entry. When set, the entry appears when filtering the **Activity** panel by that entity.
  required: false
Domain:
  description: The integration domain to associate with the entry. Controls the icon shown next to the entry in the **Activity** panel. For example, `light` shows a light bulb icon.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `logbook.log`. A basic example looks like this:

{% example %}
action: |
  action: logbook.log
  data:
    name: Kitchen
    message: is being used
{% endexample %}

This writes an entry with the subject "Kitchen" and the message "is being used" to the **Activity** panel.

### Options in YAML

{% options_yaml %}
name:
  description: The name shown as the subject of the activity entry.
  required: true
  type: string
message:
  description: The message shown as the body of the activity entry.
  required: true
  type: string
entity_id:
  description: >
    The entity to associate with the activity entry. When set, the entry
    appears when filtering the **Activity** panel by that entity.
  required: false
  type: string
domain:
  description: >
    The integration domain to associate with the entry. Controls the icon
    shown next to the entry in the **Activity** panel. For example, `light`
    shows a light bulb icon, `climate` shows a thermostat icon.
  required: false
  type: string
{% endoptions_yaml %}

## Good to know

- The **Entity** and **Domain** fields are independent, meaning you can fill in one without the other. Setting **Entity** links the entry to that entity so it appears when you filter the **Activity** panel by that entity. Setting **Domain** only controls the icon shown next to the entry without linking it to a specific entity.
- Entries added using this action appear in the **Activity** panel alongside automatically recorded state changes. They follow the same retention settings as any other activity entry. If your recorder is set to keep 10 days of history, custom entries are also removed after 10 days.
- If you leave **Entity** and **Domain** empty, the entry appears under the logbook domain. Make sure the logbook domain is not excluded in your **Activity** [filter configuration](/integrations/logbook/#configure-filter), or the entry will not appear in the panel.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: log when the irrigation valve has been running too long

When a garden irrigation valve has been open for more than 30 minutes, close it and write a custom entry to the **Activity** panel recording the event. This gives you a permanent, searchable record in the **Activity** panel of every time the safety cutoff fired, which is useful for spotting patterns such as a valve that repeatedly fails to close on schedule.

- **Trigger**: State
  - **Entity**: Garden irrigation (`valve.garden_irrigation`)
  - **To**: Open
  - **For**:  `0:30:00`
- **Action**: Close valve
  - **Target**: Garden irrigation
- **Action**: Activity: Log activity
  - **Name**: Garden irrigation valve
  - **Message**: Closed automatically after staying open for 30 minutes.
  - **Entity**: Garden irrigation (`valve.garden_irrigation`)
  - **Domain**: `valve`

{% details "YAML example for logging an automatic irrigation cutoff" %}

{% example %}
automation: |
  alias: "Close irrigation valve and log if open too long"
  triggers:
    - trigger: state
      entity_id: valve.garden_irrigation
      to: "open"
      for:
        minutes: 30
  actions:
    - action: valve.close_valve
      target:
        entity_id: valve.garden_irrigation
    - action: logbook.log
      data:
        name: Garden irrigation valve
        message: >-
          Closed automatically after staying open for 30 minutes.
        entity_id: valve.garden_irrigation
        domain: valve
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}