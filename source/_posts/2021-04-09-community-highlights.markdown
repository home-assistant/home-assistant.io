---
title: "Community Highlights: 16th edition"
description: "Google Home custom integration so you can read timers and alarms, get started with the tempometer gauge card and a lot of new inspiration for your own Lovelace dashboard."
date: 2021-04-09 00:00:00
date_formatted: "April 9, 2021"
author: Klaas Schoute
author_twitter: klaasnicolaas
categories: Community
og_image: /images/blog/2021-04-09-community-highlights/social.png
---

What did you think of [the release][release] last Wednesday? A
lot of cool things have been added! But there were also a lot of
great projects shared this week from the community and we have
selected the best for you. So here's the 16th edition of the Home
Assistant Community Highlights!

Do you want to share something for the next edition?
Information on [how to share](#got-a-tip-for-the-next-edition).

./Klaas

## Blueprint of the week

You're leaving home and oh dear! It turns out that one of your lights
is on 💡 What if you then receive a notification with an option to switch
off the light, without having to open the Home Assistant app first?

<div style="margin:0 auto; text-align:center">
    <a href="https://community.home-assistant.io/t/actionable-notifications-for-android/256773" target="_blank">
        <img
            src='/images/blog/2021-04-09-community-highlights/notify.jpeg'
            alt="Actionable notification demo"
            style='border: 0;box-shadow: none;width:70%;margin-bottom:10px;'
        />
    </a>
</div>

With the blueprint from [vorion](https://community.home-assistant.io/u/vorion)
you can easily get started to create your own actionable notifications, give it
a try. Read more about it on the [community forum][week_blueprint] or install this
automation in your instance with a click on the my button!

{% my blueprint_import badge blueprint_url="https://community.home-assistant.io/t/actionable-notifications-for-android/256773" %}

## Google Home

Long ago it was possible to read the alarms and timers from your Google Home
in Home Assistant, due to a change in the API this was unfortunately no longer possible.

<object type="image/svg+xml" data="https://gh-card.dev/repos/leikoilja/ha-google-home.svg?link_target=_blank"></object>

But thanks to a new [custom integration](https://github.com/leikoilja/ha-google-home)
from [leikoilja](https://github.com/leikoilja), it’s now possible to integrate alarms
or timers that you have set up on a Google Home device. For example, you could switch
the lights automatically in the morning based on an alarm clock that you have set.

## Tempometer Gauge Card

<div style="margin:0 auto; text-align:center">
    <a href="https://github.com/SNoof85/lovelace-tempometer-gauge-card" target="_blank">
        <img
            src='/images/blog/2021-04-09-community-highlights/gauge.png'
            alt="Tempometer Gauge card"
            style='border: 0;box-shadow: none;width:70%;margin-bottom:10px;'
        />
    </a>
</div>

Are you looking for a card to spice up your existing gauge card?
Then try the [tempometer gauge card](https://github.com/SNoof85/lovelace-tempometer-gauge-card) made by [SNoof85](https://github.com/SNoof85).

<object type="image/svg+xml" data="https://gh-card.dev/repos/SNoof85/lovelace-tempometer-gauge-card.svg?link_target=_blank"></object>

## Lovelace Dashboard

This week also a Lovelace dashboard and this time that of [agneevX](https://github.com/agneevX),
the nice thing about this dashboard is that it's designed from a mobile first principle. Which
means that you make a design / dashboard for the smallest screen (mobile) and then work out step
by step how it will look on a larger screen (desktop).

<div style="margin:0 auto; text-align:center">
    <a href="https://github.com/agneevX/my-ha-setup" target="_blank">
        <img
            src='/images/blog/2021-04-09-community-highlights/dashboard.png'
            alt="Lovelace dashboard"
            style='border: 0;box-shadow: none;width:90%;margin-bottom:10px;'
        />
    </a>
</div>

You can find all his code in [this repository](https://github.com/agneevX/my-ha-setup) on Github.

## Got a tip for the next edition?

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
[release]: https://www.home-assistant.io/blog/2021/04/07/release-20214/
[week_blueprint]: https://community.home-assistant.io/t/actionable-notifications-for-android/256773