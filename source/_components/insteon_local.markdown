---
layout: page
title: "Insteon (local)"
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

The `insteon_local` component let you use your [Insteon Hub](http://www.insteon.com/insteon-hub/) with Home Assistant.

To integrate your Insteon local setup with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml platform entry
insteon_local:
  host: YOUR HUB IP
  username: YOUR HUB USERNAME
  password: YOUR HUB PASSWORD
```

Configuration variables:

- **host** (*Required*): The IP address of your hub.
- **username** (*Required*): The username used to access the Insteon interface (find in your Insteon app).
- **password** (*Required*): The password used to access the Insteon interface.
- **timeout** (*Optional*): Timeout to wait for connections. Defaults to 10 seconds.
- **port** (*Optional*): The port your hub is configured to listen to. Defaults to `25105`.

### {% linkable_title Full configuration %} 

The `insteon_local` component currently supports both lights (dimmers) and switches. A full configuration may look like so:

```yaml
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

