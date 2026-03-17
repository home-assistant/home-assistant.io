---
title: Repetier-Server
description: Instructions how to add Repetier-Server sensors to Home Assistant.
ha_category:
  - Hub
  - Sensor
ha_release: 0.94
ha_iot_class: Local Polling
ha_codeowners:
  - '@ShadowBr0ther'
ha_domain: repetier
ha_platforms:
  - sensor
ha_integration_type: integration
ha_quality_scale: legacy
---

[Repetier-Server](https://www.repetier-server.com/) is a 3D printer/CNC server, able to control multiple devices on the same server.
This integration handles the main integration to the server.

There is currently support for the following device types within Home Assistant:

- Sensor

## Configuration

```yaml
repetier:
  - host: REPETIER_HOST
    api_key: YOUR_API_KEY
```

{% configuration %}
repetier:
  description: Repetier integration
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
          default: all
          keys:
            "current_state":
              description: Text of current state.
            "extruder_temperature":
              description: Temperatures of all available extruders. These will be displayed as `printer_name_extruder_N`.
            "bed_temperature":
              description: Temperatures of all available heated beds. These will be displayed as `printer_name_bed_N`.
            "chamber_temperature":
              description: Temperatures of all available heated chambers. These will be displayed as `printer_name_chamber_N`.
            "current_job":
              description: Returns percentage done of current job in state, and current job information as attributes.
            "job_start":
              description: Start timestamp of job start.
            "job_end":
              description: Estimated job end timestamp.
{% endconfiguration %}

Example with multiple Repetier Servers:

```yaml
repetier:
  - host: REPETIER_HOST
    api_key: YOUR_API_KEY
    sensors:
      monitored_conditions:
        - 'current_state'
        - 'current_job'
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

### Retrieve API-key

To generate the needed API-key do the following:

- Go to your Repetier Server web-console
- Push the settings icon (the gear icon)
- Select User Profiles.
- Create a new user, deselect all options and click Create User.
- Edit the newly created user and take note of the API-key for this user, that's the one to use in the Home Assistant Settings
