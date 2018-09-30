---
layout: post
title: "Participating in Hacktoberfest"
description: "Home Assistant will be participating in Hacktoberfest to help people to get started with Open Source."
date: 2018-09-30 08:00:00 +0000
date_formatted: "September 30, 2018"
author: Fabian Affolter
author_twitter: fabaff
comments: true
categories: Community
og_image: /images/blog/2018-09-hacktoberfest/hacktoberfest-2018.png
---

It's the end of September already, this means that October is around the corner and in October there will the [Hacktoberfest](https://hacktoberfest.digitalocean.com/). To celebrate and support Open Source are [DigitalOcean](https://www.digitalocean.com/), [Twilio](https://www.twilio.com/) and [GitHub](https://github.com/) again organizing this event. Home Assistant will be part of it like in the last two years.

We will collect a bunch of entry-level bugs, features and documentation enhancements which will get you started with contributing to an Open Source project in an easy way. If you submit five (5) Pull Requests during October, you will have earned yourself a limited edition Hacktoberfest T-shirt and a place on our credits list if you submit your Pull Requests for Home Assistant! Don’t worry you will be listed there no matter how many Pull Requests you made.

Hacktoberfest will create a lot of work us. In 2017 we processed 625 Pull Requests in our three main repository and some more for other parts of Home Assistant during October. We still only have limited resources and for this edition of Hacktoberfest we decided to set some rules. This will help us and keep your frustration level to a minimum.

**We want to focus on new contributors and people who want to get started with working on an Open Source project.**

## {% linkable_title Configuration %} General

- Fill out the Pull Request template.
- Check our code (lint and unit tests) before you submit your Pull Request.
- Pull requests which are not passing the CI usually get less or no attention.
- There is no guarantee that your Pull Request is processed during October. Sorry.
- We reserve the right to close Pull Requests with missing parts (see the Checklist in the Pull Request template), insufficient data or no response after they were submitted. The Pull Requests can always be re-opened later when you are ready or all elements are in place.


## {% linkable_title Home Assistant %}

- Get familiar with our [Style Guidelines](https://developers.home-assistant.io/docs/en/development_guidelines.html) and the existing code.
- Go through the [Developer documentation](https://developers.home-assistant.io).
- Keep your Pull requests small. One change per Pull request is faster to review than 19 changes. The same applies for new integrations. Start with the component and one platform. Add the other platforms later as this would get you feedback which you can incorporate in the coming platforms.
- Don’t forget the documentation. New integrations needs documentation and changes too. You know how it works but the users don’t.
- Architectural changes needs to be discussed before a change is proposed. Also, keep in mind that those kind of Pull Request may not be reviewed during October.
- If you update a dependency then you need to make sure that it will work. This means, provide the configuration sample and other details (used devices, firmware version, etc.).

## {% linkable_title Home Assistant Documentation %}

- Make yourself familiar with [Markdown](https://developers.home-assistant.io/docs/en/documentation_index.html).
- Understand our [Standards and Guidelines](https://developers.home-assistant.io/docs/en/documentation_standards.html).
- For small changes like typos and clarifications, use the GitHub editor functionality.
- For bigger changes we highly recommended that you setup an environment to build the documentation locally before opening a Pull Request.
- Keep an eye on the branches. `current` is for changes on the existing docs, `next` for features or new integrations that will be available with the next release.



We are accepting Pull Request for other repositories (like frontend, hassio, etc.) as well. There the same rules will apply but the handling could be different.

Hacktoberfest is not only about Pull Requests for us. It’s also about the whole ecosystem. Home Assistant depends on a lot of Python modules. You help Home Assistant indirectly if you make other code more robust, migrate it to asyncio, make it work with Python 3.7, etc. Talk to the owner or the maintainer of this code to make your contributions count for Hacktoberfest.

It would also be a huge help if you review other Pull Requests. This means that there is a bigger chance that your Pull Request will be handled in a timely manner. We already have a backlog of Pull Requests. If you think that you are not enough qualified to do it, don’t worry, there are people around who can and will assist you. It’s nothing wrong to go for the low hanging fruits first and multiple eyes always see more than one pair.

Also, feel free to [report bugs](https://github.com/home-assistant/home-assistant/issues/new/choose), give us feedback about your user experience, tell the community about your [super cool setup](https://community.home-assistant.io/c/projects), create a [super awesome frontend](https://community.home-assistant.io/c/projects/frontend) with [Lovelace](https://www.home-assistant.io/lovelace) or help other users in the [forum](https://community.home-assistant.io/).

Are you ready? [Sign up for Hacktoberfest](https://hacktoberfest.digitalocean.com/sign_up/register)!

