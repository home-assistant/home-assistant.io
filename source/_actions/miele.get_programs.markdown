---
title: "Get the programs of a Miele appliance"
action: miele.get_programs
domain: miele
description: "Returns the available programs of a Miele appliance."
related_actions:
  - miele.set_program
  - miele.set_program_oven
---

Use this action to retrieve the available programs of a Miele appliance, along with their parameters. For example, you can use it to find the program ID to pass to the [Set program](/actions/miele.set_program/) action.

The action returns an empty list if the appliance does not support programs, such as a freezer. The appliance must be in the same state required by the [Set program](/actions/miele.set_program/) action.

This action returns its result as [response data](/docs/scripts/perform-actions#use-templates-to-handle-response-data) and does not change anything on the appliance.

{% include actions/ui_header.md %}

To get the programs from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for the action **Miele: Get programs** and select it.
6. Select the appliance in the **Device** field.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The Miele appliance to get the programs from.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `miele.get_programs`. A basic example looks like this:

{% example %}
action: |
  action: miele.get_programs
  data:
    device_id: abcde1234567890abcde1234567890ab
  response_variable: programs
{% endexample %}

This stores the available programs of the appliance in a variable named `programs`.

### Options in YAML

{% options_yaml %}
device_id:
  description: The ID of the Miele appliance to get the programs from.
  required: true
  type: string
{% endoptions_yaml %}

This action does not support targets. Select the appliance through the **Device** field.

## Response data

The action returns a `programs` list. Each entry has a `program_id`, a `program` name, and a `parameters` mapping. The parameters can include a `temperature` and a `duration` range, each with whether it is `mandatory`. Parameters that the program does not support are returned as empty.

```yaml
programs:
  - program_id: 1
    program: Cottons
    parameters:
      temperature:
        min: 30
        max: 90
        step: 10
        mandatory: false
      duration:
        min:
          hours: 1
          minutes: 0
        max:
          hours: 3
          minutes: 0
        mandatory: false
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
