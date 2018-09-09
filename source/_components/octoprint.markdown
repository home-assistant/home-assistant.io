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

Single printer:

```yaml
octoprint:
  - host: YOUR_OCTOPRINT_HOST
    api_key: YOUR_API_KEY
    bed: false
    number_of_tools: 1
```

Multiple printers:

```yaml
octoprint:
  - host: YOUR_OCTOPRINT_HOST
    api_key: YOUR_API_KEY
    name: PRINTER_NAME_1
    bed: false
    number_of_tools: 1
  - host: YOUR_OCTOPRINT_HOST
    api_key: YOUR_API_KEY
    name: PRINTER_NAME_2
    bed: false
    number_of_tools: 1
```

Configuration variables:

- **host** (*Required*): IP address or hostname of Octoprint host.
- **api_key** (*Required*): The retrieved api key.
- **name** (*Optional*): Name of the printer, must be unique if you defined multiple ones.
- **bed** (*Optional*): If the printer has a heated bed.
- **number_of_tools** (*Optional*): Number of temperature adjustable tools. i.e. nozzle.

