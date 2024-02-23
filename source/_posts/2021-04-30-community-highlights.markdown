---
title: "Community Highlights: 19th edition"
description: "Schedule your vacuum cleaning robot with a blueprint, show the robot status with a card and get started with open source text-to-speech systems"
date: 2021-04-30 00:00:00
date_formatted: "April 30, 2021"
author: Klaas Schoute
author_twitter: klaasnicolaas
categories: Community
og_image: /images/blog/2021-04-30-community-highlights/social.png
---

The 19th edition of the Home Assistant Community Highlights! Some interesting
things popped up around our community, we thought was worth sharing.

Amazing to see how many reactions there have been after sharing the
[internship progress][internship], we have seen many cool things and if you have
any input you can still share this of course! ❤️

Do you want to share something for the next edition?
Information on [how to share](#got-a-tip-for-the-next-edition).

./Klaas

## Blueprint of the week
------

<div style="margin:0 auto; text-align:center">
    <a href="https://community.home-assistant.io/t/vacuum-schedule/256590" target="_blank">
        <img
            src='/images/blog/2021-04-30-community-highlights/blueprint.png'
            alt="Setting up the Blueprint"
            style='border: 0;box-shadow: none;width:70%;margin-bottom:15px;'
        />
    </a>
</div>

This week's blueprint is that of [delphiki](https://community.home-assistant.io/u/delphiki),
with which you can plan on which days of the week your vacuum cleaner should start
cleaning and at what time. Try it out! Read more about it on the [community forum][week_blueprint]
or install this automation in your instance with a click on the My button!

{% my blueprint_import badge blueprint_url="https://community.home-assistant.io/t/vacuum-schedule/256590" %}

## Lovelace Dashboard
------

Also this week we have a new Lovelace dashboard for the necessary portion
of inspiration 💡 This time it has become that of [Make_Itt_Work](https://www.reddit.com/user/Make_Itt_Work/),
where he also processed the telemetry data from his car in the dashboard.
Now we are of course very curious how that works? 😄

<div style="margin:0 auto; text-align:center">
    <a href="https://www.reddit.com/r/homeassistant/comments/n1ci34/latest_dashboard_check_out_my_car_telemetry_card/" target="_blank">
        <img
            src='/images/blog/2021-04-30-community-highlights/dashboard.jpg'
            alt="Preview of the dashboard"
            style='border: 0;box-shadow: none;width:80%;margin-bottom:15px;'
        />
    </a>
</div>

Take also a look at the [original post][dashboard] on Reddit. Would you
like your dashboard to be in the community highlight? Drop it on
[Reddit][reddit] and maybe I'll pick it out for the next edition.

## Vacuum Card
------

<div style="margin:0 auto; text-align:center">
    <a href="https://github.com/denysdovhan/vacuum-card" target="_blank">
        <img
            src='/images/blog/2021-04-30-community-highlights/vacuum.png'
            alt="The vacuum card"
            style='border: 0;box-shadow: none;width:70%;margin-bottom:15px;'
        />
    </a>
</div>

Besides being able to automate when your vacuum cleaning robot gets started,
you probably also want to show the status of your robot in Lovelace. Then try
the [vacuum card](https://github.com/denysdovhan/vacuum-card) from [denysdovhan](https://github.com/denysdovhan),
with which you can show that in a beautiful way and there is support for the
well-known models that are now available on the market.

<a href="https://github.com/denysdovhan/vacuum-card"><img style="border: 0;" src="https://gh-card.dev/repos/denysdovhan/vacuum-card.svg"></a>

## OpenTTS 2.0
------

{% my supervisor_add_addon_repository badge repository_url="https://github.com/synesthesiam/hassio-addons" %}

Maybe the name still sounds fairly unknown to you, but [OpenTTS](https://github.com/synesthesiam/hassio-addons)
is an add-on, which gives you the possibility to use multiple open source
text-to-speech systems. So that you can eventually have text spoken on: for
example, a Google Home speaker. [synesthesiam](https://github.com/synesthesiam)
recently released a new version of OpenTTS and you can install it as an
add-on in Home Assistant.

<a href="https://github.com/synesthesiam/hassio-addons"><img style="border: 0;" src="https://gh-card.dev/repos/synesthesiam/hassio-addons.svg"></a>

Give it a try!

## Got a tip for the next edition?
------

Have you seen (or made) something awesome, interesting, unique, amazing,
inspirational, unusual or funny, using Home Assistant?

[Click here to send us your Community Highlight suggestion](/suggest-community-highlight).

Also, don't forget to share your creations with us via Social Media:

- Tweet it! Be sure to mention [@home_assistant][twitter]
- Share it on our [Facebook group][facebook-group]
- Post it to our [subreddit][reddit]
- Tag [@homeassistant][instagram] on Instagram
- Or via chat, drop us a line in the [#lounge at Discord][chat]

See you next edition!

[chat]: https://www.home-assistant.io/join-chat
[facebook-group]: https://www.facebook.com/groups/HomeAssistant
[instagram]: https://www.instagram.com/homeassistant
[reddit]: https://www.reddit.com/r/homeassistant
[twitter]: https://www.twitter.com/home_assistant
[blueprints]: https://community.home-assistant.io/c/blueprints-exchange
[community]: https://community.home-assistant.io
[dashboard]: https://www.reddit.com/r/homeassistant/comments/n1ci34/latest_dashboard_check_out_my_car_telemetry_card/
[internship]: https://www.home-assistant.io/blog/2021/04/23/community-highlights/#home-assistant-energy
[week_blueprint]: https://community.home-assistant.io/t/vacuum-schedule/256590