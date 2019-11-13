---
title: "Control My Christmas Tree Stats"
description: "I used Home Assistant for a publicly controllable Christmas tree and it worked great!"
date: 2017-01-03 18:00:00 +0000
date_formatted: "January 3, 2017"
author: Ben
author_twitter: bruhautomation
categories: Community
og_image: /images/blog/2017-01-bruh-christmas/christmas-tree.gif
---

Hello and Happy New Year!

I am not Paulus. My name is Ben. I'm the creator of the [BRUH Automation YouTube channel][bruh]. If you've ever seen any of my videos then you'll know I love home automation and Home Assistant. 

I wanted to share some exciting stats from one of my latest projects - [Control My Christmas tree!](https://github.com/bruhautomation/BRUH-Christmas-Tree-2016) For this project, I created a Home Assistant instance on a Raspberry Pi 2 that was publicly accessible via DuckDNS. Paulus was great in helping me disable several of the developer services that could have been exploited to disable the Home Assistant instance. 

I added three devices to the Home Assistant instance - a Wemo Insight, Sonoff Switch (running MQTT firmware), and a DIY MQTT Digital LED strip. After adding a few 3D printed Star War decorations, the tree was ready to go! 

<p class='img'>
  <img src='/images/blog/2017-01-bruh-christmas/christmas-tree.gif'>
  The Christmas tree in action.
</p>

<!--more-->
During the time by tree was set up, I had 7,366 visitors from 88 countries connect to my Home Assistant instance. This generated an estimated 100,000 clicks on the switches in my Home Assistant instance - thanks in part to some folks who posted up with macros for 6-8 hour stretches. 

<p class='img'>
  <img src='/images/blog/2017-01-bruh-christmas/stats.png'>
  View counts of the video.
</p>

I'm very excited to report that Home Assistant didn't crash a single time. In fact, it didn't even bog down or need to be restarted. The Wemo Insight and Sonoff relays were incredibly resilient, as well. I only had one Sonoff failure and two Wemo Insight failures both of which were resolved by power cycling them. The digital LED strips also fared pretty well, hanging up only twice, aside from a loose connector.

I would like to send a big thank you to the Home Assistant developers who have worked so hard on making Home Assistant run so well. This project is a testament to your hard work on making Home Assistant one of the best home automation platforms out there. Thank you!

I’m looking forward to continuing my home automation adventures with Home Assistant and I can't wait for next Christmas with an even bigger and badder tree. :) 

Wishing everyone the best in 2017!

Cheers! -Ben

[bruh]: https://www.youtube.com/channel/UCLecVrux63S6aYiErxdiy4w
