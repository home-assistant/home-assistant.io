---
title: Bosch SHC
description: Integrate Bosch SHC.
ha_category:
  - Binary sensor
  - Cover
  - Hub
  - Sensor
  - Switch
  - Valve
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
  - valve
ha_zeroconf: true
ha_integration_type: hub
---

The **Bosch SHC** {% term integration %} allows you to connect your [Bosch Smart Home Controller](https://www.bosch-smarthome.com) to Home Assistant to control and monitor your Bosch Smart Home devices.
Use case: combine your door and window contacts with your covers and switches to build a home security and comfort setup that reacts to what's actually happening in your home.

## Supported devices

The integration supports devices connected to a Bosch Smart Home Controller, including:

- Door/Window Contacts and Door/Window Contact II
- Motion Detectors
- Smoke Detectors
- Thermostats and Room Thermostats
- Twinguard
- Smart Plugs and Smart Plug Compact
- Light Switches
- Shutter Controls
- Micromodule Shutter Controls and Micromodule Blinds
- Bosch Smart Home cameras (selected controls only)

The entities available for a device depend on the capabilities reported by the controller.

## Prerequisites

Before setting up the integration:

1. Make sure the Bosch Smart Home Controller and Home Assistant are on the same local network.
2. Have the system password of your controller available. This is the password created during the initial setup of the controller.
3. When Home Assistant asks for the password, press and hold the button on the controller until the LED starts flashing to allow client registration.

During registration, Home Assistant generates a client certificate and key and registers them with the controller.

{% include integrations/config_flow.md %}

## Supported functionality

### Binary sensors

The binary sensor platform allows you to monitor the states of your shutter contact and battery sensors. Binary sensor devices are added for each of the following devices:

- Shutter Contact
- Shutter Contact II
- Battery powered devices

### Covers

The cover platform allows you to control shutters, awnings, and blinds.

Shutter Control and Micromodule Shutter Control devices support opening, closing, stopping, and setting the position. Micromodule Blinds additionally support opening, closing, and setting the tilt position.

### Sensors

The sensor platform allows you to monitor the states of your temperature, humidity, purity, air quality, power, energy, and valve motor status sensors. Sensor devices are added for each of the following devices:

- Thermostat
- Wall Thermostat
- Twinguard
- Smart Plug
- Smart Plug Compact
- Light Switch
- Micromodule Shutter Control
- Micromodule Blinds

Smart Plug Compact devices also provide a communication quality sensor. Thermostats provide diagnostic valve position and valve motor status sensors; the legacy raw valve position sensor is disabled by default because the valve entity provides the position directly.

In addition, a single **Open doors and windows** sensor is added for the whole home, not tied to a specific device. Its state is the total number of currently open doors, windows, and other openings, with the name of each open item listed in the `open_doors`, `open_windows`, and `open_others` state attributes.

### Switches

The switch platform allows you to control your outlets, light switches, and select camera functions. Switches are added for each of the following devices:

- Light Switch
- Smart Plug
- Smart Plug Compact
- Camera Eyes
- Camera 360

Devices can also expose configuration switches for supported features. These include **Child lock** for thermostats and supported switches and micromodules, **Routing** for Smart Plugs, and **Presence simulation** for the controller.

A Motion Detector II also gets **Pet immunity** and **Sabotage detection** switches. A Motion Detector II that supports it also includes an **Automatic sensitivity** switch. A Door/Window Contact II Plus also gets a **Vibration detection** switch. A Shutter Contact II also has two **Break function** switches: one to exclude the contact from the intrusion alarm, and one to prevent that exclusion from expiring automatically. A Smoke Detector II gets an **Intrusion alarm** switch to sound or clear its own alarm. A thermostat that supports silent operation also gets a **Whisper mode** switch. A Thermostat Gen2 or Room Thermostat 2 that supports this feature also includes a **Humidity warning** switch. A Smart Plug or Smart Plug Compact that supports energy-saving mode also includes an **Energy-saving mode** switch. A Twinguard that supports this feature also includes a **Heartbeat** switch, which enables or disables its nightly self-test notification. These are configuration entities, so they appear under the device's configuration controls rather than with the main controls.

### Valve

The valve platform provides a diagnostic entity showing the current valve position of each Thermostat, from fully closed (0%) to fully open (100%).

## Bosch SHC automation examples

{% include docs/paste_yaml_tip.md %}

### Automation: Notify when a door or window is left open

Get a reminder if a shutter contact stays open for too long, so an open window doesn't go unnoticed.

- **Trigger**: State
  - **Entity**: Front door (binary sensor)
  - **To**: On
  - **For**: `00:10:00`
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)
  - **Message**: `The front door has been open for 10 minutes.`

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

- **Trigger**: Sunset
- **Action**: Close cover
  - **Target**: Living room shutter

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

Camera-related switches and the **Open doors and windows** sensor are the exception: they're checked periodically instead, since the controller doesn't push their state changes.

If the connection to the controller drops, for example because of a network hiccup or a controller restart, Home Assistant reconnects automatically once the controller is reachable again.

## Known limitations

- The Bosch Smart Home Controller communicates with Home Assistant over the local network. The controller itself does not need to be reachable from the internet.
- Devices you pair with the controller after setting up the integration don't appear automatically. Go to {% my integrations title="**Settings** > **Devices & services**" %}, select **Bosch SHC**, and select **Reload** to pick up new devices.
- If authentication with the controller fails, Home Assistant starts reauthentication so the controller can be registered again. If the controller's IP address changes and it is discovered through Zeroconf, Home Assistant updates the configured address automatically.

## Troubleshooting

{% details "The integration can't connect to the controller" %}

#### Symptom

Setup reports that Home Assistant cannot connect to the controller.

#### Description

Home Assistant cannot establish a connection to the Bosch Smart Home Controller over the local network.

#### Resolution

Make sure the controller is powered on and reachable from your Home Assistant instance over the local network. If you entered the address manually, verify that the IP address or hostname is correct.

{% enddetails %}

{% details "Setup fails with a pairing error" %}

#### Symptom

Setup reports a pairing or registration error after entering the system password.

#### Description

The Bosch Smart Home Controller only accepts new client registrations while it is in pairing mode.

#### Resolution

Press and hold the button on the controller until the LED starts flashing, then try again.

{% enddetails %}

{% details "Setup fails with an authentication error" %}

#### Symptom

Setup reports that authentication failed after entering the system password.

#### Description

Home Assistant could not authenticate with the Bosch Smart Home Controller using the provided credentials.

#### Resolution

Verify that you entered the system password configured for the Bosch Smart Home Controller. If an existing integration needs new credentials, follow the reauthentication flow shown by Home Assistant to register the controller again.

{% enddetails %}

## Removing the integration

{% include integrations/remove_device_service.md %}

Removing the integration doesn't delete the client certificate and key files it created on your Home Assistant instance. If you no longer need them, remove them from the `bosch_shc` folder in your Home Assistant configuration directory.
