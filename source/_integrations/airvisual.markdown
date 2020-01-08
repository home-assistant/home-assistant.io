---
title: AirVisual
description: Instructions on how to use AirVisual data within Home Assistant
logo: airvisual.jpg
ha_category:
  - Health
ha_release: 0.53
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@bachya'
---

The `airvisual` sensor platform queries the [AirVisual](https://airvisual.com/) API for air quality data. Data can be collected via latitude/longitude or by city/state/country. The resulting information creates sensors for the Air Quality Index (AQI), the human-friendly air quality level, and the main pollutant of that area. Sensors that conform to either/both the [U.S. and Chinese air quality standards](https://www.clm.com/publication.cfm?ID=366) can be created.

This platform requires an AirVisual API key, which can be obtained [here](https://airvisual.com/api). Note that the platform was designed using the "Community" package; the "Startup" and "Enterprise" package keys should continue to function, but actual results may vary (or not work at all).

The Community API key is valid for 12 months after which it will expire. You must then go back to the Airvisual website, delete your old key, create a new one following the same steps and update your configuration with the new key.

<div class='note warning'>

The "Community" API key is limited to 10,000 calls per month. In order to leave a buffer, the `airvisual` platform queries the API every 10 minutes (600 seconds) by default. Modification of this (via the `scan_interval` key) to a too-low value may result in your API key being deactivated.

</div>

## Configuration

To enable the platform and gather data via latitude/longitude, add the following lines to your `configuration.yaml` file:

```yaml
sensor:
  - platform: airvisual
    api_key: YOUR_AIRVISUAL_API_KEY
```

{% configuration %}
api_key:
  description: Your AirVisual API key.
  required: true
  type: string
monitored_conditions:
  description: "The air quality standard(s) to use (`us` for U.S., `cn` for Chinese)."
  required: true
  type: list
  default: ['us', 'cn']
show_on_map:
  description: "Whether to show a marker on the map at the specified location."
  required: false
  type: boolean
  default: true
scan_interval:
  description: "The rate in seconds at which AirVisual should be polled for new data."
  required: false
  type: integer
  default: 600
latitude:
  description: The latitude of the location to monitor.
  required: false
  type: string
  default: "The latitude defined under the `homeassistant` key in `configuration.yaml`."
longitude:
  description: The longitude of the location to monitor.
  required: false
  type: string
  default: "The longitude defined under the `homeassistant` key in `configuration.yaml`."
city:
  description: The city to monitor.
  required: false
  type: string
state:
  description: The state the city belongs to.
  required: false
  type: string
country:
  description: The country the state belongs to.
  required: false
  type: string
{% endconfiguration %}

## Example Configurations

Configuration using custom Latitude and Longitude:

```yaml
sensor:
  - platform: airvisual
    api_key: YOUR_AIRVISUAL_API_KEY
    monitored_conditions:
      - cn
    show_on_map: false
    scan_interval: 300
    latitude: 42.81212
    longitude: 108.12422
```

Configuration using city, state, and country:

```yaml
sensor:
  - platform: airvisual
    api_key: YOUR_AIRVISUAL_API_KEY
    monitored_conditions:
      - us
    show_on_map: false
    scan_interval: 300
    city: Los Angeles
    state: California
    country: USA
```

## Determining the City/State/Country

To easily determine the proper values for a particular location, use the [AirVisual region directory](https://airvisual.com/world). Once you browse to the particular city you want, take note of the breadcrumb title, which is of the form `country > state/region > city`. Use this information to fill out `configuration.yaml`.

For example, Sao Paulo, Brazil shows a breadcrumb title of `Brazil > Sao Paulo > Sao Paulo`. Thus, the proper configuration would look like this:

```yaml
sensor:
  - platform: airvisual
    api_key: abc123
    monitored_conditions:
      - us
      - cn
    city: sao-paulo
    state: sao-paulo
    country: brazil
```

## Sensor Types

When configured, the platform will create three sensors for each configured air quality standard:

### Air Quality Index

- **Description:** This sensor displays a numeric air quality index (AQI), a metric for the overall "health" of the air.
- **Example Sensor Name:** `sensor.chinese_air_quality_index`
- **Example Sensor Value:** `32`
- **Explanation:**

AQI | Status | Description
------- | :----------------: | ----------
0 - 50  | **Good** | Air quality is considered satisfactory, and air pollution poses little or no risk
51 - 100  | **Moderate** | Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution
101 - 150 | **Unhealthy for Sensitive Groups** | Members of sensitive groups may experience health effects. The general public is not likely to be affected
151 - 200 | **Unhealthy** | Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects
201 - 300 | **Very unhealthy** | Health warnings of emergency conditions. The entire population is more likely to be affected
301+ | **Hazardous** | Health alert: everyone may experience more serious health effects

### Air Pollution Level

- **Description:** This sensor displays the associated `Status` (from the above table) for the current AQI.
- **Sample Sensor Name:** `sensor.us_air_pollution_level`
- **Example Sensor Value:** `Moderate`

### Main Pollutant

- **Description:** This sensor displays the pollutant whose value is currently highest.
- **Sample Sensor Name:** `sensor.us_main_pollutant`
- **Example Sensor Value:** `PM2.5`
- **Explanation:**

Pollutant | Symbol | More Info
------- | :----------------: | ----------
Particulate (<= 2.5 μm) | PM2.5 | [EPA: Particulate Matter (PM) Pollution ](https://www.epa.gov/pm-pollution)
Particulate (<= 10 μm) | PM10 | [EPA: Particulate Matter (PM) Pollution ](https://www.epa.gov/pm-pollution)
Ozone | O | [EPA: Ozone Pollution](https://www.epa.gov/ozone-pollution)
Sulpher Dioxide | SO2 | [EPA: Sulfur Dioxide (SO2) Pollution](https://www.epa.gov/so2-pollution)
Carbon Monoxide | CO | [EPA: Carbon Monoxide (CO) Pollution in Outdoor Air](https://www.epa.gov/co-pollution)
