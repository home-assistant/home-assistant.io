---
title: Intent Script
description: Instructions on how to setup scripts to run on intents.
ha_category:
  - Intent
ha_release: '0.50'
ha_quality_scale: internal
ha_domain: intent_script
ha_integration_type: integration
---

The `intent_script` integration allows users to configure actions and responses to intents. Intents can be fired by any integration that supports it. Examples are [Alexa](/integrations/alexa/) (Amazon Echo), [Dialogflow](/integrations/dialogflow/) (Google Assistant) and [Snips](/integrations/snips/).

{% raw %}

```yaml
# Example configuration.yaml entry
intent_script:
  GetTemperature:  # Intent type
    speech:
      text: We have {{ states('sensor.temperature') }} degrees
    action:
      service: notify.notify
      data:
        message: Hello from an intent!
```

{% endraw %}

Inside an intent we can define these variables:

{% configuration %}
intent:
  description: Name of the intent. Multiple entries are possible.
  required: true
  type: map
  keys:
    action:
      description: Defines an action to run to intents.
      required: false
      type: action
    async_action:
      description: Set to True to have Home Assistant not wait for the script to finish before returning the intent response.
      required: false
      default: false
      type: boolean
    card:
      description: Card to display.
      required: false
      type: map
      keys:
        type:
          description: Type of card to display.
          required: false
          default: simple
          type: string
        title:
          description: Title of the card to display.
          required: true
          type: template
        content:
          description: Contents of the card to display.
          required: true
          type: template
    speech:
      description: Text or template to return.
      required: false
      type: map
      keys:
        type:
          description: Type of speech.
          required: false
          default: plain
          type: string
        text:
          description: Text to speech.
          required: true
          type: template
{% endconfiguration %}

## Using the action response

When using a `speech` template, data returned from the executed action are
available in the `action_response` variable.

{% raw %}

```yaml
conversation:
    EventCountToday:
      - "How many meetings do I have today?"

intent_script:
  EventCountToday:
    action:
      - service: calendar.list_events
        target:
          entity_id: calendar.my_calendar
        data_template:
          start_date_time: "{{ today_at('00:00') }}"
          duration: { "hours": 24 }
        response_variable: result                     # get service response
      - stop: ""
        response_variable: result                     # and return it
    speech:
      text: "{{ action_response.events | length }}"   # use the action's response
```

{% endraw %}
