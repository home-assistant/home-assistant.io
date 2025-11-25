---
title: "[Update: resolved, API reinstated and commitment to keep it around] Logitech Harmony removes local API"
description: "Logitech has disabled the local API of the Harmony Hub with their latest software update. For privacy and speed it is important that home automation devices communicate locally, without data leaving the network."
date: 2018-12-17 00:01:00
date_formatted: "December 17, 2018"
author: Paulus Schoutsen
author_twitter: balloob
categories: Public-Service-Announcement
---

**Update 6 (21 dec):** Great news! Logitech has [announced in a forum post](https://community.logitech.com/s/question/0D55A00008D4bZ4SAJ/harmony-hub-firmware-update-fixes-vulnerabilities) that it has introduced an XMPP Beta Program that makes it possible to install a developer firmware version which reinstates the XMPP API as it was, including the security vulnerabilties. Note that installing this version voids your warranty.

Logitech is also working on a new version of the hub firmware that fixes the vulnerabilities. This is great and this restores our trust in Logitech. Thanks Logitech for turning around and working with your users.

<p class='img'>
  <img src='/images/blog/2018-12-logitech-harmony-removes-local-api/firmware.png' alt='Screenshot of the developer-only firmware reinstating the local XMPP API. Also includes a disclaimer that it voids your warranty.'>
  The developer-only firmware that reinstates the local XMPP API. Voids warranty if installed.
</p>

Tenable, the cyber security firm that discovered the security vulnerabilities, has released [a Research Advisory](https://www.tenable.com/security/research/tra-2018-47) detailing the issues and the disclosure timeline.

**Update 7 (21 dec):** Even better news! Someone from Harmony posted [in our forums](https://community.home-assistant.io/t/logitechs-stance-on-local-apis/85842/18?u=balloob) and stated that they are now committed to maintaining their local XMPP API.

We will verify with Logitech if this post is official, and if so, we will revert the Home Assistant implementation back to using the XMPP API. Until then, we don't expect the websocket API that we are using since 0.84.3 to go away or change until we migrate back, so if your Harmony setup works today, don't change anything. (Verified, it's from an account connected to a logitech.com email address)

<p class='img'>
  <a href='https://community.home-assistant.io/t/logitechs-stance-on-local-apis/85842/18?u=balloob'><img src='/images/blog/2018-12-logitech-harmony-removes-local-api/forum-post-5.png' alt='Screenshot of someone from Harmony stating that they are going to keep the local XMPP API around.'></a>
  Forum post by Harmony employee on the Home Assistant forums.
</p>

_Original Post:_

<!--more-->

Logitech has disabled the local API of the Harmony Hub with their latest software update (v4.15.206). For privacy and speed it is important that home automation devices communicate locally, without data leaving the network. With the latest update to the Logitech Harmony Hub, this is no longer possible.

We hope that this was an oversight on their end and that it will be reverted shortly. We have reached out to Logitech for a clarification and will update this post when available. Until this is resolved, we no longer recommend buying or using Logitech products.

**Update 1 (17 dec):** still no response on our inquiries but Twitter user [@FlorianNoack](https://twitter.com/FlorianNoack/status/1074744105002037248?s=09) found an answer from Logitech on [a thread on their forums](https://community.logitech.com/s/question/0D55A00008D1oIoSAJ/firmware-update-blocked-api-access) (visible after clicking a few times on "More answers"):

<p class='img'>
  <a href='https://community.logitech.com/s/question/0D55A00008D1oIoSAJ/firmware-update-blocked-api-access'><img src='/images/blog/2018-12-logitech-harmony-removes-local-api/forum-post.png' alt='Screenshot of a forum post by a Logitech employee saying that the Harmony team is aware of the feedback and it will provide an update shortly.'></a>
  Forum post by member of the Harmony Team.
</p>

**Update 2 (18 dec):** the same employee now [created a new post on their forums](https://community.logitech.com/s/question/0D55A00008D2zYDSAZ/harmony-hub-fw-415206) (we assume for more visibility). Message is still that more details will follow soon.

<p class='img'>
  <a href='https://community.logitech.com/s/question/0D55A00008D2zYDSAZ/harmony-hub-fw-415206'><img src='/images/blog/2018-12-logitech-harmony-removes-local-api/forum-post-2.png' alt='Screenshot of a forum post by a Logitech employee saying that a few customers are experiencing issues with certain configurations and that they follow up soon with more details.'></a>
  Thread by member of the Harmony Team.
</p>

**Update 3 (18 dec):** Twitter user [@ChadBeattie](https://twitter.com/ChadBeattie/status/1074770135121125376) has discovered that there seems to be a second undocumented local API that is being used by the Logitech Harmony iOS app. Home Assistant developer [@ehendrix23] is looking into updating the PyHarmony library to use this. Join #devs_backend on [our chat](/join-chat/) if you want to help with development. We can't guarantee that it will work, but if we can get it to work, we will do a hot fix release.

[@ehendrix23]: https://github.com/ehendrix23

**Update 4 (18 dec):** No word from Logitech yet on the future of the XMPP-based local API. Home Assistant developer [@ehendrix23], with the help of [@chadcb] and other amazing people in the comments to this post, did manage to figure out how the local websocket API works for the Logitech Harmony, which is also used by the Logitech Harmony iOS app. There is now an open [pull request for Home Assistant](https://github.com/home-assistant/home-assistant/pull/19440) to update the Harmony integration to use it. This PR is currently being tested, and if all works well, will be released as a hot fix on the 19th.

<p class='img'>
  <a href='https://github.com/home-assistant/home-assistant/pull/19440'><img src='/images/blog/2018-12-logitech-harmony-removes-local-api/pull-request.png' alt='Screenshot of GitHub.com showing a pull request to Home Assistant to update their Logitech Harmony integration to use the local websocket API.'></a>
  Pull Request by [@ehendrix23] to use the local websockets-based API.
</p>

[@chadcb]: https://github.com/chadcb

**Update 5 (19 dec):** Logitech has posted an official response on [their forums](https://community.logitech.com/s/question/0D55A00008D4bZ4SAJ/harmony-hub-firmware-update-fixes-vulnerabilities). They claim that they removed the local XMPP API after a report from a third-party cyber security firm. We have been unable to verify if this is true. The XMPP API has been around since [at least 2013](https://github.com/jterrace/pyharmony) and has been widely adopted within smart homes worldwide. In their forum post they write that they are aware it was being used, yet they did not consider giving any form of heads up, proofing to be an unreliable part of our smart homes.

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">We have no plans to reenable access to private APIs</p>&mdash; Todd Walker (@ToddW_Logitech) <a href="https://twitter.com/ToddW_Logitech/status/1075225822850560000?ref_src=twsrc%5Etfw">December 19, 2018</a>
</blockquote>

We will be releasing a hot fix today to migrate our integration to another local API that is being used by their iOS app. Expect it to suffer the same faith at a future point.

<p class='img'>
  <a href='https://community.logitech.com/s/question/0D55A00008D4bZ4SAJ/harmony-hub-firmware-update-fixes-vulnerabilities'><img src='/images/blog/2018-12-logitech-harmony-removes-local-api/forum-post-3.png' alt='Screenshot of a forum post by a Logitech employee saying that the local API was removed after a report from a third-party cyber security firm.'></a>
  Thread by member of the Harmony Team.
</p>

**Update 6 (19 dec):** Home Assistant 0.84.4 has been released with a fix. The Logitech Harmony integration works again (for now?). We switched to their local websocket API.

### Reverting the software update

{% note %}
If you're using Home Assistant, consider upgrading to 0.84.4 instead of downgrading your hub.
{% endnote %}

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
1. Click "Restore" and wait. (Now is the first time that it actually describes that it's a rollback!)
2. When it completes, you should be on Firmware Version 4.15.193. Disconnect the hub from the PC and return it to its original location.
And the final, important step: eliminate the ability for the Harmony hub to access these domains, or the internet altogether. I used 1. DD-WRT's Access Restrictions feature to disable all internet access, because my specific implementation is entirely intranet-based. YMMV.
    - svcs.myharmony.com
    - content.dhg.myharmony.com
    - logging.dhg.myharmony.com
    - myharmony.com
    - sus.dhg.myharmony.com
