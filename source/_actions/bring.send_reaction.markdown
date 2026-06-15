---
title: "Send reaction"
action: bring.send_reaction
domain: bring
description: "Sends an emoji reaction to a recent activity on a Bring! list."
related_actions:
  - bring.send_message
---

Use this action to send an emoji reaction, like 👍 or ❤️, to the most recent activity on a Bring! shopping list. Reactions let members of a shared list quickly acknowledge an update.

This is handy in automations, for example to automatically send a thumbs up when someone finishes the shopping.

{% include actions/ui_header.md %}

To send a reaction from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Bring!: Send reaction**.
6. Select the Bring! **Activities** event entity to react to its most recent activity.
7. Select the **Reaction** you want to send.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Activities:
  description: The Bring! activities event entity to react to its most recent activity.
  required: true
Reaction:
  description: The reaction to send. Choose from 👍 (thumbs up), 🧐 (monocle), 🤤 (drooling), or ❤️ (heart).
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `bring.send_reaction`. A basic example looks like this:

{% example %}
action: |
  action: bring.send_reaction
  data:
    entity_id: event.bring_shopping_list_activities
    reaction: heart
{% endexample %}

This sends a heart reaction to the most recent activity on the selected list.

### Options in YAML

{% options_yaml %}
entity_id:
  description: >
    The Bring! activities event entity to react to its most recent activity.
  required: true
  type: string
reaction:
  description: >
    The reaction to send. One of `thumbs_up`, `monocle`, `drooling`, or
    `heart`.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- The reaction is sent to the most recent activity on the list, as reported by the activities event entity.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
