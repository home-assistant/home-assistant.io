---
title: "Perfect Home Automation"
description: "A breakdown of what the perfect home automation should consist of."
date: 2016-01-19 00:20:00 -0800
date_formatted: "January 19, 2016"
author: Paulus Schoutsen
author_twitter: balloob
categories: Internet-of-Things
---

People often ask me about my vision for Home Assistant. Before I can describe where I want to go with Home Assistant, I should first talk about how home automation would look in my ideal world. This will be the aim of this post. I’m not going to focus on protocols, networks or specific hubs. That's all implementation details. Instead, this post will focus on what is most important: the interaction between the users and their home.

### You should not have to adapt to technology.

When people start using home automation, they always experience home control first: being able to control devices in new ways using a phone or computer. They believe the future is now and their app will be their remote for their lives. They only focus on what they are getting, not on what they are losing. You install some light bulbs and all of a sudden you are no longer able to use the light switches. You'll arrive at home at night and have to pull out your phone, open the app, let it connect and finally you'll be able to turn on the light. All while turning the light on could have been a switch away.

Yes, you can solve this with presence detection. What if  your phone runs out of battery? You’ll have to resort to the switch again.

If you find that using your new home devices is cumbersome, the promise of home automation technology has failed you. Your lights should work with both a switch (or button) at the entrance of your room and via presence detection. Honestly, there are hardly any valid use cases for being able to control lights from your phone except for showing off.
<!--more-->

### You are not the only user of your home automation.

People tend to forget that they are not the only ones in their home. As the developer of your house you're enthusiastic about the possibilities and are willing to overlook flaws. Chances are very high that the other people in your household have different hobbies and just want to mind their own business.

This means that everything you automate has to work flawlessly. If you successfully manage to cause a response to some stimulus 90% of the time, you’re going to have a disproportionately poor experience 10% of the time.  A common automation that fits this pattern is to fade the lights when you start watching a movie or series in the living room. It only works if everyone is watching.

### Limit the impact of false positives and negatives.

With every automation, you always have to think: what will be the impact if it doesn’t work? Home automation is composed of many different systems by many different vendors that speak many different protocols: things will go wrong. It’s up to you to make sure that they have a limited impact when they fail. Ideally, devices should fall back to a pre-smart home experience. A Philips Hue bulb will act like a standard white light if turned on/off using a normal switch or when not connected to a hub. If things get worse when your system is out of order, your users will revolt. Take for example the Nest thermostat that [had a bug in the beginning of January][nest-bug] which caused it to stop heating the house, yikes!

[nest-bug]: http://www.nytimes.com/2016/01/14/fashion/nest-thermostat-glitch-battery-dies-software-freeze.html

### The perfect app is no app.

Home automation should blend with your current workflow, not replace it. For most devices, there is no faster way to control most devices than how you are already doing it today. Most of the time, the best app is no app. The only interface that can be more convenient, and is accessible for visitors of your home of all ages is a voice interface. The industry has realized this too and there are some major players focussing on voice interaction. Take Apple for example: the only way to control your HomeKit devices is with Siri.  Amazon has taken it one step further with the Amazon Echo, providing an always-listening connected speaker/microphone for the living room. I expect a lot more companies to join this segment in 2016.

Voice interfaces are not perfect either. The speed at which you can issue commands is low because you have to wait for a response. There are also issues with the discoverability of commands, recognition of accents and dependency on the cloud for processing your voice. I believe that all but the first one are problems that are going to be solved eventually.

This however doesn’t mean there isn’t a place for apps, there definitely is. They are perfectly well-suited for checking in while you’re away, browsing  the state changes of your house or making  the lights go all funky when there are kids visiting.

### Your system should run at home, not in the cloud.

The cloud is a magical thing. Somewhere in the world there are computers collecting the data that your house generates, testing them against your automation rules and sending commands back when needed.  The cloud will receive updates and improve itself over time so it is able to serve you better. Until it’s not. There are many reasons why your home might lose its connection to the cloud. The internet can stop working, an update might have gone wrong or the servers running the cloud crash.

When this happens, your house should be able to keep functioning. The cloud should be treated as an extension to your smart home instead of running it. That way you’ll avoid awkward situations like when Amazon AWS was down and the [Amazon Echo stopped working][echo-crash].

[echo-crash]: http://www.zdnet.com/article/the-night-alexa-lost-her-mind/

**Good home automation never annoys but is missed when it is not working.**

*Thanks to Chris LaRose for this feedback and comments.*
