---
title: "Process conversation"
action: conversation.process
domain: conversation
description: "Sends text to a conversation agent for processing."
related_actions:
  - conversation.reload
---

The **Process conversation** action sends a line of text to a conversation agent, which interprets it and acts on it, just like a spoken or typed command to your assistant.

This is useful when another part of your setup produces text that you want Home Assistant to act on. For example, you can forward a message received from a chat integration to your assistant, or drive an automation from a sentence you build with a template.

{% include actions/ui_header.md %}

To send text to a conversation agent from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Conversation: Process conversation**.
6. Enter the **Text** to process. Optionally, choose an **Agent**, a **Language**, and a **Conversation ID**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Text:
  description: The text to send to the conversation agent.
  required: true
Agent:
  description: The conversation agent to process your request. The conversation agent is the brains of your assistant. It processes the incoming text. When left empty, the default agent is used.
  required: false
Language:
  description: The language of the text. When left empty, the server language is used.
  required: false
Conversation ID:
  description: The ID of a new or previous conversation. Provide a previous ID to continue that conversation, or a new one to start a fresh conversation.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `conversation.process`. A basic example looks like this:

{% example %}
action: |
  action: conversation.process
  data:
    text: "Turn on the kitchen lights"
{% endexample %}

This sends the text to the default conversation agent, which acts on it.

### Options in YAML

{% options_yaml %}
text:
  description: >
    The text to send to the conversation agent.
  required: true
  type: string
agent_id:
  description: >
    The conversation agent to process your request. The conversation agent is
    the brains of your assistant. It processes the incoming text. When left
    empty, the default agent is used.
  required: false
  type: string
language:
  description: >
    The language of the text. When left empty, the server language is used.
  required: false
  type: string
conversation_id:
  description: >
    The ID of a new or previous conversation. Provide a previous ID to continue
    that conversation, or a new one to start a fresh conversation.
  required: false
  type: string
{% endoptions_yaml %}

## Response data

When you store the result in a response variable, this action returns the conversation agent's response, including the spoken reply and the result of the intent. The response has the same structure as the [`/api/conversation/process` API](https://developers.home-assistant.io/docs/intent_conversation_api#conversation-response).

The reply text is then available as `{{ agent_response.response.speech.plain.speech }}`. The automation below shows how to capture this reply and send it back to a chat.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: reply to a chat message with your assistant

When a message arrives from a chat integration, forward its text to the conversation agent, then send the agent's spoken reply back to the chat. This processes the message and uses the response in a single automation.

- **Trigger**: A chat integration receives a new message
- **Action**: Conversation: Process conversation, using the message text, and store the result in a response variable
- **Action**: Send the agent's reply back to the chat

{% details "YAML example for replying to a received message" %}

{% example %}
automation: |
  alias: "Reply to received chat message"
  triggers:
    - trigger: event
      event_type: chat_message_received
  actions:
    - action: conversation.process
      data:
        text: "{{ trigger.event.data.message }}"
      response_variable: agent_response
    - action: notify.send_message
      target:
        entity_id: notify.my_chat
      data:
        message: "{{ agent_response.response.speech.plain.speech }}"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
