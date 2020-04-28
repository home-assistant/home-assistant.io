---
title: FortiGate
description: Instructions on how to integrate FortiGate Firewalls into Home Assistant.
ha_category:
  - Presence Detection
ha_release: 0.97
ha_iot_class: Local Polling
ha_codeowners:
  - '@kifeo'
ha_domain: fortigate
---

This is a FortiGate presence sensor based on device detection of the FortiGate API

This integration will be deprecated in order to only use the fortios integration

## FortiGate set up

Configure the FortiGate with a USERNAME API user and assign its minimum rights profile:

```text
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

## Configuration

Add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
fortigate:
  host: HOST_IP
  username: YOUR_USERNAME
  api_key: YOUR_API_KEY
```

{% configuration %}
host:
  description: The IP address of the FortiGate device.
  required: true
  type: string
username:
  description: The username of the user that will connect to the FortiGate device.
  required: true
  type: string
api_key:
  description: The API key associated with the user.
  required: true
  type: string
devices:
  description: The MAC addresses of the devices to monitor.
  required: false
  type: string
{% endconfiguration %}

## Errors

If the rights of the profile are not sufficient, you will get the following error:

```txt
ERROR (MainThread) [homeassistant.core] Error doing job: Task exception was never retrieved
```
