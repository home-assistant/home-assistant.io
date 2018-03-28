---
layout: page
title: "BMW connected drive"
description: "Instructions on how to setup your BMW connected drive account with Home Assistant."
date: 2018-01-10 23:00
sidebar: true
comments: false
sharing: true
footer: true
logo: bmw.png
ha_category: Hub
ha_release: 0.64
---

This component lets you retrieve data on your BMW vehicle from the BMW Connected Drive portal. You need to have a working BMW Connected Drive account and a Connected Drive enabled vehicle for this to work.

For compatibility with your BMW vehicle check the (bimmer_connected page)[https://github.com/m1n3rva/bimmer_connected] on github.

To enable this component in your installation, add the following to your
`configuration.yaml` file:

```yaml
# Example configuration.yaml entry
bmw_connected_drive:
  name:
    username: USERNAME_BMW_CONNECTED_DRIVE
    password: PASSWORD_BMW_CONNECTED_DRIVE
    country: COUNTRY_BMW_CONNECTED_DRIVE
```

{% configuration %}
bmw_connected_drive:
  description: configuration
  required: true
  type: map
  keys:
    name:
      description: Name of your account in Home Assistant.
      required: true
      type: string
    username:
      description: Your BMW Connected Drive username.
      required: true
      type: string
    password:
      description: Your BMW Connected Drive password.
      required: true
      type: string
    country:
      description: "The country of your Connected Drive account. Please use the exact names for the country as listed on the [Connected Drive website](https://www.bmw-connecteddrive.com/)."
      required: true
      type: string
{% endconfiguration %}

## {% linkable_title Disclaimer %}

This software is not affiliated with or endorsed by BMW Group. 
