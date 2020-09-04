---
title: Vilfo Router
description: Instructions on how to integrate a Vilfo Router into Home Assistant.
ha_release: '0.106'
ha_category:
  - Network
  - System Monitor
  - Sensor
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@ManneW'
ha_domain: vilfo
---

The `Vilfo Router` integration allows you to observe the state of your [Vilfo Router](https://www.vilfo.com) from Home Assistant.

It currently supports reporting the current load of the device in percent and the current uptime measured in minutes.

## Configuration

The integration can be added using the UI. Go to **Configuration** >> **Integrations** and click the `+` sign button and select **Vilfo Router** from the list.

To configure the integration you will need the hostname or IP of your router (`admin.vilfo.com` is the default hostname) as well as an API access token.

### Obtaining an access token

The access token for the API can be obtained through the Vilfo web-UI in the pane named "general". Visit [the official API documentation](https://www.vilfo.com/apidocs/#header-authorization) for more information on how to find your token.

<div class="note warning">

In version 1.0.13 of the Vilfo firmware, access tokens are invalidated when a new login to the web UI is made. To prevent web UI logins from interfering with the API calls, you can create a separate user solely for API purposes and use its access token.

</div>
