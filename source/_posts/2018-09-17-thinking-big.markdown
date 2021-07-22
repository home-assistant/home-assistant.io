---
title: "Thinking Big"
description: "Today we're turning 5 years old. It's time to set some goals."
date: 2018-09-17 01:01:00
date_formatted: "September 17, 2018"
author: Paulus Schoutsen
author_twitter: balloob
categories: Announcements
og_image: /images/blog/2018-09-thinking-big/social.png
---

Today marks the 5th anniversary of Home Assistant. I want to spend this post not only reflecting on the last 5 years, but also look at what is ahead of us, where we want to go, what we want Home Assistant to be.

Home Assistant wasn’t born out of ideology. I built it because I got some smart lights and wanted to script them. I made that script open source and it went from there. As Home Assistant has grown, so has the world around us, and so have I.

A lot of IoT products have been introduced since Home Assistant started. Sadly, the trend in these products is to send all data to the cloud and manage your house from there. I’ve come to realize that it’s not in the big corporations interest to make a product that focuses on privacy and local control. Our data is too useful for them.

I don’t like this trend. I don’t like seeing more and more of our data being hoarded by a few giant companies, centralizing it in a few systems and using it to influence how we’ll be treated online. It’s our lives, our data, and we should be in control. Not some algorithm optimized for engagement.

And so I want to introduce a goal for Home Assistant. A goal that will shape how the platform will evolve in the upcoming years.

<!--more-->
## The goal

It’s our goal to create a people focused home automation platform. A platform that is open source and which prioritizes privacy and local control.

 - **Privacy.** All your data will be stored locally.
 - **Local control.** All logic will run locally. The cloud will only be invoked as needed.
 - **Open source.** The platform is freely available for users and companies alike. The more people that choose a privacy focused platform over a cloud-based one is a win for us.
 - **Interoperability.** The platform implements APIs to easily share the data. We want your data to be available to any other application that you wish.

## What we’re going to build to achieve this goal

Many things! However, here is a list of things that I am most enthusiastic about:

 - Remote connection to your instance to control Home Assistant while being away. We will use end-to-end encryption to ensure that the cloud can’t read your data. Powered by Home Assistant Cloud so you just have to log in and it will work. This is the next feature to be worked on for the cloud.
 - Attribution. We’ve recently added both users and context. Next up is making it visible in the logbook which user was responsible for what change.
 - Permissions. Using the same user and context features, we will also be able to limit access to entities to users.
 - Improved device management. We’ve recently added devices to Home Assistant. As a user, you will be able to place devices in areas, see which entities are part of a device and make sure your entities are up to date.
 - Accessibility. We want to make Hass.io run on as many devices as possible, making it very easy for people to get started with a private home.
 - Integrate Mozilla's [Web Things API] to make it easier to interact with other home automation platforms. The introduced device management makes it perfectly aligned with the Web Things data model.
 - Cloud Transparency. We want to make it visible what data is being shared with Amazon Alexa and Google Home clouds.
 - Better Z-Wave. Our current integration has room for improvement. The owner of Z-Wave has announced a public SDK, which we should explore to integrate with Home Assistant.

## What we need to achieve this goal

Home Assistant has grown beyond what we can expect from people to handle in their spare time. We want to keep the community friendly, our code quality high, our upgrades smooth, our documentation up to date and our platform secure.

In Ubiquiti we’ve found a great partner with aligned goals. They hired me in April to work full-time on Home Assistant which has already resulted in great progress – including some of the enhancements listed above. But one full-time employee is not enough.

So I have started a new company to raise money and help Home Assistant achieve its goals: [Nabu Casa, Inc][nabu-home]. The company will run Home Assistant Cloud for a $5/month subscription. The revenue will be used to extend the cloud functionality, finance the infrastructure of the Home Assistant website and community, and pay full-time employees to contribute to Home Assistant to reach its goals.

<div style='max-width: 250px; margin: 0 auto'><img src='/images/blog/2018-09-thinking-big/logo-text.svg' style='border: 0; box-shadow: none' alt='Logo of Nabu Casa, Inc'>
</div>

Nabu Casa, Inc. will only be funded by its subscribers. That way it is guaranteed that we will do what is best for our users, the ones that provide the money. We will not raise any money from investors. Big money tends to care more about making more money than humans and privacy. We need to stay in control to ensure our goals are met.

If you have been a user of Home Assistant Cloud for the last 9 months, we want to thank you for being part of our open beta. All members of the open beta will be automatically enrolled in the free trial and will be able to use Home Assistant Cloud for one more month till October 17, no changes in Home Assistant necessary. If you haven’t entered any payment information by the end of the trial, you will lose access to Home Assistant Cloud.

More information:

 - [Nabu Casa, Inc homepage][nabu-home]
 - [Manage your Home Assistant Cloud account][nabu-account]

## FAQ

### Do I have to pay to use Home Assistant and Hass.io?

No. Home Assistant is open source and free to install and this will not change. Only the cloud service will be part of a paid subscription.

### Will Home Assistant and Hass.io remain open source?

Yes. Nabu Casa will only be responsible for Home Assistant Cloud and it will contribute resources to help Home Assistant achieve its goals and pay for its infrastructure.

### Why not take donations?

Relying on donations makes budgeting for employees impossible without exposing them and their families to the risk of not getting a paycheck at the end of the month.

### Is Home Assistant Cloud open source?

The majority of Home Assistant Cloud is open source. The Alexa skill source code is [here](https://github.com/home-assistant/home-assistant/blob/dev/homeassistant/integrations/alexa/smart_home.py) (with manual setup instructions [here](https://github.com/mike-grant/haaska/)) and the Google Assistant source code is [here](https://github.com/home-assistant/home-assistant/blob/dev/homeassistant/integrations/google_assistant/smart_home.py) (with manual setup instructions [here](/integrations/google_assistant/)). Our account page and relayer are not open source.

### Will you offer a lifetime plan for a one time fee?

No. A lifetime plan to a cloud service is a pyramid scheme. It means new subscribers pay for the costs of the lifetime customers.

### I think the price is too high for what I get

New features will be added in the future without a price increase. The next feature we’re planning to release is encrypted remote access to your instance.

The subscription fee does not only cover the cost of running Home Assistant Cloud. The revenue will also be used to pay for the infrastructure of running Home Assistant and the community forums.

[nabu-home]: https://www.nabucasa.com
[nabu-account]: https://account.nabucasa.com
[Web Things API]: https://iot.mozilla.org/wot/
