---
title: Hi-Link HLK-SW16
description: Instructions on how to integrate HLK-SW16 relay into Home Assistant.
ha_category:
  - DIY
  - Switch
ha_release: 0.84
ha_iot_class: Local Push
ha_codeowners:
  - '@jameshilliard'
ha_domain: hlk_sw16
ha_config_flow: true
---

The [HLK-SW16](http://www.hlktech.net/product_detail.php?ProId=48) by [Hi-Link](http://www.hlktech.net/) is a simple networkable 16 port relay device.

## Configuration

To add a Hi-Link HLK-SW16 to your installation, go to **Configuration** >> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **Hi-Link HLK-SW16**.

Enter the host and port for the HLK-SW16 TCP socket control interface and hit submit, if the connection is successful this will automatically populate the 16 relay switches as switch entities.
