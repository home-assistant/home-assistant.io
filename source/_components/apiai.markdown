---
layout: page
title: "Api.AI"
description: "Instructions how integrate api.ai with Home Assistant."
date: 2017-01-27 11:28
sidebar: true
comments: false
sharing: true
footer: true
logo: apiai.png
ha_category: Voice
featured: false
ha_release: 0.38
---

This component is designed to be used with the "webhook" integration in [api.ai][apiai-web]. When a conversation ends with an user, api.ai sends an action and parameters to the webhook.

api.ai requires a public endpoint (HTTPS recommended), so your Home Assistant should be exposed to Internet. api.ai will return fallback answers if your server do not answer, or takes too long (more than 5 seconds).

api.ai could be integrated with many popular messaging, virtual assistant and IoT platforms, eg.: Google Assistant (Google Actions), Skype, Messenger. [See here](https://docs.api.ai/docs/integrations) the complete list.

Using Api.ai will be easy to create conversations like:

 > User: Which is the temperature at home?
 >
 > Bot: The temperature is 34 degrees

 > User: Turn on the light
 >
 > Bot: In which room?
 >
 > User: In the kitchen
 >
 > Bot: Turning on kitchen light

To use this integration you should define a conversation (intent) in Api.ai, configure Home Assistant with the speech to return and, optionally, the action to execute.

### {% linkable_title Configuring your api.ai account %}

- [Login][apiai-web] with your Google account.
- Click on "Create Agent"
- Select name, language (if you are planning to use it with Google Actions check [here](https://support.google.com/assistant/answer/7108196?hl=en) supported languages) and time zone
- Click "Save"
- Go to "Fullfiment" (in the left menu)
- Enable Webhook and set your Home Assistant URL with the Api.ai endpoint. Eg.: ``https://myhome.duckdns.org/api/apiai?api_password=HA_PASSWORD``
- Click "Save"
- Create a new intent
- Below "User says" write one phrase that you, the user, will tell Api.ai. Eg.: Which is the temperature at home?
- In "Action" set some key (this will be the bind with Home Assistant configuration), eg.: GetTemperature
- In "Response" set "Cannot connect to Home Assistant or it is taking to long" (fall back response)
- At the end of the page, click on "Fulfillment" and check "Use webhook"
- Click "Save"
- On the top right, where is written "Try it now...", write, or say, the phrase you have previously defined and hit enter
- Api.ai has send a request to your Home Assistant server

Take a look to "Integrations", in the left menu, to configure third parties.


### {% linkable_title Configuring Home Assistant %}

When activated, the Alexa component will have Home Assistant's native intent support handle the incoming intents. If you want to run actions based on intents, use the [`intent_script`](/components/intent_script) component.

## {% linkable_title Examples %}

Download [this zip](https://github.com/home-assistant/home-assistant.github.io/blob/next/source/assets/HomeAssistant_APIAI.zip) and load it in your Api.ai agent (Settings -> Export and Import) for examples intents to use with this configuration:

```yaml
{% raw %}# Example configuration.yaml entry
apiai:

intent_script:
  Temperature:
    speech: The temperature at home is {{ states('sensor.home_temp') }} degrees
  LocateIntent:
    speech: >
      {%- for state in states.device_tracker -%}
        {%- if state.name.lower() == User.lower() -%}
          {{ state.name }} is at {{ state.state }}
        {%- elif loop.last -%}
          I am sorry, I do not know where {{ User }} is.
        {%- endif -%}
      {%- else -%}
        Sorry, I don't have any trackers registered.
      {%- endfor -%}
  WhereAreWeIntent:
    speech: >
      {%- if is_state('device_tracker.adri', 'home') and
             is_state('device_tracker.bea', 'home') -%}
        You are both home, you silly
      {%- else -%}
        Bea is at {{ states("device_tracker.bea") }}
        and Adri is at {{ states("device_tracker.adri") }}
      {% endif %}
  TurnLights:
    speech: Turning {{ Room }} lights {{ OnOff }}
    action:
      - service: notify.pushbullet
        data_template:
          message: Someone asked via apiai to turn {{ Room }} lights {{ OnOff }}
      - service_template: >
          {%- if OnOff == "on" -%}
            switch.turn_on
          {%- else -%}
            switch.turn_off
          {%- endif -%}
        data_template:
          entity_id: "switch.light_{{ Room | replace(' ', '_') }}"
{% endraw %}
```

[apiai-web]: https://api.ai/
[templates]: /topics/templating/
