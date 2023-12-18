---
title: Tailwind
description: Instructions on how to integrate a Tailwind garage door controller with Home Assistant.
ha_category:
  - Cover
ha_release: 2024.1
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@frenck'
ha_domain: tailwind
ha_zeroconf: true
ha_platforms:
  - number
ha_integration_type: device
---

The Tailwind integration integrates [Tailwind](https://gotailwind.com/)
garage door controllers fully locally.

This integration has been tested with the following Tailwind devices:

- [Tailwind iQ3](https://gotailwind.com/products/iq3-smart-garage-controller)

## Prerequisites

To use your Tailwind device with Home Assistant, you need to have your Tailwind
device setup, connected to your network, and configured in the Tailwind app.

You will need two pieces of information:

- **The IP address of your Tailwind device.** You can find the IP address by
  going into the Tailwind app and selecting your Tailwind device's cog icon.
  The IP address is shown in the **Device Info** section.
- **Local control key token.** To find local control key token, browse to the
  [Tailwind web portal][token], log in with your Tailwind account, and select
  the [**Local Control Key**][token] tab. The 6-digit number shown is your
  local control key token.

[token]: https://web.gotailwind.com/client/integration/local-control-key

{% include integrations/config_flow.md %}

## Provided entities

This integration provides the following entities:

- **Status LED brightness control** - A number entity that allows you to control
  the brightness of the status LED on the Tailwind device.
