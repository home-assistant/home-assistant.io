---
title: "Delete vacation"
action: ecobee.delete_vacation
domain: ecobee
description: "Deletes a vacation on the selected ecobee thermostat."
related_actions:
  - ecobee.create_vacation
  - ecobee.resume_program
---

The **Delete vacation** action deletes a vacation on the selected ecobee thermostat.

This is handy when you return home earlier than planned and want to cancel a vacation you created earlier.

{% include actions/ui_header.md %}

To delete a vacation from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **ecobee: Delete vacation**.
6. Select the **Entity** and enter the **Vacation name** to delete.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Entity:
  description: The ecobee thermostat on which to delete the vacation.
  required: true
Vacation name:
  description: The name of the vacation to delete.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `ecobee.delete_vacation`. A basic example looks like this:

{% example %}
action: |
  action: ecobee.delete_vacation
  data:
    entity_id: climate.living_room
    vacation_name: "Skiing"
{% endexample %}

This deletes the vacation named `Skiing` on `climate.living_room`.

### Options in YAML

{% options_yaml %}
entity_id:
  description: The ecobee thermostat on which to delete the vacation.
  required: true
  type: string
vacation_name:
  description: The name of the vacation to delete.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
