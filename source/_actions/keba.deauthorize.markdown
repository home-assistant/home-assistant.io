---
title: "Deauthorize"
action: keba.deauthorize
domain: keba
description: "Deauthorizes the running charging process on a Keba charging station."
related_actions:
  - keba.authorize
  - keba.disable
---

Use this action to deauthorize the running charging process on a Keba charging station. It uses the RFID tag defined in your configuration.

{% include actions/ui_header.md %}

To deauthorize a charging process from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Keba Charging Station: Deauthorize**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `keba.deauthorize`. A basic example looks like this:

{% example %}
action: |
  action: keba.deauthorize
{% endexample %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
