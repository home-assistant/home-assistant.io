---
title: "Installation of Home Assistant"
description: "Instructions on how to install Home Assistant to launch on start."
redirect_from: /getting-started/installation/
---

<div class='note'>

Beginners should check our [Getting started guide](/getting-started/) first.

</div>

Home Assistant provides multiple ways to be installed. The first start may take up to 20 minutes because the required packages will be downloaded and installed. The web interface will be served on `http://ip.add.re.ss:8123/`. Replace `ip.add.re.ss` with the IP of the computer you installed it on.

<div class='note warning'>

  Please remember to [secure your installation](/docs/configuration/securing/) once you've finished with the installation process.

</div>

## Recommended

These install options are fully supported by Home Assistant's documentation. For example, if an integration requires that you install something to make it work on one of these methods then the integration page will document the steps required.

<div class='note'>

The only installation methods that allow you to use Home Assistant Add-ons is using the Home Assistant image. All other methods only install the base Home Assistant packages, however the software from the add-ons may still usually be installed manually like any other program.

</div>

**Method**|**You have**|**Recommended for**
:-----|:-----|:-----
[Home Assistant OS](/hassio/installation/)|[A supported platform](/hassio/installation/)|Anybody
[Home Assistant Container](/docs/installation/docker/)|Docker|Anybody already running Docker

## Alternative installs

If you use these install methods, we assume that you know how to manage and administer the operating system you're using. Due to the range of platforms on which these install methods can be used, integration documentation may only tell you what you have to install, not how to install it.

**Method**|**You have**|**Recommended for**
:-----|:-----|:-----
[Home Assistant Core](/docs/installation/raspberry-pi/)|Any Linux, Python 3.7.1 or later|Those familiar with their operating system
[Home Assistant Supervised](https://github.com/home-assistant/supervised-installer) | [Requirements](https://github.com/home-assistant/architecture/blob/master/adr/0014-home-assistant-supervised.md#supported-operating-system-system-dependencies-and-versions) | Those very familiar with their operating system
[venv<BR>(as your user)](/docs/installation/virtualenv/)|Any Python 3.7.1 or later|**Developers**

## Community provided guides

Additional installation guides can be found on our [Community Forum](https://community.home-assistant.io/tags/c/community-guides/51/installation).

These Community Guides are provided as-is. Some of these install methods are more limited than the methods above. Some integrations may not work due to limitations of the platform.
