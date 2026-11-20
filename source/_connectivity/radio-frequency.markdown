---
title: "Radio frequency"
connectivity: rf
description: "Radio frequency control uses radio signals to send commands to devices such as remote outlets and garage doors. These signals can pass through walls."
related:
  - docs: /integrations/radio_frequency/
    title: Radio Frequency integration
  - url: https://esphome.io/projects/?type=irrf
    title: ESPHome radio frequency proxy projects
---

Radio frequency (RF) control uses radio signals, on a frequency such as 433&nbsp;MHz, to send commands to a device. Many remote outlets, garage doors, and string lights come with an RF remote control. Unlike infrared, RF signals can pass through walls.

You can control radio frequency-controlled devices, such as a remote outlet, garage door, or string lights, from Home Assistant without touching the handheld remote control. Home Assistant can also receive signals from a handheld <abbr title="Radio frequency">RF</abbr> remote. Home Assistant does this through a [radio frequency remote adapter](#radio-frequency-remote-adapters). To learn how the integrations work together, refer to the [Radio Frequency](/integrations/radio_frequency/) {% term integration %}.

This page explains which remote adapters you can use, how to set up radio frequency control, and where to place your remote adapters.

## Radio frequency remote adapters

A radio frequency remote adapter is a small device that sends and receives RF signals on behalf of Home Assistant. It connects to Home Assistant over Wi-Fi, Ethernet, or other technology. A radio frequency remote adapter is also known as a radio frequency proxy.

- For some devices, there is a ready-made radio frequency proxy project that you can install from your browser. To see what is available, refer to the [ESPHome radio frequency proxy projects](https://esphome.io/projects/?type=irrf).
- The [Broadlink](/integrations/broadlink/#radio-frequency) integration also provides radio frequency remote adapters, for 433&nbsp;MHz and 315&nbsp;MHz.

Make sure the remote adapter supports the frequency and modulation that your device uses, such as 433.92&nbsp;MHz <abbr title="On-Off Keying">OOK</abbr>.

## Setting up radio frequency control in Home Assistant

You can set up a radio frequency remote adapter (proxy) to control devices directly from Home Assistant.

Prerequisites:

- Administrator rights in Home Assistant.
- A radio frequency-controlled device, such as a remote outlet, garage door, or string lights.
- A radio frequency remote adapter that supports the frequency and modulation that your device uses. For devices to choose from, refer to [Radio frequency remote adapters](#radio-frequency-remote-adapters).

1. Place the radio frequency remote adapter within range of the radio frequency-controlled device. For more details, refer to [About device placement and coverage](#about-device-placement-and-coverage).
2. In Home Assistant, add the integration for your radio frequency remote adapter. Home Assistant creates a separate radio frequency {% term entity %} for each transmitter and receiver it provides.
   - To add the integration, follow the steps in the integration documentation.
3. Add the integration for your radio frequency-controlled device, such as [Honeywell String Lights](/integrations/honeywell_string_lights/). To find all of them, browse the [Radio frequency-controlled category](/integrations/#radio-frequency-controlled).
   - To add the integration, follow the steps in the integration documentation.
   - During integration setup, when you are asked which radio frequency transmitter to use, select the transmitter from your radio frequency remote adapter.
4. If some radio frequency-controlled devices are out of range or respond unreliably, place additional radio frequency remote adapters closer to them.
   - During setup of the radio frequency-controlled device, select the remote adapter that is within range and provides the most reliable signal.

## About device placement and coverage

Radio frequency is a radio-based technology. Unlike infrared, <abbr title="Radio frequency">RF</abbr> signals can pass through walls, furniture, and other objects, so a single remote adapter can often reach devices in more than one room. Range and reliability still depend on where you place the adapter.

For the best results, keep the following in mind:

- Place the radio frequency remote adapter within the range supported by your adapter's transmitter strength and the device's receiver sensitivity.
- Keep some distance between the adapter and large metal objects, which can block or reflect RF signals.
- If your adapter has an antenna, position it for the best coverage. Its orientation can affect range and signal strength.
- Avoid placing the adapter near sources of radio interference, such as other devices on the same frequency (for example, 433.92&nbsp;MHz), Wi-Fi routers, or USB 3.0 hardware. To see how much USB 3.0 hardware can affect nearby radio devices, refer to [Connectivity issues due to interference](https://support.nabucasa.com/hc/en-us/articles/26124431414557-Connectivity-issues-due-to-interference).

If some devices are out of range or respond unreliably, add another radio frequency remote adapter closer to them. During setup of each radio frequency-controlled device, select the remote adapter that is within range and provides the most reliable signal.

## Viewing your radio frequency remote adapters

You can see all your radio frequency remote adapters in one place from the **Radio frequency** configuration panel.

1. Go to {% my config_radiofrequency title="**Settings** > **Connectivity** > **Radio frequency**" %}.
   - At the top, a status summary shows how many of your radio frequency remote adapters are currently online.
2. Select **Devices** to open the list of radio frequency remote adapters. For each one, you can see:
   - The name of the adapter.
   - When it was last used.
3. To view more details, select a radio frequency remote adapter to open its device page.

## Radio frequency terminology

This section explains the key terms that the Home Assistant documentation uses to describe radio frequency control.

### Radio frequency remote adapter (proxy)

A device that relays <abbr title="Radio frequency">RF</abbr> commands on behalf of Home Assistant. A radio frequency remote adapter is also known as a radio frequency proxy.

It has the following characteristics:

- The radio frequency remote adapter is the hardware device.
- The radio frequency remote adapter contains one or more transmitters, and sometimes a receiver.
- Each transmitter and receiver is shown as a separate {% term entity %} in Home Assistant.

To choose one, refer to [Radio frequency remote adapters](#radio-frequency-remote-adapters).

#### Radio frequency transmitter

The component of your remote adapter that sends out RF signals. This is the same kind of signal a physical remote sends. A transmitter is what actually controls a device. In Home Assistant, each transmitter appears as a radio frequency {% term entity %} that other integrations can use.

#### Radio frequency receiver

The component of your remote adapter that receives RF signals from a device like a handheld remote. Home Assistant updates the entity's {% term state %} each time the receiver picks up a signal, and integrations for radio frequency-controlled devices can use those signals. In Home Assistant, each receiver appears as a radio frequency {% term entity %}.

The receiver entity's state shows only when it last received a signal. It doesn't show which signal it was, such as which remote button was pressed. To act on specific buttons, you need an integration that uses the receiver.

### Radio frequency-controlled device

The appliance you want to control, such as a remote outlet, garage door, or string lights. It listens for RF signals but does not connect to your network. Integrations for these devices are listed in the [Radio frequency-controlled category](/integrations/#radio-frequency-controlled).

### Radio frequency entity

The Home Assistant representation of a single transmitter or receiver. This is what you select when configuring an integration for a radio frequency-controlled device.
