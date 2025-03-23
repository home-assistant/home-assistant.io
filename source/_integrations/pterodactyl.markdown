---
title: Pterodactyl
description: Instructions on how to integrate a Pterodactyl server into Home Assistant.
ha_release: 2025.04
ha_category:
  - Binary sensor
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@elmurato'
ha_domain: pterodactyl
ha_platforms:
  - binary_sensor
ha_integration_type: integration
ha_quality_scale: bronze
---

[Pterodactyl](https://www.pterodactyl.io) is a game server management panel designed to simplify the administration of game servers. It offers a user-friendly interface  which allows users to manage multiple game servers from a single dashboard, supporting popular games like Minecraft. Its key features include an intuitive web-based control panel, automated server installation, real-time server monitoring, scheduled backups and more. Each game server runs in an isolated Docker container, ensuring security and stability.

{% include integrations/config_flow.md %}

During setup, you will be prompted to enter the **host** and the **client API key** of the server.

{% configuration_basic %}
Host:
    description: "The IP address or hostname of your Pterodactyl server, starting with either `http://` or `https://`, optionally including the port at the end. Example: `http://192.168.0.123:8080`"
Client API key:
    description: "The local access token for your Pterodactyl server. Follow the steps below to create one."
{% endconfiguration_basic %}

### Creating a client API key

To create a new client API key, follow these steps:

- Access your Pterodactyl Panel and log in with your user account.
- From the main dashboard, click your username or profile icon in the top-right corner, then select **API Credentials** from the dropdown menu.
- Enter a **Description** to identify the key (for example "Home Assistant").
- Optionally, specify **Allowed IPs** to restrict where the key can be used (leave blank to allow all IPs).
- Click **Create**. The panel will generate and display your new client API key.
- Copy the key immediately and store it securely. You won’t be able to view it again after leaving the page.

{% important %}
Pterodactyl has two different types of API keys: Client (also known as Account) and Application. Application API keys are not supported, a client API key as described above is required instead.
{% endimportant %}

## Binary sensors

This integration provides a binary sensor with the following information for each game server of your Pterodactyl server:

- Status: Running or stopped

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
