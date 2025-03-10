---
title: Ring
description: Instructions on integrating Ring.com devices with Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Camera
  - Doorbell
  - Event
  - Light
  - Number
  - Sensor
  - Switch
ha_release: 0.42
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: ring
ha_dhcp: true
ha_platforms:
  - binary_sensor
  - button
  - camera
  - diagnostics
  - event
  - light
  - number
  - sensor
  - siren
  - switch
ha_integration_type: integration
ha_codeowners:
  - '@sdb9696'
---

The Ring integration allows you to control your [Ring.com](https://ring.com/) doorbell, stick up cam, chime, and intercom devices in Home Assistant.

## How you can use this integration

The Ring integration lets you do many things, such as switching devices on and off based on schedules or events, viewing live camera feeds, and controlling device configurations manually or via automations.

## Prerequisites

You need to provision your newly purchased devices via the Ring application, which will require creating a Ring account at [Ring.com](https://ring.com/) or via the official application.
After that, you will use your Ring account credentials to log on to the Ring cloud in Home Assistant.

{% include integrations/config_flow.md %}

{% configuration_basic %}

Username:
  description: |
    Your Ring account username.
Password:
  description: |
    Your Ring account password.
2fa:
  description: |
    Account verification code via the method selected in your Ring account settings.

{% endconfiguration_basic %}

## Supported devices

There is currently support for the following device types within Home Assistant:

- **Doorbells**: Doorbell, Doorbell 2, Doorbell 3, Doorbell 3 Plus, Doorbell 4, Doorbell Pro, Doorbell Pro 2, Doorbell Elite, Doorbell Wired, Battery Doorbell, Doorbell (2nd Gen), Peephole Cam
- **Stickup cams**: Floodlight Cam, Floodlight Cam Pro, Floodlight Cam Plus, Indoor Cam, Indoor Cam (2nd Gen), Spotlight Cam Battery, Spotlight Cam Wired, Spotlight Cam Plus, Spotlight Cam Pro, Stick Up Cam, Stick Up Battery, Stick Up Wired, Stick Up Cam (3rd Gen)
- **Chimes**: Chime, Chime Pro
- **Intercoms**: Intercom


## Supported functionality

### Binary sensor

The binary sensor switches off and on when motion, doorbell rings, and intercom unlock events occur.

The binary sensor is being replaced with the event entity, and you should migrate any automations to the event entity by release 2025.4.0.

### Button

Once you have enabled the [Ring integration](/integrations/ring), you can start using the button platform. Currently, it supports intercom to open the door.

### Camera

Once you have enabled the [Ring integration](/integrations/ring), you can start using the camera platform.
Currently, it supports doorbells and stickup cameras.
Two camera entities are provided: `live_view` and `last_recording`.
`last_recording` is disabled by default.

{% important %}
Please note that downloading and playing Ring video from the `last_recording` camera will require a Ring Protect plan.
{% endimportant %}

### Event

The event entity captures events like doorbell rings, motion alerts, and intercom unlocking.

### Sensor

Once you have enabled the [Ring integration](/integrations/ring), you can start using the sensor platform. Currently, it supports battery level and Wi-Fi signal.

The volume sensors are being replaced with the number entity, which allows setting the volume. You should migrate any automations using the volume sensors to the number entity by release 2025.4.0.

### Siren

- Adds a siren entity for every camera that supports a siren. Note the siren will only turn on for 30 seconds before automatically turning off.
- Adds a siren entity for chimes to play the test sound.

### Switch

Once you have enabled the [Ring integration](/integrations/ring), you can start using the switch platform.

- Motion detection - Switches motion detection on and off for cameras.
- In-home chime - Switches on and off a mechanical or digital chime connected to a ring doorbell.

### Light

Once you have enabled the [Ring integration](/integrations/ring), you can start using the light platform. This will add a light for every camera that supports a light (such as a floodlight).

### Number

Once you have enabled the [Ring integration](/integrations/ring), you can start using the number platform.
Currently, it supports showing and setting the volume of the doorbell/chime ring, intercom voice volume, and intercom microphone volume.

## Data updates

The Ring cloud API is {% term polling polled %} for data updates every 60 seconds. When you make changes through Home Assistant (for example by switching motion detection on), the device's state is updated immediately rather than waiting for the next  {% term polling poll %}.
The Ring integration does not connect locally to devices, all communication goes via the cloud.

## Known limitations

### Two-way audio

Two-way audio in camera live view is not currently supported.

### Last recording

To view the last recording entity you will need a Ring subscription.

### Multiple alerts

Some device models send two alerts for a single doorbell ring event.
The integration will provide a workaround for this in a future release.

## Troubleshooting

### Realtime event stability

Home Assistant requires outbound TCP access to port 5228 to connect to Ring's real-time event service.
Ensure your firewall and network configuration allow this connection.

Below are steps to follow if realtime events are not working.

#### Step 1

Issues with Ring alerts may be caused by having too many authenticated devices on your Ring account. Before version 2023.12.0, the Home Assistant Ring integration would register a new entry in `Authorized Client Devices` in the `Control Center` at [ring.com](https://account.ring.com/account/control-center/authorized-devices) on every restart.

{% important %}
When cleaning up devices:

1. Only delete entries that start with `ring-doorbell:HomeAssistant` or `Python`.
2. Do NOT delete entries for your phones or other Ring apps.
3. If there are too many devices to delete individually, you can use the **Remove all devices** option, but you'll need to re-authorize all your devices afterward.

{% endimportant %}

#### Step 2

If you're still experiencing issues after Step 1, try generating a new unique ID for the Home Assistant Ring integration instance.
To do this, select the three dots {% icon "mdi:dots-vertical" %} menu on the integration entry and select the **Reconfigure** option.
Do not try this step before clearing down all the excess `Authorized Client Devices` as per Step 1, or it will simply invalidate the reconfigured entry.

#### Step 3

If alerts are still not working after Steps 1 and 2, try toggling the Motion Warning setting:

1. Go to [ring.com](https://ring.com) and sign in.
2. Select your device.
3. Navigate to **Device Settings**.
4. Find the **Motion Warning** toggle.
5. Turn it off and wait for 30 seconds.
6. Turn it back on.

This has successfully restored alerts for many users.

## Examples

### Automation ideas

- Turn on motion detection for internal cameras when you leave home (with geofencing) and turn off when you get home.
- Start a live feed on a device when the doorbell rings.
- Turn up the volume on a digital chime when you are in the garden.

### Setting up doorbell alerts

You can set an automation up in the Home Assistant UI.

1. Find the correct **event** entity under **Entity triggers**.
2. For **From** choose the setting **Any state (ignoring attribute changes)**.
3. Then add a **Send notification** action under **Notifications**.

This will result in yaml similar to the following:

```yaml
alias: Doorbell alerts
description: ""
triggers:
  - trigger: state
    entity_id:
      - event.front_door_ding
    from: null
conditions: []
actions:
  - device_id: internalhadeviceid
    domain: mobile_app
    type: notify
    message: Front door ding
    title: Front door ding
mode: single
```

### Saving the videos captured by your Ring Door Bell

You can save locally the latest video captured by your Ring Door Bell using the [downloader](/integrations/downloader) along with either an [automation](/integrations/automation) or [python_script](/integrations/python_script).
First, enable the [downloader](/integrations/downloader) integration in your configuration by adding the following to your `configuration.yaml`.

```yaml
downloader:
  download_dir: downloads
```

Then you can use the following automation, with the entities from your system, which will save the video file under `<config>/downloads/<camera_name>/<camera_name>.mp4`:

{% raw %}

```yaml
automation:
  alias: "Save the video when the doorbell is pushed"
  triggers:
  - trigger: state
    entity_id: event.front_doorbell_ding
    from: null
  actions:
  - delay:
    hours: 0
    minutes: 5
    seconds: 0
    milliseconds: 0
  - action: downloader.download_file
    data:
      overwrite: true
      url: "{{ state_attr('camera.front_door_last_recording', 'video_url') }}"
      subdir: "{{state_attr('camera.front_door_last_recording', 'friendly_name')}}"
      filename: "{{state_attr('camera.front_door_last_recording', 'friendly_name')}}.mp4"
```

{% endraw %}

You may consider some modifications in the subdirectory and the filename to suit your needs. For example, you can add the date and the time and extension to the downloaded file:

{% raw %}
```yaml
    data:
      url: "{{ state_attr('camera.front_door_last_recording', 'video_url') }}"
      subdir: "{{ state_attr('camera.front_door_last_recording', 'friendly_name') }}/{{ now().strftime('%Y.%m') }}"
      filename: "{{ now().strftime('%Y-%m-%d-at-%H-%M-%S') }}.mp4"
```
{% endraw %}

the above modification will save the video file under `<config>/downloads/<camera_name>/YYYY-MM/YYYY-MM-DD-at-HH-MM-SS.mp4`. You can change the date according to your localization format.

If you want to use `python_script`, enable it your {% term "`configuration.yaml`" %} file first:

```yaml
python_script:
```

You can then use the following `python_script` to save the video file:

```python
# obtain ring doorbell camera object
# replace the camera.front_door by your camera entity
ring_cam = hass.states.get("camera.front_door_last_recording")

subdir_name = f"ring_{ring_cam.attributes.get('friendly_name')}"

# get video URL
data = {
    "url": ring_cam.attributes.get("video_url"),
    "subdir": subdir_name,
    "filename": ring_cam.attributes.get("friendly_name"),
}

# call downloader integration to save the video
hass.services.call("downloader", "download_file", data)
```

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
