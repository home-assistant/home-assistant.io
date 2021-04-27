---
title: Sure Petcare
description: Instructions on how to integrate the Sure Petcare cat and pet flaps into Home Assistant.
ha_category:
  - Binary Sensor
  - Sensor
ha_release: 0.104
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@benleb'
ha_domain: surepetcare
ha_platforms:
  - binary_sensor
  - sensor
---

The `surepetcare` component allows you to get information on your Sure Petcare Connect Pet or Cat Flap.

## Configuration

To add a flap, feeder or pet, add the following to your `configuration.yaml` file. The Hubs a flap or feeder is connected to, will be discovered automatically.

```yaml
# Example configuration.yaml entry
surepetcare:
  username: YOUR_SURE_PETCARE_LOGIN
  password: YOUR_SURE_PETCARE_PASSWORD
```

{% configuration %}
  username:
    description: The Sure Petcare Username/Email
    required: true
    type: string
  password:
    description: The Sure Petcare Password
    required: true
    type: string
{% endconfiguration %}

## Services

### Service `surepetcare.set_lock_state`

This service lets you change the locking state of a flap.

| Service data attribute | Required | Type | Description |
| ---------------------- | -------- | -------- | ----------- |
| `flap_id` | `True` | integer | Flap ID to change - see below for instructions on finding device IDs
| `lock_state` | `True` | string | New state to change the flap to

`lock_state` should be one of:

- `unlocked` - flap is unlocked, pets are allowed both in and out.
- `locked_in` - flap is 'in only' - pets can come in but not go back out.
- `locked_out` - flap is 'out only' - pets can go out, but not back in.
- `locked_all` - flap is locked both ways.

## Getting the IDs of your flaps, feeders and pets

There are (at least) three ways, sorted in "descending convenience order":

- Use the [surepy](https://github.com/benleb/surepy) tool (uses the same library as this integration) from [@benleb](https://github.com/benleb). A Python tool to get your token simply by running a single command (check `surepy --help` for the exact command).
- Use the [sp_cli.py](https://github.com/rcastberg/sure_petcare/blob/master/sp_cli.py) from [@rcastberg](https://github.com/rcastberg) to fetch the IDs from the Sure Petcare API. With the default setting, the IDs will be written as JSON to `~/.surepet.cache`.
- Visit [surepetcare.io](https://surepetcare.io) and log in with your Sure Petcare credentials. Open the developer tools in Chrome/Firefox, switch to the "Network" tab and refresh the page. Now look for calls to `start` (`pets`, `<household id>` and others are also possible, but `start` shows you all information at once). Click on this call and in the JSON displayed you will find all the needed IDs.

<p class='img'>
<a href='/images/integrations/surepetcare/spc_ids.png' target='_blank'>
  <img src='/images/integrations/surepetcare/spc_ids.png' alt='Where to find the IDs vie Browser developer console' /></a>
</p>
