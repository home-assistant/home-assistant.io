---
title: The future of YAML
description: "A blog post answering the 'Is YAML going away?' question."
date: 2020-04-14 00:00:00
date_formatted: "April 14, 2020"
author: Franck Nijhof
author_twitter: frenck
categories: Announcements
og_image: /images/blog/2020-04-14-the-future-of-yaml/social.png
---

Recently, comments and questions in the community have been posted, about the
announcement of integrations becoming available via the frontend and the removal
of YAML support from some of them.

This raises questions and opinions that need addressing. It mainly comes down to
this single question:

> _“Is YAML going away?”_

The answer to this question is: _“**No!**, but…”_

Realizing you may not like that loose answer and, in that case, you are possibly
looking for a hard and simple “NO” answer to this question. However, things are
a bit more complicated.

This blog post aims to bring more clarity to this question, so everybody knows
why things are the way they are right now and what to expect for the future of
configuring Home Assistant.

## Enabling configuration via the UI

Before talking about YAML, let’s explain the reasoning behind all the UI
features introduced.

The Home Assistant project has grown at a ludicrous rate in the last few years.
Being one of the few solutions to provide a local home automation platform,
that puts privacy first, has gathered interest from all kinds of people on this
planet.

In the beginning, Home Assistant was a small project; aimed at developers and
the tech-savvy. With the growth of privacy concerns, but also the growth in the
availability of IoT devices in our homes in general, the project gained
traction; attracting lots of new community members that are not always the
tech-savvy types.

This is great, but that also means we need to adjust, to make it usable for
everybody. We want everybody to enjoy what we all have been enjoying already.
No matter your level of experience.

Considering that, enabling and empowering people with managing their
Home Assistant instance via the user interface is needed. Not just for the
lesser tech-savvy, since it also brings convenience, that even many technically
capable users enjoy and prefer.

Goal: _**Making things easier.**_

The goal of making it easier is currently the main focus.

## Backward-incompatible changes

We all dislike them, those backward-incompatible changes when a new release is published.
We all scan the release notes hoping you are not affected by any of them in
that release.

There is a big upside on using configuration via the UI: Home Assistant manages
that configuration part for you and handles the upgrades and migrations.
Virtually removing the chances of hitting a breaking change,
we all hate just as much.

## Shareability & Security

This is a screenshot of one of the slides,
[showed during the State of the Union 2019][yt]:

<p class='img'>
<img
  src='/images/blog/2020-04-14-the-future-of-yaml/sharing.png'
  alt='Presentation slide showed during the State of the Union 2019'>
  Presentation slide showed during the State of the Union 2019.
</p>

We all like to share our experiences, and thus parts of our configurations.
GitHub is [full of repositories][gh] that shares people’s homes.

This is great! Sharing ideas, providing inspiration for all of us!

There is a great downside to this, which is privacy and security. There are a
lot of things we don’t want to share. For example, our passwords,
sensitive (personal) information or (historical) data.

A bit more technical, but integrations using OAuth2 as the authentication method
to integrate with, for example, a service like Somfy don’t need to store the
username/password at all.

## Both YAML & UI

Home Assistant is moving towards a better separation of YAML configuration
versus configuration done in the UI. This is already partly showing in things
like zones, Lovelace and the recently introduced “Helpers”
(also known as the `input_*` integrations in YAML).

Zones can be configured via the UI and via YAML (even at the same time!).
Both configuration sources will be loaded by Home Assistant when considering
the configured zones and both can be changed on the fly without restarting
Home Assistant.

For the future, Home Assistant will be moving towards that concept more
and more. This allows anybody to use the method they prefer.

In these cases, YAML support has been extended and improved by adding features
like reloading and by removing parts that mess with your YAML files.

## We are still an open-source project

Home Assistant is an open-source project and relies on contributors adding
those amazing integrations, maintaining them and extending their functionality
to make them even more capable.

Those contributors do this in their free spare time, for which we all are
eternally grateful. It is their work that enables Home Assistant to do what it
can right now. It is what automates your home.

So what about integrations that remove YAML support?

Some contributors have decided to remove the YAML support to reduce their
maintenance and support burden. The amount of energy that needs to be put in
(to maintain both capabilities) can be too much and is complex. We have to
understand and accept that. If we do not do that, a contributor could simply
stop contributing.

