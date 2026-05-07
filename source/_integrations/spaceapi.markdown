---
title: SpaceAPI
description: Instructions on how to integrate SpaceAPI into Home Assistant.
ha_category:
  - Social
ha_iot_class: Calculated
ha_release: '0.70'
ha_config_flow: true
ha_codeowners:
  - '@fabaff'
  - '@ximex'
ha_domain: spaceapi
ha_integration_type: service
ha_quality_scale: legacy
---

The **SpaceAPI** {% term integration %} allows hackerspaces and makerspaces to expose information to web apps and other applications using the [SpaceAPI](https://spaceapi.io/) standard. It hosts a JSON endpoint on your Home Assistant instance that complies with SpaceAPI version 15.

## Use cases

- Publishing your hackerspace's open/closed status so it appears on SpaceAPI directory sites and aggregators, letting members and visitors check remotely whether the space is open.
- Sharing sensor readings such as temperature, humidity, or CO₂ levels from your space with the public in a standardized format.
- Providing contact details, project links, membership plans, linked spaces, and recent activity in a machine-readable format for community tools and web apps to consume.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Space name:
  description: The name of your hackerspace.
Logo URL:
  description: A publicly accessible URL pointing to your space's logo image.
Website URL:
  description: The URL of your hackerspace's website.
State entity:
  description: The entity that represents whether your space is currently open or closed. Binary sensors, input booleans, switches, locks, and covers are supported. If the entity is unavailable, the endpoint reports the space as closed.
Contact email:
  description: The primary contact email address for your space.
{% endconfiguration_basic %}

{% important %}
YAML-based configuration is deprecated and will be removed in Home Assistant 2026.12. If you previously configured SpaceAPI in `configuration.yaml`, a repair notification will guide you through migrating to the UI. Once the migration is complete, you can remove the SpaceAPI entries from your configuration file.
{% endimportant %}

## Configuration options

Once the integration is set up, select **Configure** on the integration entry to open the options menu. The following groups of settings are available.

### Contact details

Additional contact channels for your space.

{% configuration_basic %}
Phone:
  description: Phone number of the space.
SIP:
  description: SIP address for voice-over-IP.
IRC channel:
  description: IRC channel of the space.
Twitter:
  description: Twitter account of the space.
Facebook:
  description: Facebook page URL of the space.
Mailing list:
  description: Mailing list address of the space.
Mastodon:
  description: Mastodon account of the space.
Matrix:
  description: Matrix room of the space.
XMPP:
  description: XMPP address of the space.
Mumble:
  description: Mumble server of the space.
Gopher:
  description: Gopher URL of the space.
{% endconfiguration_basic %}

### State & icons

Extra details about the open/closed state that appear in the SpaceAPI output.

{% configuration_basic %}
Icon URL when open:
  description: A publicly accessible URL to the icon shown when the space is open.
Icon URL when closed:
  description: A publicly accessible URL to the icon shown when the space is closed.
State message:
  description: An entity whose state is published as the current state message of the space, such as a text sensor or input text helper.
{% endconfiguration_basic %}

### Sensors

Select entities to expose as SpaceAPI sensors. Each sensor type accepts one or more entities. The unit of measurement is taken from the entity's attributes when available, falling back to the defaults listed below.

- **Temperature**: Default unit is °C
- **Humidity**: Default unit is %
- **Barometer**: Default unit is hPa
- **CO₂**: Default unit is ppm
- **Power consumption**: Default unit is W
- **Power generation**: Default unit is W
- **Beverage supply**: Default unit is btl
- **Account balance**: Default unit is EUR
- **Radiation**: Default unit is µSv/h
- **Network traffic**: Default unit is packets_per_second
- **Total member count**: No unit
- **People now present**: No unit
- **Network connection**: No unit
- **Door lock**: Reports a boolean value; no unit

### Space federation

Indicate whether your space participates in the SpaceFED federated login scheme.

{% configuration_basic %}
SpaceNet:
  description: Enable if your space supports SpaceNet, which allows visiting hackers to use your space's Wi-Fi with credentials from their home space.
SpaceSAML:
  description: Enable if your space supports SpaceSAML authentication.
{% endconfiguration_basic %}

### Location

Physical location details for your space.

{% configuration_basic %}
Address:
  description: The physical address of the space.
Timezone:
  description: "The timezone of the space, for example: `Europe/Vienna`."
Country code:
  description: "The two-letter ISO 3166-1 alpha-2 country code, for example: `AT`, `DE`, or `US`."
Hint:
  description: Additional directions or context to help visitors find the space.
{% endconfiguration_basic %}

### Webcams

{% configuration_basic %}
Camera URLs:
  description: One or more URLs of camera streams for the space.
{% endconfiguration_basic %}

### Feeds

Links to content feeds published by your space. Each feed accepts an optional type (`rss`, `atom`, or `ical`) and a URL.

{% configuration_basic %}
Blog URL:
  description: URL of the space's blog feed.
Blog type:
  description: Type of the blog feed.
Wiki URL:
  description: URL of the space's wiki feed.
Wiki type:
  description: Type of the wiki feed.
Calendar URL:
  description: URL of the space's calendar feed.
Calendar type:
  description: Type of the calendar feed.
Flickr URL:
  description: URL of the space's Flickr feed.
Flickr type:
  description: Type of the Flickr feed.
{% endconfiguration_basic %}

### Events

The events section of the SpaceAPI output is built from the recent state history of the entities you select here.

{% configuration_basic %}
Activity entities:
  description: Entities whose state changes are published as SpaceAPI events. The event type is derived from the entity's object ID — for example, `sensor.workshop` produces events of type `workshop`. The event timestamp is the entity's last changed time.
Time window (hours):
  description: How many hours of history to include when building the events list. Defaults to 24 hours when not set.
{% endconfiguration_basic %}

### Projects

{% configuration_basic %}
Project URLs:
  description: URLs of projects hosted or maintained by your space.
{% endconfiguration_basic %}

## Subentries

The following types of subentries can be added to the integration via the **Add** button on the integration card. Each subentry adds structured data to the SpaceAPI output.

### Links

Add links to resources associated with your space.

{% configuration_basic %}
Name:
  description: Name of the link.
URL:
  description: URL of the link.
Description:
  description: Optional description of the link.
{% endconfiguration_basic %}

### Membership plans

Document the membership tiers your space offers.

{% configuration_basic %}
Name:
  description: Name of the membership plan.
Value:
  description: Numeric price of the plan.
Currency:
  description: "Currency of the price, for example: `EUR` or `USD`."
Billing interval:
  description: "How often the plan is billed. Valid values are: `yearly`, `quarterly`, `monthly`, `weekly`, `daily`, `hourly`, or `other`."
Description:
  description: Optional description of the plan.
{% endconfiguration_basic %}

### Linked spaces

Link to other hackerspaces affiliated with yours.

{% configuration_basic %}
SpaceAPI endpoint URL:
  description: The URL of the SpaceAPI endpoint of the linked space.
Website URL:
  description: Optional website URL of the linked space.
{% endconfiguration_basic %}

### Location areas

Define named areas within your space.

{% configuration_basic %}
Name:
  description: Name of the area.
Description:
  description: Optional description of the area.
Size (m²):
  description: Optional size of the area in square meters.
{% endconfiguration_basic %}

### Wind sensors

Add wind measurement data to the SpaceAPI output. Wind sensor data uses a nested structure defined by the SpaceAPI v15 specification, so it is managed as a subentry rather than an inline sensor selector.

{% configuration_basic %}
Name:
  description: Name of this wind sensor entry.
Location:
  description: A description of where the wind sensor is located.
Speed sensor:
  description: Entity that reports wind speed.
Gust sensor:
  description: Entity that reports wind gust speed.
Direction sensor:
  description: Entity that reports wind direction in degrees.
Elevation sensor:
  description: Entity that reports the elevation at the sensor location.
{% endconfiguration_basic %}

## Accessing the API

Once configured, the SpaceAPI endpoint is available at:

```text
https://[DOMAIN_OR_IP_WITH_PORT]/api/spaceapi
```

Replace `[DOMAIN_OR_IP_WITH_PORT]` with your Home Assistant instance's domain or IP address and port, for example: `http://192.168.1.100:8123/api/spaceapi` or `https://homeassistant.local:8123/api/spaceapi`.

### API version

This {% term integration %} implements SpaceAPI **version 15**.

### Public access and CORS

The SpaceAPI endpoint is publicly accessible without authentication. This is intentional, as SpaceAPI is a standard for sharing hackerspace status information with the public. Cross-origin requests (<abbr title="Cross-Origin Resource Sharing">CORS</abbr>) are also allowed, so web apps can query the endpoint directly from a browser.

### Testing the endpoint

You can test your SpaceAPI endpoint using curl:

```bash
curl http://YOUR_HOME_ASSISTANT_URL:8123/api/spaceapi
```

## Known limitations

- **Wind sensors** use a nested data structure required by the SpaceAPI v15 specification. They must be added as subentries rather than selected in the sensors options.
- **Events** are built from the state history of the configured activity entities. An entity must have recorded state changes within the configured time window for its events to appear in the output.
- **Location areas** are managed as subentries and cannot be configured inline in the location options.

## Troubleshooting

### The space shows as closed when it should be open

#### Symptom: `"open": false` in the API response

The `state.open` field in the JSON at `/api/spaceapi` is `false` even though your space is open.

#### Description

The integration reads the current state of the configured state entity. If the entity is unavailable, Home Assistant reports the space as closed by default as a safe fallback.

#### Resolution

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select the SpaceAPI integration.
2. Select **Configure** and verify that the **State entity** field points to the correct entity.
3. Open **Developer tools** > **States** and confirm that the entity's current state is what you expect.
4. If the entity shows as unavailable, resolve the underlying issue with that entity first, then recheck the endpoint.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
