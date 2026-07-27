---
title: Bosch SHC
description: Integrate Bosch SHC.
ha_category:
  - Binary sensor
  - Cover
  - Hub
  - Sensor
  - Switch
ha_release: 2021.6
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@tschamm'
  - '@mosandlt'
ha_domain: bosch_shc
ha_platforms:
  - binary_sensor
  - cover
  - sensor
  - switch
ha_zeroconf: true
ha_integration_type: hub
---

The **Bosch SHC** {% term integration %} allows you to connect your [Bosch Smart Home Controller](https://www.bosch-smarthome.com) to Home Assistant to control and monitor your Bosch Smart Home devices.
Use case: combine your door and window contacts with your covers and switches to build a home security and comfort setup that reacts to what's actually happening in your home.

There is currently support for the following device types within Home Assistant:

- [Binary sensor](#binary-sensor)
- [Cover](#cover)
- [Sensor](#sensor)
- [Switch](#switch)

{% include integrations/config_flow.md %}

### Binary sensor

The binary sensor platform allows you to monitor the states of your shutter contact and battery sensors. Binary sensor devices are added for each of the following devices:

- Shutter Contact
- Shutter Contact II
- Battery powered devices

### Cover

The cover platform allows you to control your covers. Cover devices are added for each Shutter Control device.

### Sensor

The sensor platform allows you to monitor the states of your temperature, humidity, purity, air quality, power, energy, and valve tappet sensors. Sensor devices are added for each of the following devices:

- Thermostat
- Wall Thermostat
- Twinguard
- Smart Plug
- Smart Plug Compact

### Switch

The switch platform allows you to control your outlets and light switches. Switches are added for each of the following devices:

- Light Switch
- Smart Plug
- Smart Plug Compact

## Client registration

To start the client registration, press and hold the button on the controller until the LED starts flashing. During configuration, a client SSL cert/key pair is generated and registered on the controller. For this step, the system password of your controller is needed, which was created upon initial setup of the controller.

## Bosch SHC automation examples

{% include docs/paste_yaml_tip.md %}

### Automation: Notify when a door or window is left open

Get a reminder if a shutter contact stays open for too long, so an open window doesn't go unnoticed.

{% details "YAML example for an open-door reminder" %}

{% example %}
automation: |
  alias: "Front door left open"
  triggers:
    - trigger: state
      entity_id: binary_sensor.front_door
      to: "on"
      for:
        minutes: 10
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The front door has been open for 10 minutes."
{% endexample %}

{% enddetails %}

### Automation: Close covers automatically at sunset

Combine the cover platform with a sun trigger to close your shutters as it gets dark.

{% details "YAML example for closing covers at sunset" %}

{% example %}
automation: |
  alias: "Close shutters at sunset"
  triggers:
    - trigger: sun
      event: sunset
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.living_room_shutter
{% endexample %}

{% enddetails %}

## Data updates

The Bosch Smart Home Controller pushes state changes to Home Assistant as they happen, over a persistent local connection. This means entities update in near real time and Home Assistant doesn't need to regularly check in with the controller for most of them.

Camera-related switches are the exception: they're checked periodically instead, since the controller doesn't push their state changes.

If the connection to the controller drops, for example because of a network hiccup or a controller restart, Home Assistant reconnects automatically once the controller is reachable again.

## Known limitations

- The integration only works on your local network. Controlling your Bosch Smart Home devices from outside your home requires a VPN or a similar way to reach your home network.
- Devices you pair with the controller after setting up the integration don't appear automatically. {% my integrations title="**Settings** > **Devices & services**" %}, select the Bosch SHC integration, and reload it to pick up new devices.
- If your controller's client certificate expires or its network details change, remove the integration and set it up again to generate a new certificate.

## Troubleshooting

### The integration can't connect to the controller

Make sure the IP address of the controller is correct and reachable from your Home Assistant instance. Check your router or the controller's settings if you're unsure of its current address.

### Setup fails with a pairing error

The controller only accepts new client registrations while it's in pairing mode. Press and hold the button on the controller until the LED starts flashing, then try adding the integration again.

### Setup fails with a session or authentication error

This usually means the system password you entered doesn't match the one set up in the Bosch Smart Home app, or the client certificate was rejected. Double-check the password, and remove and re-add the integration if the problem continues.

## Removing the integration

{% include integrations/remove_device_service.md %}

Removing the integration doesn't delete the client certificate and key files it created on your Home Assistant instance. If you no longer need them, remove them from the `bosch_shc` folder in your Home Assistant configuration directory.
