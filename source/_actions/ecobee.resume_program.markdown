---
title: "Resume program"
action: ecobee.resume_program
domain: ecobee
description: "Resumes the programmed schedule on an ecobee thermostat."
related_actions:
  - ecobee.create_vacation
  - ecobee.delete_vacation
---

The **Resume program** action resumes the programmed schedule of presets on an ecobee thermostat. This cancels any manual temperature settings or selected preset.

This is handy at the end of an automation that set a temporary temperature, so the thermostat returns to its normal schedule afterward. To cancel a vacation, use the [Delete vacation](/integrations/ecobee/#action-delete_vacation) action instead.

{% include actions/ui_header.md %}

To resume the program from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **ecobee: Resume program**.
6. Optionally, select the **Entity** to resume and turn on **Resume all**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Entity:
  description: The ecobee thermostat, or thermostats, to resume. Omit to resume all ecobee thermostats.
  required: false
Resume all:
  description: When on, resumes all events and returns to the scheduled program. When off, only the latest active event is cancelled, which is rarely needed.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `ecobee.resume_program`. A basic example looks like this:

{% example %}
action: |
  action: ecobee.resume_program
  data:
    entity_id: climate.living_room
    resume_all: true
{% endexample %}

This resumes the scheduled program on `climate.living_room`.

### Options in YAML

{% options_yaml %}
entity_id:
  description: >
    The ecobee thermostat, or list of thermostats, to resume. Omit to resume
    all ecobee thermostats.
  required: false
  type: string
resume_all:
  description: >
    When on, resumes all events and returns to the scheduled program. When
    off, only the latest active event is cancelled, which is rarely needed.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
