---
layout: page
title: "LIFX Cloud Scenes"
description: "Instructions on using native LIFX scenes with Home Assistant."
date: 2017-04-15 23:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lifx.png
ha_category: Scene
ha_release: 0.43
---

The `lifx_cloud` scene platform allows you to activate the scenes that LIFX smartphone apps store in the LIFX cloud.

```yaml
# Example configuration.yaml entry
scene:
  - platform: lifx_cloud
    token: YOUR_LIFX_TOKEN
```

Configuration variables:

- **token** (*Required*): The API token for your LIFX Cloud account.
- **timeout** (*Optional*): Network timeout in seconds (defaults to 10).

### Getting an API token

You create your API token on the LIFX website:
1. Sign in to the [LIFX Cloud](https://cloud.lifx.com/)
2. Click on your e-mail address and select _Settings_
3. Now click _Generate New Token_
4. Enter a meaningful label, such as 'Home Assistant'
5. Click _Generate_
6. Copy the token that now appears
7. Paste the token into the Home Assistant configuration file
