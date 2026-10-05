---
title: "Fuel became low"
trigger: fumis.fuel_became_low
domain: fumis
description: "Triggers when one or more Fumis pellet stoves report that their fuel is running low."
related_triggers:
  - numeric_state
---

The **Fuel became low** trigger fires when a [Fumis](/integrations/fumis/) pellet stove reports that its fuel is running low. The stove raises its low fuel level alert (A001), and this trigger passes that moment on to your automations.

Use **Fuel became low** to get a notification on your phone, add pellets to your shopping list, or remind everyone at home to refill the hopper before the fire goes out. It works on every stove that raises the low fuel alert, including stoves that don't have a fuel level sensor.

{% include triggers/ui_header.md %}

To use **Fuel became low** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Search for **Fuel became low** and select it.
5. Under **Stoves**, select one or more of your stoves.
6. Select **Save**.

### Options in the UI

{% options_ui %}
Stoves:
  description: The Fumis stoves to watch. The trigger fires for each stove that reports its fuel became low.
  required: true
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `fumis.fuel_became_low`. A basic example looks like this:

{% example %}
trigger: |
  trigger: fumis.fuel_became_low
  options:
    device_id: 0123456789abcdef0123456789abcdef
{% endexample %}

This fires the moment the stove with that device ID reports that its fuel is running low. When you create the automation in the automation editor, it fills in the device ID of your stove for you.

### Options in YAML

The options go under `options`.

{% options_yaml %}
device_id:
  description: One or more device IDs of the Fumis stoves to watch.
  required: true
  type: [string, list]
{% endoptions_yaml %}

## Good to know

- This trigger uses the same low fuel level alert as the **Alert** sensor of your stove, so you don't need a fuel level sensor for it.
- Your stove shows only one alert at a time, so another alert, like the door being open, can hide the low fuel alert. The trigger takes this into account. It fires once when the fuel becomes low, and doesn't fire again when another alert comes and goes while the fuel is still low.
- After the integration reloads, an update fails, or the stove reports an unrecognized alert, the first valid update establishes a new baseline. If that update already reports low fuel, the trigger does not fire.
- Home Assistant checks your stove every 30 seconds, so it can take up to 30 seconds after the stove raises the alert before the trigger fires.
- If you want to pick your own moment and your stove has a fuel level sensor, use a [Numeric state](/triggers/numeric_state/) trigger on the **Fuel level** sensor instead.

### Available trigger data

In addition to the [standard automation trigger data](/docs/automation/templating/#all), this trigger exposes the following template variable:

- `trigger.device_id`: The device ID of the stove that reported its fuel became low.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: get a notification when the pellets run low

Never run out of pellets unexpectedly. This automation sends a notification to your phone when your stove reports that its fuel is running low, so you can refill the hopper before the fire goes out.

- **Trigger**: Fuel became low
  - **Stoves**: Living room stove
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a low fuel notification" %}

{% example %}
automation: |
  alias: "Notify when the pellet stove runs low on fuel"
  triggers:
    - trigger: fumis.fuel_became_low
      options:
        device_id: 0123456789abcdef0123456789abcdef
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Pellet stove"
        message: >
          The stove reports its fuel is running low. Time to refill the
          hopper.
{% endexample %}

{% enddetails %}

### Automation: add pellets to the shopping list

When the stove reports its fuel is running low, it might also be time to buy a new batch of pellets. This automation adds them to your shopping list, so you don't forget next time you're at the store.

- **Trigger**: Fuel became low
  - **Stoves**: Living room stove
- **Action**: Add to-do list item
  - **Target**: Shopping list (`todo.shopping_list`)
  - **Item**: Pellets

{% details "YAML example for adding pellets to the shopping list" %}

{% example %}
automation: |
  alias: "Add pellets to the shopping list when the stove runs low"
  triggers:
    - trigger: fumis.fuel_became_low
      options:
        device_id: 0123456789abcdef0123456789abcdef
  actions:
    - action: todo.add_item
      target:
        entity_id: todo.shopping_list
      data:
        item: "Pellets"
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
