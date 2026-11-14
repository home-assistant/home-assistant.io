---
description: Instructions on how to use radio frequency entities in Home Assistant.
ha_release: 2026.5
ha_domain: radio_frequency
related:
  - docs: /connectivity/radio-frequency/
    title: Radio frequency control in Home Assistant
  - docs: /connectivity/radio-frequency/#radio-frequency-remote-adapters
    title: Radio frequency remote adapters
  - docs: /integrations/#radio-frequency-controlled
    title: Integrations for radio frequency-controlled devices
  - url: https://esphome.io/projects/?type=irrf
    title: ESPHome radio frequency proxy projects
  - url: https://esphome.io/components/ir_rf_proxy/
    title: ESPHome radio frequency proxy component
---

The **Radio Frequency** {% term integration %} allows you to use Home Assistant to send commands to radio frequency-controlled devices, or to receive signals from radio frequency remotes. The integration acts as an abstraction layer between the following components:

- A radio frequency remote adapter (proxy) hardware
- An integration that provides radio frequency entities by integrating a radio frequency remote adapter (such as [ESPHome](/integrations/esphome/) or [Broadlink](/integrations/broadlink/))
- Device-specific integrations (such as [Honeywell String Lights](/integrations/honeywell_string_lights/) or [Novy Cooker Hood](/integrations/novy_cooker_hood/))

You can control radio frequency-controlled devices from Home Assistant without touching the handheld remote control. Home Assistant can also receive signals from a handheld RF remote. The chart illustrates how this is possible via the integrations.

<p class='img'><img class='invertDark' src='/images/integrations/radio_frequency/radio-frequency-overview.png' alt="Diagram showing how the Radio Frequency integration connects device integrations to a radio frequency remote adapter through a remote adapter integration.">
How the Radio Frequency integration connects device integrations to a radio frequency remote adapter through a remote adapter integration.
</p>

A radio frequency {% term entity %} represents either a [radio frequency transmitter](/connectivity/radio-frequency/#radio-frequency-transmitter) or a [radio frequency receiver](/connectivity/radio-frequency/#radio-frequency-receiver).

To learn which remote adapters you can use, how to set up radio frequency control, and where to place your remote adapters, refer to [Radio frequency](/connectivity/radio-frequency/).

{% include integrations/building_block_integration.md %}

## Radio frequency states

A radio frequency entity has no `on` or `off` state. Its {% term state %} is a timestamp showing when the {% term entity %} was last active:

- For a transmitter, the state is the date and time the last RF command was sent.
- For a receiver, the state is the date and time the last RF signal was received.

Home Assistant stores the timestamp in UTC, for example, `2026-01-01T12:00:00.123+00:00`. The Home Assistant interface shows it in your local date and time format.

In addition, the entity can have the following states. Each item shows the interface label, followed by the stored state:

- **Unavailable** (`unavailable`): The entity is currently unavailable.
- **Unknown** (`unknown`): The state is not yet known.

Because the {% term state %} of a radio frequency entity is a timestamp, it changes every time the entity is used. This means you can use it to track when the transmitter last sent a command, or when the receiver last picked up a signal. For a transmitter, **Activity** can also show which {% term integration %} or {% term action %} triggered the transmission.

## Device class

The device class tells Home Assistant whether a radio frequency entity is a transmitter or a receiver. Home Assistant uses the device class to choose the icon and the default name.

Home Assistant sets the device class automatically, based on whether the entity sends or receives RF signals. You can't change the device class.

### Device classes in automations and templates

- Automations: The device class doesn't change how a radio frequency entity works in automations.
- Templates: The device class is the `device_class` attribute of the entity. Use the stored value, such as `transmitter`. For example, you can [find entities by device class](/docs/templating/patterns/#finding-entities-by-device-class).

### List of available device classes

Each item shows the name you see in the Home Assistant interface, followed by the device class as Home Assistant stores it.

- **Radio frequency transmitter** (`transmitter`): Sends RF signals to a radio frequency-controlled device.
- **Radio frequency receiver** (`receiver`): Receives RF signals, for example from a handheld remote.
