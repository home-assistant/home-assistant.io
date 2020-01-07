---
title: SkyBell
description: Instructions on how to integrate your Skybell HD devices within Home Assistant.
logo: skybell.png
ha_category:
  - Doorbell
  - Binary Sensor
  - Camera
  - Light
  - Sensor
  - Switch
ha_release: 0.56
ha_iot_class: Cloud Polling
---

The `skybell` implementation allows you to integrate your [Skybell.com](http://www.skybell.com/) doorbells in Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](/integrations/skybell/#binary-sensor)
- [Camera](/integrations/skybell/#camera)
- [Light](/integrations/skybell/#light)
- [Sensor](/integrations/skybell/#sensor)
- [Switch](/integrations/skybell/#switch)

Currently only the Skybell HD is supported by this platform.

## Configuration

To enable devices set up with your [Skybell.com](http://www.skybell.com/) account, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
skybell:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: The username for accessing your Skybell account.
  required: true
  type: string
password:
  description: The password for accessing your Skybell account.
  required: true
  type: string
{% endconfiguration %}

### Binary Sensor

Once you have enabled the Skybell component, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: skybell
    monitored_conditions:
      - button
      - motion
```

{% configuration %}
monitored_conditions:
  description: Conditions to display in the frontend. The following conditions can be monitored.
  required: true
  type: list
  keys:
    button:
      description: Returns whether the doorbell button was pressed.
    motion:
      description: Returns whether movement was detected by the Skybell doorbell.
{% endconfiguration %}

### Camera

Once you have enabled the Skybell component, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: skybell
```

{% configuration %}
monitored_conditions:
  description: The camera images to display. Default is `avatar`. The full list is `avatar`, `activity`.
  required: false
  type: list
avatar_name:
  description: Name to append to the device name for the avatar image. Default is empty string.
  required: false
  type: string
activity_name:
  description: Name to append to the device name for the last activity image. Default is empty string.
  required: false
  type: string
{% endconfiguration %}

#### Camera Types

There are two available camera types "Avatar", which is the default, displays the Skybell avatar image.
It is periodically updated with a fresh image. The other type is "Activity", which displays a snapshot from
the latest event (motion, bell, or on demand) captured by the camera. You may show either camera, or both, by
specifying its name under monitored_condtions. It's recommended, but not required, to set either avatar_name or activity_name
if you are showing both cameras so you can tell them apart. The name will be appended to the skybell device name.

```yaml
# Example configuration.yaml with both images
camera:
  - platform: skybell
    monitored_conditions:
    - avatar
    - activity
    activity_name: "Last Activity"
```

```yaml
# Example configuration.yaml with just last activity image
camera:
  - platform: skybell
    monitored_conditions:
    - activity
```

### Light

Once you have enabled the Skybell component, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: skybell
```

### Sensor

Once you have enabled the Skybell component, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: skybell
    monitored_conditions:
      - chime_level
```

{% configuration %}
monitored_conditions:
  type: list
  required: true
  description: Conditions to display in the frontend. The following conditions can be monitored.
  keys:
    chime_level:
      description: Return a value between 0-3, indicating no chime, low, medium, and high respectively.
{% endconfiguration %}

### Switch

Once you have enabled the Skybell component, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: skybell
    monitored_conditions:
      - do_not_disturb
      - motion_sensor
```

{% configuration %}
monitored_conditions:
  description: Conditions to display in the frontend.
  required: true
  type: list
  keys:
    do_not_disturb:
      description: Control the state of your doorbells indoor chime.
    motion_sensor:
      description: Control the state of your doorbells motion sensor.
{% endconfiguration %}
