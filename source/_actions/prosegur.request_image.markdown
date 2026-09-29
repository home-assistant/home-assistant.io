---
title: "Request image"
action: prosegur.request_image
domain: prosegur
description: "Asks the Prosegur cloud service for a new image from a camera."
---

Use this action to ask the Prosegur cloud service to request a new image from one of your Prosegur cameras, for example to capture a fresh picture when an automation runs.

{% include actions/ui_header.md %}

To request an image from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Prosegur camera you want a new image from.
6. From the actions shown for that target, select **Prosegur: Request image**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `prosegur.request_image`. A basic example looks like this:

{% example %}
action: |
  action: prosegur.request_image
  target:
    entity_id: camera.prosegur
{% endexample %}

This requests a new image from `camera.prosegur`.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md domain="camera" %}

## Good to know

- This action only works with Prosegur camera entities.
- Use this action sparingly. Prosegur tends to throttle image requests for long periods, which can cause errors in both this integration and the Prosegur mobile app.

{% include actions/try_it.md %}

{% include actions/stuck.md %}
