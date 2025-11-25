---
title: "Community Highlights: 18th edition"
description: "Pause a movie with a blueprint, get started with the EV Charger Card and an update from the internship regarding Home Assistant Energy!"
date: 2021-04-23 00:00:00
date_formatted: "April 23, 2021"
author: Klaas Schoute
author_twitter: klaasnicolaas
categories: Community
og_image: /images/blog/2021-04-23-community-highlights/social.png
---

The 18th edition of the Home Assistant Community Highlights! Some interesting
things popped up around our community, we thought was worth sharing.

Do you want to share something for the next edition?
Information on [how to share](#got-a-tip-for-the-next-edition).

./Klaas

## Blueprint of the week
------

You probably recognize it, while watching a movie you need to go to the
toilet and you forget to pause the movie! What if you could automate this
with a blueprint?

{% my blueprint_import badge blueprint_url="https://community.home-assistant.io/t/pause-movie-when-light-is-switched-on/289882" %}

With the blueprint from [jfedor](https://community.home-assistant.io/u/jfedor)
you can pause your media player by turning on a light and if you turn it off
within a certain time, the media player will continue. Read more about it on
the [community forum][week_blueprint] or install this automation in your instance
with a click on the my button!

## Lovelace Dashboard
------

Also this week we have a new Lovelace dashboard for the necessary portion of
inspiration 😄 This time it has become that of [Crixle](https://www.reddit.com/user/Crixle/),
what he has made in the past 5 months. Possibly this design can be used quite
well for a tablet on the wall. Take also a look at the [original post](https://www.reddit.com/r/homeassistant/comments/mufpxw/complete_newbie_5_months_ago_and_this_is_what_my/) on Reddit

<div style="margin:0 auto; text-align:center">
    <a href="https://www.reddit.com/r/homeassistant/comments/mufpxw/complete_newbie_5_months_ago_and_this_is_what_my/" target="_blank">
        <img
            src='/images/blog/2021-04-23-community-highlights/dashboard.png'
            alt="Preview from battery state card"
            style='border: 0;box-shadow: none;width:100%;margin-bottom:15px;'
        />
    </a>
</div>

Would you also like your dashboard to be in the community highlight? Drop it
on [Reddit][reddit] and maybe I'll pick it out for the next edition.

## EV Charger Card
------

<div style="margin:0 auto; text-align:center">
    <a href="https://www.reddit.com/r/homeassistant/comments/mufpxw/complete_newbie_5_months_ago_and_this_is_what_my/" target="_blank">
        <img
            src='/images/blog/2021-04-23-community-highlights/charger-card.png'
            alt="Preview of the EV Charger Card"
            style='border: 0;box-shadow: none;width:60%;margin-bottom:15px;'
        />
    </a>
</div>

Looking for a way to show the charging of your electric car in a beautiful
way in Lovelace? Then try the [EV Charger card](https://github.com/tmjo/charger-card)
made by [tmjo](https://github.com/tmjo).

<a href="https://github.com/tmjo/charger-card"><img style="border: 0;" src="https://gh-card.dev/repos/tmjo/charger-card.svg"></a>

## Home Assistant Energy
------
__*Internship progress*__

It has been 11 weeks since I started as an intern at [Nabu Casa][nabu_casa], where
I focus on how Home Assistant can be used to gain insight into your energy data and
how to optimize your consumption. Time to give a brief summary of what is currently
going on.

We are currently trying to design a ready-made Lovelace dashboard, in which all your
energy data comes together. You can see a first paper prototype sketch below, if you
have input on this topic, please share it with me via the [Twitter thread](https://twitter.com/klaasnicolaas/status/1384584214402719746)!

<div style="margin:0 auto; text-align:center">
    <img
        src='/images/blog/2021-04-23-community-highlights/sketch.png'
        alt="Sketches that are made for Home Assistant Energy"
        style='border: 0;box-shadow: none;width:90%;margin-bottom:15px;'
    />
</div>

In addition, I’m also working on an analog pulse meter, working with [ESPHome][esphome]
that you can use to read the pulse LED on a meter. YAML configs for power plugs from
Blitzwolf etc.

More information can also be found in the twitter thread below.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I&#39;m doing an internship at <a href="https://twitter.com/NabuCasa?ref_src=twsrc%5Etfw">@NabuCasa</a> with the goal to discover how <a href="https://twitter.com/home_assistant?ref_src=twsrc%5Etfw">@home_assistant</a> can be used to gain insight in your energy usage and help optimize it.<br><br>I will be using this thread to show some of the things that I have done so far. <a href="https://t.co/0lLJxt15Nn">pic.twitter.com/0lLJxt15Nn</a></p>&mdash; Klaas Schoute (@klaasnicolaas) <a href="https://twitter.com/klaasnicolaas/status/1384584214402719746?ref_src=twsrc%5Etfw">April 20, 2021</a></blockquote>

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
[community]: https://community.home-assistant.io
[nabu_casa]: https://www.nabucasa.com
[esphome]: https://esphome.io
[week_blueprint]: https://community.home-assistant.io/t/pause-movie-when-light-is-switched-on/289882
