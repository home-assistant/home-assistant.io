---
title: Terncy
description: Instructions on how to setup Terncy devices within Home Assistant.
ha_category:
  - Light
ha_release: pending_in_pr_merge
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@rxwen'
ha_domain: terncy
---

The `Terncy` integration allows you to control your Terncy devices connected to the Terncy Home Center (a ZigBee gateway) with Home Assistant.

The Terncy integration is automatically discovered. If not, add it via the add integration menu.

There is support for the following device types within Home Assistant:

- **Light** - The Terncy platform for supporting lights.


## Configuration

Before trying to control Terncy devices through Home Assistant, you have to set up the syetm using the [Terncy app](https://www.terncy.com/app).

To set up this integration, click Configuration in the sidebar and then click Integrations. You should see "Terncy" in the discovered section (if you do not, click the + icon in the lower right and find Terncy). Click configure and you will be presented with the initiation dialog. This will prompt you select the Terncy Home Center to connect. After you click submit, you will get a access request in Terncy app. After you approved the access, click submit to finish adding Terncy.

Once registration is complete you should see the Terncy lights listed as `light` entities. If you don't, you may have to restart Home Assistant once more.

