---
title: Amazon Alexa
description: Instructions on how to connect Alexa/Amazon Echo to Home Assistant.
ha_category:
  - Voice
ha_iot_class: Cloud Push
featured: true
ha_release: '0.10'
ha_codeowners:
  - '@home-assistant/cloud'
  - '@ochlocracy'
  - '@jbouwh'
ha_domain: alexa
ha_integration_type: system
ha_platforms:
  - diagnostics
---

## Automatic setup via Home Assistant Cloud

With [Home Assistant Cloud](/cloud/), you can connect your Home Assistant instance in a few simple clicks to Amazon Alexa. With Home Assistant Cloud, you don't have to deal with dynamic DNS, SSL certificates, or opening ports on your router. Just log in via the user interface and a secure connection with the cloud will be established. Home Assistant Cloud requires a paid subscription after a 30-day free trial.

For Home Assistant Cloud Users, documentation can be found [here](https://www.nabucasa.com/config/amazon_alexa/).

## Manual setup

There are a few ways that you can use Amazon Alexa and Home Assistant together.

- [Create an Alexa Smart Home Skill to control lights, etc.](/integrations/alexa.smart_home/)
  - Supports utterances without requiring the skill name, such as "Alexa, turn off the light."
  - Support for controlling devices through Alexa routines.
  - Support for viewing and controlling devices with the Alexa mobile app.
- [Create a Custom Alexa Skill to build custom commands](/integrations/alexa.intent/)
- [Create a new Flash Briefing source](/integrations/alexa.flash_briefings/)
- Alternative: use the [Emulated Hue integration](/integrations/emulated_hue) to trick Alexa into thinking Home Assistant is a Philips Hue hub.

### Requirements

Manual setup of the integration with Amazon Alexa has several requirements:

- Amazon Developer Account. You can sign up [here][amazon-dev-console].
- Building custom commands and Flash Briefing require your Home Assistant instance to be accessible from the Internet with HTTPS on port 443.
- An [AWS account](https://aws.amazon.com/free/) is needed if you want to use the Smart Home Skill API. A part of your Smart Home Skill will be hosted on [AWS Lambda](https://aws.amazon.com/lambda/pricing/). However, you don't need to worry about costs; AWS Lambda is free for up to 1 million requests and 1GB of outbound data transfer per month.
- Smart Home API also needs your Home Assistant instance to be accessible from the Internet.

[amazon-dev-console]: https://developer.amazon.com
[emulated-hue-integration]: /integrations/emulated_hue/
