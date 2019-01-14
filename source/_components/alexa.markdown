---
layout: page
title: "Alexa / Amazon Echo"
description: "Instructions on how to connect Alexa/Amazon Echo to Home Assistant."
date: 2015-12-13 13:02
sidebar: true
comments: false
sharing: true
footer: true
logo: amazon-echo.png
ha_category: Voice
featured: true
ha_release: '0.10'
---

## {% linkable_title Automatic setup via Home Assistant Cloud %}

With [Home Assistant Cloud](/cloud/), you can connect your Home Assistant instance in a few simple clicks to Amazon Alexa. With Home Assistant Cloud you don't have to deal with dynamic DNS, SSL certificates or opening ports on your router. Just log in via the user interface and a secure connection with the cloud will be established. Home Assistant Cloud requires a paid subscription after a 30-day free trial.

For Home Assistant Cloud Users, documentation can be found [here](https://www.nabucasa.com/config/amazon_alexa/).

## {% linkable_title Manual setup %}

There are a few ways that you can use Amazon Echo and Home Assistant together.

- [Build custom commands to use](#i-want-to-build-custom-commands-to-use-with-echo)
- [Create a new Flash Briefing source](#flash-briefing-skills)
- [Use the Smart Home API to control lights, etc](#smart-home)
- Alternative: use the [Emulated Hue component][emulated-hue-component] to trick Alexa to thinking Home Assistant is a Philips Hue hub.

Amazon has released [Echosim], a website that simulates the Alexa service in your browser. That way it is easy to test your skills without having access to a physical Amazon Echo.

[Echosim]: https://echosim.io/

## {% linkable_title I want to build custom commands to use with Echo %}

The built-in Alexa component allows you to integrate Home Assistant into Alexa/Amazon Echo. This component will allow you to query information and call services within Home Assistant by using your voice. Home Assistant offers no built-in sentences but offers a framework for you to define your own.

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube.com/embed/1Ke3mtWd_cQ" frameborder="0" allowfullscreen></iframe>
</div>

### {% linkable_title Requirements %}

Amazon requires the endpoint of a skill to be hosted via SSL. Self-signed certificates are OK because our skills will only run in development mode. Read more on [our blog][blog-lets-encrypt] about how to set up encryption for Home Assistant. When running Hass.io, using the [Let's Encrypt](/addons/lets_encrypt/) and [Duck DNS](/addons/duckdns/) add-ons is the easiest method. If you are unable to get HTTPS up and running, consider using [this AWS Lambda proxy for Alexa skills](https://community.home-assistant.io/t/aws-lambda-proxy-custom-alexa-skill-when-you-dont-have-https/5230).

Additionally, note that at the time of this writing, your Alexa skill endpoint *must* accept requests over port 443 (Home Assistant default to 8123). There are two ways you can handle this:

  1. In your router, forward external 443 to your Home Assistant serving port (defaults to 8123)
  OR
  2. Change your Home Assistant serving port to 443 this is done in the [`http`](/components/http/) section with the `server_port` entry in your `configuration.yaml` file

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

When activated, the Alexa component will have Home Assistant's native intent support handle the incoming intents. If you want to run actions based on intents, use the [`intent_script`](/components/intent_script) component.

To enable Alexa add the following entry to your `configuration.yaml` file:

```yaml
alexa:
```

### {% linkable_title Working With Scenes %}

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
<img src='/images/components/alexa/scene_slot.png' />
Custom slot type for scene support.
</p>

The names must exactly match the scene names (minus underscores - amazon discards them anyway and we later map them back in with the template).

In the new Alexa Skills Kit, you can also create synonyms for slot type values, which can be used in place of the base value in utterances. Synonyms will be replaced with their associated slot value in the intent request sent to the Alexa API endpoint, but only if there are not multiple synonym matches. Otherwise, the value of the synonym that was spoken will be used.

<p class='img'>
<img src='/images/components/alexa/scene_slot_synonyms.png' />
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

### {% linkable_title Support for Launch Requests %}
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

You can add multiple items for a feed if you want. The Amazon required UID and timestamp will be randomly generated at startup and change at every restart of Home Assistant.

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
      - Having passed all validations to reach this screen, you can now click on "< Back to All Skills" as your flash briefing is now available as in "Development" service.
- To invoke your flash briefing, open the Alexa app on your phone or go to the [Alexa Settings Site][alexa-settings-site], open the "Skills" configuration section, select "Your Skills", scroll to the bottom, tap on the Flash Briefing Skill you just created, enable it, then manage Flash Briefing and adjust ordering as necessary.  Finally ask your Echo for your "news","flash briefing", or "briefing".


## {% linkable_title Smart Home %}

While the Skills API described above allows for arbitrary intents, all
utterances must begin with "Alexa, tell $invocation_name ..."

The [Emulated Hue component][emulated-hue-component] provides a simpler
interface such as, "Alexa, turn on the kitchen light". However it has some
limitations since everything looks like a light bulb.

Amazon provides a Smart Home API for richer home automation control. It takes
considerable effort to configure. The easy solution is to use
[Home Assistant Cloud](/components/cloud/).

If you don't want to use Home Assistant Cloud and are willing to do the
integration work yourself, Home Assistant can expose an HTTP API which makes
the integration work easier. Example configuration:

```yaml
alexa:
  smart_home:
    endpoint: https://api.amazonalexa.com/v3/events
    client_id: !secret alexa_client_id
    client_secret: !secret alexa_client_secret
    filter:
      include_entities:
        - light.kitchen
        - light.kitchen_left
      include_domains:
        - switch
      exclude_entities:
        - switch.outside
    entity_config:
      light.kitchen:
        name: Custom Name for Alexa
        description: The light in the kitchen
      switch.stairs:
        display_categories: LIGHT
```
This exposes an HTTP POST endpoint at `http://your_hass_ip/api/alexa/smart_home`
which accepts and returns messages conforming to the
[Smart Home v3 payload](https://developer.amazon.com/docs/smarthome/smart-home-skill-api-message-reference.html).
You must then create an Amazon developer account with an Alexa skill and Lambda
function to integrate this endpoint. See
[Haaska](https://github.com/mike-grant/haaska) for an example.
The `endpoint`, `client_id` and `client_secret` are optional, and are only required if  you want to enable Alexa's proactive mode. Please note the following if you want to enable proactive mode:

- There are different endpoint urls, depending on the region of your skill. Please check the available endpoints at https://developer.amazon.com/docs/smarthome/send-events-to-the-alexa-event-gateway.html#endpoints
- The `client_id` and `client_secret` are not the ones used by the skill that have been set up using "Login with Amazon" (in the Alexa Developer Console: Build > Account Linking), but rather from the "Alexa Skill Messaging" (in the Alexa Developer Console: Build > Permissions > Alexa Skill Messaging). To get them, you need to enable the "Send Alexa Events" permission.
- If the "Send Alexa Events" permission was not enabled previously, you need to unlink and relink the skill using the Alexa App, or else Home Assistant will show the following error: "Token invalid and no refresh token available."

[amazon-dev-console]: https://developer.amazon.com
[flash-briefing-api]: https://developer.amazon.com/alexa-skills-kit/flash-briefing
[flash-briefing-api-docs]: https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/flash-briefing-skill-api-feed-reference
[large-icon]: /images/components/alexa/alexa-512x512.png
[small-icon]: /images/components/alexa/alexa-108x108.png
[templates]: /topics/templating/
[zero-three-one]: /blog/2016/10/22/flash-briefing-updater-hacktoberfest/
[alexa-settings-site]: http://alexa.amazon.com/
[emulated-hue-component]: /components/emulated_hue/
