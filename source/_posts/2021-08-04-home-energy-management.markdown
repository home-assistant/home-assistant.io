---
layout: post
title: "Energy Management in Home Assistant"
description: "Monitor your energy usage, transition to sustainable energy and save money."
date: 2021-08-04 00:01:00
date_formatted: "August 4, 2021"
author: Paulus Schoutsen
author_twitter: balloob
comments: true
categories:
- Announcements
og_image: /images/blog/2021-08-energy/social.png
---

_TL; DR: We're adding energy management and [it's awesome](https://demo.home-assistant.io/#/energy). Created two products to read out electricity meters: [SlimmeLezer](https://www.slimmelezer.nl) for P1 ports & [Home Assistant Glow](https://github.com/klaasnicolaas/home-assistant-glow) for activity LEDs. Upgraded most of the [existing energy integrations](/integrations/#energy) to be compatible._

<img src='/images/blog/2021-08-energy/social.png' style='border: 0;box-shadow: none;'>

The world is in a climate crisis. Global warming is a reality and the weather is getting unpredictable. Our way of living needs to change, at all levels. I am worried that the climate crisis is something that the world is going to try to solve too late and after irreversible damages have already been done.

So with Home Assistant we want to do our part to help take on the climate crisis, and help you do the same. One part of fighting the climate crisis is making sure our homes are energy efficient and use low-carbon energy sources.

Starting today, Home Assistant is adding official support for home energy management. Our energy management will help users monitor the energy usage, transition to sustainable energy and save money.

<p class='img'>
<img src='/images/blog/2021-08-energy/architecture.png' alt='Diagram how both home automation and energy management use the same data.'>
Home automation and energy management are built on top of knowing what devices are doing
</p>

## Energy management and Home Assistant in context

Bill Gates was recently interviewed by Marques Brownlee (MKBHD) and talked about how intelligent homes are needed to make smart cities. And how all of this starts with energy management in the home. The interview is 3 minutes and worth watching:

<div class="videoWrapper">
  <iframe width="853" height="480" src="https://www.youtube-nocookie.com/embed/ccnlAVDXd7k?start=978" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

Home Assistant won’t have all the answers when it comes to energy management, at least not right away. But we have two key things going for us that makes us the perfect platform to choose for your energy management:

The first is that we’re completely open. This means that with Home Assistant, anyone can use [the source](https://github.com/home-assistant/core) or [its collected data](https://data.home-assistant.io/) and build anything with it. We already see this happening: the [European federation of citizen energy cooperatives](https://www.rescoop.eu/) is using Home Assistant to build [energy management software tailored for communities](https://www.rescoopvpp.eu/blog/presenting-the-cofy-box). We are part of a rich ecosystem with many different approaches, all connected with Home Assistant.

The second thing is that we have a passionate and global community that wants to make their homes the best it can be. A community that revolves around building and sharing their own hardware and software to be able to achieve their goals. Through experimentation and iteration we will be able to improve energy management over time to fit our needs – there are no investors to satisfy.

When it comes to your home, Home Assistant is the best platform to manage it and figure out what works and what doesn’t.

<!--more-->

## Energy Dashboard

Today's release of [Home Assistant Core 2021.8](/blog/2021/08/04/release-20218/) contains a new energy dashboard ([demo](https://demo.home-assistant.io/#/energy)). The goal is to make it super easy for users to get insight into their energy usage. The dashboard has been designed to see at a quick glance how you're doing today, with the option to also break down per hour to see what happened when. It also includes indicators to help you identify your reliance on the grid and if adding energy storage would help your situation.

<p class='img'>
<img src='/images/blog/2021-08-energy/sidebar-widgets.png'>
(above) Different ways of looking at your consumption will help you better understand your energy usage<br>
(below) The energy usage graph shows per hour how much energy you used from the grid, how much energy you produced and how much of that energy went back to the grid.
<img src='/images/blog/2021-08-energy/energy-usage.png'>
</p>


Users will be able to see at a glance what sources of energy have been used in their home. This insight includes the carbon intensity of the electricity being consumed from the grid, which is available thanks to [electricityMap](https://www.electricitymap.org/).

If users have solar panels they can set up the [Forecast.Solar](https://www.forecast.solar) integration which allows users to see at a glance how today’s production is going to be. This enables users to schedule when to charge their electric car or heat extra water.

<img src='/images/blog/2021-08-energy/solar-production.png' style='border: 0;box-shadow: none;'><br>

Energy management is complicated, so we made sure that our energy settings are as easy as it can be. They are accompanied with [documentation](/docs/energy/) to further explain the different concepts.

Users can configure their consumption and production and Home Assistant will do the rest. Home Assistant can pull in energy data from any supported hardware such as smart energy meters, inverters, CT clamps, pulse monitors and smart plugs.

<p class='img'>
<img src='/images/blog/2021-08-energy/config-dialogs.png'>
The configuration is separated into different sections.
</p>

## Hardware

Home Assistant is vendor agnostic and there is no vendor lock-in. You can use any hardware that you want. We’ve already upgraded many of the [existing integrations for energy monitoring](/integrations/#energy) to work out of the box with energy management.

Besides supporting existing integrations, we’ve also created two open-source hardware projects to help you get your energy data into Home Assistant.

### Slimme Lezer

Most energy meters in the Netherlands, Belgium and Luxembourg have a P1 port on their energy meter. This port provides real-time usage statistics.

Together with [Marcel Zuidwijk](https://www.zuidwijk.com) we have designed and developed [SlimmeLezer](https://www.slimmelezer.nl). This product, based on [ESPHome](https://esphome.io), will make all P1 data instantly available in Home Assistant. P1 ports using the DSMR v5 protocol will also be able to power this device directly, so you don’t need an external charger. The SlimmeLezer firmware is fully open source.

[Buy a SlimmeLezer](https://www.slimmelezer.nl)

[SlimmeLezer on GitHub](https://www.github.com/zuidwijk/dsmr/)

![Photo of SlimmeLezer attached to a smart electricity meter](/images/docs/energy/slimmelezer.jpg)

### Home Assistant Glow

Most energy meters will flash a small light when a fixed amount of energy has been consumed. Home Assistant Glow monitors this light and brings it as a consumption sensor into Home Assistant.

Home Assistant Glow is powered by [ESPHome](https://esphome.io). Both firmware and case are fully open source and it is relatively straightforward to make your own with the included guide.

The Home Assistant Glow was designed and developed by [Klaas Schoute](https://github.com/klaasnicolaas) as part of his internship at [Nabu Casa](https://www.nabucasa.com).

[Home Assistant Glow on GitHub](https://github.com/klaasnicolaas/home-assistant-glow)

![Photo of Home Assistant Glow attached to an electricity meter](/images/docs/energy/home-assistant-glow.jpg)

### This is only the beginning

Today we released the very first version of energy management in Home Assistant 2021.8. We have many ideas that we're going to add in the next couple of releases.

If you're interested in helping out, don't hesitate to stop by the new #devs_energy channel on [our Discord server](/join-chat).

### New possibilities for advanced users

Every home is different and so are the needs of individual users. The energy management feature in Home Assistant is created with existing Home Assistant building blocks: Lovelace & Data storage. This means that our advanced users can choose to build up their own dashboards and use [the pieces from the energy dashboard](/dashboards/energy/) that they like.

On top of that, advanced users will have access to the new [long-term statistics](/dashboards/statistics-graph/) that have been added to Home Assistant. This data allows you to easily monitor most sensor data over long periods of time, not just energy data.

### Thank you community

Our home energy management has been in the making for over six months and many people and companies around the world have contributed to making this a success.

We’ve upgraded how Home Assistant stores data, renders charts and enhanced many other parts. We also extended the sensor model in ESPHome and added new features to make it possible to create devices that work out of the box with energy management. It’s been a lot of work by a lot of people and I am very proud of what we have been able to accomplish.

It shows that open source works: when you bring a group of people together that are passionate about something, great things can be made.

I want to give a special thanks to [Klaas Schoute](https://github.com/klaasnicolaas) who started the initial research as part of his internship at [Nabu Casa](https://www.nabucasa.com). He researched available solutions, created his own solutions ([Home Assistant Glow](https://github.com/klaasnicolaas/home-assistant-glow)), held in-depth interviews with 20 Home Assistant users, created the first iterations of the dashboard and integrated new data sources into Home Assistant ([forecast.solar](/integrations/forecast_solar/)). Thanks Klaas!

![One of Klaas his sketches](/images/blog/2021-08-energy/klaas-prototype.png)

### Support our work

If you like what we’re doing and want to help fund our work, subscribe to [Home Assistant Cloud](https://www.nabucasa.com).
