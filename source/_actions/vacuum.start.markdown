---
title: Start cleaning
action: vacuum.start
domain: vacuum
description: "Starts or resumes a cleaning task on a vacuum."
---

The **Start vacuum cleaner** action sends a start or resume command to a vacuum, beginning or continuing a cleaning job.

Use it when you want the robot to begin on a schedule, resume after a pause, or start automatically once the house is empty.

{% include actions/ui_header.md %}

To use this action in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an automation, or select **Create automation**.
3. In the **Add action** section, search for and select **Start vacuum cleaner**.
4. Choose one or more vacuum entities or an area.
5. Configure as needed and select **Save**.

{% include actions/yaml_header.md %}

{% example %}
action: |
  action: vacuum.start
  target:
    entity_id:
      - vacuum.downstairs
      - vacuum.upstairs
{% endexample %}

This starts `vacuum.downstairs` and `vacuum.upstairs`.

The `entity_id` is optional; omit it to target all vacuums.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
target:
  description: The vacuum, area, or device to start cleaning.
  required: false
  type: map
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action only works if your vacuum supports the start function.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: start cleaning after everyone leaves

When the last person leaves home, this automation starts the downstairs vacuum so it can clean while the house is empty.

- **Trigger**: Zone occupancy cleared
  - **Zone**: Home
- **Action**: Start cleaning
- **Target**: Downstairs vacuum

{% details "YAML example for starting the vacuum when nobody is home" %}

{% example %}
automation: |
  alias: "Start vacuum when house is empty"
  triggers:
    - trigger: zone.occupancy_cleared
      options:
        zone: zone.home
  actions:
    - action: vacuum.start
      target:
        entity_id: vacuum.downstairs
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
