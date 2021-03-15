---
title: Nuki
description: Instructions on how to integrate a Nuki Smart Lock devices.
ha_category:
  - Lock
ha_release: 0.38
ha_iot_class: Local Polling
ha_codeowners:
  - '@pschmitt'
  - '@pvizeli'
  - '@pree'
ha_domain: nuki
ha_platforms:
  - lock
ha_config_flow: true
ha_dhcp: true
---

The `nuki` platform allows you to control [Nuki Smart Locks](https://nuki.io/en/smart-lock/) via either a [software bridge](https://play.google.com/store/apps/details?id=io.nuki.bridge) or a [physical bridge](https://nuki.io/en/bridge/).

To add a Nuki bridge to your installation, you need to enable developer mode on your bridge and define a port and an access token. This can be achieved using the [Android app](https://play.google.com/store/apps/details?id=io.nuki) or [iPhone app](https://apps.apple.com/app/nuki-smart-lock/id1044998081). Go to manage my devices, and select the bridge. Within the bridge configuration turn on the HTTP API and check the details in the screen. Please note that the API token should be 6-20 characters long, even though the app allows you to set a longer one.

Once you have the token set, to add `Nuki` to your installation, go to **Configuration** >> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **Nuki**.

## Services

### Service `lock_n_go`

This will first unlock, wait a few seconds (20 by default) then re-lock. The wait period can be customized through the app.
See the [Nuki Website](https://nuki.io/en/support/smart-lock/sl-features/locking-with-the-smart-lock/) for more details about this feature.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`s Nuki Locks.
| `unlatch` | yes | Boolean - Whether to unlatch the door when first opening it.
