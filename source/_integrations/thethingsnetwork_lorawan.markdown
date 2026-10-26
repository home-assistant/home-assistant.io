---
description: Connect The Things Network and The Things Stack applications to Home Assistant.
ha_release: 2026.11
ha_domain: thethingsnetwork_lorawan
---

The **The Things Network** {% term integration %} connects [The Things Network](https://www.thethingsnetwork.org/) or your own The Things Stack server to [LoRaWAN](/integrations/lorawan/). Separate device integrations turn readings from your LoRaWAN sensors into entities you can use in dashboards and automations.

For sensors based on stored, decoded payload fields, use [The Things Network (Cloud Storage)](/integrations/thethingsnetwork/).

## Prerequisites

- An application with registered devices in The Things Network or The Things Stack.
- A gateway within range that forwards your devices' traffic to that network.
- An API key with access to the application.

To create an application API key:

1. Open your application in [The Things Network Console](https://console.thethingsnetwork.org/), or your server's console.
2. Select **API keys** > **Add API key**.
3. Enter a name, such as `Home Assistant`, and grant these individual rights:
   - **View devices in application**.
   - **Read application traffic (uplink and downlink)**.
   - **Write downlink application traffic**, if you want to send commands through a compatible device integration.
4. Create the key and copy it. The console only shows it once.

See [The Things Stack API-key instructions](https://www.thethingsindustries.com/docs/integrations/adding-applications/#create-application-api-key) for more details. An application API key gives access to that application only.

Register devices using their device catalog entries so Home Assistant can identify their brand and model. Entity support depends on the corresponding LoRaWAN device integration. A payload formatter and the Storage Integration are not required.

{% include integrations/config_flow.md %}

Select your region, enter the API key, and choose the applications to connect. Home Assistant checks the key before showing the application list.

{% configuration_basic %}
Region:
  description: "Select the region in your console URL: **Europe (EU1)**, **North America (NAM1)**, or **Australia (AU1)**. The default is **Europe (EU1)**. Select **Custom server** for another The Things Stack deployment."
API key:
  description: "The key created above. It needs device-read and traffic-read permissions for every selected application."
Application Server:
  description: "Shown for **Custom server**. Enter the API server address, including the scheme and port, such as `https://thethings.example.com:8884`. The standard region choices fill in the server addresses automatically."
Identity Server:
  description: "Shown for **Custom server**. Enter its API server address if it differs from the Application Server. Leave it empty to use the same address."
Applications:
  description: "Select one or more applications available to the API key. Only devices in these applications are exposed to Home Assistant."
{% endconfiguration_basic %}

## Supported functionality

This integration does not create entities itself. It provides the connection to your applications. When a supported device appears, Home Assistant shows the matching LoRaWAN device integration in the **Discovered** section on {% my integrations title="**Settings** > **Devices & services**" %}. That device integration creates the entities.

## Data updates

Device readings arrive through live event streams. Changes to the device list are detected through server events and a check every 30 seconds. Home Assistant reconnects if the connection is interrupted.

## Known limitations

- Historical readings are not fetched from storage. After a restart or reconnection, wait for the device's next transmission.
- Each application can belong to only one connection for the same Identity Server.
- Applications must provide decrypted payloads. Applications configured to skip payload decryption are not supported.

## Troubleshooting

{% details "Cannot connect to The Things Stack" %}

### Symptom: Cannot connect to The Things Stack

#### Description

The API server address and port may differ from the web console address.

#### Resolution

Check that the selected region matches your application and that Home Assistant can reach the server. The Things Network uses port `8884`. For a custom deployment, check the API server address and port with your server administrator.

{% enddetails %}

{% details "API key rejected or no applications available" %}

### Symptom: API key rejected or no applications available

#### Description

API keys are limited by their permissions and scope. An application key only exposes its own application.

#### Resolution

Check that the key has not expired or been revoked and has the permissions listed under [Prerequisites](#prerequisites). If Home Assistant asks you to reauthenticate, enter a replacement key with access to the same applications.

{% enddetails %}

{% details "A device has no entities or readings" %}

### Symptom: A device has no entities or readings

#### Description

Entities require a compatible device integration and new uplinks. Stored readings are not replayed.

#### Resolution

Check that the device belongs to a selected application, has a DevEUI, and uses the correct catalog brand and model. Add the compatible LoRaWAN device integration when discovered.

Check the device's live data in the server console. If no uplinks appear there, check the device's network settings and gateway coverage. If uplinks appear, wait for a new transmission while Home Assistant is connected.

{% enddetails %}

## Removing the integration

{% include integrations/remove_device_service.md %}

Removing the connection stops updates from its applications. Your applications, gateways, and devices remain registered on the server. You can delete the API key in the server console if it is no longer used.
