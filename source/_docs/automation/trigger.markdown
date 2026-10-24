---
title: "Automation triggers"
description: "Triggers start an automation when something specific happens, such as a door opening, a time of day, the sun setting, or a person arriving home."
related:
  - docs: /voice_control/custom_sentences/#to-add-a-custom-sentence-to-trigger-an-automation
    title: Adding a custom sentence to trigger an automation
  - docs: /docs/automation/targets/
    title: Automation targets
  - docs: /docs/automation/durations/
    title: Durations in automations and scripts
---

A trigger is the part of an automation that makes the automation start when something specific happens, for example, when the sun sets, a door opens, or a button is pressed. You add triggers in the **When** section of the automation editor.

When a trigger reacts, the automation starts: Home Assistant checks the [conditions](/docs/automation/condition/), and if they are met, performs the [actions](/docs/automation/action/). Each run is recorded in a [trace](/docs/automation/testing/#traces), which shows which trigger started it.

## Triggers react at a specific moment

A trigger reacts at a specific moment, not while something is true. For example, a trigger for a door that opens reacts when the door goes from closed to open. It doesn't react again while the door stays open. If the door is already open when you save the automation, the trigger doesn't react until the door closes and opens again.

If an automation should only do something while something is true, combine a trigger for the change with a condition for the situation. For examples, refer to [Triggers react to changes](/docs/automation/how-automations-react-to-changes/#triggers-react-to-changes). For which changes count, refer to [What counts as a change](/docs/automation/how-automations-react-to-changes/#what-counts-as-a-change).

## What can trigger an automation

Almost anything that happens in your home or in Home Assistant can be a trigger, for example:

- A device or entity changes: a door opens, motion is detected, a temperature rises above a value.
- Time passes: a specific time of day, a repeating interval, sunrise, or sunset.
- Something happens: a button is pressed, a tag is scanned, Home Assistant starts, or a webhook is called.
- You say something to Assist: a sentence that you define.

For a list of all triggers, refer to [All triggers](/triggers/). The general triggers, which work with any entity or event, are described in [Types of triggers](#types-of-triggers).

## Choosing a trigger

After you select **Add trigger** in the automation editor, Home Assistant shows triggers that match the target or type that you selected. For many devices and measurements, the best choice is the trigger named after the thing you want to happen. For example, select **Door opened** for a door sensor, **Temperature crossed threshold** for a temperature reading, or **Power crossed threshold** for a power reading.

These specific triggers handle Home Assistant details for you. Measurement triggers, such as temperature and power triggers, compare compatible units automatically. For example, a temperature sensor can report in Fahrenheit while the trigger threshold is set in Celsius.

General triggers, such as **State changed** and **Numeric state crossed threshold**, are still available. Use them when you need to watch an exact state, use an attribute, work with a trigger that does not have a more specific option, or edit existing YAML.

## Using several triggers

An automation can have more than one trigger. Any of them can start the automation. If the automation is still running when a trigger reacts, its [mode](/docs/automation/modes/) decides what happens. To do different things depending on which trigger reacted, add a **Triggered by** condition and select the trigger. For the steps, refer to [Creating an automation with actions that depend on different triggers](#creating-an-automation-with-actions-that-depend-on-different-triggers).

One trigger can also watch several targets, for example, all lights in a room. Its **Trigger when** option decides whether it reacts each time one of the targets changes, only for the first one, or once all targets have made the change. For details, refer to [Automation targets](/docs/automation/targets/#triggers-each-first-and-all). To leave out some of the targets, for example, one motion sensor in a room, refer to [Excluding targets](/docs/automation/targets/#excluding-targets).

To start an automation only when two things are both true, add a trigger for each change, and a condition for each of the two things. For an example, refer to [when two things must both be true](/docs/automation/how-automations-react-to-changes/#when-two-things-must-both-be-true).

<a id="multiple-triggers"></a>
<a id="multiple-entity-ids-for-the-same-trigger"></a>

In YAML, list each trigger under `triggers`. Any of them can start the automation:

```yaml
automation:
  triggers:
    - trigger: time_pattern
      minutes: 5
    - trigger: sun
      event: sunset
```

To watch several entities with one trigger, list them under `entity_id`. The trigger reacts when any of the entities changes:

```yaml
automation:
  triggers:
    - trigger: state
      entity_id:
        - sensor.one
        - sensor.two
        - sensor.three
```

## Elements of a trigger in YAML

In YAML, a trigger can also have the following elements:

- Trigger ID
- Trigger variables

### Trigger ID

In the visual automation editor, select triggers directly when you add a **Triggered by** condition.
Home Assistant creates and manages the trigger IDs needed for those selections.

To set a specific trigger ID yourself, edit the automation in YAML.
All triggers can be assigned an optional `id`.
If the ID is omitted, Home Assistant uses the trigger's position in the trigger list.
You can reference the `id` in [Triggered by](/conditions/trigger/) conditions and in actions.
IDs do not have to be unique.
To check for several triggers in one condition, select all of them in the **Triggered by** condition instead of giving them the same ID.
If triggers share an ID, the editor shows a warning and offers to fix it.
For details, refer to [Triggered by](/conditions/trigger/#good-to-know).

Trigger IDs allow you to set up an automation with many actions, each action depending on a different trigger.
An action is connected to a trigger through the trigger ID and runs only if that trigger reacted.
To learn how to create an automation using trigger IDs, see [Creating an automation with actions that depend on different triggers](#creating-an-automation-with-actions-that-depend-on-different-triggers).

#### YAML example

```yaml
automation:
  triggers:
    - trigger: event
      event_type: "MY_CUSTOM_EVENT"
      id: "custom_event"
    - trigger: mqtt
      topic: "living_room/switch/ac"
      id: "ac_on"
    - trigger: state  # This trigger will be assigned id="2"
      entity_id:
        - device_tracker.paulus
        - device_tracker.anne_therese
      to: "home"
```

### Trigger variables

There are two different types of variables available for triggers. Both work like [variables in scripts](/building-blocks/variables/).

The first variant allows you to define variables that are set when the trigger reacts. The variables will be able to use templates and have access to [the `trigger` variable](/docs/automation/trigger-data/#trigger-properties).

The second variant is setting variables that are available when attaching a trigger when the trigger can contain templated values. These are defined using the `trigger_variables` key at an automation level. These variables can only contain [limited templates](/docs/templating/limited-templates/). The triggers will not re-apply if the value of the template changes. Trigger variables are a feature meant to support using blueprint inputs in triggers.

```yaml
automation:
  trigger_variables:
    my_event: example_event
  triggers:
    - trigger: event
      # Able to use `trigger_variables`
      event_type: "{{ my_event }}"
      # These variables are evaluated and set when this trigger reacts
      variables:
        name: "{{ trigger.event.data.name }}"
```

## Types of triggers

Each trigger has a type that depends on the target of the trigger, usually corresponding to the {% term domain %} of the target.

For an overview of every trigger across all integrations, see the [triggers reference](/triggers/).

<a id="event-trigger"></a>

### Manual event received trigger

For setup steps, YAML options, and examples for the **Manual event received** trigger, see [Manual event received trigger](/triggers/event/).

### Geolocation trigger

For setup steps, YAML options, and examples for the geolocation trigger, see [Geolocation trigger](/triggers/geo_location/).

### Home Assistant trigger

For setup steps, YAML options, and examples for the Home Assistant trigger, see [Home Assistant trigger](/triggers/homeassistant/).

### MQTT trigger

For setup steps, YAML options, and examples for the MQTT trigger, see [MQTT trigger](/triggers/mqtt/).

<a id="numeric-state-trigger"></a>

### Numeric state crossed threshold trigger

For setup steps, YAML options, and examples for the **Numeric state crossed threshold** trigger, see [Numeric state crossed threshold trigger](/triggers/numeric_state/).

### Sentence trigger

For setup steps, YAML options, and examples for the **Sentence** trigger, see [Sentence trigger](/triggers/conversation/).

#### Sentence wildcards

For wildcard syntax and examples, see [Sentence wildcards](/triggers/conversation/#sentence-wildcards).

<a id="state-trigger"></a>

### State changed trigger

For setup steps, YAML options, and examples for the **State changed** trigger, see [State changed trigger](/triggers/state/).

### Sun trigger

#### Sunset and Sunrise trigger

Reacts when the sun is setting or rising—that is, when the sun elevation reaches 0°.

In the automation editor, use the **Sunset** or **Sunrise** trigger. For setup steps and options, refer to [Sunset](/triggers/sun.sunset/) and [Sunrise](/triggers/sun.sunrise/). The following YAML uses the older `sun` trigger, which still works.

An optional time offset can be given to have it react a set time before or after the sun event (for example, 45 minutes before sunset). A negative value makes it react before sunrise or sunset, a positive value afterwards. The offset needs to be specified in number of seconds, or in a hh:mm:ss format.

{% tip %}
Since the duration of twilight is different throughout the year, use the [Dusk](/triggers/sun.dusk/), [Dawn](/triggers/sun.dawn/), or [Sun elevation crossed threshold](/triggers/sun.elevation_crossed_threshold/) trigger instead of sunset or sunrise with a time offset to start automations during dusk or dawn.
{% endtip %}

```yaml
automation:
  triggers:
    - trigger: sun
      # Possible values: sunset, sunrise
      event: sunset
      # Optional time offset. This example will trigger 45 minutes before sunset.
      offset: "-00:45:00"
```

#### Sun elevation trigger

Sometimes you may want more granular control over an automation than simply sunset or sunrise and specify an exact elevation of the sun. This can be used to layer automations to occur as the sun lowers on the horizon or even after it is below the horizon. This is also useful when the "sunset" event is not dark enough outside and you would like the automation to run later at a precise solar angle instead of the time offset such as turning on exterior lighting. For most automations intended to run during dusk or dawn, a number between 0° and -6° is suitable.

In the automation editor, use the [Sun elevation crossed threshold](/triggers/sun.elevation_crossed_threshold/) trigger. In YAML, you can also use a **Numeric state crossed threshold** trigger on the elevation of `sun.sun`, as in this example, which uses -4°:

```yaml
automation:
  - alias: "Exterior lighting on when dark outside"
    triggers:
      - trigger: numeric_state
        entity_id: sun.sun
        attribute: elevation
        # Can be a positive or negative number
        below: -4.0
    actions:
      - action: switch.turn_on
        target:
          entity_id: switch.exterior_lighting
```

If you want to get more precise, you can use this [solar calculator](https://gml.noaa.gov/grad/solcalc/), which will help you estimate what the solar elevation will be at any specific time. Then from this, you can select from the defined twilight numbers.

Although the actual amount of light depends on weather, topography and land cover, they are defined as:

- Civil twilight: 0° > Solar angle > -6°

  This is what is meant by twilight for the average person: Under clear weather conditions, civil twilight approximates the limit at which solar illumination suffices for the human eye to clearly distinguish terrestrial objects. Enough illumination renders artificial sources unnecessary for most outdoor activities.

- Nautical twilight: -6° > Solar angle > -12°
- Astronomical twilight: -12° > Solar angle > -18°

A very thorough explanation of this is available in the Wikipedia article about the [Twilight](https://en.wikipedia.org/wiki/Twilight).

### Tag trigger

For setup steps, YAML options, and examples for the **Tag** trigger, see [Tag trigger](/triggers/tag/).

### Template trigger

For setup steps, YAML options, and examples for the **Template** trigger, see [Template trigger](/triggers/template/).

### Time pattern trigger

For setup steps, YAML options, and examples for the **Time pattern** trigger, see [Time pattern trigger](/triggers/time_pattern/).

### Time trigger

For setup steps, YAML options, and examples for the time trigger, see [Time trigger](/triggers/time/).

### Webhook trigger

For setup steps, YAML options, and examples for the **Webhook** trigger, see [Webhook trigger](/triggers/webhook/).

### Zone trigger

Zone trigger reacts when an entity is entering or leaving the zone. The entity can be either a [person](/integrations/person/) or a [device tracker](/integrations/device_tracker/).

In the automation editor, use the **Zone entered** or **Zone left** trigger. For setup steps and options, refer to [Zone entered](/triggers/zone.entered/) and [Zone left](/triggers/zone.left/). The following YAML uses the older `zone` trigger, which still works.

```yaml
automation:
  triggers:
    - trigger: zone
      entity_id: person.paulus
      zone: zone.home
      # Event is either enter or leave
      event: enter # or "leave"
```

## Unavailable and unknown state behavior in triggers

Most triggers that have an entity as the target do not react when an entity transitions _from_ an `unavailable` or `unknown` state. For example, if a light goes offline and comes back on, the `light.turned_on` trigger does not react to that recovery. The **State changed** trigger does react to that change, for example, from `unavailable` to `on`.

## Disabling a trigger

You can disable a trigger without removing it. In the automation editor, on the trigger, select **Menu** {% icon "mdi:dots-vertical" %} > **Disable**. In YAML, add `enabled: false` to the trigger. For example:

```yaml
# Example automation with a disabled trigger
automation:
  triggers:
    # This trigger is disabled, so the automation
    # does not start at sunset.
    - enabled: false
      trigger: sun.sunset

    # This trigger reacts, as it is not disabled.
    - trigger: time
      at: "15:32:00"
```

Triggers can also be disabled based on [limited templates](/docs/templating/limited-templates/) or blueprint inputs. Home Assistant evaluates these when it sets up the triggers: when it loads the automation, when you reload automations, and when you turn the automation on. They don't update in between.

```yaml
blueprint:
  name: "Sunrise and sunset"
  domain: automation
  input:
    enable_sunrise:
      name: "React to sunrise"
      selector:
        boolean:
    sunset_threshold:
      name: "Sunset threshold"
      selector:
        number:
          min: 0
          max: 100

trigger_variables:
  _sunset_threshold: !input sunset_threshold

triggers:
  - trigger: sun.sunrise
    enabled: !input enable_sunrise
  - trigger: sun.sunset
    enabled: "{{ _sunset_threshold < 50 }}"
```

## Merging lists of triggers

{% note %}
This feature requires Home Assistant version 2024.10 or later. If using this in a blueprint, set the `min_version` for the blueprint to at least this version. See the [blueprint schema documentation](/docs/blueprint/schema/#min_version) for more details.
{% endnote %}

In some cases, like when using blueprints with trigger selectors, you may need to insert a second list of triggers into the main trigger list. You can do this by adding a dictionary in the main trigger list with only the `triggers` key, and the value for that key contains a second list of triggers. These will then be flattened into a single list of triggers. For example:

```yaml
blueprint:
  name: Nested Trigger Blueprint
  domain: automation
  input:
    usertrigger:
      selector:
        trigger:

triggers:
  - trigger: event
    event_type: manual_event
  - triggers: !input usertrigger
```

This blueprint automation can then be triggered either by the fixed manual_event trigger, or additionally by any triggers selected in the trigger selector. This is also applicable for `wait_for_trigger` action.

## Creating an automation with actions that depend on different triggers

Instead of creating many automations for different groups of related triggers and actions, you can build a single one in the visual editor of the UI by following the steps below.

1. Go to **Settings** > **Automations & scenes**.
2. In the lower right corner, select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Search for the trigger using the search box, for example, and then select it.
5. In the **Then do** section, select **Add action**, and then select **Blocks** > **Choose**.
6. Expand the option section, select **Add condition** and, from the **By type** list, select **Triggered by**.
7. In the condition window on the right, select the trigger that you added in step 4. Home Assistant creates an ID for the trigger if needed.
8. In the same option, select **Add action**, and choose the action that runs when the related trigger starts the automation.
9. In the action window on the right, select the target or group of targets, and enter any other requested data.
10. To add another trigger and related option, repeat steps 3 to 9.
11. Select **Save**.
