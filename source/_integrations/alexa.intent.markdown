---
title: "Amazon Alexa Custom Skill"
description: "Instructions on how to build your Alexa/Amazon Echo custom commands to connect with Home Assistant."
logo: amazon-alexa.png
ha_category:
  - Voice
ha_release: "0.10"
---

## I want to build custom commands to use with Echo

The built-in Alexa integration allows you to integrate Home Assistant into Alexa/Amazon Echo. This integration will allow you to query information and call services within Home Assistant by using your voice. Home Assistant offers no built-in sentences but offers a framework for you to define your own.

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube.com/embed/1Ke3mtWd_cQ" frameborder="0" allowfullscreen></iframe>
</div>

### Requirements

Amazon requires the endpoint of a skill to be hosted via SSL. Self-signed certificates are OK because our skills will only run in development mode. Read more on [our blog][blog-lets-encrypt] about how to set up encryption for Home Assistant. When running Hass.io, using the [Let's Encrypt](/addons/lets_encrypt/) and [Duck DNS](/addons/duckdns/) add-ons is the easiest method. If you are unable to get HTTPS up and running, consider using [this AWS Lambda proxy for Alexa skills](https://community.home-assistant.io/t/aws-lambda-proxy-custom-alexa-skill-when-you-dont-have-https/5230).

Additionally, note that at the time of this writing, your Alexa skill endpoint *must* accept requests over port 443 (Home Assistant default to 8123). There are two ways you can handle this:

  1. In your router, forward external 443 to your Home Assistant serving port (defaults to 8123)
  OR
  2. Change your Home Assistant serving port to 443 this is done in the [`http`](/integrations/http/) section with the `server_port` entry in your `configuration.yaml` file

[blog-lets-encrypt]: /blog/2015/12/13/setup-encryption-using-lets-encrypt/

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
    - `https://YOUR_HOST/api/alexa?api_password=YOUR_API_PASSWORD`

You can use this [specially sized Home Assistant logo][large-icon] as the large icon and [this one][small-icon] as the small one.

### Configuring your Amazon Alexa skill

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

## Configuring Home Assistant

When activated, the Alexa integration will have Home Assistant's native intent support handle the incoming intents. If you want to run actions based on intents, use the [`intent_script`](/integrations/intent_script) integration.

To enable Alexa, add the following entry to your `configuration.yaml` file:

```yaml
alexa:
```

### Working With Scenes

One of the most useful applications of Alexa integrations is to call scenes directly. This is easily achieved with some simple setup on the Home Assistant side and by letting Alexa know which scenes you want to run.

First, we will configure Alexa. In the Amazon Interaction module add this to the intent schema:

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
<img src='/images/integrations/alexa/scene_slot.png' />
Custom slot type for scene support.
</p>

The names must exactly match the scene names (minus underscores - Amazon discards them anyway and we later map them back in with the template).

In the new Alexa Skills Kit, you can also create synonyms for slot type values, which can be used in place of the base value in utterances. Synonyms will be replaced with their associated slot value in the intent request sent to the Alexa API endpoint, but only if there are not multiple synonym matches. Otherwise, the value of the synonym that was spoken will be used.

<p class='img'>
<img src='/images/integrations/alexa/scene_slot_synonyms.png' />
Custom slot values with synonyms.
</p>

Add a sample utterance:

```text
ActivateSceneIntent activate {Scene}
```

Then add the intent to your intent_script section in your HA config file:

```yaml
intent_script:
  ActivateSceneIntent:
    action:
      service: scene.turn_on
      data_template:
        entity_id: scene.{% raw %}{{ Scene | replace(" ", "_") }}{% endraw %}
    speech:
      type: plain
      text: OK
```

Here we are using [templates] to take the name we gave to Alexa e.g., `downstairs on` and replace the space with an underscore so it becomes `downstairs_on` as Home Assistant expects.

Now say `Alexa ask Home Assistant to activate <some scene>` and Alexa will activate that scene for you.

### Adding Scripts

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
<img src='/images/integrations/alexa/script_slot.png' />
Custom slot type for script support.
</p>

Add a sample utterance:

```text
RunScriptIntent run {Script}
```

Then add the intent to your intent_script section in your HA config file:

```yaml
intent_script:
  RunScriptIntent:
    action:
      service: script.turn_on
      data_template:
        entity_id: script.{% raw %}{{ Script | replace(" ", "_") }}{% endraw %}
    speech:
      type: plain
      text: OK
```

Now say `Alexa ask Home Assistant to run <some script>` and Alexa will run that script for you.

### Support for Launch Requests

There may be times when you want to respond to a launch request initiated from a command such as "Alexa, Red Alert!".

To start, you need to get the skill id:

- Log into [Amazon developer console][amazon-dev-console]
- Click the Alexa button at the top of the console
- Click the Alexa Skills Kit Get Started button
  - Locate the skill for which you would like Launch Request support
  - Click the "View Skill ID" link and copy the ID

The configuration is the same as an intent with the exception being you will use your skill ID instead of the intent name.
```yaml
intent_script:
  amzn1.ask.skill.08888888-7777-6666-5555-444444444444:
    action:
      service: script.turn_on
      entity_id: script.red_alert
    speech:
      type: plain
      text: OK
```

## Giving Alexa Some Personality

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

```yaml
text: OK
```

becomes:

```yaml
text: !include alexa_confirm.yaml
```

Alexa will now respond with a random phrase each time. You can use the include for as many different intents as you like so you only need to create the list once.


[amazon-dev-console]: https://developer.amazon.com
[large-icon]: /images/integrations/alexa/alexa-512x512.png
[small-icon]: /images/integrations/alexa/alexa-108x108.png
[templates]: /topics/templating/
