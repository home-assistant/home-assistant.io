---
layout: page
title: "Wink"
description: "Instructions on how to setup the Wink hub within Home Assistant."
date: 2015-01-20 22:36
sidebar: true
comments: false
sharing: true
footer: true
logo: wink.png
ha_category: Hub
featured: true
ha_iot_class: "Cloud Polling"
ha_release: pre 0.7
---

[Wink](http://www.wink.com/) is a home automation hub that can control a whole wide range of devices on the market. Or, as they say in their own words:

<blockquote>
  Wink offers one, quick and simple way to connect people with the products they rely on every day in their home.
</blockquote>

Home Assistant integrates with the Wink API and automatically sets up any switches, lights, locks, fans, climate devices (thermostats, air conditioners, and water heaters), covers, sensors, alarms, and sirens.

Check the related components pages for actual devices that are supported.

### {% linkable_title Authenticate using [developer.wink.com](https://developer.wink.com) %}

You need to setup a developer account with Wink. This process can take a few days to get approved.

Wink requests three pieces of information from the user when they sign up for a developer account.

1. `Name:` This can be anything, for example "Home Assistant"
2. `Website:` The external address of your Home Assistant instance. If not externally accessible you can use your email address.
3. `Redirect URI:` This should be "http://192.168.1.5:8123/auth/wink/callback" replacing the IP with the internal IP of your Home Assistant box.

No settings are required in the configuration.yaml other than `wink:` this is because you will be guided through setup via the configurator on the frontend.

<p class='note'>
When using the configurator make sure the initial setup is performed on the same local network as the Home Assistant server, if not from the same box Home Assistant is running on. This will allow for authentication redirects to happen correctly.
</p>

```yaml
wink:
```

### {% linkable_title Full oauth authentication (legacy). %}

This should be used for users that obtained their client_id and client_secret via email from Wink support prior to [developer.wink.com's](https://developer.wink.com) existence.


```yaml
wink:
  email: YOUR_WINK_EMAIL_ADDRESS
  password: YOUR_WINK_PASSWORD
  client_id: YOUR_WINK_CLIENT_ID
  client_secret: YOUR_WINK_CLIENT_SECRET
```

Configuration variables:

- **email** (*Required for legacy OAuth*): Your Wink login email.
- **password** (*Required for legacy OAuth*): Your Wink login password.
- **client_id** (*Required for legacy OAuth*): Your provided Wink client_id.
- **client_secret** (*Required for legacy OAuth*): Your provided Wink client_secret.
- **local_control** (*Optional*): If set to `True` state changes for lights, locks, and switches will be issued to the local hub.

Local control:
- Wink's local control API isn't officially documented and therefore could be broken by a hub update. For these reasons `local_control` defaults to `False`.

- Using local control doesn't appear to make commands any quicker, but does function in an internet/Wink outage.

- Local control is also only available for the Wink hub v1 and v2, not the Wink relay.

- Local control isn't used during start-up of Home Assistant; this means initial setup requires an active internet connection.

- Local control requests are first sent to the controlling hub. If a request fails, that request will attempt to go online.

<p class='note'>
It is possible for the hub to get into a bad state where it stops accepting local control request. If this happens, you will notice requests taking significantly longer as they are redirected online. This doesn't happen often, but when it does, it appears to be resolved by rebooting the hub.

The following error will be logged if the hub is rejecting local requests.

```
Error sending local control request. Sending request online
```

</p>

### {% linkable_title Service `refresh_state_from_wink` %}

The Wink component only obtains the device states from the Wink API once, during startup. All updates after that are pushed via a third party called PubNub. On rare occasions where an update isn't pushed device states can be out of sync.

You can use the service wink/refresh_state_from_wink to pull the most recent state from the Wink API for all devices. If `local_control` is set to `True` states will be pulled from the devices controlling hub, not the online API.

### {% linkable_title Service `pull_newly_added_devices_from_wink` %}

You can use the service wink/add_new_devices to pull any newly paired Wink devices to an already running instance of Home-Assistant. Any new devices will also be added if Home-Assistant is restarted.

### {% linkable_title Service `delete_wink_device` %}

You can use the service wink/delete_wink_device to remove/unpair a device from Wink.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String that points at the `entity_id` of device to delete.

### {% linkable_title Service `pair_new_device` %}

You can use the service wink/pair_new_device to pair a new device to your Wink hub/relay

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `hub_name` | no | The name of the hub to pair a new device to.
| `pairing_mode` | no | One of the following [zigbee, zwave, zwave_exclusion, zwave_network_rediscovery, lutron, bluetooth, kidde]
| `kidde_radio_code` | conditional | A string of 8 1s and 0s one for each dip switch on the kidde device left --> right = 1 --> 8 (Required if pairing_mode = kidde)

<p class='note'>
Calling service wink/pull_newly_added_wink_devices after a device is paired will add that new device to Home Assistant. The device will also show up on the next restart of Home Assistant.
</p>

### {% linkable_title Service `rename_wink_device` %}

You can use the service wink/rename_wink_device to change the name of a device.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String that points at the `entity_id` of device to rename.
| `name` | no | The name to change it to.

<p class='note'>
Home Assistant entity_ids for Wink devices are based on the Wink device's name. Calling this service will not change the entity_id of the deivce until Home Assistant is restarted.
</p>

<p class='note'>
The Wink hub, by default, can only be accessed via the cloud. This means it requires an active internet connection and you will experience delays when controlling and updating devices (~3s).
</p>


### Custom Wink devices and their services

- GoControl siren and strobe
- Dome siren/chime/strobe


### {% linkable_title Service `set_siren_auto_shutoff` %}

You can use the service wink/set_siren_auto_shutoff to set how long the siren will sound before shuting off.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `auto_shutoff` | no | Int. One of [None, -1, 30, 60, 120] (None and -1 are forever. Use None for gocontrol, and -1 for Dome)
| `entity_id` | yes | String or list of strings that point at `entity_id`s of siren.

Example:

```yaml
script:
  set_all_sirens_to_one_minute_auto_shutoff:
    sequence:
      - service: wink.set_siren_auto_shutoff
        data:
          auto_shutoff: 60
```

<p class='note'>
The following services only work with the Dome siren/chime.
</p>

### {% linkable_title Service `set_chime_volume` %}

You can use the service wink/set_chime_volume to set the volume for the chime on your Dome siren/chime.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `volume` | no | String. One of ["low", "medium", "high"]
| `entity_id` | yes | String or list of strings that point at `entity_id`s of siren/chime.

Example:

```yaml
script:
  set_chime_volume_to_low_for_all_chimes
    sequence:
      - service: wink.set_chime_volume
        data:
          volume: "low"
```

### {% linkable_title Service `set_siren_volume` %}

You can use the service wink/set_chime_volume to set the volume for the chime on your Dome siren/chime.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `volume` | no | String. One of ["low", "medium", "high"]
| `entity_id` | yes | String or list of strings that point at `entity_id`s of siren/chime.

Example:

```yaml
script:
  set_siren_volume_to_low_for_all_sirens
    sequence:
      - service: wink.set_siren_volume
        data:
          volume: "low"
```

### {% linkable_title Service `enable_chime` %}

You can use the service wink/enable_chime to set the tone and enable the chime on your Dome siren/chime.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `tone` | no | String. One of ["doorbell", "fur_elise", "doorbell_extended", "alert", "william_tell", "rondo_alla_turca", "police_siren", "evacuation", "beep_beep", "beep", "inactive"]
| `entity_id` | yes | String or list of strings that point at `entity_id`s of siren/chime.

Example:

```yaml
script:
  execute_doorbell
    sequence:
      - service: wink.enable_chime
        data:
          tone: "doorbell"
```

### {% linkable_title Service `set_siren_tone` %}

You can use the service wink/set_siren_tone to set the tone on your Dome siren. This tone will be used the next time the siren is executed.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `tone` | no | String. One of ["doorbell", "fur_elise", "doorbell_extended", "alert", "william_tell", "rondo_alla_turca", "police_siren", "evacuation", "beep_beep", "beep"]
| `entity_id` | yes | String or list of strings that point at `entity_id`s of siren/chime.

Example:

```yaml
script:
  set_siren_to_alert:
    sequence:
      - service: wink.set_siren_tone
        data:
          tone: "alert"
```

### {% linkable_title Service `set_siren_strobe_enabled` %}

You can use the service wink/set_siren_strobe_enabled to enable or disable the strobe when the siren is executed.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `enabled` | no | Boolean. True or False.
| `entity_id` | yes | String or list of strings that point at `entity_id`s of siren/chime.

Example:

```yaml
script:
  disable_siren_strobe:
    sequence:
      - service: wink.set_siren_strobe_enabled
        data:
          enabled: False
```

### {% linkable_title Service `set_chime_strobe_enabled` %}

You can use the service wink/set_chime_strobe_enabled to enable or disable the strobe when the chime is executed.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `enabled` | no | Boolean. True or False.
| `entity_id` | yes | String or list of strings that point at `entity_id`s of chime/chime.

Example:

```yaml
script:
  disable_chime_strobe:
    sequence:
      - service: wink.set_chime_strobe_enabled
        data:
          enabled: False
```
