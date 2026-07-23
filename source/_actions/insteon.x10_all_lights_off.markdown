---
title: "X10 all lights off"
action: insteon.x10_all_lights_off
domain: insteon
description: "Sends an X10 All lights off command for a house code."
related_actions:
  - insteon.x10_all_lights_on
  - insteon.x10_all_units_off
---

The **X10 all lights off** action sends an X10 *All lights off* command to every X10 light that uses the given house code.

This is useful when you have X10 lights on your Insteon network and want to switch them all off at once, for example as part of a leaving home or bedtime automation.

{% include actions/ui_header.md %}

To send an X10 All lights off command from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Insteon: X10 all lights off**.
6. Choose the **Housecode**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Housecode:
  description: The X10 house code, from `a` to `p`.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `insteon.x10_all_lights_off`. A basic example looks like this:

{% example %}
action: |
  action: insteon.x10_all_lights_off
  data:
    housecode: a
{% endexample %}

This sends an X10 All lights off command to house code `a`.

### Options in YAML

{% options_yaml %}
housecode:
  description: >
    The X10 house code, from `a` to `p`.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
