---
layout: post
title: Introducing Home Assistant Cloud
description: "Use Alexa to control any device that is connected to Home Assistant."
date: 2017-12-16 02:00:00
date_formatted: "December 16, 2017"
author: Paulus Schoutsen
author_twitter: balloob
comments: true
categories: Announcements
---

Today we’re introducing the next step in the Home Assistant saga: the Home Assistant Cloud. The goal of the Home Assistant Cloud is to bridge the gap between your local Home Assistant instance and services in the cloud while delivering the maximum possible security and privacy.

The first service that is supported via the Home Assistant Cloud is the Amazon Alexa Smart Home skill. This integration will allow you to control all your devices in Home Assistant via Amazon Alexa. You will be able to say _“Alexa, turn on the kitchen lights”_ and your local Home Assistant will turn on the lights. Because Alexa talks to Home Assistant, it doesn’t matter what kind of lights they are! Anything that is linked to Home Assistant will work. IKEA lights, a 10 year old X10 switch or something you’ve made yourself. As long as Home Assistant can control it, you can control it via Alexa.

We have designed the Home Assistant Cloud with security in mind. When you activate the new Cloud component, your instance will setup a secure connection to the Home Assistant Cloud. Alexa will deliver messages to our cloud which we will forward to your local instance for processing. We just forward the response back to Alexa. This means that we do not have to store the state of your house in our cloud, we’re just the messenger!

We are making the beta of the Home Assistant Cloud publicly available today. During the beta period the Home Assistant Cloud will be free to use. We are currently planning to run a beta till March 1, 2018 0:00 UTC. Once the beta ends, the Home Assistant Cloud will be part of our Community Support package which will run at $5 USD/month.

By subscribing to the Community Support package you will show your support for the Home Assistant organization, its projects and its community. It will help fund development, cover our operating costs and gives you access to use Home Assistant Cloud.

So if you ever felt like donating money to support the development of Home Assistant and Hass.io: sign up for the Home Assistant Cloud!

### {% linkable_title Why not take donations? %}

With donations you have to convince people to keep donating and it will be hard to plan around the amount of available money. The biggest concern is what do you do when there is not enough money. We could shut down the servers or again depend on the wallets of our developers. We could run Wikipedia style advertisements for donating, but those are even more annoying than running advertisements.

## {% linkable_title Getting started %}

Upgrade Home Assistant to 0.60 and enable the cloud and config components:

```yaml
# Example configuration.yaml entry
cloud:
config:
```

Now restart Home Assistant and navigate to the configuration panel. It will offer a new cloud section. Here you can create an account and login. Once logged in, your instance will connect to the cloud.

The next step is to configure Alexa. This can be done by enabling the Home Assistant skill for Alexa and link your Home Assistant cloud account.

Once you’re done, ask Alexa to discover devices (“Alexa, discover devices”) and you are all set to control them: “Alexa, turn on &lt;device name&gt;”.

## {% linkable_title FAQ %}

**Will Home Assistant and Hass.io remain open source?**

Yes. Yes. Yes! Home Assistant is the work of hundreds of developers all working together in creating something amazing. The only thing that will require a subscription is the optional cloud functionality.

**What other features will come to the cloud?**

We have a lot of ideas! We are not going to make any promises but here are some things that we’re looking into:

- Google Home / Google Assistant Smart Home skill
- Allow easy linking of other cloud services to Home Assistant. No more local juggling with OAuth flows. For example, link your Fitbit account and the Fitbit component will show up in Home Assistant.
- Encrypted backups of your Hass.io data
- Text to speech powered by AWS Polly
- Generic HTTP cloud endpoint for people to send messages to their local instance. This will allow people to build applications on - top of the Home Assistant cloud.
- IFTTT integration
- Alexa shopping list integration
