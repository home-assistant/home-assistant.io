---
title: Imeon Inverter
description: Instructions on Imeon Energy Integration for Imeon inverters with Home Assistant.
ha_release: 2024.12
ha_category:
  - Energy
  - Sensor
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
- '@Imeon-Energy'
ha_domain: imeon_inverter
related:
- url: https://imeon-energy.com/
title: Imeon Energy website
ha_integration_type: integration
---

The Imeon Energy Inverter integration will poll a [Imeon](https://imeon-energy.com/) solar inverter in Home Assistant.

**Please take a look at [extra resources](https://github.com/Imeon-Inverters-for-Home-Assistant/imeon-integration-extras) for custom dashboards for this integration**.

## Requirements

- The Imeon must be connected to the local network.
- [OS One](https://imeon-energy.com/os-one/) version must be **1.8.4** or higher.
- *ModuleAPI* application must be activated on the OS One pannel of your Imeon.

## Configuring the integration

The Imeon Inverter integration supports configuration via the Home Assistant UI. To set it up:

1. **Access Integrations:**
   - Go to the Home Assistant UI, navigate to `Configuration` > `Integrations`.

2. **Add Integration:**
   - Click the "+" button to add a new integration and search for "Imeon Inverter".

3. **Follow Setup Wizard:**
   - Follow the on-screen instructions to complete the integration setup.

## Imeon Integration Extras

Custom dashboard templates for the custom [Imeon Integration](https://github.com/Imeon-Inverters-for-Home-Assistant/imeon-integration). Uses [APEXCharts-card](https://github.com/RomRider/apexcharts-card/blob/master/README.md#data_generator-option) for graphs and custom gauges.

1. **Access Lovelace Dashboard:** Click on the "Overview" tab on the sidebar to access Lovelace, Home Assistant's dashboard interface.

2. **Edit the Dashboard:** Click on the three-dot menu in the top right corner and select "Edit Dashboard."

3. **Manage Dashboards:** Click on the three-dot menu again and select "Manage Dashboards."

4. **Create a New Dashboard:** Click on "Add Dashboard" to create a new one.

5. **Enable YAML Mode:** When creating the new dashboard, toggle the "YAML Mode" option to enable it.

6. **Paste the template**: Copy and paste the contents of the `dashboard.yaml` file from the [imeon-integration-extras repository](https://github.com/Imeon-Inverters-for-Home-Assistant/imeon-integration-extras/tree/master/dashboard) into the editor.

7. **Replace the keys:** Search and replace `#INVERTER#` with the domain name of your inverter, for example `imeon_84`.

### Troubleshooting

- **What is my domain name?** The domain name is the internal name given to your inverter by Home Assistant. It's based on the initial name you gave to your device, albeit formatted to avoid internal issues. 
   - A name such as `Imeon Inverter number 57` would give you a domain name of `imeon_inverter_number_57`.
   - If you're still struggling to find the domain name, check the internal name of the entities under the device. The name of each variable is `DOMAIN_variable-name`, for example `neo_110_inverter_software_version` tells us the domain name is `neo_110`.

- **How to install APEXCharts-card ?** [APEXCharts-card's README](https://github.com/RomRider/apexcharts-card/blob/master/README.md#data_generator-option) explains everything needed to install this custom ressource on your installation.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.
