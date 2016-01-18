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

[Telldus Live] is a cloud platform that connects to your Tellstick connected gear at home.

[Telldus Live]: https://live.telldus.com

To get started using Telldus Live, you will have to obtain developer keys from [here][developer-keys].

[developer-keys]: https://api.telldus.com/keys/index

```yaml
# Example configuration.yaml entry
tellduslive:
  public_key: XX
  private_key: XX
  token: XX
  token_secret: XX
```
