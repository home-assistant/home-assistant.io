---
layout: post
title: "2022.5.3: Ukraine Alarm integration, get alerted for attacks by air or artillery"
description: "A special release of Home Assistant to make the new Ukraine Alarm integration available."
date: 2022-05-08 00:00:00
date_formatted: "May 08, 2022"
author: Paulus Schoutsen
author_twitter: balloob
comments: true
categories:
- Release-Notes
og_image: /images/blog/2022-05-ukraine-alarm/integration.png
---

In February 2022, [Russia invaded Ukraine](https://en.wikipedia.org/wiki/2022_Russian_invasion_of_Ukraine). The countries have been at war ever since. Ukrainian citizens can at any moment be caught in crossfire or be deliberately targeted by the Russian army. Ukraine introduced the [Ukraine Alarm](https://www.ukrainealarm.com/) service to help citizens be notified when fighting is happening nearby.

Today we’re doing a special release of Home Assistant to make the new Ukraine Alarm integration available to everyone. It was contributed by [Paul Annekov](https://github.com/PaulAnnekov). This integration will track the alerts for the users’ region and represent it as safety binary sensors. These sensors can be used in automations so it's possible to notify the people in your home that there is danger.

Use this My button to add Ukraine Alarm to your Home Assistant:

{% my config_flow_start badge domain="ukraine_alarm" %}

Бережіть себе,<br>
Paulus

_(English screenshots below the Ukranian screenshots)_

<img src="/images/blog/2022-05-ukraine-alarm/integration_uk.png" class='no-shadow' alt="Screenshot in Ukranian of safety sensors provided by the Ukraine Alarm in integration in Home Assistant">

<!--more-->

<img src="/images/blog/2022-05-ukraine-alarm/automation_uk.png" class='no-shadow' alt="Screenshot in Ukranian of possible automations based on the safety sensors.">

<img src="/images/blog/2022-05-ukraine-alarm/integration.png" class='no-shadow' alt="Screenshot of safety sensors provided by the Ukraine Alarm in integration in Home Assistant">

<img src="/images/blog/2022-05-ukraine-alarm/automation.png" class='no-shadow' alt="Screenshot of possible automations based on the safety sensors.">
