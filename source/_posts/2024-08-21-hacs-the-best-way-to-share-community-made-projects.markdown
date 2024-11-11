---
layout: post
title: "HACS 2.0 - The best way to share community-made projects just got better"
description: "2.0 brings new features making it the best to share community-made integrations and UI elements."
date: 2024-08-21 00:00:01
date_formatted: "August 21, 2024"
author: Joakim Sørensen
comments: true
categories: Announcements
og_image: /images/blog/2024-08-hacs2/art.png
---
<p class='img'><img src='/images/blog/2024-08-hacs2/art.png' style='border: 0;box-shadow: none;' alt="HACS 2.0 - The best way to share community-made projects just got better">Art by Clelia Rella</p>

**TL;DR:**  HACS 2.0 is a big step forward, adding an easier install method, faster updates, a new UI, and proper Home Assistant update/repair notifications.

Home Assistant's Community Store, HACS, has now hit v2.0, gaining some big improvements that continue to make it the best way to find, install, and update awesome community-made integrations and UI elements. This follows HACS being added as an [Open Home Foundation](https://www.openhomefoundation.org/) collaboration partner, recognizing its important role in Home Assistant's open ecosystem.

Just note, HACS is an advanced tool that can add custom code to your Home Assistant install, which can cause issues on your Home Assistant system. If you are a beginner or prioritize stability above all else, [HACS might not be for you](#how-to-install).

## Jump to sections <!-- omit from toc -->
- [HACS reaches v2.0](#hacs-reaches-v20)
- [What is HACS?](#what-is-hacs)
- [Why use HACS?](#why-use-hacs)
- [A Brief History of HACS](#a-brief-history-of-hacs)
- [How to install](#how-to-install)

***Want to skip the blog and just start playing with HACS 2.0?*** Just remember to proceed with caution and do not skip the backup step before you [install](#how-to-install).

<!--more-->

## HACS reaches v2.0

This is one of the biggest updates yet for HACS, but if you're not sure what HACS is or why you might consider using it, check out our [explainer below](#what-is-hacs).

### New frontend <!-- omit from toc -->

<img src='/images/blog/2024-08-hacs2/frontend.png' style='border: 0;box-shadow: none;' alt="HACS frontend looks like data tables">

HACS 2.0 [main dashboard](https://www.hacs.xyz/docs/use/repositories/dashboard/) has taken cues from Home Assistant, and now closely matches the native look and functionality of the data tables you find on the entities or automation pages. This includes the options to filter, group, sort, and search.

### Faster downloads <!-- omit from toc -->

<img src='/images/blog/2024-08-hacs2/downloads.png' style='border: 0;box-shadow: none;' alt="HDownload window going very fast">

Previously, HACS 100% relied on GitHub to retrieve information, from file locations to the number of stars, so we needed to limit the API (as there are a lot of HACS users). To speed things up, we've created a [remote dataset](https://www.hacs.xyz/docs/faq/data_sources/) stored in Cloudflare R2 buckets, which are updated at regular intervals.  Files are still downloaded from GitHub and their API is still contacted, but it will see drastically fewer calls, and the speed improvement is massive. Behind the scenes, this was a big piece of work, which has ongoing costs, and shows the kind of support the Open Home Foundation can provide to a community-driven project like HACS.

### Update and repair <!-- omit from toc -->

<img src='/images/blog/2024-08-hacs2/updates-repairs.png' style='border: 0;box-shadow: none;' alt="update all your Home Assistant from the same place">

No more visiting the HACS page every day to check for updates. They'll now appear in the same places system and add-on [updates](https://my.home-assistant.io/redirect/updates/) appear in the native Home Assistant format. Also, once they're finished updating, they will give you suggested repairs (for instance, reloading the dashboards or rebooting Home Assistant).

### Other improvements <!-- omit from toc -->

We have also renamed things to help them make more sense, including changing "category" to "type", and "Lovelace" to "dashboard" (Lovelace needs to make room for [Grace](https://www.home-assistant.io/blog/2024/03/04/dashboard-chapter-1/#what-is-project-grace)). We're also including Template management, which utilizes the new [template type](https://www.hacs.xyz/docs/publish/template/) to enhance your Jinja templates.

{% note %}
**Breaking changes** - There have been some breaking changes, such as removing the YAML configuration, no longer including the NetDaemon type, and moving [beta selection to a switch entity](https://www.hacs.xyz/docs/use/entities/switch/). Many of the changes are more likely to affect those sharing their code via HACS, check the [release notes for the full list](https://github.com/hacs/integration/releases/tag/2.0.0).
{% endnote %}

## What is HACS?

Home Assistant is built around choice, and HACS is the epitome of this, giving you access to hundreds of community-made integrations, cards, themes, and more. HACS isn't actually *a hack*, as Home Assistant has always allowed you to add custom integrations and UI elements - HACS just adds a streamlined interface to find, install, and update these.

HACS stands for *Home Assistant Community Store*, and despite the name it doesn't sell anything - it's all free and open-source. HACS is there for people in the community who write custom code to address something they think is missing from Home Assistant. It allows them to easily share this code with the community unrestricted via submitting their GitHub repository to HACS. This means these are maintained by the community members that upload them, not HACS or Home Assistant. If you want to learn more about what you're installing, or report issues, there is always a link to the original code.  

Just to clear up the biggest misconception about HACS, **it does not install add-ons**. Home Assistant OS natively has its own [built-in store for Home Assistant Add-ons](https://my.home-assistant.io/redirect/supervisor_store/). Add-ons run alongside Home Assistant, while HACS installs custom code that can run in Home Assistant (which has implications for system stability, more on that below).

## Why use HACS?

**More integrations** - Not every device and service is supported by Home Assistant out-of-the-box, and HACS helps fill the gaps. There are hundreds of integrations on HACS, some are there because the authors didn't have the time to meet Home Assistant's requirements, while others are doing something not allowed by Home Assistant, like web scraping (which is sometimes the only way, but [not a good idea](https://github.com/home-assistant/architecture/issues/252)). Just be aware that these decisions can come at the expense of stability.

**Advanced integrations** - Some HACS integrations are more complex and advanced versions of their Core counterparts, while other integrations combine multiple sensors to provide new data points. Some of these "integrations" even give Home Assistant advanced new features and settings. It also allows for rapid development as it allows updates outside the Home Assistant refresh cycle.

**Cards and Themes** - There are some amazing cards, UIs, and themes being built by community developers and designers - BTW if you're one, [our frontend team needs your help](/blog/2024/07/26/dashboard-chapter-2/#process-how-can-we-work-together). HACS has made the installation and updating of these designs very simple and quick.

**Scripts and Templates** - This is the easiest way to share scripts and templates, while also adding the ability to push new improvements to users via updates.

## A Brief History of HACS

HACS started in 2019 as my ([Joakim Sørensen](https://github.com/ludeeus) ) third attempt to build a community store. It started small and quickly became the de facto standard, with so many talented community creators submitting their projects. The Home Assistant team was supportive from day one, and even as HACS gained hundreds of thousands of downloads, we all agreed it should remain an optional addition to Home Assistant. Giving users the choice to add new features to Home Assistant at the cost of stability.

I joined [Nabu Casa](https://www.nabucasa.com/) in 2020, partly due to the work I did on HACS, but I was hired to work on Home Assistant more generally, not to work on HACS. Incidentally, I'm not the only developer working at Nabu Casa who got their start on HACS: [Paul Bottein](https://github.com/piitaya)  on the frontend team built [Mushroom Cards](https://github.com/piitaya/lovelace-mushroom), and  [Marcel van der Veldt](https://github.com/marcelveldt) who currently supports Matter development built [Music Assistant](https://music-assistant.io/).

Over the years, I continued to work on HACS in my spare time, but there were always aspects of the original version that limited its ability to grow. Recently, the [Open Home Foundation](https://www.openhomefoundation.org/) reached out to make HACS a collaboration partner, and provided development support. Numerous people were brought in to support, from across Nabu Casa and the community, leading to the large list of improvements you see today.

Just before we released this big update, it passed 5,000 stars on GitHub! It's the projects on HACS that make it what it is today, and I'd like to sincerely thank everyone who continues to contribute their code onto the store.

## How to install

{% note %}
**Proceed with caution** - HACS is not for everyone.  If you're a Home Assistant beginner or are looking for the most stable experience in your smart home, HACS is probably not for you. These are community-made projects that do not receive the same rigorous reviews required of projects submitted to Home Assistant. There may be projects that don't work or, even worse, break your system. Unlike add-ons that run separately and alongside Home Assistant, HACS projects run their code directly in Home Assistant, which increases the chances of crashing or harming your system. Before using HACS, always make a [backup of your system](https://hacs.xyz/docs/use/data/#creating-a-backup) and download that backup to another device.
{% endnote %}

HACS should work on any up-to-date version of Home Assistant, it even runs on core installations. It also requires a GitHub account. If you already have HACS 1.X installed, perform a backup, go into HACS and then click the update button for HACS (note: if you update, there is no downgrading).

If you're a Home Assistant OS user here is the installation method (If you're not using our OS, [visit this page](https://www.hacs.xyz/docs/use/download/download/#to-download-hacs-core)),

1. Make a [backup of your system](https://my.home-assistant.io/redirect/backup/) and download it to another device for safekeeping.

2. Install the addon: Using [this link](https://my.home-assistant.io/redirect/supervisor_addon/?repository_url=https%3A%2F%2Fgithub.com%2Fhacs%2Faddons&addon=cb646a50_get), add the HACS add-on repository, and install the add-on it links to, [![Open your Home Assistant instance and show the dashboard of an add-on.](https://my.home-assistant.io/badges/supervisor_addon.svg)](https://my.home-assistant.io/redirect/supervisor_addon/?repository_url=https%3A%2F%2Fgithub.com%2Fhacs%2Faddons&addon=cb646a50_get)

3. Start the add-on (no need to "start on boot", you should only need to run this once).

4. Navigate to the add-on's "Log" and follow the instructions given there.

5. Once finished, reboot Home Assistant and navigate to the [devices page](https://my.home-assistant.io/redirect/devices/). Add the integration HACS, and follow the instructions to link it with your GitHub account.

***It's installed, now what?*** Start downloading some custom integrations and UI elements. There are a lot of great community resources listing the best custom [integrations](https://community.home-assistant.io/c/projects/custom-integrations/47?ascending=false&order=views), [cards](https://community.home-assistant.io/c/projects/frontend/34?ascending=false&order=views), [themes](https://community.home-assistant.io/c/projects/themes/29/l/top), and more.

## Conclusion <!-- omit from toc -->

There are too many people to thank in this blog who have helped the development of HACS over the years.  Thanks for submitting your projects, reporting issues, fixing code, and just using this funny little side project. Most important to this all, thanks to [Home Assistant Cloud subscribers](https://www.nabucasa.com/). They made this update possible, not only do they pay my salary, but they also fund the Open Home Foundation, whose support was critical.
