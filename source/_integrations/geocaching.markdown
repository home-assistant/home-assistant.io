---
title: Geocaching
description: Instructions on how to integrate Geocaching accounts within Home Assistant.
ha_category:
  - Sensor
ha_release: 2022.6
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Sholofly'
  - '@reinder83'
ha_domain: geocaching
ha_platforms:
  - sensor
ha_integration_type: service
---

Geocaching is a real-world, outdoor adventure that is happening all the time, all around the world. To play, participants use the Geocaching app and/or a GPS device to navigate to cleverly hidden containers called geocaches.

The Geocaching integration in Home Assistant pulls data from your [Geocaching.com](https://www.geocaching.com/) account.

{% include integrations/config_flow.md %}

## Sensors

The following sensors are available for each account:

- Total finds
- Total hides
- Favorite points
- Total souvenirs
- Awarded favorite points

## Tracking trackables

To track specific trackables:

1. Go to **Settings** > **Devices & services**.
2. Select the **Geocaching** integration.
3. Select **Configure**.
4. Enter the TB codes of the trackables you want to track. Separate multiple codes with commas or new lines.
5. Select **Submit**.

You can track up to 50 trackables. Each trackable is added as a separate device with a **Distance traveled** sensor. The distance is reported in kilometers.

## Tracking caches

Tracked caches are added separately to the Geocaching integration. To add a tracked cache:

1. Go to **Settings** > **Devices & services**.
2. On the **Geocaching** integration entry, select {% icon "mdi:dots-vertical" %}.
3. Select **Add tracked cache**.
4. Under **Geocache code**, enter one GC code, for example `GC12345`.
5. Select **Submit**.

Repeat these steps for each cache you want to track. You can track up to 50 caches.

Each tracked cache is added as a separate device with the following sensors:

- Found date
- Favorite points
- Hidden date

![Authorized Geocaching developer](/images/integrations/geocaching/geocaching_authorized_developer.png) Powered by Geocaching HQ
