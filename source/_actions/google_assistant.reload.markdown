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
5. From the search box, search for and select **Google Assistant: Reload**.
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

- Changing `project_id` or `service_account` still requires a restart.
- Google uses the `room` hint only when it first adds a device, so changing it doesn't move a device that's already in Google Home.
- If your YAML configuration is invalid, Home Assistant shows the error and keeps the current Google Assistant configuration.
- If you remove `google_assistant` from your YAML configuration, reloading stops exposing entities to Google. To remove the integration completely, restart Home Assistant.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
