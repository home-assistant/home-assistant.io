---
title: "Speak word"
action: elkm1.speak_word
domain: elkm1
description: "Speaks a predefined word on an Elk-M1 panel."
related_actions:
  - elkm1.speak_phrase
  - elkm1.alarm_display_message
---

The **Speak word** action plays one of the Elk-M1 panel's built-in words through its voice output.

This is useful when you want an automation to say a single word out loud, or to build up a spoken message one word at a time.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. If you have more than one Elk-M1 panel, use the **Prefix** option to choose which panel speaks.

{% include actions/ui_header.md %}

To speak a word from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Elk-M1 Control: Speak word**.
6. Enter the **Word number** to speak. If you have more than one panel, also enter the **Prefix**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Word number:
  description: The number of the word to speak, from 0 to 999.
  required: true
Prefix:
  description: The prefix that identifies which panel speaks when you have more than one Elk-M1 panel configured. Leave it empty if you have a single panel.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `elkm1.speak_word`. A basic example looks like this:

{% example %}
action: |
  action: elkm1.speak_word
  data:
    number: 142
{% endexample %}

This speaks word number `142` on the panel.

### Options in YAML

{% options_yaml %}
number:
  description: >
    The number of the word to speak, from 0 to 999.
  required: true
  type: integer
prefix:
  description: >
    The prefix that identifies which panel speaks when you have more than one
    Elk-M1 panel configured. Leave it empty if you have a single panel.
  required: false
  type: string
  default: ""
{% endoptions_yaml %}

## Good to know

- The list of available words is defined in the ElkM1 ASCII Protocol documentation.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
