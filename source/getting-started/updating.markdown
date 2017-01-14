---
layout: page
title: "Updating Home Assistant"
description: "Step to update Home Assistant."
date: 2016-05-04 10:00
sidebar: true
comments: false
sharing: true
footer: true
---

The upgrade process differed depending on the installtion you have, review the documentaion specific to your install [HASSbian](/getting-started/installation-raspberry-pi-image/#update-home-assistant-on-hassbian), [Raspberry Pi All-In-One Installer](/getting-started/installation-raspberry-pi-all-in-one/#upgrading), [Vagrant](/getting-started/installation-vagrant/), or [Virtualenv](/getting-started/installation-virtualenv/#upgrading-home-assistant).

The default way to update Home Assistant to the latest release, when available, is:

```bash
$ pip3 install --upgrade homeassistant
``` 

After updating, you must restart Home Assistant for the changes to take effect. This means that you will have to restart `hass` itself or the [autostarting](/getting-started/autostart/) daemon (if applicable)

<p class='note note'>
  To avoid permission errors, the upgrade must be run as the same user as the installation was completed, again review the documentation specific to your install [HASSbian](/getting-started/installation-raspberry-pi-image/), [Raspberry Pi All-In-One Installer](/getting-started/installation-raspberry-pi-all-in-one/), [Vagrant](/getting-started/installation-vagrant/), or [Virtualenv](/getting-started/installation-virtualenv)t.
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
