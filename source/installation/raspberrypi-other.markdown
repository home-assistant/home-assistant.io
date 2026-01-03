---
title: "Advanced Raspberry Pi installations"
description: "Advanced instructions to install Home Assistant variants on a Raspberry Pi"
installation_type: raspberrypi-other
---

{% comment %}
Included section for this page is located under source/_includes/installation
{% endcomment %}

{% assign board = "Raspberry Pi" %}
{% assign installation_media = "SD card" %}

While we recommend Home Assistant OS, there are also alternative ways to install Home Assistant. Before you continue, be aware of the limitations and differences compared to Home Assistant OS. You can find more information on the [installation page](/installation/#advanced-installation-methods). Most notably,
<a href="/addons">add-ons</a> are only available with the Home Assistant Operating System.

{% include installation/container.md %}
{% include installation/core.md %}
