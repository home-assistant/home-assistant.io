---
layout: page
title: "Alexa / Amazon Echo"
description: "Instructions how to connect Alexa/Amazon Echo to Home Assistant."
date: 2015-12-13 13:02
sidebar: true
comments: false
sharing: true
footer: true
logo: amazon-echo.png
ha_category: Voice
featured: true
ha_release: 0.10
---

There are a few ways that you can use Amazon Echo and Home Assistant together.

- [Turning devices on and off](#i-just-want-to-turn-devices-on-and-off-using-echo)
- [Build custom commands to use](#i-want-to-build-custom-commands-to-use-with-echo)
- [Create a new Flash Briefing source](#flash-briefing-skills)

No matter which method(s) you decide to use, please remember that Amazon Echo requires an active Internet connection to function. If your Internet is down or experiencing issues (or Amazon's infrastructure is having issues), none of these methods will work.

Amazon has released [Echosim], a website that simulates the Alexa service in your browser. That way it is easy to test your skills without having access to a physical Amazon Echo.

[Echosim]: https://echosim.io/

## {% linkable_title I just want to turn devices on and off using Echo %}

If you just want to be able to turn anything with a switch (like lights, switches, media players, etc) on and off, you should enable the [Emulated Hue][emulated-hue-component] component. It makes your Home Assistant appear as if it were a Phillips Hue bridge, which Echo works with natively.

[emulated-hue-component]: https://home-assistant.io/components/emulated_hue/

Enabling the Emulated Hue component means you can turn things on and off by simply saying

> Alexa, turn the living room lights on.

or

> Alexa, set the living room lights to twenty percent.

instead of

> Alexa, tell Home Assistant to turn the living room lights on.

or

> Alexa, tell Home Assistant to set the living room lights to twenty percent.

In addition, you would need to build custom intents for each device and on/off combination using the below method, whereas everything just works without any extra work by using Emulated Hue.

Please note that you can use Emulated Hue and the built-in Alexa component side-by-side without issue if you wish.

## {% linkable_title I want to build custom commands to use with Echo %}

The built-in Alexa component allows you to integrate Home Assistant into Alexa/Amazon Echo. This component will allow you to query information and call services within Home Assistant by using your voice. Home Assistant offers no built-in sentences but offers a framework for you to define your own.

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube.com/embed/1Ke3mtWd_cQ" frameborder="0" allowfullscreen></iframe>
</div>

### {% linkable_title Requirements %}

Amazon requires the endpoint of a skill to be hosted via SSL. Self-signed certificates are ok because our skills will only run in development mode. Read more on [our blog][blog-lets-encrypt] about how to set up encryption for Home Assistant. If you are unable to get HTTPS up and running, consider using [this AWS Lambda proxy for Alexa skills](https://community.home-assistant.io/t/aws-lambda-proxy-custom-alexa-skill-when-you-dont-have-https/5230).

[blog-lets-encrypt]: https://home-assistant.io/blog/2015/12/13/setup-encryption-using-lets-encrypt/

To get started with Alexa skills:

 - Log in to [Amazon developer console][amazon-dev-console]
 - Click the Alexa button at the top of the console
 - Click the yellow "Add a new skill" button in the top right
   - Skill Type: Custom Interaction Model (default)
   - Name: Home Assistant
   - Invocation name: home assistant (or be creative, up to you)
   - Version: 1.0
   - Endpoint:
     - https
     - https://YOUR_HOST/api/alexa?api_password=YOUR_API_PASSWORD

You can use this [specially sized Home Assistant logo][large-icon] as the large icon and [this one][small-icon] as the small one.

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

## {% linkable_title Configuring Home Assistant %}

Out of the box, the component will do nothing. You have to teach it about all intents you want it to answer to. The way it works is that the answer for each intent is based on [templates] that you define. Each template will have access to the existing states via the `states` variable but will also have access to all variables defined in the intent.

You can use [templates] for the values of `speech/text`, `card/title` and `card/content`.

Actions are using the [Home Assistant Script Syntax] and also have access to the variables from the intent.

[Home Assistant Script Syntax]: /getting-started/scripts/

Configuring the Alexa component for the above intents would look like this:

```yaml
{% raw %}# Example configuration.yaml entry
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
            Anne Therese is at {{ states("device_tracker.anne_therese") }}
            and Paulus is at {{ states("device_tracker.paulus") }}
          {% endif %}

    LocateIntent:
      action:
        service: notify.notify
        data_template:
          message: The location of {{ User }} has been queried via Alexa.
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

### {% linkable_title Working With Scenes %}

One of the most useful applications of Alexa integrations is to call scenes directly. This is easily achieved with some simple setup on the Home Assistant side and by letting Alexa know which scenes you want to run.

First we will configure Alexa. In the Amazon Interaction module add this to the intent schema:

```json
{
  "intent": "ActivateSceneIntent",
  "slots":
  [
    {
      "name" : "Scene",
      "type" : "Scenes"
    }
  ]
}
```

Then create a custom slot type called `Scenes` listing every scene you want to control:

<p class='img'>
<img src='/images/components/alexa/scene_slot.png' />
Custom slot type for scene support.
</p>
The names must exactly match the scene names (minus underscores - amazon discards them anyway and we later map them back in with the template).

Add a sample utterance:

```text
ActivateSceneIntent activate {Scene}
```

Then add the intent to your Alexa Section in your HA config file:

```yaml
    ActivateSceneIntent:
      action:
        service: scene.turn_on
        data_template:
          entity_id: scene.{% raw %}{{ Scene | replace(" ", "_") }}{% endraw %}
      speech:
        type: plaintext
        text: OK
```

Here we are using [templates] to take the name we gave to Alexa e.g. `downstairs on` and replace the space with an underscore so it becomes `downstairs_on` as Home Assistant expects.

Now say `Alexa ask homeassistant to activate <some scene>` and Alexa will activate that scene for you.

### {% linkable_title Adding Scripts %}

We can easily extend the above idea to work with scripts as well. As before, add an intent for scripts:

```json
{
  "intent": "RunScriptIntent",
  "slots":
  [
    {
      "name" : "Script",
      "type" : "Scripts"
    }
  ]
}
```

Create a custom slot type called `Scripts` listing every script you want to run:

<p class='img'>
<img src='/images/components/alexa/script_slot.png' />
Custom slot type for script support.
</p>

Add a sample utterance:

```text
RunScriptIntent run {Script}
```

Then add the intent to your Alexa Section in your HA config file:

```yaml
    RunScriptIntent:
      action:
        service: script.turn_on
        data_template:
          entity_id: script.{% raw %}{{ Script | replace(" ", "_") }}{% endraw %}
      speech:
        type: plaintext
        text: OK
```

Now say `Alexa ask homeassistant to run <some script>` and Alexa will run that script for you.

## {% linkable_title Giving Alexa Some Personality %}

In the examples above, we told Alexa to say `OK` when she successfully completed the task. This is effective but a little dull! We can again use [templates] to spice things up a little.

First create a file called `alexa_confirm.yaml` with something like the following in it (go on, be creative!):

```text
{% raw %}          >
          {{ [
          "OK",
          "Sure",
          "If you insist",
          "Done",
          "No worries",
          "I can do that",
          "Leave it to me",
          "Consider it done",
          "As you wish",
          "By your command",
          "Affirmative",
          "Yes oh revered one",
          "I will",
          "As you decree, so shall it be",
          "No Problem"
          ] | random }} {% endraw %}
```

Then, wherever you would put some simple text for a response like `OK`, replace it with a reference to the file so that:

```
text: OK
```

becomes:

```
text: !include alexa_confirm.yaml
```

Alexa will now respond with a random phrase each time. You can use the include for as many different intents as you like so you only need to create the list once.


## {% linkable_title Flash Briefing Skills %}

As of version [0.31][zero-three-one] Home Assistant supports the new [Alexa Flash Briefing Skills API][flash-briefing-api]. A Flash Briefing Skill adds a new Flash Briefing source that is generated by Home Assistant.

### {% linkable_title Configuring a Flash Briefing skill in Home Assistant %}

You can use [templates] for the `title`, `audio`, `text` and `display_url` configuration parameters.

Here's an example configuration of a Flash briefing skill that will tell you who is at home:

```yaml
{% raw %}# Example configuration.yaml entry
alexa:
  flash_briefings:
    whoishome:
      - title: Who's at home?
        text: >
          {%- if is_state('device_tracker.paulus', 'home') and
                 is_state('device_tracker.anne_therese', 'home') -%}
            You are both home, you silly
          {%- else -%}
            Anne Therese is at {{ states("device_tracker.anne_therese") }}
            and Paulus is at {{ states("device_tracker.paulus") }}
          {% endif %}{% endraw %}
```

You can add multiple items for a feed if you want. The Amazon required uid and timestamp will be randomly generated at startup and change at every restart of Home Assistant.

Please refer to the [Amazon documentation][flash-briefing-api-docs] for more information about allowed configuration parameters and formats.

### {% linkable_title Configuring your Flash Briefing skill %}

- Log in to [Amazon developer console][amazon-dev-console]
- Click the Alexa navigation tab at the top of the console
- Click on the "Get Started >" button under "Alexa Skills Kit"
- Click the yellow "Add a new skill" button in the top right
  - Skill Information
    - For Skill Type select "Flash Briefing Skill API"
    - You can enter whatever name you want
    - Hit "Next"
  - Interaction Model
    - Nothing to do here
  - Configuration
    - Add new feed
      - For URL, enter `https://YOUR_HOST/api/alexa/flash_briefings/BRIEFING_ID?api_password=YOUR_API_PASSWORD` where `BRIEFING_ID` is the key you entered in your configuration (such as `whoishome` in the above example). **NOTE:** Do not use a non-standard http or https port, AWS will not connect to it.
      - You can use this [specially sized Home Assistant logo][large-icon] as the Feed Icon
      - All other settings are up to you
      - Hit "Next"
  - Test
      - Having passed all validations to reach this screen you can now click on "< Back to All Skills" as your flash briefing is now available as in "Development" service.  
- To invoke your flash briefing, open the Alexa app on your phone or go to the [Alexa Setings Site][alexa-settings-site], open the "Skills" configuration section, select "Your Skills", scroll to the bottom, tap on the Flash Briefing Skill you just created, enable it, then manage Flash Briefing and adjust ordering as necessary.  Finally ask your Echo for your "news","flash briefing", or "briefing".

[amazon-dev-console]: https://developer.amazon.com
[flash-briefing-api]: https://developer.amazon.com/alexa-skills-kit/flash-briefing
[flash-briefing-api-docs]: https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/flash-briefing-skill-api-feed-reference
[large-icon]: /images/components/alexa/alexa-512x512.png
[small-icon]: /images/components/alexa/alexa-108x108.png
[templates]: /topics/templating/
[zero-three-one]: /blog/2016/10/22/flash-briefing-updater-hacktoberfest/
[alexa-settings-site]: http://alexa.amazon.com/
