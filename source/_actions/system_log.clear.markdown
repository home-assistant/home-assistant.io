---
title: "Clear system log"
action: system_log.clear
domain: system_log
description: "Clears all stored entries from the Home Assistant system log."
related_actions:
  - system_log.write
---

The **Clear system log** action removes all stored errors and warnings from the system log. Use it to start with a clean slate, for example after you have fixed a problem and want to confirm that the error does not come back.

{% include actions/ui_header.md %}

To clear the system log from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **System Log: Clear system log**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `system_log.clear`. This action takes no options:

{% example %}
action: |
  action: system_log.clear
{% endexample %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
