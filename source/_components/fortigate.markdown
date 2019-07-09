---
layout: page
title: "Fortigate"
description: "Instructions on how to integrate Fortigate Firewalls into Home Assistant."
date: 2019-07-07 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: fortinet.jpg
ha_category:
  - Presence Detection
ha_release: 0.96
ha_iot_class: Local Polling
---

This is a Fortigate presence sensor based on device detection of the Fortigate API

## Configuration

Add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
fortigate:
  host: HOST_IP
  username: USERNAME
  password: API_KEY
```

{% configuration %}
host:
  description: The IP of the Fortigate.
  required: true
  type: string
username:
  description: The username of the user that will connect to the Fortigate
  required: true
  type: string
password:
  description: The API key associated with the user
  required: true
  type: string
devices:
  description: The MAC addresses of the devices to monitor
  required: false
  type: string
{% endconfiguration %}

## Fortigate Configuration

Configure the Fortigate with a USERNAME API user and assign its minimum rights profile :

```fgt

config system accprofile
    edit "homeassistant_profile"
        set authgrp read
    next
end

config system api-user
    edit "USERNAME"
        set api-key API_KEY
        set accprofile "homeassistant_profile"
        set vdom "root"
        config trusthost
            edit 1
                set ipv4-trusthost <trusted subnets>
            next
        end
    next
end
```

### Errors

If the rights of the profile are not sufficient, you will get the following error:

```txt
ERROR (MainThread) [homeassistant.core] Error doing job: Task exception was never retrieved
```
And the following Python exception as well: `pyFGT.fortigate.FGTValueError`
