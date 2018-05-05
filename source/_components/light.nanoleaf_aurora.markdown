---
layout: page
title: "Nanoleaf Aurora Light Panel"
description: "Instructions how to integrate Nanoleaf Aurora Light Panels into Home Assistant."
date: 2018-01-04 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: nanoleaf_aurora_light.png
ha_category: Light
ha_iot_class: "Local Polling"
featured: false
ha_release: 0.67
---

### {% linkable_title Configuration Sample %}

To enable the Aurora lights, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: nanoleaf_aurora
    host: 192.168.1.10
    token: xxxxxxxxxxxxxxxxxxxxx
```

{% configuration %}
host:
  description: IP address or host-name of the device, e.g., 192.168.1.10.
  required: true
  type: string
token:
  description: The *auth* token that you get via *POST* to */api/v1/new*
  required: true
  type: string
name:
  description: Name of the component, make this unique if you have multiple Light Panels
  required: false
  type: string
  default: Aurora
{% endconfiguration %}

### {% linkable_title Getting The Auth Token %}

1. Make sure that your Nanoleaf Aurora Panel is fully patched (as of the time of writing the latest version was 2.2.0)
2. Hold down the *ON* button on the Panel for 5 seconds; the LED will start flashing
3. Issue a *POST* request to the API endpoint, e.g., via `$ curl -i -X POST http://192.168.1.155:16021/api/v1/new`
4. The output should include the auth token like *{"auth_token":"xxxxxxxxxxxxxxxxxxxxx"}*, copy the resulting token into your configuration

If you get a 403 Forbidden message, you probably did not press the *ON* button long enough. The time-frame to get a valid token is only 30 seconds, so you have to be quick to issue the curl request.
