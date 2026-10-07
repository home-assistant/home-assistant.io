---
title: "Request sync"
action: google_assistant.request_sync
domain: google_assistant
description: "Asks Google to sync your devices from Home Assistant."
---

Use this action to ask Google to sync your devices from Home Assistant again. After a sync, the Google Home app shows the devices you currently expose, including any you added or removed. It's the same as saying "Hey Google, sync my devices".

This action is for the manual [Google Assistant](/integrations/google_assistant/) setup. If you use Home Assistant Link, you don't need it: Home Assistant Link syncs your devices with Google for you when you change which entities are exposed.

{% include actions/ui_header.md %}

To request a sync from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Google Assistant: Request sync**.
6. In an automation, enter the **Agent user ID**. See the options below.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Agent user ID:
  description: "The ID of the Home Assistant user whose Google account should sync. You only need this in automations, because those don't run as a specific user. When you run the action yourself, your own user is used. To find a user ID, go to **Settings** > **People**, open the **Users** tab, and select the user."
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `google_assistant.request_sync`. A basic example looks like this:

{% example %}
action: |
  action: google_assistant.request_sync
  data:
    agent_user_id: "YOUR_USER_ID"
{% endexample %}

This asks Google to sync the devices for the Google account linked to that Home Assistant user.

### Options in YAML

{% options_yaml %}
agent_user_id:
  description: The ID of the Home Assistant user whose Google account should sync. Only needed when the action doesn't run as a specific user, like in an automation.
  required: false
  type: string
{% endoptions_yaml %}

## Good to know

- This action needs a `service_account` in your Google Assistant YAML configuration. Without it, the sync fails and Home Assistant logs an error. See [Utilize device sync](/integrations/google_assistant/#utilize-device-sync).
- If no agent user ID is given and the action doesn't run as a user, nothing is synced and Home Assistant logs a warning.
- If the sync fails with an error, see [Troubleshooting](/integrations/google_assistant/#troubleshooting) on the Google Assistant page.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: sync with Google after Home Assistant starts

When you add or remove devices in your YAML configuration, restart Home Assistant. This automation then asks Google to sync, so the Google Home app shows your devices right away.

- **Trigger**: Home Assistant
  - **Event**: Start
- **Action**: Google Assistant: Request sync
  - **Agent user ID**: Your Home Assistant user ID

{% details "YAML example for syncing with Google after a restart" %}

{% example %}
automation: |
  alias: "Sync devices with Google after a restart"
  triggers:
    - trigger: homeassistant
      event: start
  actions:
    - action: google_assistant.request_sync
      data:
        agent_user_id: "YOUR_USER_ID"
{% endexample %}

{% enddetails %}

### Automation: sync with Google when you add a new entity

When a new entity is added to Home Assistant, ask Google to sync, so a new device shows up in the Google Home app without saying "Hey Google, sync my devices".

- **Trigger**: Manual event received
  - **Event type**: `entity_registry_updated`
  - **Event data**: `action: create`
- **Action**: Google Assistant: Request sync
  - **Agent user ID**: Your Home Assistant user ID

{% details "YAML example for syncing with Google when an entity is added" %}

{% example %}
automation: |
  alias: "Sync devices with Google when an entity is added"
  triggers:
    - trigger: event
      event_type: entity_registry_updated
      event_data:
        action: create
  actions:
    - action: google_assistant.request_sync
      data:
        agent_user_id: "YOUR_USER_ID"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
