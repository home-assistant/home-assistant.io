---
layout: page
title: "OctoPrint"
description: "Instructions on how to setup the OctoPrint in Home Assistant."
date: 2015-01-20 22:36
sidebar: true
comments: false
sharing: true
footer: true
logo: octoprint.png
ha_category: Hub
featured: false
ha_release: 0.19
ha_iot_class: "Local Polling"
---

[OctoPrint](http://octoprint.org/) is a web interface for your 3D printer. This is the main component to integrate OctoPrint sensors, you will have to setup sensors and binary sensors separately.

To get started with the OctoPrint API, please follow the directions on their [site](http://docs.octoprint.org/en/master/api/general.html). Once OctoPrint is configured you will need to add your API key and host to your `configuration.yaml`. 


```yaml
octoprint:
  host: YOUR_OCTOPRINT_HOST
  api_key: YOUR_API_KEY
  bed: false
  number_of_tools: 1
```

{% configuration %}
host:
  description: IP address or hostname of Octoprint host.
  required: true
  type: string
api_key:
  description: The retrieved api key.
  required: true
  type: string
bed:
  description: If the printer has a heated bed.
  required: false
  default: false
  type: boolean
number_of_tools:
  description: Number of temperature adjustable tools, i.e. nozzle.
  required: false
  default: 0
  type: integer
{% endconfiguration %}

If the OctoPrint host is equipped with a web camera it is possible to add this as well.

```yaml
camera:
  - platform: mjpeg
    name: OctoPrint
    still_image_url: http://YOUR_OCTOPRINT_HOST_IP/webcam/?action=snapshot
    mjpeg_url: http://YOUR_OCTOPRINT_HOST_IP/webcam/?action=stream
```
