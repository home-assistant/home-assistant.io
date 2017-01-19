---
layout: page
title: "Insteon(local)"
description: "Instructions how to setup the Insteon Hub locally within Home Assistant."
date:  2016-12-18 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: insteon.png
ha_category: Hub
ha_iot_class: "Local Polling"
ha_version: 0.36
---

The `insteon-local` component lets you use your [Insteon Hub](http://www.insteon.com/insteon-hub/) with Home Assistant.

To integrate your Insteon(local) with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml platform entry
insteon_local:
  host: YOUR HUB IP
  username: YOUR HUB USERNAME
  password: YOUR HUB PASSWORD
  timeout: 10
  port: 25105
```

The Insteon(local) component currently supports both lights(dimmers) and switches. A full configuration may look like so:

```yaml
# Example configuration.yaml platform entry
insteon_local:
  host: YOUR HUB IP
  username: YOUR HUB USERNAME
  password: YOUR HUB PASSWORD
  timeout: 10
  port: 25105

light:
  - platform: insteon_local
  
switch:
  - platform: insteon_local  
```

Configuration variables:
*Note: The username and password here are for the hub and are different than the ones used to access the app. You can usually find these on the bottom of your hub (unless you've changed them through the settings in the app)*
- **username** (*Required*): The username used to access the Insteon hub
- **password** (*Required*): The password used to access the Insteon hub
- **host** (*Required*): The ip address of your hub.
- **timeout** (*Optional*): Timeout to wait for connection. (default: 10)
- **port** (*Optional*): The port your hub is configured to listen to.  (default: 25105)