---
title: "Reload conversation agents"
action: conversation.reload
domain: conversation
description: "Reloads the intent configuration of conversation agents."
related_actions:
  - conversation.process
---

The **Reload conversation agents** action reloads the intent configuration of the default conversation agent and clears its cached intents.

This is useful while you are working on custom sentences or intents. After you change your configuration, reload the conversation agent to apply your changes without restarting Home Assistant.

{% include actions/ui_header.md %}

To reload conversation agents from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Conversation: Reload conversation agents**.
6. Optionally, choose a **Language** to limit what gets reloaded.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Agent:
  description: This action reloads the default conversation agent, regardless of which agent you select.
  required: false
Language:
  description: The language to clear cached intents for. When left empty, all languages are cleared.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `conversation.reload`. A basic example looks like this:

{% example %}
action: |
  action: conversation.reload
{% endexample %}

This reloads the default conversation agent and clears its cached intents.

### Options in YAML

{% options_yaml %}
agent_id:
  description: >
    This action reloads the default conversation agent, regardless of which agent you set here.
  required: false
  type: string
language:
  description: >
    The language to clear cached intents for. When left empty, all languages
    are cleared.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Script: apply new custom sentences

While iterating on custom sentences, run a script that reloads the conversation agents so your changes take effect right away.

- **Action**: Conversation: Reload conversation agents

{% details "YAML example for reloading after editing sentences" %}

{% example %}
script: |
  reload_conversation_agents:
    alias: "Reload conversation agents"
    sequence:
      - action: conversation.reload
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
