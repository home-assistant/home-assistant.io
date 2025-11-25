---
title: LOQED Touch Smart Lock
description: Instructions on how to integrate a Loqed Touch Smart Lock
ha_category:
  - Lock
ha_release: 2023.7
ha_iot_class: Local Push
ha_codeowners:
  - '@mikewoudenberg'
ha_domain: loqed
ha_platforms:
  - lock
  - sensor
ha_config_flow: true
ha_integration_type: integration
ha_zeroconf: true
---

Integrate your LOQED Touch Smart Lock with Home Assistant. The lock instantly notifies Home Assistant of a lock state change and you can change the lock state yourself.

## Features

This integration supports:

- Send real-time status changes of the lock (open, unlock, lock)
- Change the lock state (open, unlock, lock).
  - Only if your lock has a fixed knob on the outside of your door, you can use the “open” lock state. If you do not have this (thus you have a handle on the outside of your door that you can push down), this command will behave as if the unlock command is sent.

## Prerequisites

On the [LOQED personal access token website](https://integrations.production.loqed.com/personal-access-tokens), please follow the following steps:

{% details "Generate access token" %}

1. Login with your LOQED App email address (you need to be an admin).
2. Select **Create**.
3. Give your personal access token a name (this will not be used further on, but we recommend something like "Home Assistant" to recognize it as used by Home Assistant).
4. Select **Save**.
5. Store the access token somewhere you can easily copy/paste from, as you'll need them in the next steps (and it will only be shown once). Note: that you can use this token for setting up multiple locks.
   {% enddetails %}

{% include integrations/config_flow.md %}

Home Assistant should automatically detect your lock when your Home Assistant runs on the same network as your lock. In that case, you only need to provide the selected API key when configuring the integration.

You can also set up a lock manually when for some reason, it is not automatically detected. In that case, you need to provide both the API Key from the previous step and the name of the Lock, as it is known in the LOQED companion app.

## Actions

Please see the default [lock integration page](/integrations/lock/) for the actions available for the lock.

## De-installation in Loqed

First, remove the integration from Home Assistant. This will remove any configuration made on the lock itself for Home Assistant.

On [LOQED personal access token website](https://integrations.production.loqed.com/personal-access-tokens), please follow the following steps:

1. Login with your LOQED App email address (you need to be admin).
2. Select **delete** on the Personal Access Token you used when creating this integration.
