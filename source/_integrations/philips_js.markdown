---
title: Philips TV
description: Instructions on how to add Philips TVs to Home Assistant.
ha_category:
  - Media Player
ha_iot_class: Local Polling
ha_release: 0.34
ha_codeowners:
  - '@elupus'
ha_domain: philips_js
ha_config_flow: true
---

The `philips_js` platform allows you to control Philips TVs which expose the [jointSPACE](http://jointspace.sourceforge.net/) JSON-API.

Instructions on how to activate the API and if your model is supported can be found [here](http://jointspace.sourceforge.net/download.html). Note that not all listed, jointSPACE-enabled devices will have JSON-interface running on port 1925. This is true at least for some models before year 2011.

{% include integrations/config_flow.md %}

### Turn on device

The Philips TV does not support turning on via the API. You can either turn it on via IR blaster to or on som models WOL. To trigger this command from the entities, the integration exposes a `device trigger` that can be setup to execute when the `media_player` is asked to turn on.

### Know issues

 * Current input/source is only supported on v1 API
 * Selection of input/source is only supported on v1 and v6 API
 * Available input/source is only an static list on v6 API
 * Current running application is reported invalid on (at least) some 2020 TV's Android tv's
 * CEC control over absolute volume is broken on 2020 Android TV's
 * Saphi based Philips TV's are not supported due to different authentication protocol
