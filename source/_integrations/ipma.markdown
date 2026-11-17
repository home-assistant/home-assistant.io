---
description: Instructions on how to integrate Instituto Português do Mar e Atmosfera weather conditions into Home Assistant.
ha_release: 0.72
ha_domain: ipma
---

The **IPMA** {% term integration %} uses the [Instituto Português do Mar e Atmosfera](https://www.ipma.pt/) as a source for current and forecast meteorological data.

There is currently support for the following device types within Home Assistant:

- Sensor
  - Risk of Fire for your location
  - UV Index for your district
  - Weather Alert for your district
- Weather (current state and forecast)

{% include integrations/config_flow.md %}

The weather entity provides both *hourly* (72h) and *daily* (10 days) forecasts.

## Weather Alert sensor

The Weather Alert sensor shows the most severe IPMA weather warning currently in effect for the district of your location. Its state is one of `green`, `yellow`, `orange` or `red`, where `green` means there is no warning in effect. Warnings that IPMA has already issued but that have not started yet are not taken into account.

When a warning is in effect, the sensor has the following attributes:

| Attribute | Description |
| --------- | ----------- |
| `awarenessTypeName` | Type of warning, for example `Precipitação` or `Vento`. |
| `awarenessLevelID` | Level of the warning. |
| `text` | Description of the warning from IPMA. |
| `startTime` | Start of the warning, in UTC. |
| `endTime` | End of the warning, in UTC. |
| `idAreaAviso` | IPMA code of the district, for example `LRA` for Leiria. |
