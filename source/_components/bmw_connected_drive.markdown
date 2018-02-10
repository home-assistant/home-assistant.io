---
layout: page
title: "BMW connected drive"
description: "Instructions on how to setup your BMW connected drive account with Home Assistant."
date: 2018-01-10 23:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Other
ha_release: 0.65
---

This component lets you retrieve data on your BMW vehicle from the BMW Connected Drive portal. You need to have a working BMW Connected Drive account and a Connected Drive enabled vehicle for this to work.

For compatibility with your BMW vehicle check the (bimmer_connected page)[https://github.com/ChristianKuehnel/bimmer_connected] on github.

To enable this component in your installation, add the following to your
`configuration.yaml` file:

{% raw %}
```yaml
# Example configuration.yaml entry
bmw_connected_drive:
  mycar:
    username: #your user name
    password: #your_password>
    vin: #your vehicle identification number, 17 digits
```
{% endraw %}


{% configuration %}
bmw_connected_drive:
    description: configuration
    required: true
    type: map
    keys:
        name:
            description: name of your vehicle in Home assistant
            required: true
            type: map
            keys:
                username:
                    description: your BMW Connected Drive username
                    required: true
                    type: string
                password:
                    description: your BMW Connected Drive password
                    required: true
                    type: string
                vin:
                    description: Your BMW's vehicle identification number (VIN). This usually has 17 digits.
                    required: true
                    type: string

{% endconfiguration %}


# {% linkable_title Disclaimer %}
This software is not affiliated with or endorsed by BMW Group. 
