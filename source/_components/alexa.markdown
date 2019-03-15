---
layout: page
title: "Amazon Alexa"
description: "Instructions on how to connect Alexa/Amazon Echo to Home Assistant."
date: 2015-12-13 13:02
sidebar: true
comments: false
sharing: true
footer: true
logo: amazon-alexa.png
ha_category: Voice
featured: true
ha_release: "0.10"
---

## {% linkable_title Automatic setup via Home Assistant Cloud %}

With [Home Assistant Cloud](/cloud/), you can connect your Home Assistant instance in a few simple clicks to Amazon Alexa. With Home Assistant Cloud you don't have to deal with dynamic DNS, SSL certificates or opening ports on your router. Just log in via the user interface and a secure connection with the cloud will be established. Home Assistant Cloud requires a paid subscription after a 30-day free trial.

For Home Assistant Cloud Users, documentation can be found [here](https://www.nabucasa.com/config/amazon_alexa/).

## {% linkable_title Manual setup %}

There are a few ways that you can use Amazon Alexa and Home Assistant together.

- [Build custom commands to use](/components/alexa.intent/)
- [Create a new Flash Briefing source](/components/alexa.flash_briefing/)
- [Use the Smart Home API to control lights, etc](/components/alexa.smart_home/)
- Alternative: use the [Emulated Hue component][emulated-hue-component] to trick Alexa to thinking Home Assistant is a Philips Hue hub.

### {% linkable_title Requirements %}

Manual setup the integration with Amazon Alexa needs several requirements

- Amazon Developer Account. You can sign on [here][amazon-dev-console].
- Build custom commands and Flash Briefing source need your Home Assistant instance can be accessed from Internet, and host HTTPS server over port 443.
- An [AWS account](https://aws.amazon.com/free/) is need if you want to use Smart Home Skill API. Part of your Smart Home Skill will be hosted on [AWS Lambda](https://aws.amazon.com/lambda/pricing/). However you don't need worry the cost, AWS Lambda allow free to use up to 1 millions requests and 1GB outbound data transfer per month.
- Smart Home API also needs your Home Assistant instance can be accessed from Internet.


[amazon-dev-console]: https://developer.amazon.com
[emulated-hue-component]: /components/emulated_hue/
