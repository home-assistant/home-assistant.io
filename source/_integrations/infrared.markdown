---
title: Infrared
description: Instructions on how to use infrared entities in Home Assistant.
ha_category:
  - Infrared
ha_release: 2026.4
ha_quality_scale: internal
ha_domain: infrared
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

An infrared {% term entity %} represents either an infrared emitter or an infrared receiver. Emitters allow other integrations to send IR commands to control devices such as TVs, air conditioners, and other IR-controlled appliances. Receivers allow other integrations to react to IR signals captured by the hardware.

The **Infrared** {% term integration %} acts as an abstraction layer between IR hardware (such as ESPHome) and device-specific integrations that send commands to infrared-controlled devices, or receive signals from infrared remotes.

{% include integrations/building_block_integration.md %}

## The state of an infrared entity

The infrared entity is stateless in the traditional sense, as in, it cannot have a state like `on` or `off`. Instead, the state is a timestamp showing when the entity was last active:

- For an emitter, the state is the date and time the last IR command was sent.
- For a receiver, the state is the date and time the last IR signal was received.

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

Because the {% term state %} of an infrared entity is a timestamp, it changes every time the entity is used. This means we can use it to track when the emitter last sent a command, or when the receiver last picked up a signal. The logbook can also show context about which integration or action triggered the IR event.

## Setting up devices that use infrared

When setting up an integration for an IR-controlled device (such as an LG TV via infrared), you will typically be asked to select which IR emitter and/or receiver to use during the configuration process. This allows you to choose the specific infrared entity that is physically positioned near your device.

The selected infrared entity must be provided by a hardware integration (such as ESPHome) that has already been set up with an IR emitter or receiver.

## Finding and adding integrations that support infrared

Infrared is a building block that other integrations build on. To control an IR-controlled device or react to an infrared remote, you need an integration that supports infrared, such as one for your specific TV or air conditioner.

To find and add these integrations:

1. In the Home Assistant documentation, go to the [Infrared category](/integrations/#infrared).
2. Browse the listed integrations to find one that matches your IR-controlled device.
3. Open the integration's page and follow its setup instructions.

## Controlling devices without a wired infrared emitter

To control an IR-controlled device, an infrared emitter has to sit close to it, with line-of-sight to the device. There are 2 options to achieve this:

- Using a wired IR emitter. A wired emitter, such as a USB-UIRT, plugs into your Home Assistant server, so it can only reach devices near the server, rarely your TV or air conditioner.
- Using a remote adapter (proxy). A remote adapter, such as the [Seeed Studio XIAO IR Mate](https://esphome.io/projects/?type=ir), is a small ESPHome device with a built-in emitter that connects to Home Assistant over Wi-Fi (or Ethernet). You place it next to the IR-controlled device, and it sends IR commands over your network on behalf of Home Assistant, letting Home Assistant control IR-controlled devices anywhere in your home.

When you set up an ESPHome device configured as a remote adapter, Home Assistant automatically discovers its built-in infrared emitters. Each emitter appears as an infrared entity, so you can select it when configuring an integration for an IR-controlled device.

### To set up a remote adapter to control devices

1. Get an ESPHome remote adapter. You have two options:
    - Install ready-made firmware from your browser, without any programming. For example, the [Seeed Studio XIAO IR Mate](https://www.seeedstudio.com/XIAO-Smart-IR-Mate-p-6492.html) is a compact infrared emitter purpose-built for this. Browse the available [ESPHome infrared and radio frequency proxy projects](https://esphome.io/projects/?type=ir).
    - Build your own using the [ESPHome infrared and radio frequency proxy component](https://esphome.io/components/ir_rf_proxy/) on an ESP32-based device.
2. Position the remote adapter within line-of-sight of the IR-controlled device. Infrared signals do not pass through walls or other obstructions.
3. Set up the remote adapter through the [ESPHome](/integrations/esphome/) integration. Home Assistant discovers its built-in infrared emitters and surfaces them as infrared entities.
   - Depending on the device, you can follow the instructions in the [Ready-made Projects](https://esphome.io/projects/) section of the ESPHome documentation.
4. In Home Assistant, add the integration for your IR-controlled device, such as [LG Infrared](/integrations/lg_infrared/). During that integration's setup, when you are asked which infrared emitter to use, select the emitter from your remote adapter. For more information, refer to [Finding and adding integrations that support infrared](#finding-and-adding-integrations-that-support-infrared).
5. If you need to control IR-controlled devices in different rooms, place multiple remote adapters around your home and select the one closest to each device.

## About Infrared terminology

This section explains some of the key term on this page and how they are used in Home Assistant documentation.

### Remote adapter (proxy)

A network-connected device, typically running ESPHome, that relays IR commands on behalf of Home Assistant over Wi-Fi or Ethernet. A remote adapter is also known as an infrared proxy.

It has the following characteristics:

- The remote adapter contains one or more emitters, and sometimes a receiver.
- A remote adapter needs to be placed near the IR-controlled device.
- The remote adapter is the hardware device. The emitters and receivers it contains are the parts that each become an infrared entity.

#### Infrared emitter

The component that sends out IR signals, the same kind of signal a physical remote sends. An emitter is what actually controls a device, and it is part of a piece of hardware, such as a remote adapter. In Home Assistant, each emitter appears as an infrared entity that other integrations can use.

#### Infrared receiver

The component that catches IR signals sent by a device like a handheld remote. Home Assistant can use those signals, for example to learn remote codes or trigger automations. Like an emitter, a receiver is part of a piece of hardware, such as a remote adapter. Each receiver appears as an infrared entity.

### IR-controlled device

The appliance you want to control, such as a TV, air conditioner, or soundbar. It listens for IR signals but does not connect to your network.

### Infrared entity

The Home Assistant representation of a single emitter or receiver. This is what you select when configuring an integration for an IR-controlled device.

### How these terms relate

The terms above nest inside each other:

- A remote adapter contains one or more emitters, and sometimes a receiver.
- Each emitter or receiver is represented in Home Assistant as an infrared entity.
- You select an infrared entity to control an IR-controlled device, which is separate hardware and not part of the remote adapter.

For example, a single remote adapter with two built-in emitters appears in Home Assistant as two infrared entities, one per emitter.
