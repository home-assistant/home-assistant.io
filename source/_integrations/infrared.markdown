---
description: Instructions on how to use infrared entities in Home Assistant.
ha_release: 2026.4
ha_domain: infrared
related:
  - docs: /connectivity/infrared/
    title: Infrared control in Home Assistant
  - docs: /integrations/#infrared
    title: Integrations that provide infrared entities
  - docs: /integrations/#infrared-controlled
    title: Integrations for infrared-controlled devices
  - url: https://esphome.io/projects/?type=irrf
    title: ESPHome infrared and radio frequency proxy projects
  - url: https://esphome.io/components/ir_rf_proxy/
    title: ESPHome infrared and radio frequency proxy component
---

The **Infrared** {% term integration %} allows you to use Home Assistant to send commands to infrared-controlled devices, or to receive signals from infrared remotes. The integration acts as an abstraction layer between the following components:

- An infrared remote adapter (proxy) hardware
- An integration that provides infrared entities by integrating an infrared remote adapter (such as [ESPHome](/integrations/esphome/) or [SMLIGHT SLZB](/integrations/smlight/))
- Device-specific integrations (such as [LG Infrared](/integrations/lg_infrared/) or [Samsung Infrared](/integrations/samsung_infrared/))

You can control infrared-controlled devices from Home Assistant without touching the handheld remote control. You can also send signals from the handheld remote control to Home Assistant. The chart illustrates how this is possible via the integrations.

<p class='img'><img class='invertDark' src='/images/integrations/infrared/infrared-overview.png' alt="Diagram showing how the Infrared integration connects device integrations to an infrared remote adapter through a remote adapter integration.">
How the Infrared integration connects device integrations to an infrared remote adapter through a remote adapter integration.
</p>

An infrared {% term entity %} represents either an [infrared emitter](/connectivity/infrared/#infrared-emitter) or an [infrared receiver](/connectivity/infrared/#infrared-receiver).

To learn which hardware you can use, how to set up infrared control, and where to place your remote adapters, refer to [Infrared](/connectivity/infrared/).

{% include integrations/building_block_integration.md %}

## Infrared states

An infrared entity has no `on` or `off` state. Its {% term state %} is a timestamp showing when the {% term entity %} was last active:

- For an emitter, the state is the date and time the last IR command was sent.
- For a receiver, the state is the date and time the last IR signal was received.

Home Assistant stores the timestamp in UTC, for example, `2026-01-01T12:00:00.123+00:00`. The Home Assistant interface shows it in your local date and time format.

In addition, the entity can have the following states. Each item shows the interface label, followed by the stored state:

- **Unavailable** (`unavailable`): The entity is currently unavailable.
- **Unknown** (`unknown`): The state is not yet known.

Because the {% term state %} of an infrared entity is a timestamp, it changes every time the entity is used. This means you can use it to track when the emitter last sent a command, or when the receiver last picked up a signal. The logbook can also show context about which {% term integration %} or {% term action %} triggered the IR event.

## Device class

The device class tells Home Assistant whether an infrared entity is an emitter or a receiver. Home Assistant uses the device class to choose the icon and the default name, and to show the type of each adapter in the [list of infrared remote adapters](/connectivity/infrared/#viewing-your-infrared-remote-adapters).

Home Assistant sets the device class automatically, based on whether the entity sends or receives IR signals. You can't change the device class.

### Device classes in automations and templates

- Automations: The device class doesn't change how an infrared entity works in automations.
- Templates: The device class is the `device_class` attribute of the entity. Use the stored value, such as `emitter`. For example, you can [find entities by device class](/docs/templating/patterns/#finding-entities-by-device-class).

### List of available device classes

Each item shows the name you see in the Home Assistant interface, followed by the device class as Home Assistant stores it.

- **Infrared emitter** (`emitter`): Sends IR signals to an infrared-controlled device.
- **Infrared receiver** (`receiver`): Receives IR signals, for example from a handheld remote.

## Troubleshooting

For problems with infrared control, such as a device that does not respond to commands, refer to [Troubleshooting infrared control](/connectivity/infrared/#troubleshooting).
