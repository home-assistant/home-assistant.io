---
title: "Rejseplanen"
description: "Instructions on how to integrate timetable data for Danish Rejseplanen within Home Assistant."
ha_release: "2026.1"
ha_category: Transport
ha_iot_class: "Cloud Polling"
ha_quality_scale: bronze
ha_config_flow: true
ha_codeowners:
  - '@Jawar19'
ha_domain: rejseplanen
ha_integration_type: hub
related:
  - url: https://labs.rejseplanen.dk/hc/en-us/articles/21553113674909-Adgang-til-data-fra-Labs
    title: Rejseplanen Labs
---

The `rejseplanen` {% term integration %} will provide you with travel details for Danish public transport, using multi-departure board data from [Rejseplanen](https://www.rejseplanen.dk/).

{% important %}
As part of conforming to Home Assistant standards, all extra attributes previously available on sensors have been removed. In a future release, the integration will provide an {% term action %} to retrieve the full list of departures with all details. This will allow for more flexible data access while maintaining proper entity standards.
{% endimportant %}

## Setup

The Rejseplanen {% term integration %} has moved from {% term platform %} setup to a more friendly UI setup. The {% term integration %} consists of two main configurable types. Firstly the Service device, a hidden coordinator that handles the communication with the Rejseplanen cloud API and stores the data from the aforementioned API. Secondly a number of sub-entries called "stops" that sorts and displays the data of the next departure to the user as a device with entities.

{% term platform "Platform" %} setup for this {% term integration %} has been deprecated and should be removed from the configuration file.

[Read more about _configuration file_](https://www.home-assistant.io/docs/configuration/)

### Main entry (Coordinator)

The main entry is the central coordinator for the Rejseplanen integration. It handles all communication with the Rejseplanen API and manages the data for all your configured stops. You only need to create one main entry regardless of how many stops you want to monitor.

When you set up the integration for the first time, you'll create the main entry by providing your Rejseplanen API key. All stop subentries you add later will automatically use this coordinator to fetch departure data.

{% configuration %}
api_key:
  description: The API key provided by Rejseplanen.dk for accessing their API. This key is used to authenticate all API requests and determine your access level and rate limits (50,000 calls/month for private keys).
  required: true
  type: string
{% endconfiguration %}

{% note %}
The integration is configured as a singleton, meaning you can only have one main entry per Home Assistant instance. If you need to use a different API key, you'll need to remove and reconfigure the integration.
{% endnote %}

## Obtain API key

To use the Rejseplanen integration, you must obtain an API key from Rejseplanen.dk:

1. Visit the [Rejseplanen API request form](https://labs.rejseplanen.dk/hc/da/requests/new)
2. Select **Private user** when applying
3. Fill out the form and submit your request
4. You'll receive your API key via email

Keep in mind that private API keys allow for 50,000 API calls per month, which is sufficient for monitoring multiple stops with regular polling.

## Stop subentry

The stop subentry is how you configure individual public transport stops to monitor in Home Assistant. Once you've set up the main coordinator entry with your API key, you can add as many stop subentries as you need—one for each stop or station you want to track.

### Setting up a stop subentry

1. Go to {% my integrations title="**Settings** > **Devices & Services**" %} and select **Rejseplanen**.
2. Select **Create Entry** and choose **Add stop**.
3. Enter the stop ID for the location you want to monitor (see [Finding your stop ID](#finding-your-stop-id) below).
4. Optionally, give the stop a friendly name.
5. Optionally, filter by direction or transportation type.
6. Select **Create Entry**.

Once created, the integration will immediately start monitoring that stop and create sensor entities for the next departure.

### Stop subentry configuration options

{% configuration_basic %}
Stop ID:
    description: The unique identifier for the public transport stop or station you want to monitor. See [Finding your stop ID](#finding-your-stop-id) for instructions on how to obtain this value.
Name:
    description: A friendly name for this stop (for example, "Home Station" or "Work Stop"). This name will be used in the entity names and device name. If not provided, a default name will be generated based on the stop ID.
Direction:
    description: Optional filter to only show departures to a specific destination or direction. Leave empty to show all departures. Multiple directions can be separated by commas. Direction values must match exactly what is returned by the Rejseplanen API (case-sensitive). See [Finding direction values](#finding-direction-values) for how to discover available directions for your stop.
Transportation type:
    description: Optional filter to only show specific types of transport (for example, S-trains, buses, metro). You can select multiple types. Leave empty to show all transportation types available at this stop. See the [Transportation types](#transportation-types) table for all available options.
{% endconfiguration_basic %}

### Finding your stop ID

The stop ID is a unique identifier for each public transport stop or station. You can find it using either a text search or coordinates.

#### Search by name or location

The easiest way to find your stop ID is to search for the stop by name:

1. Open a web browser and visit: <https://www.rejseplanen.dk/api/location.name?input=><search_term>&accessId=<YOUR_API_KEY>
2. Replace `<search_term>` with the name of your stop (for example, "Roskilde St." or "Copenhagen Airport").
3. Replace `<YOUR_API_KEY>` with your Rejseplanen API key.
4. Look for your stop in the XML response and find the `extId` attribute—this is your stop ID.

For example, searching for "Roskilde St." would look like:

<https://www.rejseplanen.dk/api/location.name?input=Roskilde%20St.&accessId=YOUR_API_KEY>

The response will include stops matching your search:

```xml
<LocationList xmlns="http://hacon.de/hafas/proxy/hafas-proxy" serverVersion="2.49.1" dialectVersion="2.45-Rejseplanen" requestId="r2gm7s2iiist82wg">
  <TechnicalMessages>
    <TechnicalMessage key="requestTime">
      2025-06-16 11:53:58
    </TechnicalMessage>
    <TechnicalMessage key="backendInfo">
      ttp=16601#16676 plancode0=72z27 planid=1749820065 
      planid0=1749820065 planid_adr=1746438686 plancode_adr=52iz0 
      planid_poi=1746518115 plancode_poi=538ad 
      srvv=5.45.Rejseplanen.17.3.12 (customer/hcudk/release/2025.2.0.3) 
      [2025-04-21] tlibv=TRFVER: rel/dk/11.00.8 2025-02-10 16:37:34 
      +0100 Rejsekort v11.0.8 jno=1
    </TechnicalMessage>
    </TechnicalMessages>
    <StopLocation 
    id="A=1@O=Roskilde St.@X=12088550@Y=55639093@U=86@L=8600617@B=1@p=1749820065@" 
    extId="8600617" 
    isMainMast="true" 
    name="Roskilde St." 
    lon="12.08855" 
    lat="55.639093" 
    weight="22212" 
    products="239" 
    minimumChangeDuration="PT5M">
    ...
    </StopLocation>
    ...
  </LocationList>
  ```

  In this example, the stop ID is `8600617`. You can see it in the `extId` attribute of the `StopLocation` element.


#### Search by coordinates

If you prefer to search by location coordinates:

1. Find your location on [OpenStreetMap](https://www.openstreetmap.org).
2. The URL will show the coordinates (for example: `#map=18/56.15756/10.20674`).
3. Visit: <https://www.rejseplanen.dk/api/location.nearbystops?originCoordLong=<longitude>&originCoordLat=<latitude>&maxNo=10&accessId=<YOUR_API_KEY>>
4. Replace the coordinates and API key with your values.
5. The response will show the 10 nearest stops to your location. Find the one you want and use its `extId` as the stop ID.

Example search for nearby stops in Copenhagen:

<https://www.rejseplanen.dk/api/location.nearbystops?originCoordLong=12.088367&originCoordLat=55.637912&maxNo=10&accessId=YOUR_API_KEY>

Result:

```xml
<LocationList
  xmlns="http://hacon.de/hafas/proxy/hafas-proxy"
  serverVersion="2.49.1"
  dialectVersion="2.45-Rejseplanen"
  requestId="m54u7sm8gq4pww8x">
  <TechnicalMessages>
    <TechnicalMessage key="requestTime">
      2025-06-16 12:28:27
    </TechnicalMessage>
    <TechnicalMessage key="backendInfo">
      ttp=16601#16676 plancode0=72z27 planid=1749820065
      planid0=1749820065 planid_adr=1746438686 plancode_adr=52iz0
      planid_poi=1746518115 plancode_poi=538ad srvv=5.45.Rejseplanen
      (customer/hcudk/release/2025.2.0.3) [2025-04-21]
      tlibv=TRFVER: rel/dk/11.00.8 2025-02-10 16:37:34 +0100
      Rejsekort v11.0.8 jno=1
    </TechnicalMessage>
  </TechnicalMessages>
  <StopLocation
    id="A=1@O=Roskilde St. (togbus)@X=12088388@Y=55637826@U=86@L=8651617@"
    extId="8651617"
    name="Roskilde St. (togbus)"
    lon="12.088388"
    lat="55.637826"
    weight="1563"
    dist="10"
    products="8"
    minimumChangeDuration="PT5M">
    ...
  </StopLocation>
  <StopLocation
    id="A=1@O=Roskilde St. (togbus)@X=12088334@Y=55637799@U=86@L=8650617@"
    extId="8650617"
    name="Roskilde St. (togbus)"
    lon="12.088334"
    lat="55.637799"
    weight="1563"
    dist="13"
    products="8"
    minimumChangeDuration="PT5M">
    ...
  </StopLocation>
</LocationList>
```

Find the stop you want in the list and use the `extId` attribute as your stop ID. In this example, you can see two stops: `8651617` and `8650617`.

### Filtering departures

When creating a stop subentry, you can optionally filter departures by:

- **Direction**: Only show departures going to a specific destination (for example, "Downtown" or "Airport")
- **Transportation type**: Only show specific types of transport (buses, trains, metro, and similar)

If you don't set any filters, the integration will show all departures from that stop.

#### Finding direction values

To find the exact direction values to use for filtering, you need to check what directions are available from your stop. The direction values come from the `direction` attribute in the API response.

You can find available directions by making a test API call:

<https://www.rejseplanen.dk/api/departureBoard?id=<YOUR_STOP_ID>&accessId=<YOUR_API_KEY>>

Example response showing the direction attribute:

```xml
<DepartureBoard>
  <Departure name="1A" type="BUS" direction="Nørrebro St." ... />
  <Departure name="2C" type="BUS" direction="Airport" ... />
  <Departure name="S" type="S" direction="København H" ... />
</DepartureBoard>
```

Use the exact text from the `direction` attribute when configuring your direction filter. For example, if you only want departures going to "Nørrebro St.", enter `Nørrebro St.` (case-sensitive) in the direction filter field when creating the stop subentry.

{% note %}
Direction filtering is currently only available during stop subentry setup via the configuration UI. The direction values are not displayed in the Home Assistant frontend entities yet, but you can see them in the sensor attributes.
{% endnote %}

### Transportation types

The following table shows all available transportation types you can filter by:

| Type | Label | Description |
|------|-------|-------------|
| bus | City buses | Regular city bus services |
| express_bus | Express buses | Long-distance or high-speed bus services |
| ferry | Ferry | Ferry services |
| flexible_bus | Flexible transport | On-demand or flexible routing bus services |
| flight | Flight | Flight services (where available) |
| ic | InterCity trains | IC and IB long-distance trains |
| icl | InterCity Lyn trains | Fast trains (ICL, ICL-X, ICL+) |
| letbane | Light rail | Light rail or tram services (Letbanen) |
| metro | Metro | Metro/subway services |
| night_bus | Night & special buses | Night bus and other special bus services |
| re | Regional trains | Regional trains (Re, RA, RX) |
| s_tog | S-trains | S-trains (Copenhagen suburban rail) |
| tog | Long distance trains | EC, IR, ICE, SJ, and other long-distance trains |

### Sensor entities

Once you've created a stop subentry, the integration creates several sensor entities to display information about the next departure:

| Entity | Description |
|--------|-------------|
| `sensor.<stop_name>_line` | The line number or name of the next departure |
| `sensor.<stop_name>_departure_time` | The timestamp of the next departure |
| `sensor.<stop_name>_delay` | Minutes delayed (0 if on time) |
| `sensor.<stop_name>_direction` | The destination or direction of the next departure |
| `sensor.<stop_name>_track` | The track or platform number (if available) |
| `sensor.<stop_name>_number_of_departures` | Total number of upcoming departures matching your filters |

Each sensor includes detailed attributes with additional information such as planned vs. real-time times, cancellation status, and operator information.

## Advanced usage

### Custom polling intervals with automations

The integration polls data every 5 minutes by default to respect API rate limits. If you want to manage the polling intervals yourself or update sensors at different frequencies for different times of day, you can use automations with the `homeassistant.update_entity` action.

{% note %}
Automations provide more flexibility than integration polling configuration. For example, you can poll more frequently during peak hours and reduce updates at night, or even combine polling with conditions like geofencing or calendar triggers. Learn more about this approach in the Home Assistant documentation on [defining a custom polling interval](https://www.home-assistant.io/common-tasks/general/#defining-a-custom-polling-interval).
{% endnote %}

#### Example: More frequent updates during peak hours

This automation updates the sensor every 2 minutes during morning rush hour (7:00-9:00) and every minute during the last 5 minutes before a typical commute time:

```yaml
automation:
  - alias: "Peak hour frequent departure updates"
    triggers:
      - trigger: time_pattern
        hours: "7-8"
        minutes: "/2"
    actions:
      - action: homeassistant.update_entity
        target:
          entity_id:
            - sensor.my_station_line
            - sensor.my_station_departure_time
            - sensor.my_station_delay

  - alias: "Final countdown departure update"
    triggers:
      - trigger: time_pattern
        hours: "8"
        minutes: "55-59"
    actions:
      - action: homeassistant.update_entity
        target:
          entity_id:
            - sensor.my_station_line
            - sensor.my_station_departure_time
            - sensor.my_station_delay
```

#### Example: Update on-demand via button

Create a manual update button on your dashboard that users can press to refresh departure data immediately:

```yaml
input_button:
  refresh_departures:
    name: "Refresh departures"
    icon: mdi:refresh

automation:
  - alias: "Refresh departures on button press"
    triggers:
      - trigger: state
        entity_id: input_button.refresh_departures
    actions:
      - action: homeassistant.update_entity
        target:
          entity_id:
            - sensor.my_station_line
            - sensor.my_station_departure_time
            - sensor.my_station_delay
            - sensor.my_station_direction
```

{% important %}
When using custom polling intervals, be mindful of the API rate limit (50,000 calls/month for private keys). Frequent updates across multiple stops can quickly consume your allocation. Monitor your usage and adjust intervals accordingly.
{% endimportant %}

## Known limitations

- The integration currently displays only the next departure in the sensor entities. To see additional upcoming departures, you can check the `number_of_departures` sensor which indicates how many departures are available.
- Full departure lists with all details will be available through an {% term action %} in a future release, allowing you to retrieve and display multiple departures in dashboards or automations.