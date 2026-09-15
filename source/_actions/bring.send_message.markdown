---
title: "Send message"
action: bring.send_message
domain: bring
description: "Sends a push notification to members of a shared Bring! list."
related_actions:
  - bring.send_reaction
---

Use this action to send a push notification to the other members of a shared Bring! shopping list. The Bring! mobile app has four predefined notification types, like letting everyone know you are going shopping or that an item is urgently needed.

This is handy in automations, for example to remind the household that the shopping is done when you arrive back home.

{% note %}
To receive these notifications, you need to use a dedicated account, as outlined in the [known limitations](/integrations/bring/#known-limitations).
{% endnote %}

{% include actions/ui_header.md %}

To send a notification from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select a Bring! shopping list.
6. From the actions shown for that target, select **Bring!: Send message**.
7. Select the **Notification type** to send. When you select **Urgent message**, also enter the **Item** to include.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Notification type:
  description: The type of push notification to send to list members. Choose from **I'm going shopping**, **I changed the list**, **The shopping is done**, or **Urgent message**.
  required: true
Item:
  description: The item name to include in an urgent message, for example `Cilantro`. Required when the notification type is **Urgent message"**.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `bring.send_message`. A basic example looks like this:

{% example %}
action: |
  action: bring.send_message
  target:
    entity_id: todo.bring_shopping_list
  data:
    message: going_shopping
{% endexample %}

This sends a `going_shopping` notification to the members of the selected list.

### Options in YAML

{% options_yaml %}
message:
  description: >
    The type of push notification to send to list members. One of
    `going_shopping`, `changed_list`, `shopping_done`, or `urgent_message`.
  required: true
  type: string
item:
  description: >
    The item name to include in an urgent message, for example "Cilantro".
    Required when `message` is `urgent_message`.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="todo" %}

## Good to know

- The `item` field is required when you send an `urgent_message`. For the other notification types, it is ignored.
- The notification that list members receive can differ from the labels shown here. It depends on the recipient's language settings, your profile name, and the Bring! app version.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Send an urgent message

When you need an item urgently, send an urgent message that includes the item name.

{% details "YAML example for sending an urgent message" %}

{% example %}
action: |
  action: bring.send_message
  target:
    entity_id: todo.bring_shopping_list
  data:
    message: urgent_message
    item: Cilantro
{% endexample %}

{% enddetails %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: notify list members when you are heading out to shop

When you leave the home zone, send an urgent message to the shared shopping list so other household members have a last chance to add items before you arrive at the shop.

- **Trigger**: Zone left
  - **Target**: Your name
  - **Zone**: Home
- **Action**: Bring!: Send message
  - **Notification type**: Urgent message

{% details "YAML example for notifying list members when leaving home to shop" %}
 
{% example %}
automation: |
  alias: "Notify list when leaving home to shop"
  triggers:
    - trigger: zone.left
      target:
        entity_id: person.your_name
      options:
        zone: zone.home
  actions:
    - action: bring.send_message
      target:
        entity_id: todo.bring_shoppinglist
      data:
        message: urgent_message
        item: ""
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
