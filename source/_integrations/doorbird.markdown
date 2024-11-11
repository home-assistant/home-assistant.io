---
title: DoorBird
description: Instructions on how to integrate your DoorBird video doorbell with Home Assistant.
ha_category:
  - Button
  - Camera
  - Doorbell
  - Event
ha_release: 0.54
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@oblogic7'
  - '@bdraco'
  - '@flacjacket'
ha_domain: doorbird
ha_zeroconf: true
ha_platforms:
  - button
  - camera
  - event
ha_integration_type: integration
---

The **DoorBird** {% term integration %} allows you to integrate your [DoorBird](https://www.doorbird.com/) device in Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Camera](#camera) - View live and historical event based images.
- [Button](#button) - Enable control of relays and camera low-light/night vision (IR) and resetting favorites.
- [Event](#event) - Monitor doorbell ring and motion events.

## Setup

It is recommended to set up a new & dedicated account on your DoorBird App/web portal for use with Home Assistant. The instructions in this document refer specifically to the DoorBird IOS/Android app. Still, most actions can also be performed using the web-based [DoorBird - WebAdmin](https://webadmin.doorbird.com) portal and logging in on your DoorBird admin account.

To setup a new account for Home Assistant, open the DoorBird App by selecting **Settings** (cog icon) > **Administration** > **LOGIN** (using your DoorBird App Administration details). Under the **USER** section, choose **Add**. This new user account requires specific permissions enabled (depending on what functionality you want). Permissions can be found under **Permissions**. The following permissions are recommended (or amend depending on your requirements:

- "Watch Always" (live view)
- "History" (last motion)
- "Motion" (last motion)
- "API-Operator" (this needed to be enabled as a minimum)

{% include integrations/config_flow.md %}

## Events

Events can be defined for each configured DoorBird device independently. These events will be registered on the device and can be attached to a schedule via the DoorBird app.

For new installs, a `doorbell` and `motion` event will automatically be created and configured. If you do not need any additional events, you can skip configuring schedules.
See [Schedules](#schedules) section below for details on how to configure schedules.

Event names will be prefixed by `doorbird_devicename`. For example, the sample event `doorbell` for the device 'Driveway Gate' will be seen in Home Assistant as `doorbird_devicename_doorbell`. This is to prevent conflicts with other events.

See [Automation Example](#automation-example) section below for details on how to use the event names in an automation.

{% important %}
Events other than `doorbell` and `motion` will not be received in Home Assistant until a schedule is defined via the DoorBird app.
{% endimportant %}

### Clearing registered events

Events can be cleared from DoorBird devices by pressing the `Reset favorites` button.

Please note that clearing device events will require configuration steps above to be taken again. It could also affect other third-party applications you may use with your DoorBird device. It will not break the official mobile app in any way, so mobile push notifications will still work.

### Event data

Each event will include live image and video URLs for the DoorBird device that triggered the event. These URLs can be found on the event data and are helpful in automation actions. For example, you could use `html5_viewer_url` on a notification to be linked directly to the live view of the device that triggered the automation.

The following keys are available on `event_data`:

- `timestamp`
- `live_video_url`
- `live_image_url`
- `rtsp_live_video_url`
- `html5_viewer_url`

{% note %}
The URLs on the event will be based on the configuration used to connect to your DoorBird device. The ability to connect from outside your network will depend on your configuration.
{% endnote %}

## Schedules

Once events have been registered on the DoorBird device, they must be attached to a schedule using the official DoorBird app on Android or iOS or the [DoorBird - WebAdmin](https://webadmin.doorbird.com) portal. Currently, there are schedules available for doorbell, motion, relay, and RFID events (on supported DoorBird devices). Essentially, you can enable an HTTP(S) call from your DoorBird device to the Home Assistant DoorBird API by configuring an action/event (by enabling a schedule).

The schedules can be found by navigating to the following area of the DoorBird app (Android or IOS):

**Settings** (cog icon) > **Administration** > **LOGIN** (using your App Administration details) > (under **EXPERT SETTINGS**) Schedule for doorbell.

- `Push notification`
- `Trigger Relay ("Relay 1" or "Relay 2")`
- `HTTP(S) Calls (button, motion/movement, RFID)`

Click on the dropdown button in the top left and choose your specific "Schedule for actions" (listed above). Depending on your selection, you may have to click on the center title to see the sub-categories menu.

On the desired event, you should be able to specify blocks of time for when you would like the event to be sent to Home Assistant. If you want the event to always send, the square in the upper right can be used to populate the entire schedule. Events will be fired to Home Assistant for blocks of time that are blue.

Note: Remember to complete the schedule assignment steps above for each event type you registered. If you are configuring HTTP Call(s) schedules for registered RFID tags, please note that you will have to enable/configure the schedule for each RFID tag.

## Automation example

The example automation below shows how to turn on a light when somebody presses the DoorBird call button:

```yaml
- alias: "Doorbird Ring"
  triggers:
    - trigger: event
      event_type: doorbird_driveway_gate_somebody_pressed_the_button
  actions:
    - action: light.turn_on
      target:
        entity_id: light.side_entry_porch
```

You can also create automation actions based on the DoorBird RFID scanner being successfully triggered (configured per RFID tag) and motion events.

## Camera

The `doorbird` implementation allows you to view the live video, the last doorbell ring image, and the last motion sensor image from your [DoorBird](https://www.doorbird.com/) device in Home Assistant.

## Button

The `doorbird` button platform allows you to power connected relays and trigger the low-light/dark Infra-Red (IR) array on your [DoorBird](https://www.doorbird.com/) video doorbell device.

## Event

An event entity will be created for each doorbell or motion event with a configured HTTP(s) call in the [schedule](#schedules).
