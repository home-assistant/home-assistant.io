---
layout: page
title: "PiFace Digital I/O"
description: "Instructions on how to integrate the PiFace Digital I/O module into Home Assistant."
date: 2016-05-08 15:00
sidebar: true
comments: false
sharing: true
footer: true
logo: raspberry-pi.png
ha_category: DIY
ha_release: 0.45
ha_iot_class: "Local Push"
---

The `rpi_pfio` component is the base for all related [PiFace Digital I/O (PFIO)](http://www.piface.org.uk/) platforms in Home Assistant. There is no setup needed for the component itself; for the platforms, please check their corresponding pages.

Set the jumpers on the PiFace board for address 0 (JP1: 1-2, JP2: 1-2).

## {% linkable_title Use with HassOS %}

Note that the PiFace Digital 2 uses the Raspberry Pi SPI port, which is disabled by default when using [HassOS](https://github.com/home-assistant/hassos). When using HassOS, you must mount the SD card on another computer and access the boot partition on the card. Edit the `config.txt` file and add the line `dtparam=spi=on` to the end. This should enable SPI when HassOS is booted and allow Home Assistant to access the PiFace Digital 2 board.
