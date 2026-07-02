---
title: Radio frequency
description: Instructions on how to use radio frequency entities in Home Assistant.
ha_category:
  - Radio Frequency
ha_release: 2026.5
ha_quality_scale: internal
ha_domain: radio_frequency
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
related:
  - docs: /integrations/#radio-frequency
    title: Integrations supporting radio frequency
  - url: https://esphome.io/projects/?type=irrf
    title: ESPHome radio frequency proxy projects
  - url: https://esphome.io/components/ir_rf_proxy/
    title: ESPHome radio frequency proxy component
---

The **Radio Frequency** {% term integration %} allows you to use Home Assistant to send commands to radio frequency-controlled devices. The integration acts as an abstraction layer between the following components:

- A radio frequency remote adapter (proxy) hardware
- An integration that provides radio frequency entities by integrating a radio frequency remote adapter (such as [ESPHome](/integrations/esphome/) or [Broadlink](/integrations/broadlink/))
- Device-specific integrations (such as [Honeywell String Lights](/integrations/honeywell_string_lights/) or [Novy Cooker Hood](/integrations/novy_cooker_hood/))

You can control radio frequency-controlled devices from Home Assistant without touching the handheld remote control. The chart illustrates how this is possible via the integrations.

<p class='img'><img class='invertDark' src='/images/integrations/radio_frequency/radio-frequency-overview.png' alt="Diagram showing how the Radio Frequency integration connects device integrations to a radio frequency remote adapter through a remote adapter integration.">
How the Radio Frequency integration connects device integrations to a radio frequency remote adapter through a remote adapter integration.
</p>

A radio frequency {% term entity %} represents a [radio frequency transmitter](#radio-frequency-transmitter).

{% include integrations/building_block_integration.md %}

## Setting up radio frequency control in Home Assistant

You can set up a radio frequency remote adapter (proxy) to control devices directly from Home Assistant.

### Prerequisites

The **Radio Frequency** {% term integration %} is a building block that other integrations build on. It cannot control devices directly. To control devices from Home Assistant, a few other components are needed.

- Administrator rights in Home Assistant.
- A radio frequency-controlled device, such as a remote outlet, garage door, or string lights.
- A radio frequency remote adapter. If you're unsure what to get:
  - Find integrations that support radio frequency: In the documentation, search for the [radio frequency category](/integrations/#radio-frequency).
  - You could also follow an example from the [ESPHome radio frequency proxy projects](https://esphome.io/projects/?type=irrf).
  - Make sure the remote adapter supports the frequency and modulation that your device uses, such as 433.92&nbsp;MHz <abbr title="On-Off Keying">OOK</abbr>.

### To set up radio frequency control in Home Assistant

1. Place the radio frequency remote adapter within range of the radio frequency-controlled device.
2. In Home Assistant, add the integration for your radio frequency remote adapter. Home Assistant creates a separate radio frequency {% term entity %} for each transmitter it provides.
   - To add the integration, follow the steps in the integration documentation.
3. Add the integration for your radio frequency-controlled device, such as [Honeywell String Lights](/integrations/honeywell_string_lights/).
   - To add the integration, follow the steps in the integration documentation.
   - During integration setup, when you are asked which radio frequency transmitter to use, select the transmitter from your radio frequency remote adapter.
4. If you have radio frequency-controlled devices in different rooms, place multiple radio frequency remote adapters around your home.
   - During setup of the radio frequency-controlled device, select the remote adapter closest to that device.

## Viewing your radio frequency remote adapters

You can see all your radio frequency remote adapters in one place from the **Radio frequency** configuration panel.

1. Go to {% my config_radiofrequency title="**Settings** > **Radio Frequency**" %}.
   - At the top, a status summary shows how many of your radio frequency remote adapters are currently online.
2. Select **Devices** to open the list of radio frequency remote adapters. For each one, you can see:
   - The name of the adapter.
   - When it was last used.
3. To view more details, select a radio frequency remote adapter to open its device page.

## About radio frequency terminology

This section explains some of the key terms on this page and how they are used in the Home Assistant documentation.

### Radio frequency remote adapter (proxy)

A device that relays <abbr title="Radio frequency">RF</abbr> commands on behalf of Home Assistant. It can connect to Home Assistant over Wi-Fi, Ethernet, or other technology. A radio frequency remote adapter is also known as a radio frequency proxy.

It has the following characteristics:

- The radio frequency remote adapter is the hardware device.
- The radio frequency remote adapter contains one or more transmitters.
- Each transmitter is shown as a separate {% term entity %} in Home Assistant.

#### Radio frequency transmitter

The component of your remote adapter that sends out RF signals. This is the same kind of signal a physical remote sends. A transmitter is what actually controls a device. In Home Assistant, each transmitter appears as a radio frequency {% term entity %} that other integrations can use.

### Radio frequency-controlled device

The appliance you want to control, such as a remote outlet, garage door, or string lights. It listens for RF signals but does not connect to your network.

### Radio frequency entity

The Home Assistant representation of a single transmitter. This is what you select when configuring an integration for a radio frequency-controlled device.

## About the state of a radio frequency entity

The radio frequency entity is stateless in the traditional sense, as in, it cannot have a state like `on` or `off`. Instead, the state is a timestamp showing the date and time when an RF command was last sent through the transmitter.

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

Because the {% term state %} of a radio frequency entity is a timestamp, it changes every time an RF command is sent. This means you can use it to track when the transmitter was last used. The logbook can also show context about which {% term integration %} or {% term action %} triggered the transmission.
