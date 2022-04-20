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
  
IMPORTANT: Read this is you are using a SD card and want to extend the life of the card:
By default Home Assistant write the events to the database every second (i.e. real time) and that produces a lot of writes to disk, which is not a problem if you are using a SSD, but it is a problem when using a SD card as they don´t support so many writes and end up dying after some months. Just by adding the parameter "commit_interval" the events will be written to the database every x amount of seconds, what will extend the life of the SD card.

recorder:
  commit_interval: 30

For details visit https://www.home-assistant.io/integrations/recorder/#commit_interval

</div>

{% include installation/operating_system.md %}
{% include installation/container.md %}
{% include installation/core.md %}

_We get commissions for purchases made through links in this post._
