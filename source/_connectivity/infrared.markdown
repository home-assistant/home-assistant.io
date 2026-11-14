---
title: "Infrared"
connectivity: infrared
description: "Control infrared devices, like TVs and air conditioners, from Home Assistant with an infrared remote adapter."
related:
  - docs: /integrations/infrared/
    title: Infrared integration
  - url: https://esphome.io/projects/?type=irrf
    title: ESPHome infrared and radio frequency proxy projects
  - url: https://esphome.io/components/ir_rf_proxy/
    title: ESPHome infrared and radio frequency proxy component
---

You can control infrared-controlled devices, such as a TV, air conditioner, amplifier, or soundbar, from Home Assistant without touching the handheld remote control. You can also send signals from the handheld remote control to Home Assistant. Home Assistant does this through an [infrared remote adapter](#infrared-remote-adapter-proxy). To learn how the integrations work together, refer to the [Infrared](/integrations/infrared/) {% term integration %}.

This page explains which hardware you can use, how to set up infrared control, and where to place your remote adapters.

## Hardware for infrared control

### Infrared remote adapters

- For some devices, there is a ready-made infrared and radio frequency proxy project that you can install from your browser. To see what is available, refer to the [ESPHome infrared and radio frequency proxy projects](https://esphome.io/projects/?type=irrf).
- Other remote adapters have an integration that provides infrared entities, such as [SMLIGHT SLZB](/integrations/smlight/). To find them, browse the [Infrared category](/integrations/#infrared).

## Setting up infrared control in Home Assistant

You can set up an infrared remote adapter (proxy) to control devices directly from Home Assistant.

Prerequisites:

- Administrator rights in Home Assistant.
- An infrared-controlled device, such as a TV, air conditioner, amplifier, or soundbar.
- An infrared remote adapter. For devices to choose from, refer to [Infrared remote adapters](#infrared-remote-adapters).

1. Place the infrared remote adapter within line-of-sight of the infrared-controlled device. Infrared signals do not pass through walls or other objects. For more details, refer to [About device placement and coverage](#about-device-placement-and-coverage).
2. In Home Assistant, add the integration for your infrared remote adapter. Home Assistant creates a separate infrared {% term entity %} for each emitter and receiver it provides.
   - To add the integration, follow the steps in the integration documentation.
3. Add the integration for your infrared-controlled device, such as [LG Infrared](/integrations/lg_infrared/). To find all of them, browse the [Infrared-controlled category](/integrations/#infrared-controlled).
   - To add the integration, follow the steps in the integration documentation.
   - During integration setup, when you are asked which infrared emitter to use, select the emitter from your infrared remote adapter.
   - If no device-specific integration is available for your infrared-controlled device, check the documentation for your infrared remote adapter integration for other supported ways to control it. For example, the [Broadlink integration](/integrations/broadlink/#remote) provides a `remote` entity that can learn and send infrared commands using the `remote.learn_command` and `remote.send_command` actions.
4. If you have infrared-controlled devices in different rooms, place multiple infrared remote adapters around your home.
   - During setup of the infrared-controlled device, select the remote adapter closest to that device.

## Viewing your infrared remote adapters

You can see all your infrared remote adapters in one place from the **Infrared** configuration panel.

1. Go to {% my config_infrared title="**Settings** > **Connectivity** > **Infrared**" %}.
   - At the top, a status summary shows how many of your infrared remote adapters are currently online.
2. Select **Devices** to open the list of infrared remote adapters. For each one, you can see:
   - The name of the adapter.
   - The type: emitter, receiver, or both.
   - When it was last used.
3. To view more details, select an infrared remote adapter to open its device page.

## About device placement and coverage

Infrared is a line-of-sight technology. Unlike radio-based technologies, infrared signals do not pass through walls, furniture, or other objects. The placement of your infrared remote adapter has a direct effect on how reliably your devices respond.

For the best results, keep the following in mind:

- Place each infrared remote adapter so it has a clear, unobstructed line-of-sight to the devices it controls.
- Keep the adapter within the range supported by your adapter’s emitter strength and the device’s infrared receiver sensitivity.
- Point the emitter towards the device's infrared receiver window. A physical remote works best when aimed at the device, and an infrared remote adapter is no different.
- Avoid placing the adapter where strong sunlight, direct light from fluorescent lamps, or other infrared sources shine onto the device's receiver, as these can interfere with the signal.

To cover devices in more than one room, use a separate infrared remote adapter in each room. Infrared signals do not travel between rooms, so a single adapter cannot control devices behind a wall or in another space. During setup of each infrared-controlled device, select the remote adapter that is closest to it and has a clear line-of-sight.

## Infrared terminology

This section explains the key terms that the Home Assistant documentation uses to describe infrared control.

### Infrared remote adapter (proxy)

A device that relays <abbr title="Infrared">IR</abbr> commands on behalf of Home Assistant. It can connect to Home Assistant over Wi-Fi, Ethernet, or other technology. An infrared remote adapter is also known as an infrared proxy.

It has the following characteristics:

- The infrared remote adapter is the hardware device.
- The infrared remote adapter contains one or more emitters, and sometimes a receiver.
- Each emitter and receiver is shown as a separate {% term entity %} in Home Assistant.

Integrations that provide infrared entities for a remote adapter are listed in the [Infrared category](/integrations/#infrared).

#### Infrared emitter

The component of your remote adapter that sends out IR signals. This is the same kind of signal a physical remote sends. An emitter is what actually controls a device. In Home Assistant, each emitter appears as an infrared {% term entity %} that other integrations can use.

#### Infrared receiver

The component of your remote adapter that catches IR signals sent by a device like a handheld remote. Home Assistant can use those signals, for example to update the entity's {% term state %} or trigger {% term automations %}. Each receiver appears as an infrared {% term entity %}.

### Infrared-controlled device

The appliance you want to control, such as a TV, air conditioner, amplifier, or soundbar. It listens for IR signals but does not connect to your network. Integrations for these devices are listed in the [Infrared-controlled category](/integrations/#infrared-controlled).

### Infrared entity

The Home Assistant representation of a single emitter or receiver. This is what you select when configuring an integration for an infrared-controlled device.

## Troubleshooting

### The device does not respond to commands

#### Symptom: "The command is sent, but nothing happens"

You send a command from Home Assistant, the infrared emitter's {% term state %} updates to show it was used, but the infrared-controlled device does not react.


#### Resolution

To resolve this issue, try the following steps:

1. Make sure nothing blocks the path between the emitter and the device:
   - Infrared signals do not pass through walls, furniture, or cabinet doors.
   - Remove any objects between the emitter and the device.
2. Check the distance between the emitter and the device:
   - Move the infrared remote adapter closer to the device.
   - The usable range depends on your adapter's emitter strength and the device's receiver sensitivity.
3. Point the emitter towards the device's infrared receiver window:
   - Aim the emitter the same way you would aim a handheld remote.
4. Reduce infrared interference:
   - Avoid strong sunlight, direct light from fluorescent lamps, or other infrared sources shining onto the device's receiver.

For more details, refer to [About device placement and coverage](#about-device-placement-and-coverage).

### The wrong device responds, or a device in another room does not respond

#### Symptom: "Commands reach the wrong device"

A command controls a device in the wrong room, or a device does not respond even though another one does.

#### Resolution

To resolve this issue, try the following steps:

1. Check which emitter is selected for the infrared-controlled device:
   - Open the integration for your infrared-controlled device, such as [LG Infrared](/integrations/lg_infrared/).
   - Confirm the selected emitter belongs to the infrared remote adapter in the same room as the device.
2. If needed, select the emitter from the adapter closest to the device.
3. If you have devices in more than one room, use a separate infrared remote adapter in each room:
   - Infrared signals do not travel between rooms.

### An infrared receiver does not pick up signals

#### Symptom: "The receiver's state never updates"

You send a signal from a handheld remote, but the infrared receiver's {% term state %} does not update to show a recent timestamp.

#### Resolution

To resolve this issue, try the following steps:

1. Aim the handheld remote directly at the infrared receiver.
2. Move closer to the receiver and make sure nothing blocks the path.
3. Replace the batteries in the handheld remote if signals are weak or intermittent.
4. Reduce infrared interference from strong sunlight or other infrared sources near the receiver.
