---
layout: page
title: "Freebox"
description: "Instructions how to integrate Freebox routers into Home Assistant."
date: 2017-10-27 23:00
sidebar: true
comments: false
sharing: true
footer: true
logo: http://www.free.fr/freebox/im/logo_free.png
ha_category: Presence Detection
ha_release: "?"
ha_iot_class: "Local Polling"
---


The `freebox` platform offers presence detection by looking at connected devices to a [Freebox](https://fr.wikipedia.org/wiki/Freebox) router from [Free](https://www.free.fr/), which is one of the main Internet provider in France. Freebox is a generic name for different hardware routers. The platform has only been tested on a Freebox mini because it's the only model the developer owns. 

Steps to get a valid configuration :
1) Choose an `app_id` (or use `fr.freebox.testapp`)
2) [Request authorization](https://dev.freebox.fr/sdk/os/login/#request-authorization) with a POST request* to the freebox and get the `app_token` and `track_id`
3) [Track authorization progress](https://dev.freebox.fr/sdk/os/login/#track-authorization-progress) with a GET request* to the freebox
4) Choose a domain name (used as `host`) from the freebox settings (a SSL certificate from let's encrypt will be generated)

*You can use [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop) to easily make GET and POST requests to obtain valid credentials.

To use a Freebox router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: freebox
    host: https://something.freeboxos.fr
    username: fr.freebox.testapp
    password: bi9dpCD4v75mtX7HTGFxPeATc0kYWe0+aHfdBDx3wiEYEtULZ3kRKwdjvJHYDFGAT
```

Configuration variables:

- **host** (*Required*): The external address of your router with a valid SSL certificate.
- **username** (*Required*): The `app_id` to login into the router.
- **password** (*Required*): The `app_token` for the specified `app_id`.

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
