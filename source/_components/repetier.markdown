---
layout: page
title: Repetier-Server Component
description: "Instructions how to add Repetier-Server sensors to Home Assistant."
date: 2019-03-04
sidebar: true
comments: false
sharing: true
footer: true
ha_release: 0.88
ha_iot_class: "Local Polling"
---

[Repetier-Server](https://www.repetier-server.com/) is a 3D printer/CNC server, able to control multiple devices on the same server.
This component handles the main integration to the server.

## {% linkable_title Configuration %}

```yaml
repetier:
  - host: REPETIER_HOST
    api_key: YOUR_API_KEY
```

{% configuration %}
repetier:
  type: list
  required: true
  keys:
    host:
      description: The host IP or hostname of your Repetier-Server.
      required: true
      type: string
    api_key:
      description: API-key for the user used to connect to Repetier-Server
      required: true
      type: string
    port:
      description: The port used to connect to the host
      required: false
      type: integer
      default: 3344
    sensors:
            description: Configuration for the sensors.
      required: false
      type: map
      keys:
        monitored_conditions:
          description: The sensors to activate.
          type: list
          default: all (`Current State`, `Temperatures`, `Job Percentage`, `Time Elapsed`, `Time Remaining`)
          keys:
            "Current State":
              description: Text of current state.
            "Temperatures":
              description: Temperatures of all available extruders, beds and heated chambers. These will be displayed as `nozzle_N`, `nozzle_N`, or `chamber_N`.
            "Job Percentage":
              description: Percentage of the job.
            "Time Elapsed":
              description: Time elapsed on current print job, in HH:MM:SS format.
            "Time Remaining":
              description: Time remaining on current print job, in HH:MM:SS format.
{% endconfiguration %}

Example with multiple printers:

```yaml
repetier:
  - host: REPETIER_HOST
    api_key: YOUR_API_KEY
    sensors:
      monitored_conditions:
        - 'Current State'
        - 'Job Percentage'
  - host: REPETIER_HOST
    api_key: YOUR_API_KEY
    port: 3344
```

If the Repetier-Server host is equipped with a web camera it is possible to add this as well.

```yaml
camera:
  - platform: mjpeg
    name: Repetier
    still_image_url: http://YOUR_REPETIER_HOST_IP:8080/?action=snapshot
    mjpeg_url: http://YOUR_REPETIER_HOST_IP:8080/?action=stream
```

### {% linkable_title Retrieve API-key %}

To generate the needed API-key do the following:
* Go to your Repetier Server web-console
* Push the settings icon (the gear icon)
* Select User Profiles.
* Create a new user, deselect all options and click Create User.
* Edit the newly created user and take note of the API-key for this user, that's the one to use in the Home Assistant Settings
