---
title: Reolink IP NVR/camera
description: Instructions on how to integrate Reolink devices (NVR/cameras) into Home Assistant.
ha_category:
  - Camera
  - Doorbell
  - Media source
  - Update
ha_iot_class: Local Push
ha_release: 2023.1
ha_domain: reolink
ha_codeowners:
  - '@starkillerOG'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - button
  - camera
  - diagnostics
  - light
  - number
  - select
  - sensor
  - siren
  - switch
  - update
ha_integration_type: integration
ha_dhcp: true
related:
  - docs: /dashboards/picture-glance/#creating-a-card-to-control-the-camera
    title: Controlling the camera from the dashboard
  - url: https://reolink.com/
    title: Reolink product page
---

The integration allows you to control [Reolink](https://reolink.com/) NVRs or cameras. Reolink cameras are known for their local storage, without the need for a cloud subscription or account. Reolink cameras can operate fully locally on your network, putting privacy first. When blocking internet access for the Reolink devices, the Home Assistant integration, as well as the Reolink app/client, will continue to work as usual. Reolink cameras provide excellent day- and nighttime video clarity at an affordable price. An SD card in the camera offers local recording, while an optional Reolink NVR/Hub can offer a large recording capacity indoors. As evident by the list of entities in this documentation, Reolink cameras are highly configurable and tightly integrated into Home Assistant.

## Prerequisites

A brand new Reolink camera needs to be connected to the network and initialized. During initialization, the camera's credentials need to be set. Refer to the [Initial setup](#initial-setup) section for detailed instructions.

- On the Reolink device, a user account with admin privileges is needed for the proper operation of this integration.
- The password used for the Reolink device can only contain characters `a-z, A-Z, 0-9 or @$*~_-+=!?.,:;'()[]`. Other special characters will cause encoding issues in the video streams used by this integration and are, therefore, not allowed. When using an incompatible special character in the password, the integration will prompt you to change the password.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname or IP address of your Reolink device. For example: '192.168.1.25'. You can find it in your router or in the Reolink app under **Settings** -> **Device** (top icon) -> **Networkinformation** -> **IP-address**. Normally, the Reolink device is automatically discovered, and you do not need to provide this."
Username:
  description: "Username to log in to the Reolink device itself. Not the Reolink cloud account."
Password:
  description: "Password to log in to the Reolink device itself. Not the Reolink cloud account."
{% endconfiguration_basic %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
Protocol:
  description: Switch between <abbr title="real-time streaming protocol">RTSP</abbr>, <abbr title="real-time messaging protocol">RTMP</abbr>, or <abbr title="flash video">FLV</abbr> streaming protocol. <abbr title="real-time streaming protocol">RTSP</abbr> supports 4K streams (h265 encoding) while <abbr title="real-time messaging protocol">RTMP</abbr> and <abbr title="flash video">FLV</abbr> do not. <abbr title="flash video">FLV</abbr> is the least demanding on the camera.
{% endconfiguration_basic %}

## Asterisk (*) next to entities listed in this documentation

If an entity listed below has an asterisk (*) next to its name, it means it is disabled by default. To use such an entity, you must [enable the entity](/common-tasks/general/#enabling-entities) first.

## Data updates: plus (+) next to entities listed in this documentation

If an entity listed below has a plus (+) next to its name, it means this entity supports push updates. These entities will have almost instant state changes. 
For redundancy, the state of all entities is also polled every 60 seconds. For entities without a plus (+), this is the only update method. Therefore, a device's state change can take up to 60 seconds to be reflected in Home Assistant.
An exception is the firmware update entity, which is polled every 12 hours.

## Supported functionality

### Camera streams

This integration creates a few camera entities, one for each stream type with different resolutions:

- Fluent (Low resolution)
- Balanced* (Mid resolution)
- Clear* (High resolution, resource intensive)
- Snapshots Fluent* (Low resolution)
- Snapshots Clear* (High resolution)

The Fluent stream camera entity is enabled by default; the other streams are disabled by default.
The Snapshots stream provides a sequence of image snapshots giving very low latency at the cost of a very low frame rate; this can be used when the RTMP/RTSP/FLV video stream has too much lag.
Dual lens cameras provide additional streams for the second lens.

### Binary sensors

Depending on the supported features of the camera, binary sensors are added for:

- Motion detection++
- Visitor++ (Doorbell presses)
- AI person detection++
- AI vehicle detection++
- AI pet detection++
- AI animal detection++
- AI face detection++
- AI package detection++
- Sleep status+

\++ These sensors receive events using the following 4 methods (in order): TCP push, ONVIF push, ONVIF long polling or fast polling (every 5 seconds).
The latency for receiving the events is the best for TCP push and the worst for fast polling, the fastest available method that is detected to work will be used, and slower methods will not be used.
For redundancy, these sensors are polled every 60 seconds together with the update of all other entities.
To ensure you have the best latency possible, refer to the [Reducing latency of motion events](#reducing-latency-of-motion-events) section.

### Number entities

Depending on the supported features of the camera, number entities are added for:

- Optical zoom control
- Focus control
- Floodlight turn on brightness
- Volume (Camera)
- Alarm volume (Home Hub)
- Message volume (Home Hub)
- Chime volume
- Guard return time
- Motion sensitivity
- PIR sensitivity
- AI face sensitivity
- AI person sensitivity
- AI vehicle sensitivity
- AI package sensitivity
- AI pet sensitivity
- AI animal sensitivity
- AI face delay*
- AI person delay*
- AI vehicle delay*
- AI package delay*
- AI pet delay*
- AI animal delay*
- Auto quick reply time
- Auto track limit left
- Auto track limit right
- Auto track disappear time
- Auto track stop time
- Day night switch threshold*
- Image brightness* (default 128)
- Image contrast* (default 128)
- Image saturation* (default 128)
- Image sharpness* (default 128)
- Image hue* (default 128)

**Floodlight turn on brightness** controls the brightness of the floodlight when it is turned on internally by the camera (see **Floodlight mode** select entity) or when using the **Floodlight** light entity.

When the camera is not moved and no person/pet/animal/vehicle is detected for the **Guard return time** in seconds, and the **Guard return** switch is ON, the camera will move back to the guard position.

When a Reolink doorbell is pressed the quick reply message from the **Auto quick reply message** select entity will be played after **Auto quick reply time** seconds, unless the **Auto quick reply message** is set to off.

If the **Auto tracking** switch entity is enabled, and a object disappears from view OR stops moving for the **Auto track disappear time**/**Auto track stop time**, the camera goes back to its original position.

**Day night switch threshold** determines at which light level the camera switches from **Color** to **Black & white**. This value only applies if the **Day night mode** select is on **Auto**.

### Button entities

Depending on the supported features of the camera, button entities are added for:

- <abbr title="pan, tilt, and zoom">PTZ</abbr> stop
- PTZ left
- PTZ right
- PTZ up
- PTZ down
- PTZ calibrate
- PTZ zoom in*
- PTZ zoom out*
- Guard go to
- Guard set current position
- Restart*

**PTZ left**, **right**, **up**, **down**, **zoom in** and **zoom out** will continually move the camera in the respective position until the **PTZ stop** is called or the hardware limit is reached.

**Guard set current position** will set the current position as the new guard position.

#### Action reolink.ptz_move

Some Reolink <abbr title="pan, tilt, and zoom">PTZ</abbr> cameras can move at different speeds. For those cameras, the `reolink.ptz_move` action can be used in combination with the **PTZ left**, **right**, **up**, **down**, **zoom in**, or **zoom out** entity which allows specifying the speed attribute. If the <abbr title="pan, tilt, and zoom">PTZ</abbr> button entities for a specific camera are not shown under **Choose entity** under **targets** of the `reolink.ptz_move` action, it means that this camera does not support custom <abbr title="pan, tilt, and zoom">PTZ</abbr> speeds.

| Data attribute | Optional | Description                                                                                                                         |
| ---------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | no       | Name of the Reolink <abbr title="pan, tilt, and zoom">PTZ</abbr> button entity to control. For example, `button.trackmix_ptz_left`. |
| `speed`                | no       | <abbr title="pan, tilt, and zoom">PTZ</abbr> move speed. For example `10`.                                                          |

### Select entities

Depending on the supported features of the camera, select entities are added for:

- Floodlight mode (Off, Auto, Schedule)
- Day night mode (Auto, Color, Black&White)
- <abbr title="pan, tilt, and zoom">PTZ</abbr> preset
- Play quick reply message
- Auto quick reply message
- Auto track method (Digital, Digital first, Pan/Tilt first)
- Doorbell LED (Stay off, Auto, Auto & always on at night)
- HDR* (Off, On, Auto)
- Binning mode* (Off, On, Auto)
- Clear frame rate*
- Fluent frame rate*
- Clear bit rate*
- Fluent bit rate*
- Chime motion ringtone
- Chime person ringtone
- Chime vehicle ringtone
- Chime visitor ringtone
- Hub alarm ringtone
- Hub visitor ringtone

**PTZ preset** positions can be set in the Reolink app/windows/web client, the names of the presets will be loaded into Home Assistant at the start of the integration. When adding new preset positions, please restart the Reolink integration.

**Play quick reply messages**/**Auto quick reply messages** can be recorded in the Reolink phone app where a name is also supplied. New or updated quick reply messages will be loaded into Home Assistant at the start of the integration. When adding new quick reply messages, please restart the Reolink integration.

#### Action reolink.play_chime

To play a ringtone on a Reolink chime, the `reolink.play_chime` action can be used.

| Data attribute | Optional | Description                                                                                                                                 |
| ---------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `device_id`            | no       | List of device ids of the Reolink Chimes to control. For example, `- 12a34b56c7d8ef9ghijklm0n1op2345q`.                             |
| `ringtone`             | no       | The ringtone to play. For example `operetta`.                                                                                       |

### Siren entities

If the camera supports a siren, a siren entity will be created.
When using the siren turn-on action, the siren will continue to sound until the siren turn-off action is called.

In some camera models, there is a delay of up to 5 seconds between the turn-off command and the sound stopping. The siren turn-on action supports setting a volume and a duration (no turn-off action call is needed in that case).

### Switch entities

Depending on the supported features of the camera, switch entities are added for:

- Infrared lights in night mode
- Record audio
- Siren on event
- Auto tracking
- Auto focus
- Guard return
- PTZ patrol (start/stop)
- Doorbell button sound
- Record
- Manual record
- Push notifications
- Hub ringtone on event
- Email on event
- FTP upload
- PIR enabled*
- PIR reduce false alarm*
- Chime LED

When the **Infrared lights in night mode** entity is set to OFF, the infrared LEDs are always OFF. When the **Infrared lights in night mode** entity is set to ON, the infrared LEDs will be on when the camera is in night vision mode. For more information, see the **Day night mode** select entity.

For NVRs, a global switch for **Record**, **Push**, **Hub ringtone on event**, **Email**, and **FTP** will be available under the NVR device as well as a switch per channel of the NVR under the camera device. The respective feature will only be active for a given channel if both the global and that channel switch are enabled (as is also the case in the Reolink app/client).

**Push** notifications to a phone will only be provided if the following conditions are met: 
- The **Push notifications** switch in Home Assistant is ON. 
- For NVRs,  both the global and channel switch are ON.
- The Push-notification in the Reolink App of that phone is ON.

The Push-notification in the Reolink app is independent of the Home Assistant setting. It is also independent of the settings on other phones connected to the same camera. Reolink does this so you have an independent way of turning off push notifications per phone.

The **PTZ patrol** positions first need to be configured using the Reolink [app](https://support.reolink.com/hc/en-us/articles/360008746833/)/[windows](https://support.reolink.com/hc/en-us/articles/900003738126/)/web client. When no positions are configured, the PTZ patrol entity will not be added. When adding patrol positions for the first time, you need to restart the Reolink integration.

### Light entities

Depending on the supported features of the camera, light entities are added for:

- Floodlight+
- Status LED

When the **floodlight** entity is ON always ON, when OFF controlled based on the internal camera floodlight mode (Off, Auto, Schedule), see the **Floodlight mode** select entity.

### Sensor entities

Depending on the supported features of the camera, the following sensor entities are added:

- PTZ pan position
- PTZ tilt position
- Wi-Fi signal*
- CPU usage*
- HDD/SD storage*
- Battery percentage+
- Battery temperature*+
- Battery state*+ (discharging, charging, charge complete)

### Update entity

An update entity is available that checks for firmware updates every 12 hours.
Updates are checked both through the camera API and directly from the [Reolink download center](https://reolink.com/download-center/).
Therefore the update entity in Home Assistant can find and install a firmware update from the [Reolink download center](https://reolink.com/download-center/) while the Reolink app/windows/web client does not always find this update.

### Media browser for playback of recordings

Depending on the support of the camera, the Reolink integration will provide a media browser through which recorded videos of the camera can be accessed.
In the sidebar, select "Media" > "Reolink" and select the **camera** of which you want to see recordings. Optionally, select if you want a high or low **resolution** stream and select the recording **date**. Here, all available video files of that day will be shown.
Recordings up to 1 month old can be viewed in Home Assistant.

## Tested models

### Tested directly connected models

The following models have been tested and confirmed to work with a direct link to Home Assistant:

- C1 Pro*
- C2 Pro*
- [CX410](https://reolink.com/product/cx410/)
- [CX810](https://reolink.com/product/cx810/)
- [E1 Zoom](https://reolink.com/product/e1-zoom/)
- [E1 Outdoor](https://reolink.com/product/e1-outdoor/)
- [E1 Outdoor PoE](https://reolink.com/product/e1-outdoor-poe/)
- [E1 Outdoor Pro](https://reolink.com/product/e1-outdoor-pro/)
- RLC-410*
- [RLC-410W](https://reolink.com/product/rlc-410w/)
- RLC-411*
- RLC-420*
- RLC-423*
- [RLC-510A](https://reolink.com/product/rlc-510a/)
- RLC-511*
- RLC-511W*
- [RLC-511WA](https://reolink.com/product/rlc-511wa/)
- RLC-520*
- [RLC-520A](https://reolink.com/product/rlc-520a/)
- RLC-522*
- [RLC-810A](https://reolink.com/product/rlc-810a/)
- [RLC-810WA](https://reolink.com/product/rlc-810wa/)
- [RLC-811A](https://reolink.com/product/rlc-811a/)
- [RLC-81MA](https://reolink.com/product/rlc-81ma/)
- [RLC-81PA](https://reolink.com/product/rlc-81pa/)
- [RLC-820A](https://reolink.com/product/rlc-820a/)
- [RLC-822A](https://reolink.com/product/rlc-822a/)
- [RLC-823A](https://reolink.com/product/rlc-823a/)
- [RLC-830A](https://reolink.com/product/rlc-830a/)
- [RLC-833A](https://reolink.com/product/rlc-833a/)
- [RLC-843A](https://reolink.com/product/rlc-843a/)
- [RLC-1212A](https://reolink.com/product/rlc-1212a/)
- [RLC-1224A](https://reolink.com/product/rlc-1224a/)
- [RLN8-410 NVR](https://reolink.com/product/rln8-410/)
- [RLN16-410 NVR](https://reolink.com/product/rln16-410/)
- [RLN36 NVR](https://reolink.com/product/rln36/)
- [RLN12W NVR](https://reolink.com/product/rln12w/)
- [NVS8 NVR](https://reolink.com/product/nvs8/) (Retail version of RLN8)
- [NVS16 NVR](https://reolink.com/product/nvs16/) (Retail version of RLN16)
- [Reolink Chime](https://reolink.com/product/reolink-chime/) (when connected to a doorbell)
- [Reolink Duo WiFi](https://reolink.com/product/reolink-duo-wifi-v1/)
- [Reolink Duo 2 WiFi](https://reolink.com/product/reolink-duo-wifi/)
- [Reolink Duo 3 PoE](https://reolink.com/product/reolink-duo-3-poe/)
- Reolink Duo Floodlight ([PoE](https://reolink.com/product/reolink-duo-floodlight-poe/) and [Wi-Fi](https://reolink.com/product/reolink-duo-floodlight-wifi/))
- [Reolink Home Hub](https://reolink.com/product/reolink-home-hub/)
- [Reolink Home Hub Pro](https://reolink.com/product/reolink-home-hub-pro/)
- Reolink TrackMix ([PoE](https://reolink.com/product/reolink-trackmix-poe/) and [Wi-Fi](https://reolink.com/product/reolink-trackmix-wifi/))
- Reolink Video Doorbell ([PoE Black](https://reolink.com/product/reolink-video-doorbell/), [Wi-Fi Black](https://reolink.com/product/reolink-video-doorbell-wifi/), [PoE White](https://reolink.com/product/reolink-video-doorbell/) and [Wi-Fi White](https://reolink.com/product/reolink-video-doorbell-wifi/))

*These models are discontinued and not sold anymore, they will continue to work with Home Assistant.

### Tested battery-powered models

Battery-powered Reolink cameras can be used with Home Assistant with the help of a [Reolink Home Hub](https://reolink.com/product/reolink-home-hub/) or NVR. The Home Hub/NVR will act as a bridge between the battery-powered cameras and Home Assistant, conserving the battery life. All features of the battery-powered cameras will be available just like regular-powered cameras. Viewing the camera stream in Home Assistant will keep the battery camera awake during viewing, consuming battery life. Therefore, ensure you do not use the camera stream on a dashboard that is constantly being viewed, like a wall panel dashboard. You can check proper operation by ensuring that the "Sleep status" entity will go to "Sleeping" if the battery camera is not being actively used.

The following hubs/NVRs have been tested and confirmed to work with battery-powered models in Home Assistant:

- [Reolink Home Hub](https://reolink.com/product/reolink-home-hub/)
- [Reolink Home Hub Pro](https://reolink.com/product/reolink-home-hub-pro/)
- [RLN8-410 NVR](https://reolink.com/product/rln8-410/) (only the latest hardware version N7MB01, older versions might receive the required firmware update later)
- [RLN16-410 NVR](https://reolink.com/product/rln16-410/) (only the latest hardware version N6MB01, older versions might receive the required firmware update later)
- [RLN36 NVR](https://reolink.com/product/rln36/)
- [NVS8 NVR](https://reolink.com/product/nvs8/) (Retail version of RLN8)
- [NVS16 NVR](https://reolink.com/product/nvs16/) (Retail version of RLN16)

The following battery-powered models have been tested and confirmed to work through the Reolink Home Hub/NVR:

- [Argus 3 Pro](https://reolink.com/product/argus-3-pro/)
- [Argus 4 Pro](https://reolink.com/product/argus-4-pro/)
- [Argus Eco Ultra](https://reolink.com/product/argus-eco-ultra/)
- [Argus Track](https://reolink.com/product/argus-track/)
- [Reolink Doorbell Battery](https://reolink.com/roadmap/)

Reolink provides [this larger list of battery camera models](https://support.reolink.com/hc/en-us/articles/32379509281561-Reolink-Home-Hub-Compatibility/) which are compatible with the Home Hub and should work with Home Assistant.

### Models only compatible using a NVR/Home Hub

The following models are lacking the HTTP web server API and can, therefore, not work directly with this integration.
However, these cameras can work with this integration through an NVR or Home Hub in which the NVR/Home Hub is connected to Home Assistant.

- E1 Pro
- E1
- Reolink Lumus
- B400*
- B500*
- B500W*
- B800*
- B800W*
- B1200*
- D400*
- D500*
- D800*
- D1200*

*These models are only sold as a kit which includes a NVR.

### Incompatible models

Reolink LTE cameras do not work with this integration.

- Reolink Go Plus
- Reolink Go PT Plus
- Reolink Go PT Ultra
- Reolink Go Ranger PT
- Reolink Go Ultra
- Reolink TrackMix LTE
- Reolink TrackMix LTE Plus

## Initial setup

### 1. Initializing and configuring camera credentials.

A brand new Reolink camera first needs to be connected to the network and initialized. During initialization, the credentials for the camera need to be set.
There are several ways to achieve this:

#### Connecting Reolink via app/client

The recommended way is to use the [Reolink mobile app, Windows, or Mac client](https://reolink.com/software-and-manual/), and follow the on-screen instructions.

#### Connecting Reolink via a web browser

When your camera has a LAN port (most Wi-Fi cameras also have a LAN port):

   1. First connect the camera to your network using a LAN cable.
   2. Find the IP address of the camera (for example by checking in your router) and go to the IP address in a web browser.
   3. Follow the on-screen instructions to first setup the credentials (use the same credentials in Home Assistant).
   4. If it is a Wi-Fi camera:
      - Go to **settings** (gear icon) > **Network** and fill in your Wi-Fi SSID and password.
        - If you have both a 2.4 GHz and 5 GHz network, check your camera's user guide to see which operating frequency is supported.
      - After that you can disconnect the LAN cable and the camera will automatically switch to the Wi-Fi connection.

#### QR code

You can also connect a Wi-Fi camera using a self-made QR code. Once connected, follow the instructions under **Web browser**.
Create a QR code using ISO-8859-1 character encoding (not UTF-8) with the following XML string:

    <QR><S>ssid</S><P>password</P><C>last4</C></QR>

Use the `ssid` and `password` of your Wi-Fi network.
The `last4` are the last 4 digits of the QR code which is printed (on the underside) of the camera itself.
Normally, the digits are printed directly under the QR code. Alternatively, you could scan the QR code and grab the last 4 digits.

Then power up the camera while pointing it at the QR code. It takes about a minute to initialize, read the QR code, and connect to your Wi-Fi.

### 2. Add integration in Home Assistant

Set up the Reolink integration in Home Assistant using the credentials you set in step 1.

## Remove integration

### Removing a directly connected camera/NVR/Home Hub

Removing a directly connected camera/NVR/Home Hub can be done by removing the integration following these steps:

{% include integrations/remove_device_service.md %}

This will also remove all cameras/chimes connected to the NVR/Home Hub from Home Assistant.

### Removing a camera from a NVR/Home Hub

Removing a camera from a NVR/Home Hub can be done by deleting the device following these steps:

1. First physically disconnect the ethernet cable of the camera from the NVR if the camera is directly connected to the NVR (PoE).
2. Then remove the camera from the NVR/Home Hub following the [NVR instructions](https://support.reolink.com/hc/en-us/articles/900003769346-How-to-delete-offline-camera-information-on-Channel-Management-Page-via-Reolink-NVR-New-UI-/) or [Home Hub instructions](https://support.reolink.com/hc/en-us/articles/33883674141977-How-to-Change-Camera-Order-Remove-Device-from-Reolink-Home-Hub/).
3. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select the integration card.
4. From the list of integration entries, select the **x devices** underneath the integration instance of the NVR/Home Hub from which you want to remove a camera.
5. Select the camera you want to remove from the list of devices
6. Underneath the **Device info**, select the three-dot {% icon "mdi:dots-vertical" %} menu. Then, select **Delete**.

### Removing a chime

Removing a chime from a doorbell can be done by deleting the chime following these steps:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select the integration card.
2. From the list of integration entries, select the **x devices** underneath the integration instance of the Doorbell/NVR/Home Hub from which you want to remove a chime.
3. Select the chime you want to remove from the list of devices
4. Underneath the **Device info**, select the three-dot {% icon "mdi:dots-vertical" %} menu. Then, select **Delete**.

This will also decouple the chime from the doorbell in the Reolink app/client. Therefore, the chime will no longer ring when the doorbell is pressed.

## Examples

### Showing the camera in the dashboard

One way to show the camera in the dashboard is by using the picture glance card.
For example, you can place arrow buttons on the card to [control the camera](/dashboards/picture-glance/#creating-a-card-to-control-the-camera).

### Sending rich notifications

You can receive rich notifications on your phone when someone rings a Reolink doorbell or a Reolink camera detects an event like motion or a person.

### Automation ideas

- Turn on (outdoor) lights near the camera to improve image clarity at night once the camera detects a person, vehicle, or animal.
- Turn off notifications and recording when you get home (based on, e.g., geofencing) and turn it back on when you leave home.
- When someone presses the doorbell, play ringtones on speakers (Echo Dot/Google Home/smart hubs) throughout the house.
- Pause a TV and show a notification badge on the TV when the doorbell is pressed (only when the TV is already on).
- Play the quick replay messages of a Reolink doorbell only when not home (geofencing)
- Wake up and start recording on other battery cameras nearby if one camera/motion sensor detects an event.
- Turn on the spotlights or sirens of other cameras nearby when one camera detects a person, vehicle, or animal.
- If a camera detects a person/vehicle/animal, then point other PTZ cameras in that direction using PTZ presets.
- Switch day night mode (Color/IR Black&White) based on sunset/sunrise times or the status of (outdoor) lights instead of relying on the internal light sensor.
- Change the camera volume based on the time and/or when you are home or not (geofencing)
- Increase the framerate and maximum bitrate of a camera when a person/vehicle/animal is detected and lower them again after 1 minute of no detection. This saves storage space, so you can record longer when recording 24/7 without compromising image clarity during events.
- Turn on indoor lights close to windows in a sequence with some time delays if a camera detects a person to make it look like someone is home.
- Show a camera stream on a full screen on a wall panel, tablet, or Google Home display when someone rings the doorbell.
- Switch HDR mode of the camera based on sunset/sunrise
- Make an input boolean helper to easily disable notifications on all cameras and automatically enable notifications again after 1 hour.

## Known limitations

- 2-way audio or Text-to-speech is not available in the Reolink Home Assistant integration.
- The 4K camera streams are H265 encoded, support for playing H265 encoding in browsers (Chrome/Firefox/Edge/Safari etc.) is still very limited, therefore the 4K clear stream may not play in all browsers or on all phones in the Home Assistant Companion app. By default only the lower resolution Fluent camera entity is enabled in Home Assistant. This Fluent stream is H264 encoded and will play on any browser or phone.

## Troubleshooting

### Can’t setup the integration

- Older firmware versions do not expose the necessary information the integration needs to function. Ensure the camera is updated to the [latest firmware](https://reolink.com/download-center/) prior to setting up the integration. Note that Reolink auto update and check for update functions in the app/windows/web client often do not show the latest available firmware version. Therefore check the version in the [Reolink download center](https://reolink.com/download-center/) online.
- Test if you can access the camera by its IP address in your browser `https://<your-camera-ip>`. If you cannot, in the [Reolink mobile app, Windows, or Mac client](https://reolink.com/software-and-manual/) ensure at least one of the HTTP/HTTPS ports are enabled under **Settings** > **top camera model box** > **Network Information** > **Advanced** (mobile) or **Settings** > **Network** > **Advanced** > **Port Settings** (PC). See [additional instructions](https://support.reolink.com/hc/en-us/articles/900000621783-How-to-Set-up-Reolink-Ports-Settings/) on the Reolink site.
- On some camera models, the RTMP port needs to be enabled in order for the HTTP(S) port to function properly. Make sure this port is also enabled if you get a `Cannot connect to host` error while one of the HTTP/HTTPS ports is already enabled.
- If the integration and the browser can't connect to the camera even after you enable the HTTP/HTTPS ports, try to create a new user on the camera; that fixes the problem in some cases.

### Entities intermittently become unavailable

- Setting a static IP address for Reolink cameras/NVRs in your router is advisable to prevent (temporal) connectivity issues when the IP address changes.
- Do not set a static IP in the Reolink device itself, but leave the **Connection Type** on **DHCP** under **Settings** > **Network** > **Network Information** > **Set Up**. If you set it to **static** on the Reolink device itself, this is known to cause incorrect DHCP requests on the network. The incorrect DHCP request causes Home Assistant to use the wrong IP address for the camera, resulting in connection issues. The issue originates from the Reolink firmware, which keeps sending DCHP requests even when you set a static IP address in the Reolink device.
- Reolink cameras can support a limited amount of simultaneous connections. Therefore using third-party software like Frigate, Blue Iris, or Scrypted, or using the ONVIF integration at the same time can cause the camera to drop connections. This results in short unavailabilities of the Reolink entities in Home Assistant. Especially when the connections are coming from the same device (IP) where Home Assistant is running, the Reolink cameras can get confused, dropping one connection in favor of the other originating from the same host IP. If you experience disconnections/unavailabilities of the entities, please first temporarily shut down the other connections (like Frigate) to diagnose if that is the problem. If that is indeed the problem, you could try moving the third-party software to a different host (IP address) since that is known to solve the problem most of the time. You could also try switching the protocol to FLV on Home Assistant and/or the third-party software, as that is known to be less resource-intensive on the camera.
- If the Reolink entities go to unavailable for short periods, the camera may be overloaded with requests resulting in short connection drops. To resolve this, first, check if the integration is using `ONVIF push` instead of `ONVIF long polling` (resource intensive) or `Fast polling` (very resource intensive), see the [Reducing latency of motion events](#reducing-latency-of-motion-events) section. Moreover, try switching to the <abbr title="flash video">FLV</abbr> streaming protocol which is the least resource-intensive for the camera, see the [options](#options) section.

### Reducing latency of motion events

TCP push and ONVIF push will result in slightly faster state changes of the binary motion/AI event sensors than ONVIF long polling.
Moreover, TCP push and ONVIF push are less demanding for the camera than ONVIF long polling or fast polling, resulting in potentially less connection issues.
TCP push does not have any particular requirements. However, ONVIF push has some additional network configuration requirements:

- Reolink products can not push ONVIF motion events to an HTTPS address (SSL).
Therefore, make sure a (local) HTTP address at which HA is reachable is configured under **Home Assistant URL** in the {% my network title="network settings" %}.
A valid address could, for example, be `http://192.168.1.10:8123` where `192.168.1.10` is the IP of the Home Assistant device.

- Since a HTTP address is needed, Reolink push is incompatible with a global SSL certificate.
Therefore, ensure no Global SSL certificate is configured in the [`configuration.yaml` under HTTP](/integrations/http/#ssl_certificate).
An SSL certificate can still be enforced for external connections, by, for instance, using the [NGINX add-on](https://github.com/home-assistant/addons/tree/master/nginx_proxy) or [NGINX Proxy Manager add-on](https://github.com/hassio-addons/addon-nginx-proxy-manager) instead of a globally enforced SSL certificate.

To see if a Reolink integration is currently using `TCP push`, `ONVIF push`, `ONVIF long polling` or `Fast polling`, [download the diagnostics text file](/docs/configuration/troubleshooting/#download-diagnostics) and find the `"event connection": "TCP push"\"ONVIF push"\"ONVIF long polling"\"Fast polling"` in the txt file.
