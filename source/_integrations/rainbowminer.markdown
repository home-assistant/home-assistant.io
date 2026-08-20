---
title: RainbowMiner
description: Monitor and control RainbowMiner cryptocurrency mining software from Home Assistant.
ha_category:
  - Sensor
  - Switch
ha_release: 2026.9
ha_iot_class: Local Polling
ha_domain: rainbowminer
ha_config_flow: true
ha_platforms:
  - sensor
  - switch
ha_integration_type: device
---

The **RainbowMiner** {% term integration %} allows you to monitor and control [RainbowMiner](https://github.com/RainbowMiner/RainbowMiner), an open-source cryptocurrency mining application that automatically switches between algorithms, pools, and coins to maximize profitability.

RainbowMiner runs a local HTTP API server that this integration connects to. With this integration, you can keep track of your mining status, earnings, and power consumption in Home Assistant, and you can pause or resume mining without opening the RainbowMiner interface.

## Prerequisites

1. Make sure [RainbowMiner](https://github.com/RainbowMiner/RainbowMiner) is installed and running on a machine on your network.
2. Enable the RainbowMiner API server in the RainbowMiner configuration. By default, the API server listens on port 4000.
3. If API authentication is enabled in RainbowMiner, have your API username and password ready. You only need these when authentication is turned on.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
    description: "The hostname or IP address of the RainbowMiner server. For example, `192.168.1.50` or `rainbowminer.local`."
Port:
    description: "The port the RainbowMiner API server is listening on. Defaults to `4000`."
Username:
    description: "The API username. Only required when API authentication is enabled in RainbowMiner."
Password:
    description: "The API password. Only required when API authentication is enabled in RainbowMiner."
{% endconfiguration_basic %}

## Supported functionality

The RainbowMiner integration provides the following entities.

### Sensors

#### General sensors

The following sensors are always available:

- **Active miners**: The number of currently running miners.
- **Active pools**: A comma-separated list of pools used by the running miners.
- **Power**: The total power draw of all running miners, in watts.
- **Uptime**: How long RainbowMiner has been running, in seconds. Includes a formatted string attribute with a human-readable duration.
- **Version**: The installed RainbowMiner software version.

#### Earnings in mBTC

The following sensors show earnings in mBTC and are always available:

- **Total earnings (mBTC)**: The total amount earned since RainbowMiner started tracking.
- **Unpaid balance (mBTC)**: The current unpaid balance across all pools.
- **Estimated daily profit (mBTC)**: The estimated profit per day based on current mining performance.
- **Weekly earnings (mBTC)**: The total amount earned over the past week.
- **Daily earnings (mBTC)**: The total amount earned over the past day.
- **Hourly earnings (mBTC)**: The total amount earned over the past hour.

#### Earnings in local currency

The following sensors show earnings converted to your local currency. They are created whenever Home Assistant has a currency configured:

- **Total earnings**: The total amount earned, in your local currency.
- **Unpaid balance**: The current unpaid balance, in your local currency.
- **Estimated daily profit**: The estimated profit per day, in your local currency.
- **Weekly earnings**: The total amount earned over the past week, in your local currency.
- **Daily earnings**: The total amount earned over the past day, in your local currency.
- **Hourly earnings**: The total amount earned over the past hour, in your local currency.

If the RainbowMiner API does not have an exchange rate for your configured currency, these sensors temporarily report `unknown` until a rate becomes available.

### Switches

The integration provides the following switch:

- **Mining**: Turn on to resume mining, or turn off to pause mining. This controls whether RainbowMiner is actively mining.

## Data updates

The RainbowMiner integration {% term polling polls %} the RainbowMiner API server every 30 seconds for updates.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
