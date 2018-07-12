---
layout: page
title: "Insteon (local)"
description: "Instructions on how to setup the Insteon Hub locally within Home Assistant."
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
*Note: The username and password here are for the hub and are different than the ones used to access the app. You can usually find these on the bottom of your hub (unless you've changed them through the settings in the app)*
- **host** (*Required*): The IP address of your hub.
- **username** (*Required*): The username used to access the Insteon interface (find in your Insteon app).
- **password** (*Required*): The password used to access the Insteon interface.
- **timeout** (*Optional*): Timeout to wait for connections. Defaults to 10 seconds.
- **port** (*Optional*): The port your hub is configured to listen to. Defaults to `25105`.

### {% linkable_title Full configuration %}

The `insteon_local` component currently supports lights (dimmers), switches and fans.

```yaml
insteon_local:
  host: YOUR HUB IP
  username: YOUR HUB USERNAME
  password: YOUR HUB PASSWORD
  timeout: 10
  port: 25105
```
