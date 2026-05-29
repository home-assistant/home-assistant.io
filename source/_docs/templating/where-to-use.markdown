---
title: "Where to use templates"
description: "Learn the places in Home Assistant where you can use templates."
related:
  - docs: /template-functions/states/
    title: "`states` function"
  - docs: /template-functions/from_json/
    title: "`from_json` function"
  - docs: /docs/templating/yaml/
    title: Templates in YAML
  - docs: /integrations/template/
    title: Template integration
  - docs: /integrations/mqtt/
    title: MQTT integration
---

Once you know what templates are, the next question is usually "where do I actually put one?". You'll reach for a template when you write a notification with live sensor values, trigger an automation based on the current state of your home, or build a dashboard number from several entities at once. Templates show up in a lot of places in Home Assistant, and this page walks through the most common ones so you can recognize each spot when you meet it.

You don't need to memorize this. Come back when you're building something and need to remember which field accepts a template.

## Automation and script actions

Most actions accept templates for their data values. You can use them to compose messages, pick targets, or tailor behavior based on the current state of your home.

{% example %}
automation: |
  - alias: "Goodnight message"
    triggers:
      - trigger: time
        at: "23:00:00"
    actions:
      - action: notify.send_message
        target:
          entity_id: notify.my_device
        data:
          message: >
            Goodnight.
            {{ states('sensor.front_door') | capitalize }} front door, and
            {{ states.light | selectattr('state', 'eq', 'on') | list | count }}
            lights still on.
output: "Goodnight. Closed front door, and 3 lights still on."
{% endexample %}

## Automation conditions

