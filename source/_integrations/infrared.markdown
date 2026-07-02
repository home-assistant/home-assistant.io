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
related:
  - docs: /integrations/#infrared
    title: Integrations supporting infrared
  - url: https://esphome.io/projects/?type=irrf
    title: ESPHome infrared and radio frequency proxy projects
  - url: https://esphome.io/components/ir_rf_proxy/
    title: ESPHome infrared and radio frequency proxy component
---

The **Infrared** {% term integration %} allows you to use Home Assistant to send commands to infrared-controlled devices, or to receive signals from infrared remotes. The integration acts as an abstraction layer between the following components:

- An infrared remote adapter (proxy)
- An integration that provides infrared entities by integrating an infrared remote adapter (such as [ESPHome](/integrations/esphome/) or [SMLIGHT SLZB](/integrations/smlight/))
- Device-specific integrations (such as [LG Infrared](/integrations/lg_infrared/) or [Samsung Infrared](/integrations/samsung_infrared/))

You can control infrared-controlled devices from Home Assistant without touching the handheld remote control. You can also send signals from the handheld remote control to Home Assistant. The chart illustrates how this is possible via the integrations.

<p class='img'><img class='invertDark' src='/images/integrations/infrared/infrared-overview.png' alt="Diagram showing how the Infrared integration connects device integrations to an infrared remote adapter through a remote adapter integration.">
How the Infrared integration connects device integrations to an infrared remote adapter through a remote adapter integration.
</p>

An infrared {% term entity %} represents either an [infrared emitter](#infrared-emitter) or an [infrared receiver](#infrared-receiver). Emitters allow other integrations to send <abbr title="Infrared">IR</abbr> commands to control devices such as TVs, air conditioners, and other infrared-controlled appliances. Receivers allow other integrations to react to IR signals captured by the hardware.

{% include integrations/building_block_integration.md %}

## Controlling infrared-controlled devices from Home Assistant

You can use an infrared remote adapter (proxy) to control devices directly from Home Assistant.

### Prerequisites

The **Infrared** {% term integration %} is a building block that other integrations build on. It cannot control devices directly. To control devices from Home Assistant, a few other components are needed.

- Administrator rights in Home Assistant.
- An infrared-controlled device, such as a TV, air conditioner, amplifier, or soundbar.
- An infrared remote adapter. If you're unsure what to get:
  - Find integrations that support infrared: In the documentation, search for the [infrared category](/integrations/#infrared).
  - You could also follow an example from the [ESPHome infrared and radio frequency proxy projects](https://esphome.io/projects/?type=ir).

### To control infrared-controlled devices from Home Assistant

1. Place the infrared remote adapter within line-of-sight of the infrared-controlled device. Infrared signals do not pass through walls or other objects.
2. In Home Assistant, add the integration for your infrared remote adapter. Home Assistant creates a separate infrared {% term entity %} for each emitter and receiver it provides.
   - To add the integration, follow the steps in the integration documentation.
3. Add the integration for your infrared-controlled device, such as [LG Infrared](/integrations/lg_infrared/).
   - To add the integration, follow the steps in the integration documentation.
   - During integration setup, when you are asked which infrared emitter to use, select the emitter from your infrared remote adapter.
4. If you have infrared-controlled devices in different rooms, place multiple infrared remote adapters around your home.
   - During setup of the infrared-controlled device, select the remote adapter closest to that device.

## About infrared terminology

This section explains some of the key terms on this page and how they are used in the Home Assistant documentation.

### Infrared remote adapter (proxy)

A device that relays IR commands on behalf of Home Assistant. It can connect to Home Assistant over Wi-Fi, Ethernet, or other technology. An infrared remote adapter is also known as an infrared proxy.

It has the following characteristics:

- The infrared remote adapter is the hardware device.
- The infrared remote adapter contains one or more emitters, and sometimes a receiver.
- Each emitter and receiver is shown as a separate {% term entity %} in Home Assistant.

#### Infrared emitter

The component of your remote adapter that sends out IR signals. This is the same kind of signal a physical remote sends. An emitter is what actually controls a device. In Home Assistant, each emitter appears as an infrared {% term entity %} that other integrations can use.

#### Infrared receiver

The component of your remote adapter that catches IR signals sent by a device like a handheld remote. Home Assistant can use those signals, for example to update the entity's {% term state %} or trigger {% term automations %}. Each receiver appears as an infrared {% term entity %}.

### Infrared-controlled device

The appliance you want to control, such as a TV, air conditioner, amplifier, or soundbar. It listens for IR signals but does not connect to your network.

### Infrared entity

The Home Assistant representation of a single emitter or receiver. This is what you select when configuring an integration for an infrared-controlled device.

## About the state of an infrared entity

The infrared entity is stateless in the traditional sense, as in, it cannot have a state like `on` or `off`. Instead, the state is a timestamp showing when the {% term entity %} was last active:

- For an emitter, the state is the date and time the last IR command was sent.
- For a receiver, the state is the date and time the last IR signal was received.

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

Because the {% term state %} of an infrared entity is a timestamp, it changes every time the entity is used. This means you can use it to track when the emitter last sent a command, or when the receiver last picked up a signal. The logbook can also show context about which {% term integration %} or {% term action %} triggered the IR event.