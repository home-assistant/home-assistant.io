---
description: Instructions on adding a Control4 system to Home Assistant.
ha_release: '0.114'
ha_domain: control4
---

The **Control4** {% term integration %} allows you to control and monitor lights, Room Media, cover, and climate devices from your local Control4 system. Your Control4 controller must be running OS 3.0+.

## Prerequisites

Before setting up, you should assign a static IP address/DHCP reservation on your router to your Control4 controller. Home Assistant must be able to communicate with the controller over the local network; 4Sight remote access is not supported.

The username and password required for this integration are the same credentials you use to log in to the Control4 mobile app and the customer portal at [https://customer.control4.com/](https://customer.control4.com/).

{% include integrations/config_flow.md %}