A [template condition](/docs/automation/condition/#template-condition) lets an automation decide whether to continue based on any test you can write. The template needs to end up either `True` or `False`, and the automation only continues when the answer is `True`.

{% example %}
condition: |
  conditions:
    - condition: template
      value_template: >
        {{ states('sensor.outdoor_temperature') | float(0) < 5 }}
output: "True (when the outdoor temperature is below 5°C)"
{% endexample %}

## Automation triggers

A [template trigger](/docs/automation/trigger/#template-trigger) fires when the template changes from false to true. This lets you react to conditions that no single entity represents.

{% example %}
trigger: |
  triggers:
    - trigger: template
      value_template: >
        {{
          states('sensor.washing_machine_power') | float(0) < 5
          and states('sensor.washing_machine_power') | float(0) > 0
        }}
output: "True (fires when the washing machine power drops between 0 and 5 W)"
{% endexample %}

{% note %}
<a id="limited-templates"></a>
**Limited templates.** Some trigger types, and the `trigger_variables` section of an automation, only support a reduced set of template features. This is called a "limited template". Most of Home Assistant's state-reading functions (like `states()`, `state_attr()`, and the area/device/label helpers) are not available there. If a template works in the editor but fails in a trigger configuration, the limited-template scope is a likely cause. Check the specific trigger's documentation for the details.
{% endnote %}

## Template entities

The [Template integration](/integrations/template/) lets you create {% term entities %} whose value is computed from other entities. Template {% term sensors %}, binary sensors, switches, and more are defined entirely with templates.

{% example %}
automation: |
  template:
    - sensor:
        - name: "Lights on"
          state: >
            {{ states.light | selectattr('state', 'eq', 'on') | list | count }}
output: "5 (the sensor reports the number of lights currently on)"
{% endexample %}

## Notifications

The [notify actions](/integrations/notify/) accept templates for the title, message, and often other fields. This is one of the most popular places to use templates, because it turns fixed notifications into personal, context-aware messages.

{% example %}
action: |
  - action: notify.send_message
    target:
      entity_id: notify.my_device
    data:
      title: "Door alert"
      message: >
        {{ trigger.to_state.name }} was opened at
        {{ now().strftime('%H:%M') }}.
output: "Front door was opened at 14:32."
{% endexample %}

## REST and command-line sensors

The [`rest`](/integrations/rest/) and [`command_line`](/integrations/command_line/) sensors use templates to pull values out of the raw response they receive. This is how you turn a JSON reply or a command's output into a usable {% term sensor %}.

{% example %}
automation: |
  sensor:
    - platform: rest
      resource: https://api.example.com/weather
      name: "Outside humidity"
      value_template: "{{ value_json.current.humidity }}"
      unit_of_measurement: "%"
output: "72 (extracted from the JSON field current.humidity)"
{% endexample %}

## MQTT

The [MQTT integration](/integrations/mqtt/) accepts templates for topics, payloads, and value extraction. Incoming payloads are often JSON, so a template extracts the field you need.

{% example %}
automation: |
  mqtt:
    sensor:
      - name: "Garden moisture"
        state_topic: "garden/sensor/moisture"
        value_template: "{{ value_json.moisture }}"
        unit_of_measurement: "%"
output: "45 (extracted from an MQTT payload like {\"moisture\": 45})"
{% endexample %}

MQTT uses two kinds of templates. A **value template** transforms an incoming payload into an entity state or attribute. A **command template** turns an action into the outgoing payload that the device expects. Both get the usual `value` and `value_json` variables, plus three extras specific to MQTT:

- `entity_id`: the entity ID that the template belongs to.
- `name`: the friendly name of the entity.
- `this`: the entity's own state object (the same one you meet in template entities).

The [MQTT integration documentation](/integrations/mqtt/) has the full list of where each template type applies and which fields on each entity support templating.

## Processing incoming data

The REST, MQTT, and command-line examples above use two special variables that need a word of introduction: `value` and `value_json`. You will run into them anywhere Home Assistant pulls data from an outside source and hands it to a template for shaping.

When raw data comes in, the template that processes it has these extras available:

- **`value`** holds the raw incoming data as text. It is always there.
- **`value_json`** holds the same data parsed as JSON. It is only there when the data actually is valid JSON.

So when an MQTT payload arrives like this:

```json
{ "state": "ON", "temperature": 21.9, "humidity": 54 }
```

You can reach the fields with dot notation:

{% example %}
template: |
  Temperature: {{ value_json.temperature }}
  Humidity: {{ value_json.humidity }}
  State: {{ value_json.state }}
output: |
  Temperature: 21.9
  Humidity: 54
  State: ON
{% endexample %}

### Nested JSON

Real-world payloads often have nested structures. Use square brackets or more dots to reach deeper:

{% example %}
template: |
  {% set value_json = {
    "sensor": {"type": "air", "id": "12345"},
    "values": {"temp": 26.09, "hum": 56.73}
  } %}
  Sensor ID: {{ value_json['sensor']['id'] }}
  Temperature: {{ value_json.values.temp }}
output: |
  Sensor ID: 12345
  Temperature: 26.09
{% endexample %}

Square brackets become necessary when a field name contains characters that dots don't handle, like a dash or a space.

### JSON arrays

If the data is a list, index into it with square brackets (starting at zero):

{% example %}
template: |
  {% set value_json = {"primes": [2, 3, 5, 7, 11, 13]} %}
  First prime: {{ value_json.primes[0] }}
  Third prime: {{ value_json.primes[2] }}
output: |
  First prime: 2
  Third prime: 5
{% endexample %}

### When the data is not JSON

If the incoming data is plain text or a number (say, from a command-line sensor that outputs `42.5`), use `value` directly:

{% example %}
template: |
  {% set value = "42.5" %}
  {{ value | float(0) + 1 }}
output: "43.5"
{% endexample %}

Remember: `value` is always text, so convert with `| float(0)` or `| int(0)` before doing math.

### Testing an incoming-data template

The {% my developer_template title="template editor" %} does not know what `value_json` or `value` would be in a real incoming payload, because there is no live payload at that moment. To test a template that uses these variables, define them yourself at the top with `{% set %}`:

{% example %}
template: |
  {% set value_json = {"name": "Outside",
                       "data": {"temp": "24C", "hum": "35%"}} %}
  Humidity reading: {{ value_json.data.hum[:-1] }}%
output: "Humidity reading: 35%"
{% endexample %}

This lets you work out the right template in the editor, then paste the finished version into your REST sensor, MQTT entity, or command-line sensor without needing the real device to send data.

## Dashboards

Most dashboard cards accept templates for titles, names, and other text fields. Support varies by card, and some cards need [`state_template`](/dashboards/markdown/) or similar fields to make templates work. The [Markdown card](/dashboards/markdown/) is the most flexible, as its entire content is a template.

## Not everywhere

Not every field accepts templates. As a rule:

- Text, numbers, and lists in automation actions, conditions, triggers, and scripts can usually be templated.
- Entity IDs and structural {% term YAML %} keys usually cannot.
- Dashboards support templates in specific fields only. Check the card's documentation.

If a template is not being evaluated, it is most likely in a field that does not support templating. The [Debugging templates](/docs/templating/debugging/) page has more tips.

## Next steps

Now that you know where templates live, learn how to write them:

- Start with [Template syntax](/docs/templating/syntax/) for the building blocks.
- Read [Templates in YAML](/docs/templating/yaml/) for the quoting rules that trip everyone up.
- Browse [Common template patterns](/docs/templating/patterns/) for recipes you can copy.
- When something does not work, head to [Debugging templates](/docs/templating/debugging/).
