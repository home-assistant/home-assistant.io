---
title: "Installation Methods & Community Guides Wiki"
description: "Overview of how we're going to improve our documentation."
date: 2020-05-26 00:00:00
date_formatted: "May 26, 2020"
author: Paulus Schoutsen
author_twitter: balloob
categories: Announcements
---

We recently announced that we wanted to deprecate the generic Home Assistant installer. We discovered that the installation method was more popular than expected and we put that plan on hold.

The feedback to our announcement also included that the preferred installation methods are not well documented and that it’s confusing because there are also so many other installation guides on home-assistant.io, some great, some outdated and no longer correct or even missing.

Today I want to take a step back and take a holistic view of installation methods. What installation methods do we support as a project, and what does supported mean.

## State of the documentation

If you look at our documentation, it’s all over the place. Install it in Docker, in a VM, on a NAS or on one of the many Linux distributions.

The reason we have this many guides is that since the start of the Home Assistant website, we have always gladly accepted every contribution to get Home Assistant running on any platform. The more the merrier!

However, in software nothing ever stays the same. All software gets updates to fix bugs, fix security vulnerabilities, improve performance or to add new features. As a software application you need to grow along or else you get stuck with an insecure system.

So as Home Assistant grows and evolves, some of these installation guides became outdated and stopped working. We wouldn’t even know it was broken until a user raised an issue. But when they do, we wouldn’t know how to fix it unless we could get a hold of the original contributor.

This can be frustrating. Any guide on our official website should lead to a working system. A system that not only works today, but also tomorrow. And we have not done a good job at this, for which I want to apologize.

## Definition of an “Officially supported installation method”

Today we are introducing a classification between what is “Officially supported” vs “Community supported”. An officially supported installation method in the Home Assistant context means:

_“A way of installing and running Home Assistant that is officially supported by the Home Assistant project. It means the installation method is tested and documented in the official documentation. Running Home Assistant using such a supported method, leads to the optimal user experience, now and for the future.”_

The Home Assistant team will not prevent you from running Home Assistant using an unofficial method. However, we cannot help with issues that you encounter. We are open for contributions that improve compatibility with a community supported method as long as they do not impact officially supported methods, add a significant amount of code exceptions or future maintenance burden on the Home Assistant development team.

## Supported installation methods

These are the four installation methods that are officially supported:

  - **Home Assistant**<br>
    Full installation of our all-inclusive home automation system. Best in class home automation is complemented with a UI for configuring your system, making backups and safe updates with automatic rollback.

    This method was previously known as “Hass.io”, and includes our Operating System (HassOS), the Supervisor, and add-ons. It can be run on various single-board computers or in a virtual machine.


  - **Home Assistant Container**<br>
    Run just the Home Assistant Core application on a native OCI compatible containerization system (like Docker). It does not provide the full Supervisor experience, and thus does not provide the Supervisor panel and add-ons.

    This method has a new name, and was previously known as “Home Assistant Core on Docker”.

  - **Home Assistant Supervised**<br>
    The full Home Assistant experience on a regular Linux operating system. This method was previously known as “Hass.io on generic Linux”, installed on top of, e.g., Debian.

  - **Home Assistant Core**<br>
    Run the Home Assistant Core application directly on Python. It does not provide the full Supervisor experience, and thus does not provide the Supervisor panel and add-ons.

As you can see, the Home Assistant Supervised method is here to stay.

What is missing for each of the above-listed are the specific details, e.g., the supported operating systems for a Supervised installation or the supported hardware for a full Home Assistant installation. We hope to have these details available soon.

## Community Guides Wiki

Home Assistant is an open-source project and it can be used in any way you want, even if it is not officially supported by the Home Assistant team. We welcome these alternative initiatives and have created a place for our community to provide, share and collectively maintain additional documentation.

We’ve added a new section to our forums called “[Community Guides]”. Each post will be automatically turned into a wiki article that other members can help maintain and can be discussed right below the article. This section is not just for installation methods, but ANY guide, how-to or tutorial.

We have ported several guides from the official documentation to the community guides. These guides were already marked as “community provided” guides previously, or are targeted towards extremely specific setups.

## Final words

Today’s blog post is about bringing some clarity on our stance with the Supervised installation, but at the same time bringing more context to the problems and solutions we are currently working on. Cleaning up and structuring our official documentation is an important first step in this process.

Realizing we have not finished up specific details on each installation method, you might still be wondering if your setup is going to be supported moving forward. These details can be expected soon. We have no intention of preventing Home Assistant to run under community supported methods.

Thanks to the passionate community, you spoke and gave feedback on this. We’ll have more specific details to share in the near future, so stay tuned.

Paulus

[Community Guides]: https://community.home-assistant.io/c/community-guides/
