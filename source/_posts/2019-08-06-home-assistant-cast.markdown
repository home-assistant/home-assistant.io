---
title: "Home Assistant Cast"
description: "Show Home Assistant on a Chromecast or Google Assistant device with screen."
date: 2019-08-06 01:11:03
date_formatted: "August 6, 2019"
author: Paulus Schoutsen
author_twitter: balloob
categories: Announcements
og_image: /images/blog/2019-08-home-assistant-cast/social.png
---

<p class='img'>
<img src='/images/blog/2019-08-home-assistant-cast/hero.png' alt='Picture of a Google Nest Hub with the Home Assistant UI on it.'>
</p>

Home automation itself has never been a goal of Home Assistant. Instead, it's a tool that allows us to have technology improve our life, and that of the people around us. I wrote about this [3,5 years ago](https://www.home-assistant.io/blog/2016/01/19/perfect-home-automation/), and it's been our guiding principle in building out Home Assistant.

Today we're introducing Home Assistant Cast to help with this. With Home Assistant Cast, people in your house can have quick access to see the state of your house and its residents, and quickly adjust the most important settings. This is achieved by running on Chromecast powered screens that you already have throughout your house: your Google Nest Hubs and TVs.

You can launch Home Assistant Cast by going to [**the Home Assistant Cast launcher website**](https://cast.home-assistant.io). It works with any version of Home Assistant released in the last year. Home Assistant Cast can show any Lovelace view, including support for custom cards and themes. Got no Lovelace configuration? Don't worry, we'll generate a view and show that instead.

For a demo, also check out the [Home Assistant Cast launcher](https://cast.home-assistant.io). If you have any questions, make sure to check the [Frequently Asked Questions](https://cast.home-assistant.io/faq.html).

## How it works

You need to authorize Home Assistant Cast to access your Home Assistant instance. Once it's authorized, you can start Home Assistant Cast on your Chromecast device. Next, your Chromecast device will set up a direct connection to your Home Assistant instance and give you the option to pick a view to display.

Home Assistant Cast can:

- Render Lovelace views, including custom cards.
- Stream real-time data to make sure that the UI always shows the latest state of your house.
- Navigate between views using navigate actions inside an entities card or using weblinks.
- Instantly update the casted Lovelace UI when you update your Lovelace configuration.

## About touch

We have been able to get touch controls working on the Google Nest Hub and other Google Assistant devices with a screen. The available configuration options to indicate that we're a touch-optimized app [did not work](https://github.com/home-assistant/home-assistant-polymer/blob/98b882d5991e05fae7962d96e5d0f7a5ae773a5b/cast/src/receiver/entrypoint.ts#L18-L30). We were still able to achieve touch controls by [manipulating code](https://github.com/home-assistant/home-assistant-polymer/blob/98b882d5991e05fae7962d96e5d0f7a5ae773a5b/cast/src/receiver/layout/hc-main.ts#L200-L206) that is injected into the Home Assistant Cast website when the Chromecast runs our receiver application.

There is no guarantee that touch controls will keep working, it might be blocked. It might stop this week, next month, next year, or it keeps working forever.

I hope that by releasing it with touch controls enabled, we can show Google that this is something that people want, and are willing to invest in for just this reason.

**To make sure everyone sees it, I encourage people to share photos and videos of Home Assistant Cast in action on Twitter, Facebook, YouTube and other social media with the hashtag `#homeassistantcast`. Let's share the love!**

## Coming soon and future plans

On August 7, Home Assistant 0.97 will be released. This release will allow launching Home Assistant Cast from the Home Assistant frontend. You can do this by including a new `cast` row that can be placed inside an entities card.

```yaml
# Example entities card configuration
type: entities
entities:
  - type: cast
    name: Lights
    # The path of the view (or number)
    view: lights
    hide_if_unavailable: true
```

This is the first release of Home Assistant Cast, and so we focused on the minimum that was worthy of a release. We still have some more things planned:

- Allow starting Home Assistant Cast from Home Assistant itself (not a browser), as part of an automation or script. [This is live now since Home Assistant 0.99.](/integrations/cast/#home-assistant-cast)
- Use Home Assistant Cast as a text-to-speech target (inspired by [lovelace-browser-commander by @thomasloven](https://github.com/thomasloven/lovelace-browser-commander)).
