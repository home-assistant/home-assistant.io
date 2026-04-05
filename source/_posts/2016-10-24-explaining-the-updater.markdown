---
title: "Explaining the Updater"
description: "An update to the recent updater component changes"
date: 2016-10-25 21:30:00 UTC
date_formatted: "October 25, 2016"
author: Paulus Schoutsen
author_twitter: balloob
categories: Organization
---

On Saturday, we released [Home Assistant 0.31][0.31] which includes an improved updater component that checks for new versions using the Home Assistant servers. We wanted to update the community on its rollout and answer some questions that have come up. As part of the update check anonymous information about your operating system and Python version is submitted to Home Assistant servers unless you have opted out.

<!--more-->
## Why we changed the updater
This change was driven by two important factors.

### Improving the security of the users.

As a user, you will be able to be notified if you are running a Home Assistant version that includes components that have known security flaws.

Although we hope to not have to use this feature often, it is important for us to be able to reach out to impacted users. We had the need for such a feature once in the past. Due to a bug the forecast.io sensor was making a huge amount of API requests causing some of our users to get charged because they went over the free quota.

Please note that this functionality is not done yet but will be available in a future release.

### Focusing our resources where it matters

As developers of Home Assistant, we will be able to see in what kind of environments Home Assistant is running. Here’s a few data points we didn’t have until now:

- Total number of instances
- Which operating systems versions and flavors are in use
- Python version
- What option is more popular: Docker, Virtualenv or bare metal installs?
- How popular is our new [Raspberry Pi image][rpi-image]?


## Why we look up your IP address with GeoIP
We store the city so that we can see where our users are from. This information will be used to give us a better insight in where our users are from. This will help us gather data to see if we should for example prioritize internationalization. In addition, we previously had a nasty bug with the `sun` component in which users above a certain latitude were having crashes multiple times a day. Had the updater component been in place we could have targeted a special priority update notification only to them.

As stated in the release blog post, the location information is _not_ provided by your local Home Assistant installation but is instead gathered by comparing your IP address against the [GeoLite2 data created by MaxMind][geolite]. From their documentation:

> IP geolocation is inherently imprecise. Locations are often near the center of the population. Any location provided by a GeoIP database should not be used to identify a particular address or household.

## Why is it enabled by default
We decided to have it enabled by default because we consider the information that is gathered not harmful. We understand that not everyone will agree with us and so we have provided [multiple ways to opt out][opt-out].

It is in our short-term planning to add an option to control this to our frontend.

[0.31]: /blog/2016/10/22/flash-briefing-updater-hacktoberfest/#comment-2965607849
[geolite]: https://dev.maxmind.com/geoip/geoip2/geolite2/
[opt-out]: /integrations/updater/
[rpi-image]: /blog/2016/10/01/we-have-raspberry-image-now/
