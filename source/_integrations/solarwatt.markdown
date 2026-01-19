---
title: Solarwatt
description: Instructions on how to connect your Solarwatt Battery flex to Home Assistant.
ha_category:
  - Energy
  - Solar
  - Storage
ha_iot_class: Local Polling
ha_quality_scale: bronze
ha_config_flow: true
ha_release: 0.36
ha_codeowners:
  - '@christiangeie'
ha_domain: solarwatt
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: device
---

The [Solarwatt](http://www.solarwatt.com/) Battery flex integration allows Home Assistant to read live data from Battery flex storage devices and present the values as sensors.

This integration supports:

- State of Charge (SOC)
- State of Health (SOH)
- Battery current & voltage
- Accumulated charge/discharge
- AC/DC values
- Grid import/export
- Temperatures
- Firmware information


{% include integrations/config_flow.md %}

### Installation details


1. Navigate to **Settings → Devices & Services**
2. Click **Add Integration**
3. Select **Solarwatt**
4. Enter:
   - **Host**: the hostname or IP address
   - **Port**: (default: `8080`)

The device does not require authentication.

{% configuration %}
host:
  description: The hostname or IP address.
  required: true
  type: string
port:
  description: The Port Number.
  required: false
  type: integer
  default: 8080
{% endconfiguration %}

## Sensors

The integration provides multiple sensors grouped by BatteryFlex serial number.

Example:

- `SN: 0004A20B000BF3A3 Battery State of Charge`
- `SN: 0004A20B000BF3A3 Grid Power`
- `SN: 0004A20B000BF3A3 Ambient Temperature`

All currently available sensors can be found below.

| name | Unit | Description |
| --- | --- | --- |
|Battery State of Charge|%|Current battery charge level (SOC)|
|Battery State of Health|%|Health status of the battery (SOH)|
|Battery Voltage|V|Battery voltage|
|Battery Current|A|Battery current (positive = charging, negative = discharging)|
|Cumulated Current Out|Ah|Total discharged amp-hours|
|Cumulated Current In|Ah|Total charged amp-hours|
|Battery Energy Out|Wh|Total discharged energy|
|Battery Energy In|Wh|Total charged energy|
|Home Power|W|Household power consumption|
|Grid Power|W|Power imported/exported from the grid|
|Grid Frequency|Hz|Mains AC frequency|
|Ambient Temperature|°C|Internal ambient temperature|
|AC Voltage|V|AC output/input voltage|
|AC Current|A|AC output/input current|
|AC Frequency|Hz|AC frequency|
|DC Voltage|V|DC bus voltage|
|DC Power Charge|W|DC charging power into the battery|
|DC Power Discharge|W|DC discharging power from the battery|
|System Voltage|mV|System internal low-voltage bus (19V)|
|Cell Voltage|mV|Backup/auxiliary 2.5V–3V system cell voltage|
|Cell Temperature|°C|Cell / module temperature (if exposed)|
|Firmware Version| - |Reported firmware version|
|Hardware Version| - |Reported hardware version|
|ACS Version| - |AC Sensor firmware version|
|Device IP Address| - |Reported IP address of the device|



- Ensure the device responds at `http://<host>:8080/all`
- Check that the device is on the same LAN
- Disable DNS caching or try accessing by IP address

## Known limitations

- Only local polling mode supported
- No control endpoints (read-only)
- Device must expose `/all` endpoint
