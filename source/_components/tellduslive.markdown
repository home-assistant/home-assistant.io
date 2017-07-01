---
layout: page
title: "Telldus Live"
description: "Instructions how to integrate Telldus Live into Home Assistant."
date: 2016-01-17 16:00
sidebar: true
comments: false
sharing: true
footer: true
logo: telldus.png
ha_category: Hub
featured: false
ha_release: 0.11
---

The `tellduslive` component let you connect to [Telldus Live](https://live.telldus.com). It's cloud platform that connects to your Tellstick connected gear at home.

To get started using Telldus Live, you will have to obtain developer keys from the [developer page](https://api.telldus.com/keys/index).

To integrate your Telldus Live with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
tellduslive:
  public_key: ABCDEFGHJKLMNOPQRSTUVXYZ
  private_key: ABCDEFGHJKLMNOPQRSTUVXYZ
  token: ABCDEFGHJKLMNOPQRSTUVXYZ
  token_secret: ABCDEFGHJKLMNOPQRSTUVXYZ
```

Configuration variables:

- **public_key** (*Required*): The public key for the Telldus Live service.
- **private_key** (*Required*): The private key for the Telldus Live service.
- **token** (*Required*): The token for the Telldus Live service.
- **token_secret** (*Required*): The token secret for the Telldus Live service.

