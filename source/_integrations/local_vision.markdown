---
title: Local vision
description: Recognize the state of a part of a camera view, such as an open garage door or a parked car, fully local.
ha_categories:
  - ai_voice.image_recognition
  - helpers.calculate_value
ha_release: 2026.11
ha_iot_class: Calculated
ha_quality_scale: bronze
ha_config_flow: true
ha_codeowners:
  - '@RaHehl'
ha_domain: local_vision
ha_platforms:
  - binary_sensor
ha_integration_type: helper
related:
  - docs: /integrations/camera/
    title: Camera integration documentation
  - docs: /integrations/binary_sensor/
    title: Binary sensor integration documentation
---

The **Local vision** {% term integration %} creates a binary sensor that recognizes the state of a part of a camera view. For example, it can tell whether a garage door is open or closed, whether a car is parked in its spot, or whether a window is open.

You teach the sensor with example frames from your camera, at least one for each state. No model training or cloud service is needed: the comparison runs on your Home Assistant, with any camera that Home Assistant can show.

## Prerequisites

- A [camera](/integrations/camera/) entity that shows the area you want to watch.
- The part of the view that changes between the two states is visible in daylight and at night. Cameras with night vision work.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Camera:
  description: The camera that shows what you want to watch.
Device class:
  description: What the region shows, **Door**, **Garage door**, **Occupancy**, **Opening**, or **Window**. This sets the state names, such as **Open** and **Closed**, and the icon. The default is **Occupancy**.
Name:
  description: The name of the sensor, for example **Garage door**. If the camera belongs to a device, the sensor is added to that device and the device name is shown in front of it.
Left:
  description: Where the region starts, in percent of the frame width from the left edge.
Top:
  description: Where the region starts, in percent of the frame height from the top edge.
Right:
  description: Where the region ends, in percent of the frame width from the left edge.
Bottom:
  description: Where the region ends, in percent of the frame height from the top edge.
{% endconfiguration_basic %}

The **Choose the region** step shows the current frame with the region outlined. The next step, **Check the region**, shows the result. Select **Use this region** to create the sensor, or **Change the region** to go back.

## Configuration options

The sensor stays unknown until you teach it both states. To teach it:

1. Go to {% my helpers title="**Settings** > **Devices & services** > **Helpers**" %} and select the sensor.
2. Select **Settings** {% icon "mdi:cog-outline" %}, then **Local vision options**.
3. Select **Teach the current frame**. The dialog shows the current frame with the region outlined.
4. Under **What does the region show?**, select the state, then select **Submit**.
5. Repeat when the region shows the other state.

{% configuration_basic %}
Teach the current frame:
  description: Takes the current camera frame and stores it as an example of the state you select.
Remove taught frames:
  description: Removes frames that were taught with the wrong state or that no longer match the view, for example after the camera was moved.
{% endconfiguration_basic %}

**Remove taught frames** only appears after at least one frame is taught.

Teach more frames when the region looks different, for example at night, with the lights on, or in bright sun. A few frames per state are usually enough.

## Supported functionality

### Binary sensor

The integration provides one binary sensor per region. It is on or off as taught, with the state names of the selected device class. It is unknown while it has not been taught both states, while Home Assistant is starting, when the frame shows nothing, or when the region matches both states about equally well.

### Choosing the region

- Keep the region tight around what changes, such as the door itself or the roof of the parked car.
- Leave out things that move for other reasons, such as people, plants, or things that get moved around.
- The region needs some detail in every state. A region that only shows a plain surface, such as a bare wall, can't be taught and makes the sensor unknown. Make the region larger so it includes some edges or texture.

## Local vision automation examples

Use the sensor like any other binary sensor in your automations.

{% include docs/paste_yaml_tip.md %}

### Automation: Notify when the garage door is left open

Get a notification when the garage door has been open for 30 minutes.

- **Trigger**: State changed
  - **Entity**: Garage camera Garage door (`binary_sensor.garage_camera_garage_door`)
  - **To**: Open
  - **For at least**: 00:30:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)
  - **Message**: The garage door has been open for 30 minutes.

{% details "YAML example for the garage door notification" %}

{% example %}
automation: |
  alias: "Notify when the garage door is left open"
  triggers:
    - trigger: state
      entity_id: binary_sensor.garage_camera_garage_door
      to: "on"
      for:
        minutes: 30
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The garage door has been open for 30 minutes."
{% endexample %}

{% enddetails %}

### Automation: Check right after the door closes

The sensor checks every 5 minutes. To know right away whether the car is parked, update it when your garage door opener reports the door as closed.

- **Trigger**: State changed
  - **Entity**: Garage door (`cover.garage_door`)
  - **To**: Closed
- **Action**: Update entity
  - **Entities to update**: Garage camera Car parked (`binary_sensor.garage_camera_car_parked`)

{% details "YAML example for updating after the door closes" %}

{% example %}
automation: |
  alias: "Check the parking spot when the door closes"
  triggers:
    - trigger: state
      entity_id: cover.garage_door
      to: "closed"
  actions:
    - action: homeassistant.update_entity
      target:
        entity_id: binary_sensor.garage_camera_car_parked
{% endexample %}

{% enddetails %}

## Data updates

The integration {% term polling polls %} a frame from the camera every 5 minutes and compares the region with the taught frames. To check at other times, use the **Update entity** action, as in the example above. The taught frames are stored in the `local_vision` folder of your configuration directory and are included in backups.

## Known limitations

- The sensor compares the region with the taught frames. If the camera is moved or its view changes, remove the old frames and teach new ones.
- The region and the device class can't be changed after setup. To change them, remove the sensor and add it again.
- Each state keeps up to 50 frames. When you teach more, the frame most similar to another one is removed.
- The sensor checks every 5 minutes, so it is not meant for events that only last a few seconds.

## Troubleshooting

### Symptom: The sensor is unavailable

#### Description

The camera did not return a frame, or returned one that can't be read, for example because it is offline. The log shows the reason.

#### Resolution

Check that the camera shows a picture. The sensor recovers on its own when the camera returns frames again.

### Symptom: The sensor is often unknown

#### Description

There are two causes:

- The taught frames don't cover how the region looks right now, for example at night or in different light.
- The frame shows no detail in the region, for example on a dark night without night vision. Such a frame can't be taught.

#### Resolution

- If the region is visible, open the options and teach the current frame with the state it shows.
- If the region is dark, turn on the camera's night vision or a light that covers the region, then teach a frame. Without visible detail, the sensor stays unknown.

## Removing the integration

To remove the sensor, go to {% my helpers title="**Settings** > **Devices & services** > **Helpers**" %}, select the sensor, and delete it. Its taught frames are deleted too.
