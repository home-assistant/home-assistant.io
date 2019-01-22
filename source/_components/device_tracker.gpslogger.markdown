---
layout: page
title: "GPSLogger"
description: "Instructions on how to use GPSLogger to track devices in Home Assistant."
date: 2016-11-25 15:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Presence Detection
ha_release: 0.34
---

The `gpslogger` device tracker platform allows you to detect presence using [GPSLogger](http://code.mendhak.com/gpslogger/). GPSLogger is an open source app for [Android](https://play.google.com/store/apps/details?id=com.mendhak.gpslogger) that allows users to set up a `GET` request to update GPS coordinates. This can be configured with Home Assistant to update your location.

## {% linkable_title Configuration %}

GPSLogger uses long-lived access tokens for authentication. These are setup [under your profile](/docs/authentication/#your-account-profile) and configured in the GPSLogger application on your smartphone as explained below.

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: gpslogger
```

## {% linkable_title Setup on your smartphone %}

Install [GPSLogger for Android](https://play.google.com/store/apps/details?id=com.mendhak.gpslogger) on your device.

After the launch, go to **General Options**. Enable **Start on bootup** and **Start on app launch**.

<p class='img'>
  <img width='300' src='/images/components/gpslogger/settings.png' />
  GPSLogger Settings
</p>

Go to **Logging details** and disable **Log to GPX**, **Log to KML** and **Log to NMEA**. Enable **Log to custom URL**.

<p class='img'>
  <img width='300' src='/images/components/gpslogger/logging-details.png' />
  Logging Details
</p>

Right after enabling, the app will take you to the **Log to custom URL** settings.

<p class='img'>
  <img width='300' src='/images/components/gpslogger/custom-url.png' />
  Log to custom URL details
</p>

The relevant endpoint is: `/api/gpslogger`

```text
https://YOUR.DNS.HOSTNAME:PORT/api/gpslogger?latitude=%LAT&longitude=%LON&device=%SER&accuracy=%ACC&battery=%BATT&speed=%SPD&direction=%DIR&altitude=%ALT&provider=%PROV&activity=%ACT
```

Add the above URL after you modified it with your settings into the **URL** field. Remove the line breaks as they are only there to make the URL readable here.

- It's HIGHLY recommended to use SSL/TLS.
- Use the domain that Home Assistant is available on the internet (or the public IP address if you have a static IP address). This can be a local IP address if you are using an always on VPN from your mobile device to your home network.
- Only remove `PORT` if your Home Assistant instance is using port 443. Otherwise set it to the port you're using.
- For Home Assistant only the above URL, as written, will work - do not add, remove, or change the order of any of the parameters.
- Add `Authorization: Bearer LLAT` to the HTTP Headers setting (replace `LLAT` with your Long Lived Access Token).
- You can change the name of your device name by replacing `&device=%SER` with `&device=DEVICE_NAME`.

If your battery drains too fast then you can tune the performance of GPSLogger under **Performance** -> **Location providers**

<p class='img'>
  <img width='300' src='/images/components/gpslogger/performance.png' />
  Performance
</p>

A request can be forced from the app to test if everything is working fine. A successful request will update the `known_devices.yaml` file with the device's serial number.
