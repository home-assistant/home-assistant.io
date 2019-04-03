---
layout: page
title: "Amazon Alexa Smart Home Skill"
description: "Instructions on how to build Smart Home skill to connect Amazon Alexa with Home Assistant."
date: 2019-03-14 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: amazon-alexa.png
ha_category: Voice
featured: false
ha_release: "0.54"
---

## {% linkable_title Automatic setup via Home Assistant Cloud %}

With [Home Assistant Cloud](/cloud/), you can connect your Home Assistant instance in a few simple clicks to Amazon Alexa. With Home Assistant Cloud you don't have to deal with dynamic DNS, SSL certificates or opening ports on your router. Just log in via the user interface and a secure connection with the cloud will be established. Home Assistant Cloud requires a paid subscription after a 30-day free trial.

For Home Assistant Cloud Users, documentation can be found [here](https://www.nabucasa.com/config/amazon_alexa/).

## {% linkable_title Amazon Alexa Smart Home %}

While the Skills API described above allows for arbitrary intents, all
utterances must begin with "Alexa, tell $invocation_name ..."

The [Emulated Hue component][emulated-hue-component] provides a simpler
interface such as, "Alexa, turn on the kitchen light". However, it has some
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
You must then create an Amazon developer account with an Alexa skill and Lambda function to integrate this endpoint. 

[Haaska](https://github.com/mike-grant/haaska/wiki) provides a step-by-step guide and necessary assets to help you create the Alexa skill and AWS Lambda.

The `endpoint`, `client_id` and `client_secret` are optional, and are only required if you want to enable Alexa's proactive mode. Please note the following if you want to enable proactive mode:

- There are different endpoint URLs, depending on the region of your skill. Please check the available endpoints at <https://developer.amazon.com/docs/smarthome/send-events-to-the-alexa-event-gateway.html#endpoints>
- The `client_id` and `client_secret` are not the ones used by the skill that have been set up using "Login with Amazon" (in the [Alexa Developer Console][amazon-dev-console]: Build > Account Linking), but rather from the "Alexa Skill Messaging" (in the Alexa Developer Console: Build > Permissions > Alexa Skill Messaging). To get them, you need to enable the "Send Alexa Events" permission.
- If the "Send Alexa Events" permission was not enabled previously, you need to unlink and relink the skill using the Alexa App, or else Home Assistant will show the following error: "Token invalid and no refresh token available."

[amazon-dev-console]: https://developer.amazon.com
[emulated-hue-component]: /components/emulated_hue/
