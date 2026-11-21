---
description: Instructions on how to set up Hikvision cameras and NVRs within Home Assistant.
ha_release: 0.35
ha_domain: hikvision
---

The **Hikvision** {% term integration %} connects your [Hikvision IP Camera or <abbr title="Network Video Recorder">NVR</abbr>](https://www.hikvision.com/) to Home Assistant, providing:

- Binary sensors that parse the event stream and present camera/NVR events as sensors with either an "off" or "on" state, and become unavailable while the event stream is disconnected
- Camera entities with <abbr title="Real Time Streaming Protocol">RTSP</abbr> streaming and <abbr title="Hypertext Transfer Protocol">HTTP</abbr> snapshot capabilities
- Switch entities to view and change the on/off image settings of a camera, such as highlight compensation

The platform will automatically add all sensors to Home Assistant that are
configured within the camera/nvr interface to "Notify the surveillance center"
as a trigger. If you would like to hide a sensor type you can do so by
unchecking "Notify the surveillance center" in the camera configuration.

{% important %}
In order for the sensors to work the hikvision user must have the 'Remote: Notify Surveillance Center/Trigger Alarm Output' permission which can be enabled from the user management section of the web interface. If authentication issues persist after permissions are verified, try accessing using an admin user. Certain devices will only authenticate with an admin account despite permissions being set correctly.
Also, the 'WEB Authentication' needs to be set to 'digest/basic' in the security/authentication section. Ensure this is applied on each individual camera in case of using an NVR.
{% endimportant %}

For example, if you configure a camera with the name "Front Porch" that has
motion detection and line crossing events enabled to notify the surveillance
center the following binary sensors will be added to Home Assistant:

```text
binary_sensor.front_porch_motion
binary_sensor.front_port_line_crossing
```

When used with a NVR device the sensors will be appended with the channel number
they represent. For example,
if you configure an NVR with the name "Home" that supports 2 cameras with
motion detection and line crossing events enabled to notify the surveillance
center the following binary sensors will be added to Home Assistant:

```text
binary_sensor.home_motion_1
binary_sensor.home_motion_2
binary_sensor.home_line_crossing_1
binary_sensor.home_line_crossing_2
```

This platform should work with all Hikvision cameras and nvrs,
and has been confirmed to work with the following models:

- DS-2CD2032-I
- DS-2CD2042WD-I
- DS-2CD2043G0-I
- DS-2CD2142FWD-I
- DS-2CD2155FWD-IS
- DS-2CD2232-I5
- DS-2CD2385G1
- DS-2CD2387G2-LU
- DS-2CD2686G2
- DS-2CD3132-I
- DS-7616NI-K2 (NVR)
- ERI-K104-PR (NVR)
- IPC-D140H(-M)

This platform has also been confirmed to work with the following Hikvision-based NVRs:

- N46PCK (Annke H800 4K NVR)
- N48PAW (Annke 4K NVR)
- Luma NVRs

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname or IP address of your Hikvision device. For example, `192.168.1.100`."
Port:
  description: "The port number of the web interface of your device. The default is `80`."
Username:
  description: "The username of a user on your device. This user needs the permissions described earlier on this page."
Password:
  description: "The password of that user."
Use SSL:
  description: "Turn on if your device uses HTTPS. This is off by default."
Verify SSL certificate:
  description: "Turn off if your device uses a self-signed certificate, which is what Hikvision devices come with. This only applies when **Use SSL** is on. This is on by default."
{% endconfiguration_basic %}

You cannot change these settings after you add the device. To use different settings, remove the integration and add it again.

## Camera

The integration creates camera entities for each video channel on your Hikvision device. These camera entities support:

- RTSP streaming: Live video streaming using the RTSP protocol
- HTTP snapshots: Still image capture via the camera's HTTP API

### NVR video channel discovery

When connecting to an NVR (Network Video Recorder) that manages multiple cameras, the integration automatically discovers all video channels. A separate camera entity is created for each channel, allowing you to view and manage each connected camera individually.

For example, if you configure an NVR named "Home" with 4 connected cameras, the following camera entities will be created:

```text
camera.home_channel_1
camera.home_channel_2
camera.home_channel_3
camera.home_channel_4
```

## Binary sensor

### Event notification methods

The integration detects events using the camera's event stream. For standalone cameras, events configured to "Notify the surveillance center" are automatically detected.

For NVR devices, the integration supports extended event detection with additional notification methods beyond the standard "center" and "HTTP" methods. The following notification triggers are supported:

- Center: Notify the surveillance center (standard method)
- HTTP: HTTP notification
- Record: Recording trigger
- Email: Email notification trigger
- Beep: Audible beep notification

This extended support allows detection of events that may be configured with non-standard notification methods on your NVR, which some devices use by default.

### Supported event types

Supported event types are:

- Motion
- Line Crossing
- Field Detection
- Tamper Detection
- Shelter Alarm
- Disk Full
- Disk Error
- Net Interface Broken
- IP Conflict
- Illegal Access
- Video Mismatch
- Bad Video
- PIR Alarm
- Face Detection
- Scene Change Detection
- I/O
- Unattended Baggage
- Attended Baggage
- Recording Failure
- Exiting Region
- Entering Region
- Thermometry (thermal cameras, as a **Temperature alarm** heat sensor)

### Availability

The binary sensors follow the connection to your device's event stream. While the stream is down, for example because the device is powered off or unreachable on your network, the sensors show as unavailable instead of keeping their last state. They return to reporting "off" or "on" once the connection is restored.

## Event

Some Hikvision devices classify what triggered a smart event, so you can tell a person from a passing car. The integration creates an event entity for each of these kinds of events on each channel:

- Motion
- Line crossing
- Field detection

Each event entity reports one of these event types when it triggers:

- `human`
- `pet`
- `vehicle`
- `triggered`, when the device does not say what caused the event

Whether your device classifies events, and which of these values it uses, depends on the model and the firmware. Devices that do not classify report `triggered` every time.

Use these entities when you want an automation to react only to a particular kind of trigger, for example to send a notification for a person crossing a line but not for a vehicle. Use the binary sensors instead when you want to know whether an event is currently active.

## Image settings

For a camera, the integration reads which image settings the camera supports and creates an entity for each one. These are the settings you find in the image configuration of the camera's web interface. Changing an entity changes the setting on the camera. Changes you make in the web interface of the camera show up in Home Assistant within 30 seconds.

Which settings exist depends on the model and the firmware. The integration only creates entities for the settings your camera reports. For example, a camera with a fixed iris has no iris controls, and a camera without a built-in light has no light controls.

The image setting entities are configuration entities on the device page of the camera. Many of the less common ones are disabled by default to keep the device page readable. To use one, go to {% my entities title="**Settings** > **Devices & services** > **Entities**" %}, select the entity, and enable it. You do not need to restart Home Assistant.

### Switch

Switches control the on/off image settings of a camera. A switch is created for each of these settings that your camera reports.

These switches are enabled by default:

- **Highlight compensation**
- **Backlight compensation**
- **Smart supplement light**

These switches are disabled by default:

- **Image flip**
- **Lens distortion correction**
- **Image stabilization**
- **Digital slow shutter**
- **Image freeze**
- **Lens initialization**
- **Proportional pan**
- **Image loss detection**

## Data updates

The binary sensors and event entities get their data through the event stream of the device. The device sends changes to Home Assistant as they happen.

Home Assistant {% term polling polls %} the image settings of a camera every 30 seconds, and again right after you change one in Home Assistant. The image setting entities are unavailable while the camera cannot be reached.

## Known limitations

- The image settings are those of the first video channel of the camera.
- Image settings are not available for cameras that are attached to an NVR.
- Only the settings your camera reports are available. Settings that your model or firmware does not support, or that need other permissions, do not appear.
- Changing an image setting needs a user who is allowed to change the parameters of the camera remotely. See the troubleshooting section.

## Troubleshooting

{% details "There are no image setting entities" %}

### Symptom: The camera has entities for events, but none for image settings

The integration works, but there are no number, select, switch, or sensor entities for the image settings of the camera.

#### Description

Image settings are optional. If the camera does not offer them, or does not allow the user to read them, the integration works as before and creates no image setting entities. Many of the entities that exist are also disabled by default.

#### Resolution

1. Check the entities of the device, including the disabled ones, as described in the image settings section.
2. Check the logs for `Not allowed to read the image settings`. If it is there, give the user the **Remote: Parameters Settings** permission in the user management section of the camera's web interface, or use an administrator account.
3. Check the logs for `Unable to read the image settings` or `Unable to read the image values`. Make sure the camera is reachable, then reload the integration.
4. If the camera does not offer image settings in its web interface either, no entities are created. This is not an error and nothing is logged.

{% enddetails %}

{% details "Changing an image setting fails" %}

### Symptom: Home Assistant shows an error when you change a setting

#### Description

The camera did not take the change. Home Assistant shows one of these messages:

- **This user is not allowed to change the image settings of the device.** The user does not have the permission to change the settings.
- **The device rejected the username or password.** The stored credentials are no longer valid. Home Assistant also asks you to reauthenticate.
- **Failed to connect.** The camera did not answer.
- **Unable to change the image setting:** followed by the reason the camera gave.
- **The device did not accept the image setting.** The camera answered with an error that has no further explanation.

#### Resolution

- For the first message, give the user the **Remote: Parameters Settings** permission, or use an administrator account.
- For the second message, follow the reauthentication notification.
- For the third message, make sure the camera is on and reachable from Home Assistant, then try again.
- For the last two messages, check the reason shown. If it does not help, download the diagnostics as described below and include them in your report.

{% enddetails %}

{% details "Reporting a problem or missing settings" %}

### Symptom: You want to report a problem, or a setting of your camera is missing

#### Description

The diagnostics list every image setting that the camera reported, with its type, allowed values, and current value. They also tell whether the integration has an entity for each setting. The host name, user name, password, name, and device ID are removed. The diagnostics also include the image settings documents as the camera sent them, which are what is needed to add support for a camera model.

#### Resolution

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and select your integration.
2. On the integration entry, select the {% icon "mdi:dots-vertical" %}.
3. Select **Download diagnostics**. A JSON file is downloaded.
4. Upload the file to your issue report when requested.

{% enddetails %}

{% details "The device rejects the username or password" %}

### Symptom: "Invalid authentication" when adding the device

When you add the device, the form shows **Invalid authentication**.

#### Description

The device rejected the username or password you entered.

#### Resolution

1. Check the username and password by signing in to the web interface of the device.
2. Make sure the user has the permissions described at the start of this page, and that **WEB Authentication** is set to `digest/basic`.
3. If the problem continues, try a user with administrator rights. Some devices only accept an administrator account.

{% enddetails %}

{% details "Home Assistant asks you to reauthenticate" %}

### Symptom: A notification says the authentication expired

Home Assistant shows a reauthentication notification for your Hikvision device, and the entities of the device are not available.

#### Description

The device rejected the stored username or password, for example because you changed the password of the user. Home Assistant stops connecting to the device until you enter the current credentials. This avoids repeated failed sign-ins, which can lock the user on the device for a while.

#### Resolution

1. Follow the reauthentication notification.
2. Enter the current username and password. They must belong to the same device. If they belong to a different device, Home Assistant stops with the message **The credentials belong to a different device than the one being reauthenticated.**

The host, port, and SSL settings are kept, and Home Assistant reloads the integration without removing your entities or automations.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
