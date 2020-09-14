---
title: Australian Bureau of Meteorology (BOM)
description: Instructions on how to integrate Bureau of Meteorology Australia weather conditions into Home Assistant.
ha_category:
  - Weather
  - Sensor
  - Camera
ha_release: 0.36
ha_iot_class: Cloud Polling
ha_domain: bom
ha_codeowners:
  - '@maddenp'
---

The `bom` weather platform uses the [Australian Bureau of Meteorology (BOM)](http://www.bom.gov.au) as a source for current (half-hourly) meteorological data.

There is currently support for the following device types within Home Assistant:

- [Camera](#camera)
- [Sensor](#sensor)

## Configuration

To add the BOM weather platform to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
weather:
  - platform: bom
```

{% configuration %}
name:
  description:  The name you would like to give to the weather station.
  required: false
  type: string
station:
  description: "The station ID string. See the [`sensor.bom` documentation](#sensor) for details on how to find the ID of a station."
  required: false
  type: string
  default: The closest station
{% endconfiguration %}

<div class='note'>

This platform is an alternative to the [`bom`](#sensor) sensor.
The weather platform is easier to configure but less customizable.

</div>

## Camera

The `bom` camera platform uses the [Australian Bureau of Meteorology (BOM)](http://www.bom.gov.au) [radar web service](http://www.bom.gov.au/australia/radar/) as a source to generate an animated radar image.

To add the BOM camera to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: bom
    location: YOUR_LOCATION
```

See below for a list of valid `location` values, and subsitute one for `YOUR_LOCATION`.

{% configuration %}
location:
  description: Required unless `id` is specified. See below for a list of valid locations.
  required: true
  type: string
name:
  description: Allows you to override the Home Assistant-generated camera name.
  required: false
  type: string
id:
  description: Allows you to manually specify a BOM Radar ID (either `location` or `id` must be defined, but not both).
  required: false
  type: integer
filename:
  description: Periodically save the animated GIF image to this filesystem path.
  required: false
  type: string
{% endconfiguration %}

### Valid `location` values

```txt
Adelaide        Albany          AliceSprings    Bairnsdale      Bowen
Brisbane        Broome          Cairns          Canberra        Carnarvon
Ceduna          Dampier         Darwin          Emerald         Esperance
Geraldton       Giles           Gladstone       Gove            Grafton
Gympie          HallsCreek      Hobart          Kalgoorlie      Katherine
Learmonth       Longreach       Mackay          Marburg         Melbourne
Mildura         Moree           MorningtonIs    MountIsa        MtGambier
Namoi           Newcastle       Newdegate       NorfolkIs       NWTasmania
Perth           PortHedland     Rainbow         SellicksHill    SouthDoodlakine
Sydney          Townsville      WaggaWagga      Warrego         Warruwi
Watheroo        Weipa           WillisIs        Wollongong      Woomera
Wyndham         Yarrawonga
```

### Examples

#### Using `location` and `name`

Example `configuration.yaml` entry to display the `Townsville` radar with a camera named `My Towsville Radar`:

```yaml
camera:
  - platform: bom
    name: My Townsville Radar
    location: Townsville
```

#### Using `id`

You may alternatively specify radar imagery by ID, obtained from BOM's [Radar Images](http://www.bom.gov.au/australia/radar/) site. Each radar has a unique 2-digit code, followed by a digit specifying the resolution (1 for 512km, 2 for 256km, 3 for 128km, and 4 for 64km; note that not all resolutions are available for every site). Visit the BOM page for a particular radar and note the numeric portion of the `IDR` value (e.g. `IDR713` for the 128km Sydney imagery) in its URL. Use this 3-digit ID (e.g. `713`) for the `id` value in your configuration. If the ID begins with a zero, it _must_ be quoted.

So, the configuration

```yaml
camera:
  - platform: bom
    location: Melbourne
```

is equivalent to

```yaml
camera:
  - platform: bom
    id: '023'
    name: 'Melbourne'
```

since `bomradarloop` uses 128km resolution when `location` is specified in the configuration.

#### Using `filename`

This option can be specified to save the animated radar-imagery GIF to the given filesystem path.

Example `configuration.yaml` entry to display the `Sydney` radar and save the animated GIF to a file named `sydneyradar.gif` to the filesystem path accessible as `/local/sydneyradar.gif` via Home Assistant's web server:

```yaml
camera:
  - platform: bom
    location: Sydney
    filename: /config/www/images/sydneyradar.gif
```

The file will be automatically updated when the camera regenerates the animation.

## Sensor

The `bom` sensor platform uses the [Australian Bureau of Meteorology (BOM)](http://www.bom.gov.au) as a source for current (half-hourly) meteorological data.

- Each sensor will be given the `device_id` of "bom [optionalname] friendlyname units"
- A name is optional but if multiple BOM weather stations are used a name will be required.
- The sensor checks for new data every minute, starting 30 minutes after the timestamp of the most recent data as the data is updated every half-hour.

To add the BOM weather observation to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: bom
    monitored_conditions:
      - apparent_t
      - cloud
      - cloud_base_m
      - cloud_oktas
      - cloud_type_id
      - cloud_type
      - delta_t
      - gust_kmh
      - gust_kt
      - air_temp
      - dewpt
      - local_date_time
      - local_date_time_full
      - press
      - press_qnh
      - press_msl
      - press_tend
      - rain_trace
      - rel_hum
      - sea_state
      - swell_dir_worded
      - swell_height
      - swell_period
      - vis_km
      - weather
      - wind_dir
      - wind_spd_kmh
      - wind_spd_kt
```

To get the station ID for any BOM station:
- Find your station on these maps: [NSW](http://www.bom.gov.au/nsw/observations/map.shtml), [QLD](http://www.bom.gov.au/qld/observations/map.shtml), [VIC](http://www.bom.gov.au/vic/observations/map.shtml), [WA](http://www.bom.gov.au/wa/observations/map.shtml), [SA](http://www.bom.gov.au/sa/observations/map.shtml), [TAS](http://www.bom.gov.au/tas/observations/map.shtml), [ACT](http://www.bom.gov.au/act/observations/canberramap.shtml), [NT](http://www.bom.gov.au/nt/observations/map.shtml).
 - alternatively, from the [BOM website](http://www.bom.gov.au/), navigate to State -> Observations -> Latest Observations -> Choose the station.
- The URL will look like `http://www.bom.gov.au/products/IDx60901/[station].shtml`
- For Adelaide, the URL will look like `http://www.bom.gov.au/products/IDS60901/IDS60901.94648.shtml`; the station ID is `IDS60901.94648`.

{% configuration %}
station:
  description: The station ID string as identified from the BOM website.
  required: false
  type: string
  default: If not given, defaults to the closest station based on location data in configuration.yaml.
name:
  description: The name you would like to give to the weather station.
  required: false
  type: string
monitored_conditions:
  description: A list of the conditions to monitor.
  required: true
  type: list
  keys:
    apparent_t:
      description: Feels like temperature in C.
    cloud:
      description: Cloud cover.
    cloud_base_m:
      description: Cloud Base in m.
    cloud_oktas:
      description: Cloud Oktas.
    cloud_type_id:
      description: Cloud type ID.
    cloud_type:
      description: Cloud type description.
    delta_t:
      description: Delta temperature in C.
    gust_kmh:
      description: Wind gust in km/h.
    gust_kt:
      description: Wing gust in kt.
    air_temp:
      description: Air temperature in C.
    dewpt:
      description: Dew point in C.
    press:
      description: Pressure in mbar.
    press_qnh:
      description: Pressure in qnh.
    press_msl:
      description: Pressure in msl.
    press_tend:
      description: Pressure trend.
    rain_trace:
      description: Raing today in mm.
    rel_hum:
      description: Relative Humidity in %.
    sea_state:
      description: Sea state.
    swell_dir_worded:
      description: Swell direction.
    swell_height:
      description: Swell height in m.
    swell_period:
      description: Swell period.
    vis_km:
      description: Visibility in km.
    weather:
      description: Weather summary.
    wind_dir:
      description: Wind direction.
    wind_spd_kmh:
      description: Wind speed in km/h.
    wind_spd_kt:
      description: Wind speed in kt.
{% endconfiguration %}

<div class='note'>

This sensor is an alternative to the [`bom`](#configuration) weather platform.
The weather platform is easier to configure but less customisable.

</div>
