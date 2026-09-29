---
title: "Reload Python scripts"
action: python_script.reload
domain: python_script
description: "Reloads the available Python scripts from the `<config>/python_scripts` folder."
---

The **Reload** action reloads all Python scripts from the `<config>/python_scripts` folder. It is a quicker alternative to restarting Home Assistant.

Use this after you add a new Python script, or after you update the `<config>/python_scripts/services.yaml` file. You don't need to reload when you change an existing Python script, because the latest version runs each time the script is called.

{% include actions/ui_header.md %}

To reload your Python scripts from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Python Scripts: Reload**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `python_script.reload`. It takes no options:

{% example %}
action: |
  action: python_script.reload
{% endexample %}

This reloads all Python scripts from the `<config>/python_scripts` folder.

### Options in YAML

This action has no options.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Script: reload Python scripts on demand

While working on your Python scripts, run a script that reloads them so a newly added script or an updated `services.yaml` file becomes available right away.

- **Action**: Python Scripts: Reload

{% details "YAML example for reloading Python scripts" %}

{% example %}
script: |
  reload_python_scripts:
    alias: "Reload Python scripts"
    sequence:
      - action: python_script.reload
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
