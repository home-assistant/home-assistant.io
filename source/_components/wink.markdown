---
layout: page
title: "Wink"
description: "Instructions how to setup the Wink hub within Home Assistant."
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

Home Assistant integrates with the Wink API and allows you to get the status and control connected switches, lights, locks, fan, climate devices, covers, and sensors.

Check the related componets pages for actual devices that are support.

Home Assistant offers multiple ways to authenticate to the Wink API. Each authentication method is described below.

### Authenticate using [developer.wink.com](https://developer.wink.com)


This method will require you to setup a developer account with Wink. This process can take a few days to get approved, but is the recommanded form of authentication. If you would like to use Wink in Home Assistant while you wait, you can use the email and password authentication below.

This form of authentication doesn't require any settings in the configuration.yaml other than `wink:` this is because you will be guided through setup via the configurator on the frontend.

<p class='note'>
When using the configurator make sure the initial setup is performed on the same local network as the Home Assistant server, if not from the same box Home Assistant is running on. This will allow for authentication redirects to happen correctly. 
</p>

```yaml
wink:
```


### Authentication with your Wink email and password.


This method pulls a new token on every startup of Home Assistant from this [URL](https://winkbearertoken.appspot.com)

```yaml
wink:
  email: YOUR_WINK_EMAIL_ADDRESS
  password: YOUR_WINK_PASSWORD
```

### Full oauth authentication (legacy).

This should be used for users that obtained their client_id and client_secret via email from Wink support.


```yaml
wink:
  email: YOUR_WINK_EMAIL_ADDRESS
  password: YOUR_WINK_PASSWORD
  client_id: YOUR_WINK_CLIENT_ID
  client_secret: YOUR_WINK_CLIENT_SECRET
```

Configuration variables:

- **email** (*Required if access token isn't provided*): Your Wink login email.
- **password** (*Required if access token isn't provided*): Your Wink login password.
- **client_id** (*Required if access token isn't provided*): Your provided Wink client_id.
- **client_secret** (*Required if access token isn't provided*): Your provided Wink client_secret.

This will connect to the Wink API and automatically set up any switches, lights, locks, fans, climate devices, covers, sensors, and alarms.

### {% linkable_title Service `refresh_state_from_wink` %}

The Wink component only obtains the device states from the Wink API once, during startup. All updates after that are pushed via a third party called PubNub. On rare occasions were an update isn't pushed device states can be out of sync. 

You can use the service wink/refresh_state_from_wink to pull the most recent state from the Wink API for all devices.

### {% linkable_title Service `add_new_devices` %}

You can use the service wink/add_new_devices to pull any newly paired Wink devices to an already running instance of Home-Assistant. Any new devices will also be added if Home-Assistant is restarted.

<p class='note'>
The Wink hub can only be accessed via the cloud. This means it requires an active internet connection and you will experience delays when controlling and updating devices (~3s).
</p>
