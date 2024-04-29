---
title: "HTTP to MQTT bridge"
description: "How to integrate IFTTT with HA using MQTT"
date: 2017-03-28 06:00:00 +0000
date_formatted: "March 28, 2017"
author: petkov
categories: How-To
og_image: /images/blog/2017-03-bridge/social.png
---

The idea of creating [HTTP to MQTT bridge](https://github.com/petkov/http_to_mqtt) appeared when I was trying to integrate Google Assistant with my Home Assistant after watching [BRUH Automation](https://youtu.be/087tQ7Ly7f4?t=265) video. Right now there is no MQTT service available in [IFTTT](https://ifttt.com/about). Existing integration solution uses [Maker Webhooks](https://ifttt.com/maker_webhooks) which requires that your Home Assistant instance is publicly accessible, which I think brings some security concerns or simply not always possible to set up.

The HTTP to MQTT bridge should fill that gap. The idea is to receive messages using HTTP requests and transfer them to your MQTT broker, which can be contacted by Home Assistant. The HTTP to MQTT bridge is written using Node.js with [Express](https://expressjs.com/) for the server part and [MQTT.js](https://www.npmjs.com/package/mqtt) for the client.

<!--more-->

The app could be hosted on any Node.js hosting. I prefer [Heroku: Cloud Application Platform](https://www.heroku.com/home) for its simplicity.

### Bringing pieces together

1. Configure the Home Assistant [MQTT trigger](/docs/automation/trigger/#mqtt-trigger).
1. Configure [CloudMQTT](https://www.cloudmqtt.com/). Check this [video tutorial](https://www.youtube.com/watch?v=VaWdvVVYU3A) for details.
1. [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/petkov/http_to_mqtt) HTTP to MQTT bridge app.
1. Add the [Configuration Variables](https://devcenter.heroku.com/articles/config-vars#setting-up-config-vars-for-a-deployed-application) to your Heroku app mentioned here.
  - AUTH_KEY: Can be any string, eg. `912ec803b2ce49e4a541068d495ab570`.
  - MQTT_HOST: The host of your MQTT broker, eg. mqtts://k99.cloudmqtt.com:21234.
  - MQTT_USER: MQTT username
  - MQTT_PASS: MQTT password
1. Create an IFTTT applet the same way as described in [BRUH Automation](https://youtu.be/087tQ7Ly7f4?t=265) video.
1. Configure [Maker Webhooks](https://ifttt.com/maker_webhooks) service with below parameters.
  - URL: `https://<app_name>.herokuapp.com/post/`
  - Method: `POST`
  - Content Type: `application/json`
  - Body: `{"topic":"<mqtt_topic>","message":"<mqtt_message>","key":"<AUTH_KEY>"}`

### Subscribe to latest version

Additionally you can make Heroku to update the HTTP to MQTT bridge app to the latest available version from the GitHub repository automatically. To do this follow the instruction on the [Heroku help page](https://devcenter.heroku.com/articles/github-integration#automatic-deploys).

### Improve response time

After 30 minutes of inactivity Heroku will put your app into sleep mode. This will result in ~10 seconds response time. To prevent Heroku from putting your app into sleep mode, ping it every 10 minutes. You can do that by sending regular HTTP GET request to http://your_app/keep_alive/. But be careful. Heroku free quota is 550 hours per month. Without sleeping your app will be allowed to run only 22 days a month. Additionally the `keep_alive` method will send a simple MQTT message to prevent the broker from sleeping as well. The topic and message can be configured using Heroku environment variables `KEEP_ALIVE_TOPIC` and `KEEP_ALIVE_MESSAGE` and both are set to "keep_alive" by default.

You can even configure Home Assistant to ping HTTP to MQTT bridge every 10 minutes during daytime. Below is an example of how to do that:

```yaml
rest_command:
  http_to_mqtt_keep_alive:
    url: https://<your_app_address>/keep_alive/
    method: get

automation:
  alias: "HTTP to MQTT keep alive"
  trigger:
    platform: time_pattern
    minutes: "/10"
  condition:
    condition: time
    after: "7:30:00"
    before: "23:59:59"
  action:
    service: rest_command.http_to_mqtt_keep_alive
```

### Thanks

Special thanks to Ben from [BRUH Automation](https://www.youtube.com/channel/UCLecVrux63S6aYiErxdiy4w/featured) for awesome tutorials which inspired me to do this project.
