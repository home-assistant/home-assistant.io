---
title: "Reload Google Assistant"
action: google_assistant.reload
domain: google_assistant
description: "Reloads the manual Google Assistant configuration from YAML."
---

The **Reload Google Assistant** action reloads the manual [Google Assistant](/integrations/google_assistant/) configuration from YAML. Use it after you change the `google_assistant` section of your `configuration.yaml`, such as which entities are exposed or their names and aliases, to apply the changes without restarting Home Assistant.

If you configured a `service_account`, Home Assistant then asks Google to [sync your devices](/integrations/google_assistant/#utilize-device-sync), so the Google Home app shows the changes right away.

Only users with administrator rights can run this action.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Reload**.
6. Select **Save**.

You can also reload the Google Assistant configuration from {% my server_controls title="**Settings** > **Tools** > **YAML**" %}.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `google_assistant.reload`:

{% example %}
action: |
  action: google_assistant.reload
{% endexample %}

### Options in YAML

This action has no additional options in YAML.

## Good to know

- Changing `project_id` or `service_account` requires a restart. The action reports an error and keeps the current configuration.
- Google uses the `room` hint only when it first adds a device, so changing it doesn't move a device that's already in Google Home.
- If your YAML configuration is invalid, Home Assistant shows the error and keeps the current Google Assistant configuration.
- To remove `google_assistant` from your YAML configuration, restart Home Assistant.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: reload from a dashboard button

If you edit your Google Assistant configuration often, add a button to your dashboard that applies the changes. This example uses a **Button** {% term helper %} that you create separately.

- **Trigger**: State
  - **Entity**: Reload Google Assistant (`input_button.reload_google_assistant`)
- **Action**: Reload

{% details "YAML example for reloading from a dashboard button" %}

{% example %}
automation: |
  alias: "Reload Google Assistant from a button"
  triggers:
    - trigger: state
      entity_id: input_button.reload_google_assistant
  actions:
    - action: google_assistant.reload
{% endexample %}

{% enddetails %}

### Automation: apply configuration changes every night

If you edit your YAML configuration in a file editor and don't want to reload by hand, reload Google Assistant once a night. Your changes show up in the Google Home app by the next morning.

- **Trigger**: Time
  - **At**: 03:00
- **Action**: Reload

{% details "YAML example for reloading every night" %}

{% example %}
automation: |
  alias: "Reload Google Assistant every night"
  triggers:
    - trigger: time
      at: "03:00:00"
  actions:
    - action: google_assistant.reload
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
