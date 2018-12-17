---
layout: post
title: "Logitech Harmony removes local API"
description: "Logitech has disabled the local API of the Harmony Hub with their latest software update. For privacy and speed it is important that home automation devices communicate locally, without data leaving the network."
date: 2018-12-17 00:01:00
date_formatted: "December 17, 2018"
author: Paulus Schoutsen
author_twitter: balloob
comments: true
categories: Public-Service-Announcement
---

Logitech has disabled the local API of the Harmony Hub with their latest software update (v4.15.206). For privacy and speed it is important that home automation devices communicate locally, without data leaving the network. With the latest update to the Logitech Harmony Hub, this is no longer possible.

We hope that this was an oversight on their end and that it will be reverted shortly. We have reached out to Logitech for a clarification and will update this post when available. Update: still no response but Twitter user [@FlorianNoack](https://twitter.com/FlorianNoack/status/1074744105002037248?s=09) found an answer from Logitech on [a thread on their forums](https://community.logitech.com/s/question/0D55A00008D1oIoSAJ/firmware-update-blocked-api-access) (visible after clicking a few times on "More answers"):

<p class='img'>
  <img src='/images/blog/2018-12-logitech-harmony-removes-local-api/forum-post.png' alt='Screenshot of a forum post by a Logitech employee saying that the Harmony team is aware of the feedback and it will provide an update shortly.'>
  Forum post by member of the Harmony Team.
</p>




If you have already updated your Harmony Hub to v4.15.206, you have probably noticed that Home Assistant and other products communicating with the local API have stopped working. Don’t worry, it’s (still?) possible to downgrade to a previous version using the following steps (source: [Reddit 1](https://www.reddit.com/r/homeassistant/comments/a6u6ep/psa_harmony_hub_firmware_v415206_breaksremoves/), [Reddit 2](https://www.reddit.com/r/homeassistant/comments/a6u6ep/psa_harmony_hub_firmware_v415206_breaksremoves/eby89t8/)):

1. Download the [MyHarmony Computer Application](https://support.myharmony.com/en-us/download).
2. Launch the MyHarmony app.
3. Before clicking anywhere inside the window:
   - Windows users: Press Alt+F9.
   - Mac users: Press Fn+Option+F9 or Option+F9 (depending on Mac model, either one will work).
4. Scroll the window to find your Harmony model.
5. Select "Factory Reset" for the appropriate model. This does not do anything immediately.
6. Steps 1-4 will be displayed for completing a Factory Reset. We are only doing Step 1. "Restore" here means "Rollback".
7. Connect your Harmony hub to the PC via micro-USB.
Within a few minutes, it will be detected by MyHarmony and display Remote Model, Firmware Version, and Hardware revision. The Restore 1. button will be enabled.
8. Click "Restore" and wait. (Now is the first time that it actually describes that it's a rollback!)
9. When it completes, you should be on Firmware Version 4.15.193. Disconnect the hub from the PC and return it to its original location.
And the final, important step: eliminate the ability for the Harmony hub to access these domains, or the internet altogether. I used 1. DD-WRT's Access Restrictions feature to disable all internet access, because my specific implementation is entirely intranet-based. YMMV.
    - svcs.myharmony.com
    - content.dhg.myharmony.com
    - logging.dhg.myharmony.com
    - myharmony.com
    - sus.dhg.myharmony.com


Until this is resolved, we will no longer recommend buying or using Logitech products.
