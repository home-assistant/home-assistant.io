---
layout: page
title: "Google Hangouts"
description: "Instructions on how to add Google Hangouts notifications to Home Assistant."
date: 2018-08-18 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: hangouts.png
ha_category: Notifications
ha_release: 0.77
---


The `hangouts` platform allows you to deliver notifications from Home Assistant to [Google Hangouts](http://hangouts.google.com) conversations. Conversations can be both direct as well as group chats.

## {% linkable_title Configuration %}

To enable Hangouts notifications in your installation, you first need to configure
the [Hangouts component](/components/hangouts/). Then, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry  
notify:
  - name: NOTIFIER_NAME
    platform: hangouts
    default_conversations:
      - id: CONVERSATION_ID1
      - id: CONVERSATION_ID2
```

{% configuration %}
name: 
  description: "Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`."
  required: false
  type: string
default_conversations:
  description: "The conversations all messages will be sent to, when no other target is given."
  required: true
  type: [map]
  keys:
    id:
      description: "Specifies the id of the conversation. *The conversation id can be obtained from the `hangouts.conversations` entity.*"
      required: true
      type: string
{% endconfiguration %}

The conversations has to be precreated, the conversation id can be obtained from the `hangouts.conversations` entity. Make sure to use quotes around the conversation id or alias to escape special characters (`!`, and `#`) in YAML.

To use notifications, please see the [getting started with automation page](/getting-started/automation/).

