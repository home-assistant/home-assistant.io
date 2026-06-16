---
title: "Request data"
action: keba.request_data
domain: keba
description: "Requests new data from a Keba charging station."
related_actions:
  - keba.set_current
---

Use this action to request new data from a Keba charging station. The charging station sends an update so the related entities reflect its latest state.

{% include actions/ui_header.md %}

To request new data from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Keba Charging Station: Request data**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `keba.request_data`. A basic example looks like this:

{% example %}
action: |
  action: keba.request_data
{% endexample %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
