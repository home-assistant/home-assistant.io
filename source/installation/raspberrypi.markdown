---
title: "Raspberry Pi"
description: "Install Home Assistant on a Raspberry Pi"
installation_type: raspberrypi
---
{% comment %}
Included sections for this page is located under source/_includes/installation
{% endcomment %}

{% assign board = "Raspberry Pi" %}
{% assign installation_media = "SD card" %}

<div class='note warning'>

Please remember to ensure you're using an [appropriate power supply](https://www.raspberrypi.com/documentation/computers/raspberry-pi.html#power-supply) with your Raspberry Pi. Mobile chargers may not be suitable, since some are designed to only provide the full power with that manufacturer's handsets. USB ports on your computer also will not supply enough power and must not be used.

</div>

{% include installation/operating_system.md %}
{% include installation/container.md %}
{% include installation/core.md %}

_We get commissions for purchases made through links in this post._
