---
title: Space API
description: Instructions on how to configure the SpaceAPI for Home Assistant.
ha_category:
  - Social
ha_iot_class: Cloud Polling
ha_release: '0.70'
ha_codeowners:
  - '@fabaff'
ha_domain: spaceapi
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `spaceapi` {% term integration %} allow Hackerspaces to expose information to web apps or any other application with the [SpaceAPI](https://spaceapi.io/).

## Configuration

To setup the `spaceapi` {% term integration %} in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
spaceapi:
  space: HACKERSPACE_NAME
  logo: URL_FOR_LOGO
  url: URL
  location:
    address: ADDRESS
  contact:
    email: EMAIL_ADDRESS
  issue_report_channels:
    - email
  state:
    entity_id: binary_sensor.front_door
```

{% configuration %}
space:
  description: Name of the Hackerspace.
  required: true
  type: string
logo:
  description: URL which is publicly accessible of the logo.
  required: true
  type: string
url:
  description: URL of the hackerspace's web site.
  required: true
  type: string
location:
  description: Location of the Hackerspace.
  required: false
  type: map
  keys:
    address:
      description: The physical address of the Hackerspace.
      required: true
      type: string
contact:
  description: Contact information of the Hackerspace. At least one entry is mandatory.
  required: true
  type: map
  keys:
    phone:
      description: The phone number of the Hackerspace.
      required: false
      type: string
    sip:
      description: The SIP URI for Voice-over-IP of the Hackerspace.
      required: false
      type: string
    keymasters:
      description: Persons who carry a key and are able to open the space upon request. One of the fields must be specified.
      required: false
      type: list
      keys:
        name:
          description: Real Name of the keymaster.
          required: false
          type: string
        irc_nick:
          description: Contact the person with this nickname directly in irc if available. The irc channel to be used is defined in the contact/irc field.
          required: false
          type: string
        phone:
          description: Phone number of the keymaster.
          required: false
          type: string
        email:
          description: Email address of the keymaster.
          required: false
          type: string
        twitter:
          description: X username of the keymaster.
          required: false
          type: string
    irc:
      description: The IRC channel of the Hackerspace
      required: false
      type: string
    twitter:
      description: The X account of the Hackerspace.
      required: false
      type: string
    facebook:
      description: The facebook URL of the Hackerspace.
      required: false
      type: string
    identica:
      description: The Identi.ca or StatusNet account of the Hackerspace.
      required: false
      type: string
    foursquare:
      description: The Foursquare ID of the Hackerspace.
      required: false
      type: string
    email:
      description: The email address of the Hackerspace.
      required: true
      type: string
    ml:
      description: The mailing list of the Hackerspace.
      required: false
      type: string
    jabber:
      description: The public Jabber/XMPP multi-user chatroom of the Hackerspace.
      required: false
      type: string
    issue_mail:
      description: A separate email address for issue reports.
      required: false
      type: string
issue_report_channels:
  description: "The reporting channel for issues. Valid values are `email`, `issue_mail`, `twitter` or `ml`"
  required: true
  type: list
state:
  description: The current state of the Hackerspace.
  required: true
  type: list
  keys:
    entity_id:
      description: "The `entity_id` of a binary sensor that represents the current state."
      required: true
      type: string
    icon_open:
      description: The URL which is publicly accessible of the icon for the open Hackerspace.
      required: false
      type: string
    icon_closed:
      description: The URL which is publicly accessible of the icon for the closed Hackerspace.
      required: false
      type: string
feeds:
  description: Feeds where users can get updates of your space.
  required: false
  type: map
  keys:
    blog:
      description: The blog of your Hackerspace.
      required: false
      type: map
      keys:
        type:
          description: Type of the feed, for example rss, atom, ical
          required: false
          type: string
        url:
          description: Feed URL
          required: true
          type: string
    wiki:
      description: The wiki of your Hackerspace.
      required: false
      type: map
      keys:
        type:
          description: Type of the feed, for example rss, atom, ical
          required: false
          type: string
        url:
          description: Feed URL
          required: true
          type: string
    calendar:
      description: The calendar of your Hackerspace.
      required: false
      type: map
      keys:
        type:
          description: Type of the feed, for example rss, atom, ical
          required: false
          type: string
        url:
          description: Feed URL
          required: true
          type: string
    flicker:
      description: The Flicker stream of your Hackerspace.
      required: false
      type: map
      keys:
        type:
          description: Type of the feed, for example rss, atom, ical
          required: false
          type: string
        url:
          description: Feed URL
          required: true
          type: string
cache:
  description: Specifies options about caching of your SpaceAPI endpoint. Use this if you want to avoid hundreds/thousands of application instances crawling your status.
  required: false
  type: map
  keys:
    schedule:
      description: Cache update cycle. Valid values are m.02 | m.05 | m.10 | m.15 | m.30 | h.01 | h.02 | h.04 | h.08 | h.12 | d.01 |
      required: true
      type: string
projects:
  description: Your project sites (links to GitHub, wikis or wherever your projects are hosted).
  required: false
  type: list
radio_show:
  description: A list of radio shows that your hackerspace might broadcast.
  required: false
  type: list
  keys:
    name:
      description: The name of the radio show.
      required: true
      type: string
    url:
      description: The stream URL of the radio show.
      required: true
      type: string
    type:
      description: The stream encoder. Valid values are mp3 or ogg
      required: true
      type: string
    start:
      description: Specify the start time by using the ISO 8601 standard.
      required: true
      type: string
    end:
      description: Specify the end time by using the ISO 8601 standard.
      required: true
      type: string
sensors:
  description: List of sensors to expose.
  required: false
  type: list
  keys:
    temperature:
      description: List of temperature sensors.
      required: true
      type: string
    humidity:
      description: List of humidity sensors.
      required: true
      type: string
{% endconfiguration %}

The list of sensors can be any sensor, not just temperature or humidity.

## Examples

In this section you find some real-life examples of how to use this integration.

### Eastermundigen

A possible configuration entry for [Eastermundigen](https://www.eastermundigen.ch/), a Hackerspace in Switzerland, could look like this.

```yaml
# Example configuration.yaml entry
spaceapi:
  space: Eastermundigen
  logo: https://eastermundigen.ch/logo.png
  url: https://eastermundigen.ch
  location:
    address: "Steinbruchweg 16, 3072 Ostermundigen, Schweiz"
  contact:
    phone: "+41311111111"
    twitter: "@eastermundigen"
    email: "info@eastermundigen.ch"
  issue_report_channels:
    - email
  state:
    entity_id: "binary_sensor.front_door"
    icon_open: https://eastermundigen.ch/open.png
    icon_closed: https://eastermundigen.ch/close.png
  sensors:
    temperature:
      - "sensor.temperature_in"
      - "sensor.temperature_out"
    humidity:
      - "sensor.humidity_in"
      - "sensor.humidity_out"
```
