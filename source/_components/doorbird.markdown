---
layout: page
title: "DoorBird"
description: "Instructions on how to integrate your DoorBird video doorbell with Home Assistant."
date: 2017-08-06 11:30
sidebar: true
comments: false
sharing: true
footer: true
logo: doorbird.png
ha_category: Doorbell
ha_release: "0.54"
ha_iot_class: "Local Polling"
---

The `doorbird` implementation allows you to integrate your [DoorBird](http://www.doorbird.com/) device in Home Assistant.

## {% linkable_title Configuration %}

To connect your device, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
doorbird:
  token: RANDOM_STRING
  devices:
    - host: DOORBIRD_IP_OR_HOSTNAME
      username: YOUR_USERNAME
      password: YOUR_PASSWORD
      hass_url_override: HASS_URL
      name: Front Door
    - host: DOORBIRD_IP_OR_HOSTNAME
      username: YOUR_USERNAME
      password: YOUR_PASSWORD
      name: Driveway Gate
      monitored_conditions:
        - doorbell
        - motion
```

{% configuration %}
token:
  description: Token to be used to authenticate Doorbird calls to Home Assistant.
  required: true
  type: string
devices:
  description: List of doorbird devices.
  required: true
  type: list
  keys:
    host:
      description: The LAN IP address or hostname of your device. You can find this by going to the [DoorBird Online check](http://www.doorbird.com/checkonline) and entering the information from the paper that was included in the box.
      required: true
      type: string
    username:
      description: The username of a non-administrator user account on the device.
      required: true
      type: string
    password:
      description: The password for the user specified.
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
    monitored_conditions:
      description: Monitor motion and/or doorbell events for this device.
      required: false
      type: string
      keys:
        doorbell:
          description: Monitor doorbell events
        motion:
          description: Monitor motion events (Motion monitoring must be enabled on the doorstation via DoorBird app)

{% endconfiguration %}

The configuration above is also used by the following components:
- [Camera](../camera.doorbird) - View live and historical event based images
- [Switch](../switch.doorbird) - Enable control of relays and camera night vision

## {% linkable_title Motion and Doorbell Events %}

Home Assistant will fire an event any time a `monitored_condition` happens on a doorstation.  Event names are created using the format `doorbird_{station}_{event}` (Examples: `doorbird_side_entry_button`, `doorbird_side_entry_motion`).  You can verify the assigned event names in the Home Assistant log file.

<p class="note warning">
Enabling any monitored condition will delete all registered notification services on the doorstation every time Home Assistant starts. This will not affect notifications delivered by the DoorBird mobile app.
</p>

#### {% linkable_title Event Data %}
Each event includes live image and live video URLs for the Doorbird device that triggered the event. These URLs can be found on the event data and can be useful in automation actions.  For example, you could use `html5_viewer_url` on a notification to be linked directly to the live view of the device that triggered the automation.  NOTE: The URLs on the event will be based on the configuration used to connect to your Doorbird devices.  Connectivity will depend on your network configuration.

### {% linkable_title Automation Example %}
```yaml
- alias: Doorbird Ring
  trigger:
    platform: event
    event_type: doorbird_side_entry_button
  action:
    service: light.turn_on
      entity_id: light.side_entry_porch
```
