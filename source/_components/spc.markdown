---
layout: page
title: "SPC"
description: "Instructions how to setup Vanderbilt SPC devices within Home Assistant."
date: 2017-05-18 08:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Hub
ha_release: 0.47
logo: vanderbilt_spc.png
---

Home Assistant has support to integrate your [Vanderbilt SPC](http://www.spc-intruder-detection.com/ssp-spc/) alarm panel and any connected motion, door and smoke sensors.

Integration with SPC is done through a third-party API gateway called [SPC Web Gateway](http://www.lundix.se/smarta-losningar/) which must be installed and configured somewhere on your network.

Home Assistant needs to know where to find the SPC Web Gateway API endpoints, to configure this add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
spc:
  api_url: API_URL
  ws_url: WS_URL
```

Configuration variables:

- **api_url** (*Required*): URL of the SPC Web Gateway command REST API, e.g. `http://<ip>:8088`.
- **ws_url** (*Required*): URL of the SPC Web Gateway websocket, e.g. `ws://<ip>:8088`.

Supported sensors will be automatically discovered and added, however they will be hidden by default.

