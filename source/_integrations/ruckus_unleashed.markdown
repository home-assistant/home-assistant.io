---
title: Ruckus Unleashed
description: Instructions on how to integrate your Ruckus Unleashed device into Home Assistant.
ha_category:
  - Presence Detection
ha_release: 0.117
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@lanrat'
  - '@ms264556'
  - '@gabe565'
ha_domain: ruckus_unleashed
ha_platforms:
  - device_tracker
ha_integration_type: hub
---

This platform allows you to connect to [Ruckus Unleashed](https://support.ruckuswireless.com/product_families/19-ruckus-unleashed) access points.  

There is currently support for the following device types within Home Assistant:

- **Presence Detection** - The platform will look at devices connected to the access point and will create a `device_tracker` for each discovered device.

## Configuration

To add a Ruckus Unleashed device to your installation, go to **Settings** -> **Devices & Services**, click the `+` button, then select **Ruckus** from the list of integrations.

It is preferable to configure the IP address of your **master access point**. See the Access Points section of the Unleashed management web interface. And perhaps consider setting a preferred master (Admin & Services > System > System Info > Preferred master).

You may authenticate with the **Default** Ruckus Unleashed admin user or, if you prefer, a user which is a **Monitoring Admin**.  
To create a **Monitoring Admin** user, login to the Ruckus Unleashed admin UI and follow these steps:

 - [Create a new role](https://docs.ruckuswireless.com/unleashed/200.1.9.12/t-ConfigUserRoles.html).
   - Check **Allow Unleashed Administration**.
   - Select the **Monitoring Admin (Monitoring and viewing operation status only)** radio button. 
 - [Create a new user](https://docs.ruckuswireless.com/unleashed/200.1.9.12/t-AddingNewUsersInternal.html) with the new role.

## Troubleshooting

For this platform to work, the Ruckus Unleashed master access point will need to be accessible from Home Assistant over HTTPS. If you are having trouble with Home Assistant not connecting, make sure the user you created above can log in to the Unleashed management web interface.