Unfortunately, such a move creates backward-incompatible changes and often leads to a few
pretty de-motivating comments, towards the contributor and the project in
general. This is harmful to everybody, as the contributors get demotivated or,
even worse, don’t want to implement new features or create a breaking change.

This halts our project goals, slows down innovation and induces the risk of
losing contributors and maintainers. In the end, leads to a greater loss for
everybody.

## The future of YAML

So, with all of the above set context: What is the future of YAML?

As of today, [ADR-0010][adr] (Architectural Decision Record) has been approved
that states:

- Any new integration that communicates with devices and/or services, must use
  configuration via the UI. Configuration via YAML is only allowed in very rare
  cases, which will be determined on a case by case basis.
- Existing integrations that communicate with devices and/or services, are
  allowed and encouraged to implement configuration via the UI
  and remove YAML support.
- We will no longer accept any changes to the YAML configuration for existing
  integrations that communicate with devices and/or services.

So what stays available in YAML in the end?

All other integrations that do not communicate with a device and/or service,
are configured via YAML or via Storage Collections (these enable both YAML and
UI capabilities used by, e.g., Lovelace and zones).
Examples of these other integrations:

- Integrations that integrate transports. These integrations allow users to
  define their own protocol, e.g., MQTT, serial, GPIO.
- Integrations that process Home Assistant data and make this available to
  other integrations, e.g., template, stats, derivative, utility meter.
- Integrations that provide automations, e.g., automation,
  device_sun_light_trigger, alert.
- Integrations that help controlling devices and services, e.g., script, scene.
- Integrations that expose Home Assistant data to other services, e.g.,
  Google Assistant, HomeKit.

This ADR is set to remove confusion and questions for everybody, builds upon the
goals that have been set out (as presented during the State of the Union),
and sets the guidelines for our contributors to work with.
This ADR brings clarity for us all.

## Myth-busting

In the raised concerns and comments across the community, some comments have
been found multiple times. Please note, these are not exact quotes, as we don’t
want to address anybody personally.

- _“Making backups became harder!”_

  Using the Home Assistant snapshot feature, this is not an issue. However,
  if you do manual backups on a system that runs just Core, you need to make
  sure to back up the `.storage` folder as well
  (which hopefully you're already doing). Otherwise, there is no difference.

- _“It is harder to test my configuration if integration does not support YAML”._

  YAML configuration testing is often done to see if a specific YAML
  configuration is still valid against (newer versions of) Home Assistant.
  With integrations set up via the UI, this is not a concern,
  since Home Assistant ensures the data structure is compatible between
  versions and migrates it for you.

- _“I like to use a private git repository where I store all my data in,
  including my sensitive data, since it is not public.
  Without YAML this is not possible.”_

  This is actually not true, the `.storage` folder contains all Home Assistant
  managed configuration files in JSON format, which in those cases,
  can be stored and versioned in a git repository.

## Is YAML going away?

**No**!

Not for the things we like to share publicly. It will also remain available for
the advanced features we currently cannot provide a UI for. The goal is not
phasing out YAML, the goal is to make the best home automation platform in the
world that is easy to use for everybody. Enabling users of all experience
levels, to enjoy this wonderful hobby we all share and allowing everyone to
focus on what matters most: automating our homes.

Closing with the YouTube recording of the State of the Union 2019,
starting at the part discussing this.

<div class='videoWrapper'>
  <iframe
    width="560"
    height="315"
    src="https://www.youtube-nocookie.com/embed/tc17q1Zn0Xs?start=1809&end=2030"
    frameborder="0"
    allowfullscreen
    ></iframe>
</div>

## Special Home Assistant Podcast episode

A special edition of the Home Assistant Podcast has been put out.
In this episode, [Phil][phil] and [Rohan][rohan] talk with
[Paulus][balloob] about the changes announced in this blog post.

[Click here to listen to the Podcast][podcast]

[adr]: https://github.com/home-assistant/architecture/blob/master/adr/0010-integration-configuration.md
[balloob]: https://twitter.com/balloob
[gh]: https://github.com/topics/home-assistant-config
[phil]: https://twitter.com/philhawthorne
[podcast]: https://hasspodcast.io/x001/
[rohan]: https://twitter.com/rohank9
[yt]: https://youtu.be/tc17q1Zn0Xs?t=1809
