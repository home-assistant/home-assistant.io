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
  - IMPORTANT: The Home Assistant Lovelace standard card has only support for unlock and lock. By leveraging the lock-service: lock.open you can connect any button or action to opening the lock.
  - Only if your lock has a fixed knob on the outside of your door, you can use the “open” lock state. If you do not have this (thus you have a handle on the outside of your door that you can push down), this command will behave as if the unlock command is sent.
- Future: change certain settings on the LOQED Touch Smart Lock
- Switch the relay in the bridge (to open a shared access door or garage door)

## Prerequisites

On https://app.loqed.com/API-Config/, please follow the following steps:

- Login with your LOQED App e-mail address (you need to be admin)
- Tap “API Configuration tool”
- Tap “Add new API key”
- Choose any name and your lock, and tap “Add API key”. If you cannot add an API key, ensure that your lock is connected to the internet (the LED on your bridge should be constant green).
  Back on the overview page, under the heading “API Keys”, tap the button “View / Edit” next to your newly created API key.
- Copy the contents of the field “Integration information”. This starts with “{"lock_id":"....”

NB 1: You do not need to create any webhooks (not for the web API, nor for the bridge), as the LOQED integration will take care of this.
NB 2: The API call from the LOQED lock to Home Assistant is verified before the lock-status is updated and the event is generated. This is to prevent incoming calls to change the lock-status.

{% include integrations/config_flow.md %}

## Services

Please see the default lock integration for the services: https://www.home-assistant.io/integrations/lock/

## De-installation in Loqed

On https://app.loqed.com/API-Config/, please follow the following steps:

- Login with your LOQED App e-mail address (you need to be admin)
- Tap “API Configuration tool”
- Under the heading “API Keys”, remove the API key you created previously.
- Ensure your computer is connected to your local home network. Under the heading “Outgoing Webhooks via LOQED Bridge”, tap “Add/delete webhooks” next to your LOQED Bridge. On the next page, ensure to remove all webhooks from your LOQED Bridge.

# Security

All commands that are sent to the lock contain a digital signature to prevent replay attacks. Also the webhooks that the LOQED Bridge sends to notify Home Assistant of a lock state change are digitally signed. As there is no TLS encryption to the bridge, people with access to your local network could potentially see the communication, but it cannot be altered.

Via https://app.loqed.com/API-Config/ you have copy the config containing two different keys during setup: one key which is used to sign commands between you and the bridge (this key only changes if you re-install your lock), and one key to sign commands you send to the lock. The latter key is not accessible by LOQED (it’s encrypted with your LOQED account password, of which only a hash is stored on LOQED’s server). The LOQED Home Assistant integration uses this key to sign commands to the lock (e.g. to unlock). Thus, LOQED’s security architecture, where the keys are only stored on your phone and the lock (and now also on your Home Assistant system) is preserved.
