---
title: "Community Highlights: 2nd edition"
description: "DIY smart candles, automating a van, a self generating Lovelace theme and visualizing with Grafana"
date: 2020-02-07 00:00:00
date_formatted: "February 7, 2020"
author: Franck Nijhof
author_twitter: frenck
categories: Community
og_image: /images/blog/2020-02-07-community-highlights/social.png
---

Thank god, it's Friday! For most of us, it means we can tinker with our Home Automation projects again 😃

The second edition of the Community Highlights is here to provide you a fresh source of inspiration this weekend. And, if that is not enough, upgrading to the latest release of [Home Assistant Core 0.105](/blog/2020/02/05/release-105/) is definitely a recommendation for your list. It introduces tons of new shiny features for you to play with.

So, what changes did you make to your Home Assistant setup this week?

## DIY Smart Candles

For starters, if you are looking for a cool DIY project, [3ATIVE](https://twitter.com/3ATIVE) shared a YouTube tutorial on how to make sweet little smart candles that work with Home Assistant.

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/OHwBA27FR9c" frameborder="0" allowfullscreen></iframe>
</div>

The code for this project is shared on GitHub: [Smart-Candles](https://github.com/3ative/Smart-Candles).

_Thanks [balloob](https://twitter.com/balloob), for [submitting](/suggest-community-highlight) this suggestion 👍_

## Vanlife: Home Assistant on the Road

Creative use of Home Assistant; we've seen quite a few vehicles in the past being fitted with Home Assistant (including boats). [Zane Claes](https://www.instagram.com/zaneclaes) (aka Technically Wizardry), shares his story on building a vanlife van with a touch of home automation magic.

In the past few months on the road, he built out a Home Assistant installation that's geared to work in a car/vehicle. A [full blog post](https://www.technicallywizardry.com/iot-cars-vans-home-automation/) explains how he integrated with On-Board Diagnostics (OBD) to read out the status of the van, implemented a dash camera (that doubles as a security camera), temperature sensors and the monitoring cellular internet usage.

<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/B2aEux1pJrO/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="12" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/B2aEux1pJrO/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;"> View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div></a> <p style=" margin:8px 0 0 0; padding:0 4px;"> <a href="https://www.instagram.com/p/B2aEux1pJrO/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;" target="_blank">All packed up: we departed on our #vanlife adventure today</a></p> <p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;">A post shared by <a href="https://www.instagram.com/zaneclaes/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px;" target="_blank"> Zane Claes</a> (@zaneclaes) on <time style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;" datetime="2019-09-14T21:53:07+00:00">Sep 14, 2019 at 2:53pm PDT</time></p></div></blockquote>
<script async src="//www.instagram.com/embed.js"></script>

You can read Zane's full blog post here:

<https://www.technicallywizardry.com/iot-cars-vans-home-automation/>

He also made his Home Assistant configuration [publicly available on GitHub](https://github.com/zaneclaes/van-home-assistant-config).

_Thanks, [Robbie Trencheny](https://twitter.com/robbie) & [cgtobi](https://twitter.com/cgtobi) for sending in this item in! 👍_

## An auto-generating Lovelace UI theme

Dwain Scheeren shared a preview of his Lovelace theme on the [Home Assistant Community Forum](https://community.home-assistant.io/t/dwains-theme-an-auto-generating-lovelace-ui-theme/168593). The cool think about this theme, is that it automatically generates itself!

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/Wdh0q8K3JSk" frameborder="0" allowfullscreen></iframe>
</div>

Unfortunately, the source code for this isn't available yet, however, Dwain wrote on the forums that he is planning on releasing it soon. We are looking forward to that, Dwain!

You can follow the development of this theme on the [dedicated topic for it on our Community Forum](https://community.home-assistant.io/t/dwains-theme-an-auto-generating-lovelace-ui-theme/168593).

## Visualizing everything in Grafana

[Ivana Huckova](https://twitter.com/ivanahuckova) had a Hack Day at [Grafana](https://www.grafana.com) (the company she works for) and decided to work on her home to visualize everything (in Grafana, of course).

<blockquote class="twitter-tweet">
<p lang="en" dir="ltr">Today is a Hack Day 👩‍💻 at Grafana and I have decided to hack our home 🏠. I am going to be setting up <a href="https://twitter.com/home_assistant?ref_src=twsrc%5Etfw">@home_assistant</a>, exporting metrics to <a href="https://twitter.com/PrometheusIO?ref_src=twsrc%5Etfw">@PrometheusIO</a> and visualising everything in <a href="https://twitter.com/grafana?ref_src=twsrc%5Etfw">@grafana</a>. Everything is going to be running at <a href="https://twitter.com/Raspberry_Pi?ref_src=twsrc%5Etfw">@Raspberry_Pi</a>. Follow my progress.❤️</p>&mdash; Ivana Huckova (@ivanahuckova) <a href="https://twitter.com/ivanahuckova/status/1225733533597159424?ref_src=twsrc%5Etfw">February 7, 2020</a>
</blockquote>

Click on the tweet above to see the full thread of all tweets she did that day.

Oh, Ivana? Did you know we have Grafana available as an add-on? You can find it in the Home Assistant add-on store.

## Got a tip for the next edition?

Have you seen (or made) something awesome, interesting, unique, amazing, inspirational, unusual or funny, using Home Assistant?

[Click here to send us your Community Highlight suggestion](/suggest-community-highlight).

Also, don't forget to share your creations with us via Social Media:

- Twitter it! Be sure to mention [@home_assistant][twitter]
- Share it on our [Facebook group][facebook-group]
- Post it to our [subreddit][reddit]
- Tag [@homeassistant][instagram] on Instagram
- Or via chat, drop us a line in the [#lounge at Discord][chat]

See you next edition!

[chat]: https://www.home-assistant.io/join-chat
[facebook-group]: https://www.facebook.com/groups/HomeAssistant/
[instagram]: https://www.instagram.com/homeassistant/
[reddit]: https://www.reddit.com/r/homeassistant
[twitter]: https://www.twitter.com/home_assistant
