---
layout: component
title: "Alexa / Amazon Echo"
description: "Instructions how to connect Alexa/Amazon Echo to Home Assistant."
date: 2015-12-13 13:02
sidebar: true
comments: false
sharing: true
footer: true
logo: amazon-echo.png
ha_category: Voice
featured: false
---

The Alexa component allows you to integrate Home Assistant into Alexa/Amazon Echo. This component will allow you to query information within Home Assistant by using your voice. There are no supported sentences out of the box as of now, you will have to define them all yourself. This component does not yet allow the control of devices connected to Home Assistant.

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube.com/embed/1Ke3mtWd_cQ" frameborder="0" allowfullscreen></iframe>
</div>

### {% linkable_title Requirements before using %}
Amazon requires the endpoint of a skill to be hosted via SSL. Self-signed certificates are ok because our skills will only run in development mode. Read more on [our blog][blog-lets-encrypt] about how to set up encryption for Home Assistant. If you are unable to get https up and running, consider using [this AWS Lambda proxy for Alexa skills](https://forums.developer.amazon.com/forums/thread.jspa?messageID=18604).

[blog-lets-encrypt]: https://home-assistant.io/blog/2015/12/13/setup-encryption-using-lets-encrypt/

To get started with Alexa skills:

 - Log in to [Amazon developer console](https://developer.amazon.com)
 - Go to Apps & Services => Alexa => Alexa Skill Kit - Get Started
 - Add a new skill
   - Name: Home Assistant
   - Invocation name: home assistant (or be creative, up to you)
   - Version: 1.0
   - Endpoint:
     - https
     - https://YOUR_HOST/api/alexa?api_password=YOUR_API_PASSWORD

### {% linkable_title Configuring your Amazon Alexa skill %}

Alexa works based on intents. Each intent has a name and variable slots. For example, a `LocateIntent` with a slot that contains a `User`. Example intent schema:

```json
{
  "intents": [
    {
      "intent": "LocateIntent",
      "slots": [
      {
          "name": "User",
          "type": "AMAZON.US_FIRST_NAME"
        }]
    },
    {
      "intent": "WhereAreWeIntent",
      "slots": []
    }
  ]
}
```

To bind these intents to sentences said by users you define utterances. Example utterances can look like this:

```text
LocateIntent Where is {User}
LocateIntent Where's {User}
LocateIntent Where {User} is
LocateIntent Where did {User} go

WhereAreWeIntent where we are
```

This means that we can now ask Alexa things like:

 - Alexa, ask Home Assistant where Paul is
 - Alexa, ask Home Assistant where we are

### {% linkable_title Configuring Home Assistant %}

Out of the box, the component will do nothing. You have to teach it about all intents you want it to answer to. The way it works is that the answer for each intent is based on [templates] that you define. Each template will have access to the existing states via the `states` variable but will also have access to all variables defined in the intent.

You can use [templates] for the values of `speech/text`, `card/title` and `card/content`.

[templates]: /getting-started/templating/

Configuring the Alexa component for the above intents would look like this:

```yaml
{% raw %}
# Example configuration.yaml entry
alexa:
  intents:
    WhereAreWeIntent:
      speech:
        type: plaintext
        text: >
          {%- if is_state('device_tracker.paulus', 'home') and
                 is_state('device_tracker.anne_therese', 'home') -%}
            You are both home, you silly
          {%- else -%}
            Anne Therese is at {{ states("device_tracker.anne_therese") }} and
            Paulus is at {{ states("device_tracker.paulus") }}
          {% endif %}

    LocateIntent:
      speech:
        type: plaintext
        text: >
          {%- for state in states.device_tracker -%}
            {%- if state.name.lower() == User.lower() -%}
              {{ state.name }} is at {{ state.state }}
            {%- endif -%}
          {%- else -%}
            I am sorry, I do not know where {{ User }} is.
          {%- endfor -%}
      card:
        type: simple
        title: Sample title
        content: Some more content{% endraw %}
```
