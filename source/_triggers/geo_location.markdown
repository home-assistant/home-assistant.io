---
title: "Geolocation"
trigger: geo_location
domain: geo_location
description: "Triggers when a geolocation event, such as a weather alert or an earthquake, enters or leaves a zone."
related_triggers:
  - zone.entered
  - zone.left
---

The **Geolocation** trigger reacts when an event from an [integration that provides geolocation entities](/integrations/geo_location/#integrations-that-provide-geolocation-entities), such as a bush fire or an earthquake, enters or leaves a zone. This includes new events that appear in the zone and events that disappear from it. Use it for real-world events near your home, such as weather alerts, bush fires, or earthquakes.

For people and tracked devices, use the [Zone entered](/triggers/zone.entered/) or [Zone left](/triggers/zone.left/) trigger instead.

To tell the trigger which entities to watch, you enter the source of the integration that creates them, for example, `gdacs`. For the source of each integration, refer to [Integrations that provide geolocation entities](/integrations/geo_location/#integrations-that-provide-geolocation-entities).

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Geolocation**.
5. Under **Source**, enter the source of the integration that creates the entities, for example, `nsw_rural_fire_service_feed`.
6. Under **Zone**, select the zone.
7. Under **Event**, select **Enter** or **Leave**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Source:
  description: The source of the integration that creates the entities, for example, `gdacs`.
  required: true
Zone:
  description: The zone to watch.
  required: true
Event:
  description: |
    When the trigger reacts:

    - **Enter**: when an event appears in the zone or moves into it. This is the default.
    - **Leave**: when an event disappears from the zone or moves out of it.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, use `trigger: geo_location`. A basic example looks like this:

{% example %}
trigger: |
  trigger: geo_location
  source: nsw_rural_fire_service_feed
  zone: zone.bush_fire_alert_zone
  event: enter
{% endexample %}

This reacts when a new incident of the NSW Rural Fire Service appears in the bush fire alert zone.

### Options in YAML

{% options_yaml %}
trigger:
  description: The trigger type. For this trigger, use `geo_location`.
  required: true
  type: string
source:
  description: The source of the integration that creates the entities.
  required: true
  type: string
zone:
  description: The entity ID of the zone to watch.
  required: true
  type: string
event:
  description: "`enter` reacts when an event appears in or moves into the zone. `leave` reacts when an event disappears from or moves out of the zone."
  required: false
  default: enter
  type: string
{% endoptions_yaml %}

## Good to know

- Geolocation entities are temporary, so you can't select a specific one in advance. This is why the trigger uses the source.
- To react only to some events, add a [Template condition](/conditions/template/) that checks their attributes, for example, the type of incident. The [bush fire example](#automation-get-a-notification-about-a-bush-fire-near-your-home) shows how.
- For the data you can use in templates, refer to the [geolocation trigger variables](/docs/automation/templating/#geolocation).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: get a notification about a bush fire near your home

This example uses the [NSW Rural Fire Service Incidents](/integrations/nsw_rural_fire_service_feed/) integration and a passive zone named **Bush fire alert zone**. When a bush fire is reported in the zone, a notification is shown in Home Assistant.

- **Trigger**: Geolocation
  - **Source**: `nsw_rural_fire_service_feed`
  - **Zone**: Bush fire alert zone
  - **Event**: Enter
- **Condition**: Template
  - The incident type is `Bush Fire`.
- **Action**: Create persistent notification
  - **Message**: the incident name and status

Create the zone in {% my zones title="**Settings** > **Areas, labels & zones**" %} and turn on **Passive**.

{% details "YAML example for the integration and the zone" %}

```yaml
geo_location:
  - platform: nsw_rural_fire_service_feed
    latitude: -36.666667
    longitude: 149.833333
    radius: 15
    categories:
      - "Emergency Warning"
      - "Watch and Act"
      - "Advice"

zone:
  - name: Bush fire alert zone
    latitude: -36.666667
    longitude: 149.833333
    radius: 15000
    passive: true
```

{% enddetails %}

{% details "YAML example for the automation" %}

{% example %}
automation: |
  alias: "Bush fire alert"
  triggers:
    - trigger: geo_location
      source: nsw_rural_fire_service_feed
      zone: zone.bush_fire_alert_zone
      event: enter
  conditions:
    - condition: template
      value_template: "{{ trigger.to_state.attributes.type == 'Bush Fire' }}"
  actions:
    - action: persistent_notification.create
      data:
        title: "Bush fire alert"
        message: >
          {{ trigger.to_state.name }} - {{ trigger.to_state.attributes.status }}
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
