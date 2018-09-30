---
layout: page
title: "Hook Switch"
description: "Instructions on how to integrate the Hook Smart Home Hub into Home Assistant."
sidebar: true
comments: false
sharing: true
footer: true
logo: hook.png
ha_category: Switch
ha_iot_class: "Assumed State"
ha_release: 0.34
---

The `hook` component allows you to control the [Hook Smart Home Hub](http://www.hooksmarthome.com/) from within Home Assistant.

Hook allows you to control cheap mains electrical outlets, like these ones at [Amazon](https://www.amazon.com/Etekcity-Wireless-Electrical-Household-Appliances/dp/B00DQELHBS). 

In short, Hook is an RF to Wi-Fi bridge, controlling devices that receive commands at 315MHz and 433MHz. Unfortunately, this does not allow Hook to determine if the command was successful, so the state is assumed.

Hook provides a simple [REST API](https://app.swaggerhub.com/api/rahilj/GetHook_RestAPI/v1). This Home Assistant component reads in devices that have been set up in the official app.

## {% linkable_title Configuration %}

Configure with either your username/password or your API token for the official app.

To enable this platform in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch: 
  - platform: hook
    username: YOUR_E_MAIL_ADDRESS
    password: YOUR_HOOK
```

Or

```yaml
# Example configuration.yaml entry
switch:
  - platform: hook
    token: YOUR_API_TOKEN
```

{% configuration %}
username:
    description: The email address associated with your Hook Smart Home Hub.
    required: true
    type: string
password:
    description: The password for your Hook Smart Home Hub.
    required: true
    type: string
token:
    description: The API token for your Hook Smart Home Hub.
    required: true
    type: string
{% endconfiguration %}

Extra debug logging is available, if you need it.

```yaml
# Example configuration.yaml entry
logger:
  default: error
  logs:
    homeassistant.components.switch.hook: debug
```
