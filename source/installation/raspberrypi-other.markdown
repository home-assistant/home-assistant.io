---
title: "Advanced Raspberry Pi installation"
description: "Instructions to install Home Assistant Container on a Raspberry Pi. This is for advanced users only."
installation_type: raspberrypi-other
related:
  - docs: /installation/raspberrypi/
    title: Installing the Home Assistant OS on Raspberry Pi
---

{% comment %}
Included section for this page is located under source/_includes/installation
{% endcomment %}

{% assign board = "Raspberry Pi" %}
{% assign installation_media = "SD card" %}

While we recommend using the {% term "Home Assistant Operating System" %}, you can also use the {% term "Home Assistant Container" %} method to install Home Assistant. Before you continue, be aware of the limitations and differences compared to the {% term "Home Assistant Operating System" %}. You can find more information on the [installation page](/installation/#about-installation-methods). Most notably,
<a href="/addons">add-ons</a> are only available with the Home Assistant Operating System.

{% include installation/container.md %}
