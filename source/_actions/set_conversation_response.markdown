---
title: "Set conversation response"
action: set_conversation_response
domain: built_in
description: "Sets what Assist says or shows when a sentence starts the automation."
---

Use this action to set what Assist says, or shows, when a voice command or sentence starts the automation. Together with a [sentence trigger](/triggers/conversation/), it answers a custom command.

{% include actions/ui_header.md %}

To set the response from an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open the automation that has the sentence trigger.
2. In the **Then do** section, select **Add action**.
3. Search for and select **Set conversation response**.
4. In **Set conversation response**, enter the response. You can use a template, for example, to include the state of an entity.
5. Select **Save**.

### Options in the UI

{% options_ui %}
Set conversation response:
  description: What Assist says or shows. Can be a template.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, use `set_conversation_response` with the response. The response can be a template:

{% example %}
action: |
  - variables:
      my_var: "123"
  - set_conversation_response: "{{ 'Testing ' ~ my_var }}"
{% endexample %}

This example responds with "Testing 123".

To clear a response that an earlier step set, set it to empty:

{% example %}
action: |
  set_conversation_response:
{% endexample %}

### Options in YAML

{% options_yaml %}
set_conversation_response:
  description: What Assist says or shows. Can be a template. To clear a response that an earlier step set, leave it empty.
  required: true
  type: template
{% endoptions_yaml %}

## Good to know

- Assist uses the response when the automation finishes. If the automation sets the response more than once, the last one is used.
- If the automation didn't start from a conversation, for example, from a time trigger, the response isn't used.
- Set the response in the automation itself. If the automation runs a script, a response that the script sets doesn't reach Assist. To use data from a script, let the script [return a response](/building-blocks/stop/#examples) with **Stop**, and use that data in the automation's **Set conversation response**.

{% include actions/more_examples.md %}

### Automation: Answer whether the garage door is open

When you ask Assist "Is the garage door open?", this automation answers with the current state of the garage door, for example, "The garage door is closed."

- **Trigger**: Sentence
  - **Sentence**: `Is the garage door open`
- **Action**: Set conversation response
  - **Set conversation response**: {% raw %}`The garage door is {{ states('cover.garage_door') }}.`{% endraw %}

{% details "YAML example" %}

{% example %}
automation: |
  alias: "Answer whether the garage door is open"
  triggers:
    - trigger: conversation
      command: "Is the garage door open"
  actions:
    - set_conversation_response: >
        The garage door is {{ states('cover.garage_door') }}.
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}
