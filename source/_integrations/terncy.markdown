---
title: Terncy
description: Instructions on how to setup Terncy devices within Home Assistant.
ha_category:
  - Light
ha_iot_class: Local Push
ha_release: '1.0.0'
ha_config_flow: true
ha_codeowners:
  - '@rxwen'
ha_domain: terncy
---

The Terncy integration allows you to control your Terncy devices connected to the Terncy Home Center (a Zigbee gateway) with Home Assistant.

There is support for the following device type within Home Assistant:

- Light

## Configuration

The Terncy integration is automatically discovered. Or add it via the add integration menu.

Before trying to control Terncy devices through Home Assistant, you have to set up the system using the [Terncy app](https://www.terncy.com/app/).

To set up this integration, click Configuration in the sidebar and then click Integrations. You should see "Terncy" in the discovered section (if you do not, click the + icon in the lower right and find Terncy). Click configure and you will be presented with the initiation dialog. This will prompt you to select the Terncy Home Center to connect. After you click submit, you will get an access request in Terncy app. Within Terncy app, You'll find the pending access request in Home Center configuraiton page, under Local Access menu entry. After you approved the access, click submit to finish adding Terncy.

Once registration is complete you should see the Terncy lights listed as light entities.

