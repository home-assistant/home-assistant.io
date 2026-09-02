---
title: "Container"
description: "Install Home Assistant Container with Docker or another OCI-compatible container runtime."
installation_type: container
related:
  - docs: /installation/
    title: Installation methods
  - docs: /installation/raspberrypi-other/
    title: Home Assistant Container on Raspberry Pi
---

{% comment %}
Included section for this page is located under source/_includes/installation
{% endcomment %}

While we recommend using the {% term "Home Assistant Operating System" %}, you can also run Home Assistant in a container environment that you manage yourself. Before you continue, be aware of the limitations and differences compared to the {% term "Home Assistant Operating System" %}. You can find more information on the [installation page](/installation/#about-installation-types). Most notably, <a href="/apps">apps</a> are only available with the Home Assistant Operating System.

{% include installation/container.md %}
