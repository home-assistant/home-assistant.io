---
title: Pterodactyl
description: Instructions on how to integrate a Pterodactyl server into Home Assistant.
ha_release: 2025.4
ha_category:
  - Binary sensor
  - Button
  - Sensor
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@elmurato'
ha_domain: pterodactyl
ha_platforms:
  - binary_sensor
  - button
  - sensor
ha_integration_type: integration
ha_quality_scale: bronze
---

[Pterodactyl](https://www.pterodactyl.io) is a game server management panel designed to simplify the administration of game servers. It offers a user-friendly interface  which allows users to manage multiple game servers from a single dashboard, supporting popular games like Minecraft. Its key features include an intuitive web-based control panel, automated server installation, real-time server monitoring, scheduled backups and more. Each game server runs in an isolated Docker container, ensuring security and stability.

The Pterodactyl {% term integration %} allows you to monitor your game servers of your Pterodactyl server within Home Assistant.

## Prerequisites

To access your Pterodactyl server, an account API key is required. Follow these steps to create a new one:

- Access your **Pterodactyl Panel** and log in with your user account.
- From the main dashboard, click your **username** or **profile icon** in the top-right corner, then select **API Credentials**.
- Enter a **Description** to identify the key (for example, "Home Assistant").
- Optionally, specify **Allowed IPs** to restrict where the key can be used (leave blank to allow all IPs).
- Click **Create**. The panel will generate and display your new account API key.
- Copy the **account API key** immediately and store it securely. You won’t be able to view it again after leaving the page.

{% important %}
Pterodactyl has two different types of API keys: Account and Application. Application API keys are not supported, an account API key as described above is required instead.
{% endimportant %}

{% include integrations/config_flow.md %}

During setup, you will be prompted to enter the **URL** and the **account API key** of the server.

{% configuration_basic %}
URL:
    description: "The URL of your Pterodactyl server, including the protocol (`http://` or `https://`) and optionally the port number. Example: `http://192.168.0.123:8080`"
Account API key:
    description: "The account API key for accessing your Pterodactyl server (see prerequisites)."
{% endconfiguration_basic %}

## Binary sensors

This integration provides a binary sensor with the following information for each game server of your Pterodactyl server:

- Status: `Running` or `Not running`

## Buttons

This integration provides the following {% term buttons %} for each game server of your Pterodactyl server:

- Start server
- Stop server
- Restart server

The following button is provided as well, but disabled by default:

- Force stop server

{% warning %}
Using **force stop** will terminate the server immediately and may lead to game server file corruption.
{% endwarning %}

## Sensors

This integration provides the following {% term sensors %} for each game server of your Pterodactyl server:

- CPU utilization
- Memory usage
- Disk usage
- Uptime

The following sensors are provided as well, but disabled by default:

- CPU limit
- Memory limit
- Disk limit
- Network inbound
- Network outbound

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
