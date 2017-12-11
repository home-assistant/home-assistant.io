---
layout: page
title: "coinbase"
description: "Instructions for how to add Coinbase sensors to Home Assistant."
date: 2017-12-08 17:54
sidebar: true
comments: false
sharing: true
footer: true
logo: coinbase.png
ha_release: 0.60
ha_iot_class: "Cloud Push"
---


The `coinbase` component lets you access wallet data from [coinbase](https://coinbase.com).

You will need to obtain an API key from coinbase's [developer site](https://www.coinbase.com/settings/api) to use this component. You need to give read access to your wallet:accounts in order for the component to access relevant data. 

To set it up, add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
coinbase:
  api_key: asdfghjklqwertyuiopzxcvbnm 
  api_secret: nkjnewncfghjklqwertyuiopzxcvbnm 
```

Configuration variables:

- **api_key** (*Required*): Your coinbase API key.
- **api_secret** (*Required*): Your coinbase API key.
