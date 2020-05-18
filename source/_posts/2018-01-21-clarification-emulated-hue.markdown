---
title: "Clarification about Emulated Hue"
description: "The Emulated Hue component is not going to be removed nor will we ever remove any functionality from Home Assistant to push you to subscribe to the Community Support Package."
date: 2018-01-21 01:00:00
date_formatted: "January 21, 2018"
author: Paulus Schoutsen
author_twitter: balloob
categories: Public-Service-Announcement
---

There are some misconceptions floating around about the future of the Emulated Hue component and I would like to set the record straight. **The Emulated Hue component is not going to be removed nor will we ever remove any functionality from Home Assistant to push you to support the Home Assistant project by subscribing to the Community Support Package.**

The reason people are concerned about the future of the Emulated Hue component is because of a poor choice of words in a deprecation message. This message was [introduced a year ago][pr2] when we deprecated the config option `type: alexa` for the Emulated Hue component:

> Alexa type is deprecated and will be removed in a future version

That config option should never have been called `type: alexa` but instead have been called `mode: legacy`. If you think about it, why would emulating something even have different modes it emulates based on the consumer? That means that one of the two emulation modes is incorrect.

The old implementation was not 100% correct. It was correct enough to work with Alexa (the original target) but not with Google Home. When fixing Emulated Hue we added `type: alexa` to re-enable the old implementation so that people did not have to go through the trouble to re-add their Alexa devices. The option was deprecated to indicate that we would remove the incorrect emulation in the future. However, we forgot about actually following through with that.

The mistake we made was calling the correct mode `google_home` although it had nothing to do with Google Home. It confused people and they kept adding `type: alexa` to their configuration, triggering the deprecation warning.

The warning will be updated starting Home Assistant 0.62 and will also include a link to this blog post.

More info:

- To read about what was incorrect in the first version of Emulated Hue, take a look at the PR fixing it: [Re-org emulated_hue and fix google home][pr1].
- Read the [documentation on how to configure Emulated Hue][eh-conf]

[pr1]: https://github.com/home-assistant/home-assistant/pull/4708
[pr2]: https://github.com/home-assistant/home-assistant/pull/5549
[eh-conf]: /integrations/emulated_hue/#configuration
