---
title: "DoorBird"
description: "Instructions on how to integrate your DoorBird video doorbell with Home Assistant."
logo: doorbird.png
ha_category:
  - Doorbell
  - Camera
  - Switch
ha_release: 0.54
ha_iot_class: Local Push
---

The `doorbird` implementation allows you to integrate your [DoorBird](http://www.doorbird.com/) device in Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Camera](#camera) - View live and historical event based images.
- [Switch](#switch) - Enable control of relays and camera night vision.

## Setup

The user, which you are going to use with Home Assistant, needs the "API-Operator" permission enabled.

## Configuration

To connect your device, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
doorbird:
  devices:
    - host: DOORBIRD_IP_OR_HOSTNAME
      username: YOUR_USERNAME
      password: YOUR_PASSWORD
      token: YOUR_DOORBIRD_TOKEN
```

{% configuration %}

devices:
  description: List of Doorbird devices.
  required: true
  type: list
  keys:
    host:
      description: The LAN IP address or hostname of your device. You can find this by going to the [DoorBird Online check](http://www.doorbird.com/checkonline) and entering the information from the paper that was included in the box.
      required: true
      type: string
    username:
      description: The username of a non-administrator user account on the device. This user needs the "API-Operator" permission enabled on Doorbird. It is recommended to set up a new account on your Doorbird for use with Home Assistant. This can be added via the Doorbird App by choosing Administration -> (User) Add. When the new account is created, you will need to enable the permission "API-Operator" in the "permissions" option.
      required: true
      type: string
    password:
      description: The password for the user specified.
      required: true
      type: string
    token:
      description: Token to be used to authenticate Doorbird calls to Home Assistant. This is a user defined value and should be unique across all Doorbird devices.
      required: true
      type: string
    name:
      description: Custom name for this device.
      required: false
      type: string
    hass_url_override:
      description: If your DoorBird cannot connect to the machine running Home Assistant because you are using dynamic DNS or some other HTTP configuration (such as HTTPS), specify the LAN IP of the machine here to force a LAN connection.
      required: false
      type: string
    events:
      description: Custom event names to be registered on the device. User defined values. Special characters should be avoided.
      required: false
      type: list
      
{% endconfiguration %}

## Full example

```yaml
doorbird:
  devices:
    - host: DOORBIRD_IP_OR_HOSTNAME
      username: YOUR_USERNAME
      password: YOUR_PASSWORD
      token: CUSTOM_TOKEN_1
      hass_url_override: HASS_URL
      name: Front Door
    - host: DOORBIRD_IP_OR_HOSTNAME
      username: YOUR_USERNAME
      password: YOUR_PASSWORD
      token: CUSTOM_TOKEN_2
      name: Driveway Gate
      events:
        - doorbell_1
        - somebody_pressed_the_button
        - relay_unlocked
        - unit_2_bell
        - rfid_card_scanned
```

## Events

Events can be defined for each configured DoorBird device independently. These events will be registered on the device and can be attached to a schedule via the DoorBird app. 

See [Schedules](#schedules) section below for details on how to configure schedules.

Event names will be prefixed by `doorbird_devicename`. For example, the example event `somebody_pressed_the_button` for the device 'Driveway Gate' will be seen in Home Assistant as `doorbird_driveway_gate_somebody_pressed_the_button`. This is to prevent conflicts with other events.

See [Automation Example](#automation_example) section below for details on how to use the event names in an automation.

<div class="note info">
Events will not be received in Home Assistant until a schedule is defined via the DoorBird app.
</div>

#### Clearing Registered Events
Events can be cleared from DoorBird devices by visiting a special URL.

Simply open a new browser window and navigate to `{Home Assistant URL}/api/doorbird/clear?token={DEVICE_TOKEN}`. Replace `{Home Assistant URL}` with the full path to your running instance, such as `http://localhost:8123`. Replace `{DEVICE_TOKEN}` with the token specified in your configuration for the device you would like to clear.
<br><br>
Please note that clearing device events will require configuration steps above to be taken again. It could also affect other third-party applications you may use with your DoorBird device. It will not break the official mobile app in any way, so mobile push notifications will still work.


#### Event Data

Each event will include live image and video URLs for the Doorbird device that triggered the event. These URLs can be found on the event data and can be useful in automation actions. For example, you could use `html5_viewer_url` on a notification to be linked directly to the live view of the device that triggered the automation.

The following keys are available on `event_data`:

- `timestamp`
- `live_video_url`
- `live_image_url`
- `rtsp_live_video_url`
- `html5_viewer_url`

<div class="note">
The URLs on the event will be based on the configuration used to connect to your Doorbird device. Ability to connect from outside your network will depend on your configuration.
</div>

#### Schedules

Once events have been registered on the DoorBird device, they must be attached to a schedule using the official DoorBird app on Android or iOS. Currently there are schedules available for doorbell, motion, relay, and RFID events (on supported devices).

For iOS, the schedules can be found by navigating to the following areas of the app:

- Doorbell  | Settings > Administration > Specific Device > Schedule for Doorbell
- Motion    | Settings > Administration > Specific Device > 3D Motion Sensor (Settings) > Schedule for Actions
- Relay     | Settings > Administration > Specific Device > Relays > Schedule
- RFID      | Settings > Administration > Specific Device > RFID Transponder > Settings > Select Transponder > Schedule

Once you are on the desired schedule, click the dropdown button in the upper left to switch to the HTTP Calls view. Now if you click on the heading just above the schedule, you can select the event you would like to be called for the particular schedule that is being viewed.

On the desired event, you should be able to specify blocks of time for when you would like the event to be sent to Home Assistant. If you want the event to always send, the square in the upper right can be used to populate the entire schedule. Events will be fired to Home Assistant for blocks of time that are blue.

Remember to complete the schedule assignment steps above for each event type that you registered.

### Automation Example

```yaml
- alias: Doorbird Ring
  trigger:
    platform: event
    event_type: doorbird_driveway_gate_somebody_pressed_the_button
  action:
    service: light.turn_on
      entity_id: light.side_entry_porch
```

## Camera

The `doorbird` implementation allows you to view the live video, the last doorbell ring image, and the last motion sensor image from your [DoorBird](http://www.doorbird.com/) device in Home Assistant.

### Configuration

To enable the camera, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: doorbird
```

## Switch

The `doorbird` switch platform allows you to power connected relays and trigger the IR array in your [DoorBird](http://www.doorbird.com/) video doorbell device.

To enable this switch, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: doorbird
```
