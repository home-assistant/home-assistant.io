---
title: "Rejseplanen"
description: "Instructions on how to integrate timetable data for Danish Rejseplanen within Home Assistant."
ha_release: 0.88
ha_category:
  - Transport
ha_iot_class: "Cloud Polling"
ha_quality_scale: legacy
ha_config_flow: true
ha_codeowners:
  - '@Jawar19'
ha_domain: rejseplanen
ha_integration_type: service
ha_platforms:
  - sensor
related:
  - url: https://labs.rejseplanen.dk/hc/en-us/articles/21553113674909-Adgang-til-data-fra-Labs
    title: Rejseplanen Labs
---

The **Rejseplanen** {% term integration %} provides you with travel details for Danish public transport, using timetable data from [Rejseplanen](https://www.rejseplanen.dk/).

When you set it up, the integration connects to the Rejseplanen cloud API with your API key. You then add one device per stop that you want to monitor, and each stop device provides sensor entities for the next departure.

{% important %}
Extra attributes that were previously available on the sensors have been removed to conform to Home Assistant standards.
{% endimportant %}

## Prerequisites

To use this integration, you need a Rejseplanen API key:

1. Visit the [Rejseplanen API request form](https://labs.rejseplanen.dk/hc/da/requests/new).
2. Select **Private user** when applying.
3. Fill out the form and submit your request.
4. You'll receive your API key by email.

Private API keys allow up to 50,000 API calls per month, which is enough to monitor multiple stops with regular polling.

{% include integrations/config_flow.md %}

During setup, you're asked for the following:

{% configuration_basic %}
API key:
  description: The API key provided by Rejseplanen.dk. It authenticates all API requests and determines your access level and rate limits.
{% endconfiguration_basic %}

{% note %}
Rejseplanen supports a single integration entry. To use a different API key, remove the integration and set it up again.
{% endnote %}

## Migrating from YAML configuration

If you previously configured Rejseplanen through {% term "`configuration.yaml`" %}, it can't be imported automatically. Rejseplanen now requires an API key, which the YAML configuration didn't provide.

1. Set up the integration through the UI to provide your API key, then [add a stop](#adding-a-stop) for each location you want to monitor.
2. Remove the `rejseplanen` entry under `sensor:` from your {% term "`configuration.yaml`" %} file.
3. [Restart Home Assistant](/docs/configuration/#reloading-the-configuration-to-apply-changes) to apply the change.

A repair issue under {% my repairs title="**Settings** > **System** > **Repairs**" %} reminds you to remove the YAML configuration.

## Adding a stop

Each stop you want to monitor is added as a separate device. After you set up the integration with your API key, add one stop for each location you want to track:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select **Rejseplanen**.
2. Select **Add stop**.
3. Enter the details for the stop. Only the stop ID is required. The options are described after these steps.
4. Select **Submit**.
   - Result: The integration immediately starts monitoring the stop and creates sensor entities for the next departure.

When you add a stop, you're asked for the following:

{% configuration_basic %}
Stop ID:
  description: The unique identifier for the stop or station you want to monitor. See [Finding a stop ID](#finding-a-stop-id) for how to obtain this value.
Name:
  description: An optional name for this stop. The name is used in the device and entity names. It defaults to **Unknown stop**, so give each stop its own name to keep your devices and entities easy to tell apart.
Direction:
  description: An optional filter that only shows departures toward a specific destination. Leave it empty to show all departures. You can add multiple directions, and each value must match exactly what the Rejseplanen API returns (case-sensitive). See [Finding direction values](#finding-direction-values).
Departure type:
  description: An optional filter that only shows specific types of departures, such as S-trains, buses, or metro. You can select multiple types. Leave it empty to show all departure types available at the stop. See [Departure types](#departure-types) for all options.
{% endconfiguration_basic %}

## Finding a stop ID

The stop ID is a unique identifier for each public transport stop or station. You can find it using either a text search or coordinates.

### To search by name or location

1. Open a web browser and visit the following URL:

   ```text
   https://www.rejseplanen.dk/api/location.name?input=<search_term>&accessId=<YOUR_API_KEY>
   ```

2. Replace `<search_term>` with the name of your stop (for example, "Roskilde St." or "Copenhagen Airport").
3. Replace `<YOUR_API_KEY>` with your Rejseplanen API key.
4. Look for your stop in the XML response and find the `extId` attribute. This is your stop ID.

#### Example search for "Roskilde St."

```text
https://www.rejseplanen.dk/api/location.name?input=Roskilde%20St.&accessId=YOUR_API_KEY
```

The response includes stops matching your search. In this example, the stop ID is `8600617`. You can see it in the `extId` attribute of the `StopLocation` element.

{% details "Example XML response" %}

```xml
<LocationList
  xmlns="http://hacon.de/hafas/proxy/hafas-proxy"
  serverVersion="2.49.1"
  dialectVersion="2.45-Rejseplanen"
  requestId="r2gm7s2iiist82wg">
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
    id="A=1@O=Roskilde St.@X=12088550@Y=55639093@U=86@L=8600617@..."
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

{% enddetails %}

### To search by coordinates

1. Find your location on [OpenStreetMap](https://www.openstreetmap.org).
2. The URL shows the coordinates (for example: `#map=18/56.15756/10.20674`).
3. Visit the following URL:

   ```text
   https://www.rejseplanen.dk/api/location.nearbystops?originCoordLong=<longitude>&originCoordLat=<latitude>&maxNo=10&accessId=<YOUR_API_KEY>
   ```

4. Replace the coordinates and API key with your values.
5. The response shows the 10 nearest stops to your location. Find the one you want and use its `extId` as the stop ID.

#### Example search for nearby stops in Roskilde

```text
https://www.rejseplanen.dk/api/location.nearbystops?originCoordLong=12.088367&originCoordLat=55.637912&maxNo=10&accessId=YOUR_API_KEY
```

Result:

{% details "Example XML response" %}

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

{% enddetails %}

Find the stop you want in the list and use the `extId` attribute as your stop ID. In this example, you can see two stops: `8651617` and `8650617`.

## Finding direction values

To filter by direction, you need the exact direction values available from your stop. These values come from the `direction` attribute in the API response.

1. Open a web browser and visit the following URL:

   ```text
   https://www.rejseplanen.dk/api/departureBoard?id=<YOUR_STOP_ID>&accessId=<YOUR_API_KEY>
   ```

2. Replace `<YOUR_STOP_ID>` with your stop ID (see [Finding a stop ID](#finding-a-stop-id)).
3. Replace `<YOUR_API_KEY>` with your Rejseplanen API key.
4. In the XML response, find the `direction` attribute on each `Departure` element. These are the available direction values for your stop.

   {% details "Example XML response" %}

   ```xml
   <DepartureBoard>
     <Departure name="1A" type="BUS" direction="Nørrebro St." ... />
     <Departure name="2C" type="BUS" direction="Airport" ... />
     <Departure name="S" type="S" direction="København H" ... />
   </DepartureBoard>
   ```

   {% enddetails %}

5. Use the exact text from the `direction` attribute in the direction filter. For example, to only show departures toward "Nørrebro St.", enter `Nørrebro St.` (case-sensitive).
   - After setup, the direction of the next departure is exposed through the **Towards** sensor.

### Departure types

You can filter a stop by the following departure types:

- **City buses** (`bus`): Regular city bus services
- **Express buses** (`express_bus`): Long-distance or high-speed bus services
- **Ferry** (`ferry`): Ferry services
- **Flexible transport** (`flexible_bus`): On-demand or flexible bus services
- **Flight** (`flight`): Flights, where available
- **InterCity trains** (`ic`): IC and IB long-distance trains
- **InterCity Lyn trains** (`icl`): Fast trains (ICL, ICL-X, ICL+)
- **Light rail** (`letbane`): Light rail or tram services (Letbanen)
- **Metro** (`metro`): Metro or subway services
- **Night & special buses** (`night_bus`): Night bus and other special bus services
- **Regional trains** (`re`): Regional trains (Re, RA, RX)
- **S-trains** (`s_tog`): S-trains (Copenhagen suburban rail)
- **Long distance trains** (`tog`): EC, IR, ICE, SJ, and other long-distance trains

## Supported functionality

### Sensors

After you add a stop, the integration creates the following sensor entities, based on the next departure:

- **Line** (`sensor.<stop_name>_line`): The line number or name of the next departure
- **Departing in** (`sensor.<stop_name>_departing_in`): The timestamp of the next departure
- **Delayed by** (`sensor.<stop_name>_delayed_by`): The number of minutes the departure is delayed, or 0 if it is on time
- **Towards** (`sensor.<stop_name>_towards`): The destination or direction of the next departure
- **Departing from track** (`sensor.<stop_name>_departing_from_track`): The track or platform number, if available
- **Number of departures** (`sensor.<stop_name>_number_of_departures`): The number of upcoming departures that match your filters

The sensors don't add extra state attributes.

## Rejseplanen automation examples

The integration polls departure data every 5 minutes by default. You can use automations to update the sensors more often at specific times. Before you do, turn off automatic updates so the default polling doesn't run in addition to your automation (see [Data updates](#data-updates)).

The integration fetches the departures for all your stops in a single request, so refreshing one sensor refreshes every stop. The examples below therefore update a single sensor.

### Automation: More frequent updates during peak hours

This example updates the sensors every 2 minutes during the morning rush hour (7:00–9:00) and every minute during the last 5 minutes before a typical commute time.

- **Triggers**:
  - Time pattern, every 2 minutes
  - Time, at 08:55, 08:56, 08:57, 08:58, and 08:59
- **Condition**: Time, between 07:00 and 09:00
- **Action**: Update entity

{% details "YAML example: more frequent updates during peak hours" %}

```yaml
automation:
  - alias: "Peak hour frequent departure updates"
    triggers:
      - trigger: time_pattern
        minutes: "/2"
      - trigger: time
        at:
          - "08:55:00"
          - "08:56:00"
          - "08:57:00"
          - "08:58:00"
          - "08:59:00"
    conditions:
      - condition: time
        after: "07:00:00"
        before: "09:00:00"
    actions:
      - action: homeassistant.update_entity
        data:
          entity_id:
            - sensor.my_station_departing_in
```

{% enddetails %}

### Automation: Update on demand with a button

This example refreshes the departure data whenever you press a dashboard button. The button is an input button {% term helper %} that you create separately under {% my helpers title="**Settings** > **Devices & services** > **Helpers**" %}. This example uses a helper with the entity ID `input_button.refresh_departures`.

- **Trigger**: The dashboard button is pressed
- **Action**: Update entity

{% details "YAML example: update on demand with a button" %}

```yaml
automation:
  - alias: "Refresh departures on button press"
    triggers:
      - trigger: state
        entity_id: input_button.refresh_departures
    actions:
      - action: homeassistant.update_entity
        data:
          entity_id:
            - sensor.my_station_departing_in
```

{% enddetails %}

{% important %}
Be mindful of the API rate limit (50,000 calls per month for private keys). Frequent updates across multiple stops can quickly use up your allocation. Monitor your usage and adjust your intervals.
{% endimportant %}

## Data updates

The integration {% term polling polls %} departure data from the Rejseplanen API every 5 minutes by default.

To manage polling yourself, for example to update sensors at different frequencies during the day, turn off automatic updates first. Otherwise, the default 5-minute polling continues in addition to your own updates and uses more of your monthly API quota:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select **Rejseplanen**.
2. Next to the integration entry, select the three dots {% icon "mdi:dots-vertical" %} menu, then **System options**.
3. Turn off **Enable polling for changes**.

For more on updating entities on your own schedule, see [defining a custom polling interval](/common-tasks/general/#defining-a-custom-polling-interval).

## Known limitations

- The sensor entities show only the next departure. The full list of upcoming departures with all their details isn't available. To see how many upcoming departures match your filters, check the **Number of departures** sensor.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
