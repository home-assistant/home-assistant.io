---
title: GPSLogger
description: Instructions on how to use GPSLogger to track devices in Home Assistant.
ha_category:
  - Presence detection
ha_release: 0.34
ha_iot_class: Cloud Push
ha_config_flow: true
ha_domain: gpslogger
ha_platforms:
  - device_tracker
ha_integration_type: integration
---

This integration sets up integration with [GPSLogger](https://gpslogger.app/). GPSLogger is an open source app for Android that allows users to update your location in Home Assistant.

## Configuration

To configure GPSLogger, you must set it up via the integrations panel in the configuration screen. This will give you the webhook URL to use during mobile device configuration (below).

## Setup on your smartphone

Install GPSLogger for Android from [GitHub](https://github.com/mendhak/gpslogger/releases) or [F-Droid](https://f-droid.org/packages/com.mendhak.gpslogger/) on your device.

After the launch, go to **General Options**. Enable **Start on bootup** and **Start on app launch**.

<p class='img'>
  <img width='300' src='/images/integrations/gpslogger/settings.png' />
  GPSLogger Settings
</p>

Go to **Logging details** and disable **Log to GPX**. Enable **Log to custom URL**.

<p class='img'>
  <img width='300' src='/images/integrations/gpslogger/logging-details.png' />
  Logging Details
</p>

Right after enabling, the app will take you to the **Log to custom URL** settings.

<p class='img'>
  <img width='300' src='/images/integrations/gpslogger/custom-url.png' />
  Log to custom URL details
</p>

The relevant endpoint starts with: `/api/webhook/` and ends with a unique sequence of characters. This is provided by the integrations panel in the configuration screen (configured above).

```text
https://YOUR.DNS.HOSTNAME:PORT/api/webhook/WEBHOOK_ID
```

- Add the above URL (updating YOUR.DNS.HOSTNAME:PORT to your details) into the **URL** field.
- It's HIGHLY recommended to use SSL/TLS.
- Use the domain that Home Assistant is available on the internet (or the public IP address if you have a static IP address). This can be a local IP address if you are using an always on VPN from your mobile device to your home network.
- Only remove `PORT` if your Home Assistant instance is using port 443. Otherwise set it to the port you're using.
- Add the following to **HTTP Body**
```text
latitude=%LAT&longitude=%LON&device=%SER&accuracy=%ACC&battery=%BATT&speed=%SPD&direction=%DIR&altitude=%ALT&provider=%PROV&activity=%ACT
```
- You can change the `device_id` of your phone by replacing `&device=%SER` with `&device=SOME_DEVICE_ID`, otherwise your phone's serial number will be used.
- Check that the **HTTP Headers** setting contains
```text
Content-Type: application/x-www-form-urlencoded
```
- Make sure that **HTTP Method** is changed to `POST`

If your battery drains too fast then you can tune the performance of GPSLogger under **Performance**.

<p class='img'>
  <img width='300' src='/images/integrations/gpslogger/performance.png' />
  Performance
</p>

A request can be forced from the app to test if everything is working fine.
