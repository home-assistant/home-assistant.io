---
title: "If-then"
building_block: if
category: decisions
description: "Run actions only if conditions are met, and other actions if they are not."
related_building_blocks:
  - choose
  - condition
---

The **If-then** building block runs actions only if its conditions are met. Optionally, it runs other actions if they are not met. Use it when the automation or script should do something different depending on the situation, for example, start the vacuum only when no one is home.

## Using this building block from the user interface

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and select an automation. To edit a script, go to the **Scripts** tab and select the script.
2. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
3. Select **Blocks**, then select **If-then**.
4. Under **If**, select **Add condition**, and add the conditions to check.
5. Under **Then**, select **Add action**, and add the actions to run if all conditions are met.
6. Optional: Under **Else**, select **Add action**, and add the actions to run if the conditions are not met.
7. Select **Save**.

### Options in the UI

{% options_ui %}
If:
  description: The [conditions](/conditions/) to check. All conditions must be met.
  required: true
Then:
  description: The actions to run if all conditions are met.
  required: true
Else:
  description: The actions to run if the conditions are not met.
  required: false
{% endoptions_ui %}

## Using this building block in YAML

In YAML, use `if`, `then`, and optionally `else`:

{% example %}
action: |
  if:
    - alias: "If no one is home"
      condition: state
      entity_id: zone.home
      state: "0"
  then:
    - alias: "Then start cleaning already!"
      action: vacuum.start
      target:
        area_id: living_room
  else:
    - action: notify.notify
      data:
        message: "Skipped cleaning, someone is home!"
{% endexample %}

### Options in YAML

{% options_yaml %}
if:
  description: The conditions to check. All conditions must be met. You can also use a template.
  required: true
  type: [list, template]
then:
  description: The actions to run if all conditions are met.
  required: true
  type: list
else:
  description: The actions to run if the conditions are not met.
  required: false
  type: list
{% endoptions_yaml %}

## Good to know

- All conditions under **If** must be met. To run the actions if any of them is met, put them in an **Or** condition.
- You can put an **If-then** inside another **If-then**. If you find yourself adding more **If-then** building blocks under **Else**, use [**Choose**](/building-blocks/choose/) instead.
