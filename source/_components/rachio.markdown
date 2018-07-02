---
layout: page
title: "Rachio"
description: "Instructions on how to use Rachio with Home Assistant."
date: 2018-06-23 16:04
sidebar: true
comments: false
sharing: true
footer: true
logo: rachio.png
ha_category: Hub
ha_iot_class: "Cloud Push"
ha_release: 0.73
---

The `rachio` platform allows you to control your [Rachio irrigation system](http://rachio.com/).

## {% linkable_title Getting your Rachio API Key %}

1. Log in at [https://app.rach.io/](https://app.rach.io/).
1. Click the "Account Settings" menu item at the bottom of the left sidebar
1. Click "Get API Key"
1. Copy the API key from the dialog that opens.

To add this platform to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
rachio:
  api_key: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

### {% linkable_title iFrame %}

If you would like to see and control more detailed zone information, create an [iFrame](/components/panel_iframe/) that renders the Rachio web app.

```yaml
panel_iframe:
  rachio:
    title: Rachio
    url: "https://app.rach.io"
    icon: mdi:water-pump
```
