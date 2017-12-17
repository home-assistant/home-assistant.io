---
layout: page
title: "Conversation"
description: "Instructions how to have conversations with your Home Assistant."
date: 2015-03-15 00:39
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: "Voice"
---


The `conversation` component can process sentences into commands for Home Assistant. It currently has built in functionality to recognize `turn <Friendly Name> <on/off>`, but custom phrases can be added through configuration.


To enable the conversation option in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example base configuration.yaml entry
conversation:
```

To add custom phrases to be recognized:

```yaml
# Example configuration.yaml entry with custom phrasesconversation
conversation:
    boolean_test:
        sentence: switch boolean # The phrase it will recognize
        action:
            service: input_boolean.toggle
```

The action keyword uses [script syntax](https://home-assistant.io/docs/scripts/).

To use the `conversation` component with the [`shopping list` component](/components/shopping_list/) add an intent.

```yaml
# Example configuration.yaml entry
conversation:
  intents:
    ShoppingListAddItem:
      - Add {item} to my shopping list
```

When this component is active and you are using a supported browser voice commands will be activated in the frontend. Browse to [the demo](/demo/) using Chrome or Chromium to see it in action.

<p class='img'>
  <img src="/images/screenshots/voice-commands.png" />
</p>

<p class='note'>
  Apple iPhones do not support this feature in any browser. 
</p>
