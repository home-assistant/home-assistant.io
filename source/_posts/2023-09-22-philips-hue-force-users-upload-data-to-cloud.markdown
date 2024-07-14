---
title: "[Update Oct 2: data sharing to become optional] Philips Hue will force users to upload their data to Hue cloud"
description: "To control your lights you soon need to create an account and share your data with the Hue cloud."
date: 2023-09-22 0:0:00
date_formatted: "September 22, 2023"
author: Paulus Schoutsen
author_twitter: balloob
comments: true
categories: Public-Service-Announcement
og_image: /images/blog/2023-09-hue-upload-user-data-cloud/social.png
---

**Update Oct 2:** In a [conversation with The Verge](https://www.theverge.com/2023/9/28/23892761/philips-hue-app-account-changes), Philips Hue has announced that they will update their privacy policy to require users to consent to share their usage data with Philips Hue.

_Original Post_

Today’s story is about Philips Hue by Signify. They will soon start forcing accounts on all users and upload user data to their cloud. For now, Signify says you’ll still be able to control your Hue lights locally as you’re currently used to, but we don’t know if this may change in the future. The privacy policy allows them to store the data and share it with partners.

Last week I wrote how toying with the first Philips Hue hub and their local API led me to [start Home Assistant back in 2013](/blog/2023/09/17/10-years-home-assistant/). They have played an important role in my smart home and they were a role model for [our Open Home vision](/blog/2021/12/23/the-open-home/). Sure, they are expensive but they work reliably, have a local API, can be used completely offline, and you don’t have to share your data with the cloud.

But things are changing, for the worse. When you open the Philips Hue app you will now be prompted with a new message: _Starting soon, you’ll need to be signed in._

<p class='img'>
<img src='/images/blog/2023-09-hue-upload-user-data-cloud/hue-screenshot-account.png'>
Left: A new tip informs users that they soon need to login.<br>
Right: the screen shown when clicking learn more
</p>

<!--more-->
When you create an account with Hue, you get the ability to control your lights while away from home using their mobile app. This feature works by uploading your data to the Hue cloud such that the mobile app can reach it. Their privacy policy allows them to store this data and share it with their partners.

Creating a Hue account has been an option for a long time, but it was always an option. Many Home Assistant users preferred not to create an account and remain private, and purchased Hue devices because it allowed this.

**So today, you can choose to not share your information with Signify by not creating an account. But this choice will soon be taken away and all users need to share their data with Philips Hue.**

## Confirming the news

I didn’t want to cry wolf, so I decided to verify the above statement with Signify. They sadly confirmed:

<p class='img'>
<img src='/images/blog/2023-09-hue-upload-user-data-cloud/tweet-confirm-account.png'>
Twitter conversation with Philips Hue (source: <a href='https://twitter.com/home_assistant/status/1704662981219348702'>Twitter</a>)
</p>

The policy they are referring to is their [privacy policy](https://www.philips-hue.com/en-us/support/legal/privacy-policy) (April 2023 edition, [download version](https://www.philips-hue.com/en-us/support/legal/privacy-policy?origin=13_care-engagement-response_twitter_11374728903&linkId=236485638#versionhistory)). It shows that user data will be stored for as long as the account remains active, and that it will be shared with partners. I was unable to find an inactive user policy.

> WHAT TYPES OF DATA DO WE COLLECT ABOUT YOU?
>
> [...]
>
> If you connect a product, this will form part of your Philips Hue Account.
>
> [...]
>
> HOW LONG DO WE KEEP YOUR DATA?
>
> [...]
>
> Do you have an account with us? In this case, we will keep your data while your account is active or for as long as needed to provide the product functionalities to you.

When asked what drove this change, the answer is the usual: security. Well Signify, you know what keeps user data even more secure? Not uploading it all to your cloud. Just allow a smart home to talk to Hue using the local API or Matter.

<p class='img'>
<img src='/images/blog/2023-09-hue-upload-user-data-cloud/hue-tweet-lie-security.png'>
Source: <a href='https://twitter.com/tweethue/status/1704590580355854398'>Twitter</a>
</p>

## It’s not too late

Currently Philips Hue is announcing this change in their app and users are not forced yet to turn over all their data. We have contacted Signify privately to bring this issue to their attention but they have not responded.

As a user, we encourage you to reach out to [Signify support](https://www.philips-hue.com/en-us/support/contact-form) and voice your concern.

Dear Signify, please reconsider your decision and do not move forward with it. You’ve [reversed bad decisions before](/blog/2015/12/12/philips-hue-blocks-3rd-party-bulbs/). People care about privacy and forcing accounts will hurt the brand in the long term. The pain caused by this is not worth the gain.
