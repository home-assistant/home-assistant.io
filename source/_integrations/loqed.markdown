---
title: LOQED Touch Smart Lock
description: Instructions on how to integrate a Loqed Touch Smart Lock
ha_category:
  - Lock
ha_release: 2023.7
ha_iot_class: Local Push
ha_codeowners:
  - "@mikewoudenberg"
ha_domain: loqed
ha_platforms:
  - lock
  - sensor
ha_config_flow: true
ha_integration_type: device
ha_zeroconf: true
---

Integrate your LOQED Touch Smart Lock with Home Assistant. The lock instantly notifies Home Assistant of a lock state change and you can change the lock state yourself.

## Features

This integration supports:

- Send real-time status changes of the lock (open, unlock, lock)
- Change the lock state (open, unlock, lock).
  - Only if your lock has a fixed knob on the outside of your door, you can use the “open” lock state. If you do not have this (thus you have a handle on the outside of your door that you can push down), this command will behave as if the unlock command is sent.

## Prerequisites

On the [LOQED personal access token website](https://integrations.loqed.com/personal-access-tokens), please follow the following steps:

{% details "Generate access token" %}

1. Log in with your LOQED App email address (you need to be an admin).
2. Select **Create**.
3. Give your personal access token a name (this will not be used further on, but we recommend something like "Home Assistant" to recognize it as used by Home Assistant).
4. Select **Save**.
5. Store the access token somewhere you can easily copy/paste from, as you'll need them in the next steps (and it will only be shown once). Note: that you can use this token for setting up multiple locks.
   {% enddetails %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
API token:
  description: "The LOQED personal access token you created in the previous step. You can use the same token for several locks."
Lock:
  description: "The lock to add. You are only asked for this during manual setup when your LOQED account contains more than one lock. With a single lock, it is selected automatically."
{% endconfiguration_basic %}

Home Assistant should automatically detect your lock when your Home Assistant runs on the same network as your lock. In that case, you only need to provide the API token when configuring the integration.

You can also set up a lock manually when for some reason, it is not automatically detected. In that case, you provide the API token from the previous step. If your LOQED account contains more than one lock, you then select the lock you want to add from a list.

## Actions

Please see the default [lock integration page](/integrations/lock/) for the actions available for the lock.

## Removing the integration

This integration follows standard integration removal. Removing it also removes the webhook that Home Assistant registered on your lock.

{% include integrations/remove_device_service.md %}

After removing the integration, you can also delete the personal access token you created for it. If you use the same token for other locks in Home Assistant, keep it until you have removed all of them.

On the [LOQED personal access token website](https://integrations.loqed.com/personal-access-tokens), follow these steps:

1. Log in with your LOQED App email address (you need to be an admin).
2. Select **delete** next to the personal access token you used when creating this integration.
