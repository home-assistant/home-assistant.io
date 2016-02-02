---
layout: component
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
---

The `tellduslive` component let you connect to [Telldus Live](https://live.telldus.com). It's cloud platform that connects to your Tellstick connected gear at home.

To get started using Telldus Live, you will have to obtain developer keys from [https://api.telldus.com/keys/index](developer keys).

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

Tellstick Net devices can be auto discovered using [this method](https://developer.telldus.com/doxygen/html/TellStickNet.html).

It might be possible to communicate with the Tellstick Net device directly, bypassing the Tellstick Live service. This however is [poorly documented](http://developer.telldus.se/ticket/114) and yet not [fully supported](https://developer.telldus.com/doxygen/html/TellStickNet.html).

<p class='note warning'>
API requests to certain methods are limited to one request every 10 minutes.
</p>

