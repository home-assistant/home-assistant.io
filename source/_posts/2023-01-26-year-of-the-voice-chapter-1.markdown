---
layout: post
title: "Year of the Voice - Chapter 1: Assist"
description: "Assist is the new feature in Home Assistant to handle all your conversations."
date: 2023-01-26 00:00:00
date_formatted: "January 26, 2023"
author: Paulus Schoutsen
comments: true
categories: Assist
og_image: /images/blog/2023-01-26-year-of-the-voice-chapter-1/social.png
---

This year is Home Assistant's [year of the voice](https://www.home-assistant.io/blog/2022/12/20/year-of-voice/). It is our goal for 2023 to let users control Home Assistant in their own language. Today, one month into 2023, we start our first chapter.

At Home Assistant we believe that technology is meant to be played with, and projects should be usable as soon as possible. Together with the community we can then iterate and refine. That's why today, we're delivering a basic experience for 22 languages to interact with Home Assistant. Oh, and we are also releasing some fun stuff that we cooked up along the way.

_To watch the video presentation of this blog post, including live demos, check [the recording of our live stream](https://www.youtube.com/live/ixgNT3RETPg)._

## Intentions

The core of a voice assistant is to be able to understand the intention of a spoken sentence. What is it the user wants to do? To extract these intentions we created our own template sentence matching format and intent recognizer named [Hassil](https://github.com/home-assistant/hassil).

This new format is used by our new [Home Assistant Intents](https://github.com/home-assistant/intents) project. The goal of this project is to collect home automation sentences in every possible language. Since it's start a month ago, we have had 112 people contribute. The project now supports [22 languages and 14 more are in progress](https://home-assistant.github.io/intents/).

## Assist

We have added a new feature to Home Assistant: <img src='/images/assist/assist-icon.svg' alt='Assist icon' style='height: 32px' class='no-shadow'> Assist. It allow users to use natural language to control Home Assistant. It is powered by Hassil and the sentences from the Home Assistant Intent project.

<!--more-->

We want Assist to be as accessible to as many people as possible. To do this, we made it work without requiring extra hardware – just update to Home Assistant 2023.2 and you can start! Through a combination of smart algorithms combined with sheer brute force (we are collecting a lot of sentences), we have been able to make a system that works for most common sentences. Support for more powerful, AI-powered, intent recognizers might come in the future as an opt-in feature.

Assist is enabled by default in the Home Assistant 2023.2 release. Tap the new Assist icon <img src='/images/assist/assist-icon.svg' alt='Assist icon' style='height: 32px' class='no-shadow'> at the top right of the dashboard to use it.

[Assist documentation.](https://www.home-assistant.io/voice_control/)

<img src="/images/blog/2023-01-26-year-of-the-voice-chapter-1/assist-dialog.png" alt="Screenshot of the Assist dialog" class='no-shadow' />

## Assist on Android Wear

We want to make it as easy as possible to use Assist. To enable this for Android users, we have added a new tile to the Android Wear app. A simple swipe from the clock face will show the assist button and allows you to send voice commands.

[Assist on Android Wear documentation.](https://www.home-assistant.io/voice_control/android/)

_The tile is available in [Home Assistant Companion for Android 2023.1.1](https://play.google.com/store/apps/details?id=io.homeassistant.companion.android&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1)._

<lite-youtube videoid="Dr_ZCbt8w5k" videotitle="Assist on Android Wear"></lite-youtube>

## Assist via Siri and Apple Shortcuts

For Apple devices we have been able to create a fully hands-free experience by integrating with Siri. This is powered by a new Apple Shortcut action called Assist, which is part of the Home Assistant app. This shortcut action can also be manually triggered from your Mac taskbar, iPhone home screen or Apple Watch complication. We have two ready-made shortcuts that users can import from the documentation with a single tap to unlock these features.

[Assist via Siri and Apple Shortcuts documentation.](https://www.home-assistant.io/voice_control/apple/)

_The Assist shortcut is available in [Home Assistant Companion for iOS 2023.2](https://apps.apple.com/us/app/home-assistant/id1099568401?itsct=apps_box_badge&itscg=30200). Mac version is awaiting approval._

<lite-youtube videoid="sQ7X7jz1SrA" videotitle="Assist on Apple HomePod"></lite-youtube>

## Custom Sentences

With Home Assistant we believe that every home is uniquely yours and that [technology should adapt to you, not the other way around.](https://www.home-assistant.io/blog/2016/01/19/perfect-home-automation/) That's why we have architected Home Assistant to allow users to extensively customize their experience. Our Assist feature is no different.

- Are you into Game of Thrones and want every response to be "hodor"?
- Want to turn on lights in rooms by saying "Hocus pocus living room"?
- Want to trigger your party mode script using a custom sentence?

Assist includes support for custom sentences, responses and intents, allowing you to achieve all of the above, and more. We've designed the custom sentence format in a way that it can be easily shared with the community.

Read [the documentation](https://www.home-assistant.io/voice_control/custom_sentences) on how to get started.

_In a future release we're planning on adding a user interface to customize and import sentences._

## Custom Assist engines

By default Assist is powered by our own intent recognizer. It is local but it's limited to controlling devices. Maybe you want to be able to ask more wide-range queries or you are looking for a conversational AI that will make up responses and present it as the truth. For such cases the Assist feature supports [swapping out its engine](https://developers.home-assistant.io/docs/core/conversation/custom_agent) that handles all Assist interactions.

The Home Assistant 2023.2 release includes two alternative Assist engines that you can enable: Google Assistant and OpenAI GPT-3.

The Google Assistant Assist engine is able to control your devices if you have linked up your Home Assistant instance to Google Assistant.

All ways to intereact with Assist will work, as they are not bound to the the Assist engine that is being used. So if you ever wanted to use Google Assistant on your HomePod, now you can 🤭

<lite-youtube videoid="orgTMVy0TrI" videotitle="Google Assistant on Apple HomePod"></lite-youtube>

The OpenAI GPT-3 Assist engine will process all your interactions using GPT-3, a sibling of the infamous ChatGPT. It is not able to control your house or [help you automate your house](/blog/2023/01/23/help-others-leave-ai-at-the-dor/). Anything you ask it may or may not be factually correct. But it can be fun!

_In a future release we're planning to make it possible to configure multiple Assist engines to handle interactions._

## What's next

For Year of the Voice - Chapter 1 we focused on building intent recognition into Home Assistant while relying on Google and Apple to do the hard parts (speech recognition). This allowed us the fastest path to get something to the community to play with.

We will continue collecting home automation sentences for all languages ([anyone can help!](https://developers.home-assistant.io/docs/voice/intent-recognition/)). Updates will be included with every major release of Home Assistant.

Our next step is integrating speech-to-text and text-to-speech with Assist. We don't have a timeline yet when that will be ready. Stay tuned!
## Credits

A lot of people have worked very hard to make all of the above possible.

**Technology:**
[Mike Hansen](https://github.com/synesthesiam), [Paulus Schoutsen](https://github.com/balloob), [Daniel Shokouhi](https://github.com/dshokouhi), [Zac West](https://github.com/zacwest), [Rosemary Orchard](https://github.com/rosemaryorchard), [Tronikos](https://github.com/tronikos)

**Language Leaders:**
[@AalianKhan](https://github.com/AalianKhan), [@Ahmed-farag36](https://github.com/Ahmed-farag36), [@alpdmrel](https://github.com/alpdmrel), [@arunshekher](https://github.com/arunshekher), [@auanasgheps](https://github.com/auanasgheps), [@benjaminlecouteux](https://github.com/benjaminlecouteux), [@bluefoxlee](https://github.com/bluefoxlee), [@cibernox](https://github.com/cibernox), [@cvladan](https://github.com/cvladan), [@davefx](https://github.com/davefx), [@dinhchinh82](https://github.com/dinhchinh82), [@dsimop](https://github.com/dsimop), [@duhow](https://github.com/duhow), [@easterapps](https://github.com/easterapps), [@ErnestStaug](https://github.com/ErnestStaug), [@fadamsen](https://github.com/fadamsen), [@flexy2dd](https://github.com/flexy2dd), [@gabimarchidan](https://github.com/gabimarchidan), [@haim-b](https://github.com/haim-b), [@halecivo](https://github.com/halecivo), [@HepoH3](https://github.com/HepoH3), [@hertzg](https://github.com/hertzg), [@hristo-atanasov](https://github.com/hristo-atanasov), [@huusissa](https://github.com/huusissa), [@joaorgoncalves](https://github.com/joaorgoncalves), [@larsdunemark](https://github.com/larsdunemark), [@leranp](https://github.com/leranp), [@LubosKadasi](https://github.com/LubosKadasi), [@makstech](https://github.com/makstech), [@mojikosu](https://github.com/mojikosu), [@MTrab](https://github.com/MTrab), [@nagyrobi](https://github.com/nagyrobi), [@schizza](https://github.com/schizza), [@Scorpoon](https://github.com/Scorpoon), [@skynetua](https://github.com/skynetua), [@spuljko](https://github.com/spuljko), [@tetele](https://github.com/tetele), [@TheFes](https://github.com/TheFes), [@Uriziel01](https://github.com/Uriziel01), [@xraver](https://github.com/xraver), [@zubir2k](https://github.com/zubir2k)

**Voice Community:**
[@Alexivia](https://github.com/Alexivia), [@Atalonica](https://github.com/Atalonica), [@AwesomeGuy000](https://github.com/AwesomeGuy000), [@BossNeo](https://github.com/BossNeo), [@CedricFinance](https://github.com/CedricFinance), [@Davidsoff](https://github.com/Davidsoff), [@EmilZackrisson](https://github.com/EmilZackrisson), [@FragMenthor](https://github.com/FragMenthor), [@InfiniteBed](https://github.com/InfiniteBed), [@Kalma-House](https://github.com/Kalma-House), [@Licmeth](https://github.com/Licmeth), [@Marlo461](https://github.com/Marlo461), [@N3rdix](https://github.com/N3rdix), [@Nismonx](https://github.com/Nismonx), [@Robin-St](https://github.com/Robin-St), [@TaQuangTien](https://github.com/TaQuangTien), [@ThomDietrich](https://github.com/ThomDietrich), [@TomaszPilch](https://github.com/TomaszPilch), [@Wojciechgc](https://github.com/Wojciechgc), [@alessandroias](https://github.com/alessandroias), [@bemble](https://github.com/bemble), [@berendhaan](https://github.com/berendhaan), [@dejan2101](https://github.com/dejan2101), [@dependabot[@bot]](https://github.com/dependabot[@bot]), [@dobromir-hristov](https://github.com/dobromir-hristov), [@frenck](https://github.com/frenck), [@hugovsky](https://github.com/hugovsky), [@iddiek](https://github.com/iddiek), [@jfisbein](https://github.com/jfisbein), [@jharrvis](https://github.com/jharrvis), [@jorclaret](https://github.com/jorclaret), [@kamildoleglo](https://github.com/kamildoleglo), [@kblin](https://github.com/kblin), [@khymmera](https://github.com/khymmera), [@kroimon](https://github.com/kroimon), [@lellky](https://github.com/lellky), [@ludeeus](https://github.com/ludeeus), [@lukahra](https://github.com/lukahra), [@lunmay](https://github.com/lunmay), [@mardito](https://github.com/mardito), [@martindybal](https://github.com/martindybal), [@mib1185](https://github.com/mib1185), [@michaelmior](https://github.com/michaelmior), [@orrc](https://github.com/orrc), [@pckahrs](https://github.com/pckahrs), [@piitaya](https://github.com/piitaya), [@pmentis](https://github.com/pmentis), [@poltalashka](https://github.com/poltalashka), [@rPonuganti](https://github.com/rPonuganti), [@rechin304](https://github.com/rechin304), [@relust](https://github.com/relust), [@rickydg](https://github.com/rickydg), [@rpochot](https://github.com/rpochot), [@rrakso](https://github.com/rrakso), [@rumbu13](https://github.com/rumbu13), [@sanyatuning](https://github.com/sanyatuning), [@tasmin](https://github.com/tasmin), [@thecode](https://github.com/thecode), [@waltlillyman](https://github.com/waltlillyman), [@witold-gren](https://github.com/witold-gren), [@x15pa3ck15x](https://github.com/x15pa3ck15x), [@yuvalabou](https://github.com/yuvalabou)
