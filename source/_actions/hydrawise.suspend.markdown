---
title: "Suspend automatic watering"
action: hydrawise.suspend
domain: hydrawise
description: "Suspends an irrigation zone's automatic watering schedule until the given date and time."
related_actions:
  - hydrawise.resume
  - hydrawise.start_watering
---

The **Suspend automatic watering** action pauses an irrigation zone's automatic watering schedule until a date and time you choose.

This is handy when you want to hold off watering for a while, for example suspending a zone over a rainy weekend or while you reseed part of the lawn. Automatic watering resumes on its own once the suspension ends.

{% include actions/ui_header.md %}

To suspend watering from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the irrigation zone's watering sensor.
6. From the actions shown for that target, select **Suspend automatic watering**.
7. Set the **Until** date and time.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Until:
  description: The date and time when automatic watering should resume.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `hydrawise.suspend`. A basic example looks like this:

{% example %}
action: |
  action: hydrawise.suspend
  target:
    entity_id: binary_sensor.front_lawn_watering
  data:
    until: "2024-08-30 08:30:00"
{% endexample %}

This suspends automatic watering on the front lawn zone until the morning of August 30.

### Options in YAML

{% options_yaml %}
until:
  description: >
    The date and time when automatic watering should resume, in the format
    YYYY-MM-DD HH:MM:SS.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="binary_sensor" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
