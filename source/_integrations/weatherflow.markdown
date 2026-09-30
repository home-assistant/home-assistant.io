---
title: WeatherFlow
description: Instructions on how to integrate your WeatherFlow Tempest into Home Assistant over your local network.
ha_release: '2023.10'
ha_category:
  - Environment
  - Sensor
ha_platforms:
  - event
  - sensor
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@natekspencer'
  - '@jeeftor'
ha_domain: weatherflow
ha_integration_type: hub
---

The **WeatherFlow** {% term integration %} is a local-only {% term integration %} that reads weather data from all [WeatherFlow Tempest](https://tempest.earth/tempest-home-weather-system/)-compatible weather stations on the local network.

{% note %}
You may see slight deviations between the values reported in Home Assistant and the values in the WeatherFlow app. This is because the WeatherFlow app considers both forecasts and neighboring weather stations in addition to the local data used in this {% term integration %}.
{% endnote %}

## Which integration should I use?

There are two integrations for WeatherFlow devices, and you are not limited to selecting just one.

- [WeatherFlow](/integrations/weatherflow/) is a local-only, UDP-based integration that reads data directly from the device. This integration requires the Home Assistant server and the WeatherFlow device to be on the same subnet.

- [WeatherFlow Cloud](/integrations/weatherflow_cloud/) is a cloud-based integration that closely mirrors the data available in the Tempest app and is likely a good starting place for most users as it provides both forecast and sensor data.

{% include integrations/config_flow.md %}

## Sensors

This {% term integration %} will expose the following sensors:

### Atmospheric sensors

- **Air density**
  - **Description**: The mass per unit volume of Earth’s atmosphere.

- **Air pressure**
  - **Description**: The atmospheric pressure at the station level.

- **Dew point**
  - **Description**: The temperature to which air must be cooled to become saturated with water vapor.

- **Feels like**
  - **Description**: An index that combines temperature and humidity to determine the apparent temperature.

- **Humidity**
  - **Description**: Percentage of moisture in the air relative to the maximum it can hold at the current temperature.

- **Temperature**
  - **Description**: The degree or intensity of heat present in the area.

- **Vapor pressure**
  - **Description**: Pressure exerted by water vapor in the air (absolute moisture content).

- **Wet bulb temperature**
  - **Description**: The lowest temperature that can be reached under current ambient conditions by the evaporation of water only.

### Wind sensors

- **Wind direction**
  - **Description**: Wind direction relative to the station direction.

- **Wind direction average**
  - **Description**: Average wind direction over the past minute.

- **Wind gust**
  - **Description**: Highest 3-second wind speed in the past minute.

- **Wind lull**
  - **Description**: Lowest 3-second wind speed in the past minute.

- **Wind speed**
  - **Description**: Wind speed at the station.

### Precipitation sensors

- **Precipitation**
  - **Description**: Precipitation (accumulated over the previous minute).

- **Precipitation intensity**
  - **Description**: Precipitation intensity ([extrapolated](https://weatherflow.github.io/Tempest/api/derived-metric-formulas.html#rain-rate) from the accumulation over the previous minute).

- **Precipitation type**
  - **Description**: Precipitation type (`none`, `rain`, `hail`, `rain_hail`).

### Lightning sensors

The station detects lightning with an [AS3935 lightning sensor](https://www.sciosense.com/as3935-franklin-lightning-sensor-ic/). The distances it reports are estimates of how far away the storm is, not measurements of each strike. For details, refer to [Known limitations](#known-limitations).

- **Lightning average distance**
  - **Description**: Average of the estimated distances reported with the lightning strikes detected in the past minute. Unknown when no strikes were detected.

- **Lightning count**
  - **Description**: Number of lightning strikes detected in the past minute.

- **Lightning last distance**
  - **Description**: Estimated distance to the storm, as reported with the most recent detected lightning strike.

- **Lightning last energy**
  - **Description**: Value the sensor reports for the most recent detected lightning strike. It has no unit and, according to the sensor's manufacturer, no physical meaning.

- **Lightning last strike**
  - **Description**: Timestamp of the most recent detected lightning strike; unlike the `Lightning strike` event entity below, this sensor stores the last recorded strike time.

### Solar and light sensors

- **Illuminance**
  - **Description**: Amount of visible light received, measured in lux.

- **Irradiance**
  - **Description**: Total solar radiation received, measured in W/m².

- **UV index**
  - **Description**: Intensity of ultraviolet radiation received.

### Diagnostic sensors

Additionally, the following diagnostic sensors are available:

- **Battery (percentage)**
  - **Description**: Station battery (percentage).

- **Battery voltage**
  - **Description**: Battery voltage of the station.

- **Signal strength**
  - **Description**: Signal strength between the station and the hub.

- **Uptime**
  - **Description**: Uptime of the station.

## Event entities

The WeatherFlow Tempest station also sends event triggers when it starts raining and when there is a lightning strike nearby.
This {% term integration %} will expose these {% term event %} {% term entities %} and can be used for automations. The following entities will be exposed:

- **Lightning strike**
  - **Description**: Fires when the station detects a lightning strike.
    
- **Precipitation start**
  - **Description**: Fires when precipitation starts at the station.

## Known limitations

### Lightning detection

The sensor doesn't detect every lightning strike, and electrical interference near the station can cause false detections. The station broadcasts every strike it detects, and this {% term integration %} uses those broadcasts directly. WeatherFlow checks the strikes against other sources, so the WeatherFlow app and the [WeatherFlow Cloud](/integrations/weatherflow_cloud/) {% term integration %} can show a different number of strikes and different distances.

### Lightning distance

The sensor estimates the distance to the nearest edge of the storm from the strikes it detected recently. The estimate changes gradually as a storm approaches or moves away, so it can differ from the distance to the most recent strike. The sensor reports the distance in steps of 1 (overhead), 5, 6, 8, 10, 12, 14, 17, 20, 24, 27, 31, 34, 37, and 40 km.

When a strike is out of range, the sensor can't estimate its distance, and **Lightning last distance** shows unknown. Some Tempest firmware versions, including 181, still count such a strike as 63 km in the **Lightning average distance**, so the average is too high for a minute with an out-of-range strike.

## Networking notes

This {% term integration %} relies on the ability of Home Assistant to receive UDP traffic on port `50222`. You may run into trouble if you have a more complex network setup using either VLANs or multiple subnets.

The hub broadcasts each update once and doesn't resend it. If Home Assistant is connected over Wi-Fi, it can occasionally miss an update. A wired connection is more reliable.
