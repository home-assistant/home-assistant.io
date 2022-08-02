---
title: Loqed Touch Smart Lock
description: Instructions on how to integrate a Loqed Touch Smart Lock
ha_category:
  - Lock
ha_release: 2022.7
ha_iot_class: Local Push
ha_codeowners:
  - "@cpolhout"
ha_domain: loqed
ha_platforms:
  - lock
  - sensor
ha_config_flow: true
ha_dhcp: true
ha_integration_type: integration
---

Integrate your LOQED Touch Smart Lock with Home Assistant. The lock instantly notifies Home Assistant of a lock state change (no polling), and you can change the lock state yourself.

## Features

This integration supports:

- Send real-time (!) status changes of the lock (open, unlock, lock)
- Send battery status updates
- Change the lock state (open, unlock, lock).
  - Only if your lock has a fixed knob on the outside of your door, you can use the “open” lock state. If you do not have this (thus you have a handle on the outside of your door that you can push down), this command will behave as if the unlock command is sent.
- Switch the relay in the bridge (to open a shared access door or garage door)

## Prerequisites

On the [LOQED web-app](https://app.loqed.com/API-Config/), please follow the following steps:

- Login with your LOQED App e-mail address (you need to be admin)
- Tap “API Configuration tool”
- Tap “Add new API key”
- Choose any name and your lock, and tap “Add API key”. If you cannot add an API key, ensure that your lock is connected to the internet (the LED on your bridge should be constant green).
  Back on the overview page, under the heading “API Keys”, tap the button “View / Edit” next to your newly created API key.
- Copy the contents of the field “Integration information”. This starts with “{"lock_id":"....”

{% include integrations/config_flow.md %}

## Services

Please see the default [lock integration page](/integrations/lock/) for the services available for the lock.

## De-installation in Loqed

On [LOQED web-app](https://app.loqed.com/API-Config/), please follow the following steps:

- Login with your LOQED App e-mail address (you need to be admin)
- Tap “API Configuration tool”
- Under the heading “API Keys”, remove the API key you created previously.
- Ensure your computer is connected to your local home network. Under the heading “Outgoing Webhooks via LOQED Bridge”, tap “Add/delete webhooks” next to your LOQED Bridge. On the next page, ensure to remove all webhooks from your LOQED Bridge.
