---
layout: page
title: "Updating Home Assistant"
description: "Step to update Home Assistant."
date: 2016-05-04 10:00
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /getting-started/updating/
---

<p class='note warning'>
The upgrade process differs depending on the installation you have, so please review the documentation that is specific to your install [Hass.io](/hassio/), [Hassbian](/docs/installation/hassbian/common-tasks/#update-home-assistant), [Vagrant](/docs/installation/vagrant/), or [Virtualenv](/docs/installation/virtualenv/#upgrading-home-assistant).
</p>

Check what's new in the latest version and potentially impacts your system in [Home Assistant release notes](https://github.com/home-assistant/home-assistant/releases). It is good practice to review these release notes and pay close attention to the **Breaking Changes** that are listed there. If you haven't done an update for a while, you should also check previous release notes as they can also contain relevant **Breaking Changes**. **Breaking Changes** may require configuration updates for your components. If you missed this and Home Assistant refuses to start, check the log file in the [configuration](/docs/configuration/) directory, e.g., `.homeassistant/home-assistant.log`, for details about broken components.

The default way to update Home Assistant to the latest release, when available, is:

```bash
$ pip3 install --upgrade homeassistant
```

For a Docker container, simply pull the latest one:

```bash
$ sudo docker pull homeassistant/home-assistant:latest
```

After updating, you must start/restart Home Assistant for the changes to take effect. This means that you will have to restart `hass` itself or the [autostarting](/docs/autostart/) daemon (if applicable). Startup can take considerable amount of time (i.e. minutes) depending on your device. This is because all requirements are updated as well.

<p class='note'>
To avoid permission errors, the upgrade must be run as the same user as the installation was completed, again review the documentation specific to your install [Hass.io](/hassio/), [Hassbian](/docs/hassbian/installation/), [Vagrant](/docs/installation/vagrant/), or [Virtualenv](/docs/installation/virtualenv).
</p>

[BRUH automation](http://www.bruhautomation.com) has created [a tutorial video](https://www.youtube.com/watch?v=tuG2rs1Cl2Y) explaining how to upgrade Home Assistant.

#### {% linkable_title Run a specific version %}

In the event that a Home Assistant version doesn't play well with your hardware setup, you can downgrade to a previous release:

```bash
$ pip3 install homeassistant==0.XX.X
```

#### {% linkable_title Run the development version %}

If you want to stay on the bleeding-edge Home Assistant development branch, you can upgrade to `dev`.

<p class='note warning'>
  The "dev" branch is likely to be unstable. Potential consequences include loss of data and instance corruption.
</p>

```bash
$ pip3 install --upgrade git+git://github.com/home-assistant/home-assistant.git@dev
```
