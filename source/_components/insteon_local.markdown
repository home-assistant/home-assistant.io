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
ha_release: 0.36
redirect_from: /components/insteon_hub/
---

The `insteon_local` component let you use your [Insteon Hub](http://www.insteon.com/insteon-hub/) with Home Assistant.

## {% linkable_title Configuration %}

To integrate your Insteon Hub (local setup) with Home Assistant, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml platform entry
insteon_local:
  host: YOUR_HUB_IP
  username: YOUR_HUB_USERNAME
  password: YOUR_HUB_PASSWORD
```

{% configuration %}
host:
  description: The IP address of your hub.
  required: true
  type: string
username:
  description: The username used to access the Insteon interface (find in your Insteon app).
  required: true
  type: string
password:
  description: The password used to access the Insteon interface.
  required: true
  type: string
timeout:
  description: Timeout to wait for connections.
  required: false
  type: time
  default: 10 seconds
port:
  description: The port your hub is configured to listen to.
  required: false
  type: string
  default: 25105
{% endconfiguration %}

*Note: The username and password here are for the hub and are different than the ones used to access the app. You can usually find these on the bottom of your hub (unless you've changed them through the settings in the app)*

The `insteon_local` component currently supports lights (dimmers), switches and fans.

<p class='note'>
This component replaces the old `insteon_hub` component, which has been removed due to a complaint by Insteon.
</p>
