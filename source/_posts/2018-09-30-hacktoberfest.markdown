---
title: "Participating in Hacktoberfest"
description: "Home Assistant will be participating in Hacktoberfest to help people to get started with Open Source."
date: 2018-09-30 08:00:00 +0000
date_formatted: "September 30, 2018"
author: Fabian Affolter
author_twitter: fabaff
categories: Community
og_image: /images/blog/2018-09-hacktoberfest/hacktoberfest-2018.png
---

In October there will the [Hacktoberfest](https://hacktoberfest.digitalocean.com/). To celebrate and support Open Source, [DigitalOcean](https://www.digitalocean.com/), [Twilio](https://www.twilio.com/) and [GitHub](https://github.com/) are again organizing this event. Home Assistant will be part of it like in the last two years.

We would like to focus on those repositories. Browse through the bugs and fix one. This will get you started with contributing to an Open Source project in an easy way:

- [Home Assistant Frontend](https://github.com/home-assistant/home-assistant-polymer)
- [Hass.io](https://github.com/home-assistant/hassio)
- [HassOS](https://github.com/home-assistant/hassos)
- [Hass.io CLI](https://github.com/home-assistant/hassio-cli)

We collected a bunch of entry-level bugs, features and documentation enhancements for two other repositories. Please stick to the open issues for now. We will add more during October:

- [Home Assistant Easyfix collection](https://github.com/home-assistant/home-assistant/projects/2)
- [Home Assistant Documentation Easyfix collection](https://github.com/home-assistant/home-assistant.io/projects/2)

If you submit five (5) Pull Requests during October, you will have earned yourself a limited edition Hacktoberfest T-shirt and a place on our credits list if you submit your Pull Requests for Home Assistant! Don’t worry you will be listed there no matter how many Pull Requests you've made.

**We want to focus on new contributors and people who want to get started on working on an Open Source project.**

Are you ready? [Sign up for Hacktoberfest](https://hacktoberfest.digitalocean.com/profile)!

<!--more-->

## Details

Hacktoberfest will create a lot of work for us. In 2017 we processed 625 Pull Requests in our three main repositories and some more for other parts of Home Assistant during October. We still only have limited resources and for this edition of Hackoberfest we decided to set some rules. These rules will help us and keep your frustration level to a minimum.

### General

- Fill out the Pull Request template (if there is any).
- Check our code (lint and unit tests) before you submit your Pull Request.
- Keep your Pull requests small. One change per Pull request is faster to review than 19 changes across different files and features.
- Pull Requests which are not passing the CI usually get less or no attention.
- There is no guarantee that your Pull Request is processed during October. Sorry.
- We reserve the right to close Pull Requests with missing parts (see the Checklist in the Pull Request template), insufficient data or no response after they were submitted. The Pull Requests can always be re-opened later when you are ready or all elements are in place.

### Home Assistant Frontend

- Take a look at the [Polymer documentation](https://www.polymer-project.org/).
- Read the [Home Assistant Frontend documentation](https://developers.home-assistant.io/docs/frontend).

### Home Assistant

- Get familiar with our [Style Guidelines](https://developers.home-assistant.io/docs/development_guidelines) and the existing code.
- Go through the [Developer documentation](https://developers.home-assistant.io).
- Don’t forget the documentation. Changes often require an update of the documentation. Also, new integrations. You know how it works, but the users don’t.
- [Architectural changes](https://github.com/home-assistant/architecture) need to be discussed before a change is proposed. Also, keep in mind that those kinds of Pull Request may not be reviewed during October.
- If you update a dependency, then you need to make sure that it will work. This means, provide the configuration sample and other details (used devices, firmware version, etc.).

### Home Assistant Documentation

- Make yourself familiar with [Markdown](https://www.markdownguide.org/cheat-sheet).
- Understand our [Standards and Guidelines](https://developers.home-assistant.io/docs/documenting/standards).
- For small changes like typos and clarifications, use the GitHub editor functionality. 
- For more significant changes, we highly recommended that you set up an environment to build the documentation locally before opening a Pull Request.
- Keep an eye on the branches. `current` is for changes on the existing documentation, `next` for new features or integrations that will be available with the next release.

## Improve our dependencies

Hacktoberfest is not only about Pull Requests for us, it’s also about the whole ecosystem. Home Assistant depends on a lot of Python modules and you can help Home Assistant indirectly if you make other code more robust, migrate it to asyncio, make it work with Python 3.7, etc.

Talk to the owner or the maintainer of the code to make your contributions count for Hacktoberfest.

## Help us with the workload

It would also be a huge help if you review other Pull Requests. This means that there is a bigger chance that your Pull Request will be handled in a timely manner or that others are. We already have a backlog of Pull Requests in most repositories.

If you think that you are not enough qualified to do it, don’t worry, there are people around who can and will assist you. There is nothing wrong to go for the low hanging fruits first, comment on the most obvious issues and take a deep-dive after that. Multiple eyes always see more than one pair.

## Not a coder? Not a problem!

Also, feel free to [report bugs](https://github.com/home-assistant/home-assistant/issues/new/choose), give us feedback about your user experience, tell the community about your [super cool setup](https://community.home-assistant.io/c/projects), create a [super awesome frontend](https://community.home-assistant.io/c/projects/frontend) with [Lovelace](/lovelace) or help other users in the [forum](https://community.home-assistant.io/).

