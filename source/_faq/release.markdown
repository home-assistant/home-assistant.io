---
title: "When is the next Home Assistant release?"
description: "A new stable version of Home Assistant is released on the first Wednesday of every month, with a beta period in the week before."
ha_category: Common
---

A new stable version of Home Assistant is released on the first Wednesday of every month. The exact dates are listed in the upcoming events calendar on the [Home Assistant Developers](https://developers.home-assistant.io/) website.

You can browse the [full release history and announcement blog posts](/blog/categories/core/) for any past release.

## Are the monthly releases stable?

Yes. The monthly releases are the stable releases of Home Assistant, and they are the version we recommend everyone runs. Each release goes through:

- A beta period of about a week during which the release candidate is tested by thousands of users on real-world setups.
- Continuous automated testing across hundreds of {% term integrations %} on every change.
- Smaller patch releases (for example, `2026.5.1`, `2026.5.2`) during the month if any important issues turn up after the initial release.

Updates can be installed straight from the user interface, and an [automatic backup](/common-tasks/general/#backups) is taken before every update so you can roll back if something does not work for you. For more on this, see [Do Home Assistant updates break things?](/faq/#do-home-assistant-updates-break-things).

## Helping test the next release

The last week before each release is the beta period. If you would like to help test the next release, you can opt in to the beta channel from {% my system_dashboard title="Settings > System > Updates" %}. Beta testers can read the [beta release notes](https://rc.home-assistant.io/latest-release-notes/), get help in the `#beta` channel of the [Home Assistant Discord server](/join-chat), and are encouraged to [report issues on GitHub](/help/#bugs-feature-requests-and-alike).
