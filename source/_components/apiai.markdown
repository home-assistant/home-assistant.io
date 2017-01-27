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
featured: true
ha_release: 0.37
---

This component is designed to be used with the "webhook" integration in api.ai. When a conversation ends with an user, api.ai sends an action and parameters to the webhook.

Api.ai requires a public endpoint (HTTPS recommended), so your Home Assistant should be exposed to Internet. Api.ai will return fall back answers if your server do not answer, or takes too long (more than 5 seconds).

Api.ai could be integrated with many popular messaging, virtual assistant and IoT platforms, eg.: Google Assistant (Google Actions), Skype, Messenger. [See here](https://docs.api.ai/docs/integrations) the complete list.

Using Api.ai will be easy to create conversations like:
 > User: Which is the temperature at home?
 > -
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
- Enable Webhook and set your HA url with the apiai endpoint. Eg.: https://myhome.duckdns.org/api/apiai
- Click "Save"
- Create a new intent
- Below "User says" write one phrase that you, the user, will tell Api.ai. Eg.: Which is the temperature at home?
- In "Action" set some key (this will be the bind with HA config), eg.: GetTemperature
- In "Response" set "Cannot connect to HA or it is taking to long" (fall back response)
- At the end of the page, click on "Fulfillment" and check "Use webhook"
- Click "Save"
- On the top right, where is written "Try it now...", write, or say, the phrase you have previously defined and hit enter
- Api.ai has send a request to your HA server

Take a look to "Integrations", in the left menu, to configure third parties.


### {% linkable_title Configuring Home Assistant %}
Out of the box, the component will do nothing. You have to teach it about all intents you want it to answer to. The way it works is that the answer for each intent is based on [templates] that you define. Each template will have access to the existing states via the `states` variable but will also have access to all variables defined in the intent.

You can use [templates] for setting `speech`.

Actions are using the [Home Assistant Script Syntax] and also have access to the variables from the intent.

[Home Assistant Script Syntax]: /getting-started/scripts/

Example of an Api.ai for the above configuration:

```yaml
{% raw %}# Example configuration.yaml entry
apiai:
  intents:
    GetTemperature:
      speech: We have {{ states.sensor.temperature }} degrees
      async_action: False
      action:
        service: notify.notify
        data_template:
          message: Api.ai has send a request
{% endraw %}
```

Inside an intent we can define this variables:
- **speech** (*Optional*): Text or template to return to Api.ai
- **action** (*Optional*): Script definition
- **async_action** (*Optional*): If HA should execute the action asynchronously (returning response to Api.ai without waiting the action to finish). Should be set to `True` if Api.ai is returning the "Cannot connect to HA or it is taking to long" message, but then you will not be able to use values based on the result of the action. Defaults to `False`.


## {% linkable_title Examples %}

```yaml
{% raw %}# Example configuration.yaml entry
apiai:
  intents:
    WhereAreWeIntent:
      speech: >
        {%- if is_state('device_tracker.paulus', 'home') and
               is_state('device_tracker.anne_therese', 'home') -%}
          You are both home, you silly
        {%- else -%}
          Anne Therese is at {{ states("device_tracker.anne_therese") }}
          and Paulus is at {{ states("device_tracker.paulus") }}
        {% endif %}

    LocateIntent:
      action:
        service: notify.notify
        data_template:
          message: The location of {{ User }} has been queried via Alexa.
      speech: >
        {%- for state in states.device_tracker -%}
          {%- if state.name.lower() == User.lower() -%}
            {{ state.name }} is at {{ state.state }}
          {%- endif -%}
        {%- else -%}
          I am sorry, I do not know where {{ User }} is.
        {%- endfor -%}
{% endraw %}
```

[apiai-web]: https://api.ai/
[templates]: /topics/templating/
