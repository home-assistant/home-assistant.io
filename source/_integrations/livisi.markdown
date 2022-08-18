---
title: LIVISI SmartHome
description: Access and control your LIVISI Smart Home Controller (SHC) and its connected RWE/innogy devices.
ha_category:
  - Switch
ha_iot_class: Local Push
featured: true
ha_release: 2022.8.5
ha_config_flow: true
ha_codeowners:
  - '@StefanIacobLivisi'
ha_domain: livisi
ha_platforms:
  - switch
ha_integration_type: integration

---
The `livisi` integration allows you to connect your LIVISI Smart Home Controller (SHC) to Home Assistant. The SHC can control compatible devices from RWE/innogy connected to it.
 
The following devices  are currently supported by this integration:
 
- RWE/innogy Smart Plug (PSS)
 
##Preparing LIVISI SmartHome for Home Assistant
 
This integration is communicating with the local version of LIVISI SmartHome only. 
 
To activate the local SmartHome functionality, please use the LIVISI App and go to **Settings** >> **General Settings** >> **Local SmartHome** and click **Activate**.
 
Please visit [LIVISI Community](https://community.livisi.de) for more information.
 
{% include integrations/config_flow.md %}
 
### Extra Configuration
 
The current integration will not find you SHC automatically and needs to be configured manually. You will need to provide the IP address and the local password for the controller.
<div class="note">
This integration is communicating with the local version of LIVISI SmartHome only.
</div>
 
## Device Discovery
All devices are automatically discovered and included by the integration. If you include a new device in LIVISI SmartHome, it will automatically appear in Home Assistant after a few minutes.

### Device Names
The device name used for the included device is the one used in LIVISI SmartHome. The names can be changed later through the Home Assistant interface via **Settings** >> **DEVICE NAME** .

### Rooms
The rooms of the devices are taken from LIVISI SmartHome. If a room does not exist in Home Assistant, the room will be automatically created.