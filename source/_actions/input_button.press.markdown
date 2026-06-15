---
title: "Press input button"
action: input_button.press
domain: input_button
description: "Presses an input button."
related_actions:
  - input_button.reload
---

Use this action to press one or more input buttons. An input button is a stateless helper you can use in automations and scripts, for example to trigger a routine on demand. Pressing it updates its timestamp, which triggers a state change you can respond to in automations.

{% include actions/ui_header.md %}

To press an input button from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the input button you want to press.
6. From the actions shown for that target, select **Press input button**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `input_button.press`. A basic example looks like this:

{% example %}
action: |
  action: input_button.press
  target:
    entity_id: input_button.my_button
{% endexample %}

This presses the `input_button.my_button` helper.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- Pressing an input button updates its timestamp and fires a state change. Automations that trigger on that helper run in response.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
