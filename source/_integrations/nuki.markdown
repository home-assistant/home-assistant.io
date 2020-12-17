---
title: Nuki
description: Instructions on how to integrate a Nuki Smart Lock devices.
ha_category:
  - Lock
ha_release: 0.38
ha_iot_class: Local Push
ha_codeowners:
  - '@pschmitt'
  - '@pvizeli'
  - '@steinerl'
ha_domain: nuki
---

The `nuki` platform allows you to control [Nuki Smart Locks](https://nuki.io/en/smart-lock/) via either a [software bridge](https://play.google.com/store/apps/details?id=io.nuki.bridge) or a [physical bridge](https://nuki.io/en/bridge/).

To add a Nuki bridge to your installation, you need to enable developer mode on your bridge and define a port and an access token. This can be achieved using the [Android app](https://play.google.com/store/apps/details?id=io.nuki) or [iPhone app](https://apps.apple.com/app/nuki-smart-lock/id1044998081). Go to manage my devices, and select the bridge. Within the bridge configuration turn on the HTTP API and check the details in the screen. Please note that the API token should be 6-20 characters long, even though the app allows you to set a longer one.
Then add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
lock:
  - platform: nuki
    host: 192.168.1.120
    token: fe2345ef
    # webhook_id is required to activate `Local Push`
    webhook_id: nuki
```

{% configuration %}
host:
  description: The IP or hostname of the Nuki bridge.
  required: true
  type: string
port:
  description: The port on which the Nuki bridge is listening on.
  required: false
  default: 8080
  type: integer
token:
  description: The token that was defined when setting up the bridge.
  required: true
  type: string
webhook_id:
  description: An ID for the Nuki webhook endpoint, eg. `nuki`.
  type: string
{% endconfiguration %}

### Local Push

The component defaults to `Local Polling`.

To activate `Local Push`, it is required to provide a `webhook_id` in the configuration.

It is also required to register the Home Assistant webhook URL `http://your-home-assistant:8123/api/webhook/nuki` as a callback endpoint on your Nuki Bridge via the [Nuki Bridge HTTP API](https://developer.nuki.io/page/nuki-bridge-http-api-1-12/4#heading--callback-add):

```shell
curl http://192.168.1.120:8080/callback/add?token=fe2345ef&url=http%3A%2F%2Fyour-home-assistant%3A8123%2Fapi%2Fwebhook%2Fnuki
```

**Note:** The Bridge API doesn't support HTTPS URLs. Also make sure to URL encode the parameter values.

## Events

### Event `nuki_bell_ring`

Every time someone rings the bell on your Nuki Opener connected intercom system, a `nuki_bell_ring` event will be fired.

**Note:** This event only gets fired when `Local Push` is used.

Field | Description
----- | -----------
`nuki_id` | ID of the Nuki Device.
`ring_action_timestamp` | Timestamp of when the bell was rang.

## Services

### Service `lock_n_go`

This will first unlock, wait a few seconds (20 by default) then re-lock. The wait period can be customized through the app.
See the [Nuki Website](https://nuki.io/en/support/smart-lock/sl-features/locking-with-the-smart-lock/) for more details about this feature.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`s Nuki Locks.
| `unlatch` | yes | Boolean - Whether to unlatch the door when first opening it.
