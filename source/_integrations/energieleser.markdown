---
title: energieleser
description: Instructions on how to integrate energieleser devices in Home Assistant.
ha_release: 2026.7
ha_category:
  - Energy
  - Sensor
ha_codeowners:
  - '@AjinkyaGokhale'
  - '@amitkio'
ha_quality_scale: silver
ha_domain: energieleser
ha_integration_type: device
ha_iot_class: Local Polling
ha_config_flow: true
ha_zeroconf: true
ha_platforms:
  - sensor
related:
  - docs: /docs/configuration/troubleshooting/#debug-logs-and-diagnostics
    title: Debug logs and diagnostics
---

The energieleser {% term integration %} fetches real-time consumption data reported by energieleser devices, such as stromleser.one, gasleser, wasserleser, and wärmeleser, using local HTTP API.

[energieleser](https://energieleser.de/) is a brand by nineti GmbH, a German company offering smart readers for utility meters.

## Supported devices

The integration supports the following energieleser devices:

- **stromleser.one** (electricity meter reader)
- **gasleser** (gas meter reader)
- **wasserleser** (water meter reader)
- **wärmeleser** (heat meter reader)

## Prerequisites

Ensure your energieleser device is connected to the same local network as your Home Assistant instance and its IP address is accessible.

For detailed hardware setup instructions, refer to the [energieleser documentation](https://docs.energieleser.de/).

{% include integrations/config_flow.md %}

## Configuration parameters

{% configuration_basic %}
IP address:
  description: "The IP address of your energieleser device. For example, `192.168.178.100`."
{% endconfiguration_basic %}

## Supported functionality

The energieleser integration primarily provides the following features based on the connected device type.

### stromleser.one

- **Imported energy**: Cumulative energy consumed (kWh)
- **Exported energy**: Cumulative energy exported to the grid (kWh)
- **Active power**: Current active power (W)
- **Phase power**: Current active power for Phase 1, Phase 2, and Phase 3 (W)

### gasleser

- **Total gas**: Total gas volume measured by the meter (m³)
- **Gas flow rate**: Current gas flow rate (m³/h)

### wasserleser

- **Total water**: Total water volume measured by the meter (m³)
- **Water flow rate**: Current water flow rate in liters per hour (L/h)
- **Volume flow rate**: Current water flow rate in cubic meters per hour (m³/h)

### wärmeleser

- **Energy tariffs**: Cumulative heat energy for tariff 1, tariff 2, and tariff 3 (MWh)
- **Power**: Current thermal power (kW)
- **Total volume**: Total volume of heating medium measured by the meter (m³)
- **Volume flow**: Current flow rate of heating medium (L/h)
- **Temperatures**: Flow temperature and return temperature (°C)
- **Temperature difference**: Difference between flow and return temperature (K)

### Common sensors

- **Signal strength**: Wi-Fi signal strength of the device (dBm)

## Data updates

The integration {% term polling polls %} data from the device every 10 seconds over your local network.

## Use cases

You can use the energieleser integration for a variety of smart home scenarios, such as:

- Monitoring your energy consumption: Add the sensors to the Home Assistant Energy dashboard to track your daily, monthly, and yearly consumption of electricity, gas, water, or heat.
- Automation based on usage: Trigger automations when electricity consumption goes above or below certain thresholds (for example, turn on appliances when excess solar power is being exported).
- Detection of leaks and anomalies: Create alerts for continuous water flow or unusual gas usage patterns to detect potential leaks.

## Automation examples

Below is an example automation to notify you when high power consumption is detected.

### Automation: Alert on high power consumption

```yaml
automation:
  - alias: "High power consumption alert"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.stromleser_one_active_power
        above: 5000
        for:
          minutes: 5
    actions:
      - action: notify.notify
        data:
          title: "High Power Usage"
          message: "Your active power consumption has been above 5kW for 5 minutes."
```

## Known limitations

Rate limits: The energieleser devices can be overwhelmed by excessive HTTP requests. If you configure multiple apps or integrations to poll the same device simultaneously, the device may reach a rate limit or become temporarily unresponsive.

## Troubleshooting

### Cannot connect during setup

If you see a "Failed to connect" error during setup, verify that:

- The energieleser device is powered on and connected to your network.
- The IP address you entered is correct.
- Home Assistant can reach the device on the local network.

Most energieleser devices are discovered automatically via zeroconf, so manual setup is rarely needed. If the device is not discovered, check that zeroconf/mDNS traffic is not blocked on your network.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
