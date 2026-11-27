---
description: Instructions on how to integrate Airthings into Home Assistant.
ha_release: '2021.10'
ha_domain: airthings
---

Integrates Airthings sensors into Home Assistant.

[Airthings](https://www.airthings.com/) provide different sensors for measuring the air quality. The focus specially on Radon sensors.

While this integration works without an Airthings SmartLink hub, using one will provide live updates to your sensor data. Without a hub, you'll need to rely on the Airthings mobile app to sync data over Bluetooth and upload it to the cloud.

Requires Airthings hardware and an Airthings account.

## Prerequisites

Airthings API setup (needed to acquire the required ID and Secret for the Home Assistant Airthings Integration).

1. Sign in to the [Airthings Consumer API portal](https://consumer-api-doc.airthings.com/dashboard) with your Airthings account.
2. Select **My Applications**.
3. Select **Create New Application**.
4. Enter a name (for example, "Home Assistant") and a description.
5. Store the client ID and secret in a safe place.

The Airthings integration can now be activated using the ID and secret that you have just created.

{% include integrations/config_flow.md %}

## Troubleshooting


### The radon sensor does not show up
 
Initially, the radon sensor may not be published by the Airthings API (at device startup, the value is considered "unknown"), and so you may have to wait for the radon sensor to appear for a new device.
