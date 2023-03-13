---
title: Goalfeed
description: Instructions on how to setup Goalfeed events within Home Assistant.
logo: goalfeed.png
ha_category:
  - Other
ha_iot_class: Cloud Push
ha_release: 0.63
ha_domain: goalfeed
ha_integration_type: integration
---

The `goalfeed` integration lets you use your Goalfeed account to trigger events in Home Assistant whenever a NHL or MLB team scores. 

To use this component, enter your email address and password from your goalfeed.ca account in your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
goalfeed:
  username: YOUR_E_MAIL_ADDRESS
  password: YOUR_PASSWORD
```

{% configuration %}
username:
  required: true
  description: The email address on your goalfeed.ca account.
  type: string
password:
  required: true
  description: The password on your goalfeed.ca account.
  type: string
{% endconfiguration %}

Now you can use the goal event type in your automations:

```yaml
- alias: 'Jets Goal'
  trigger:
    platform: event
    event_type: goal
    event_data:
      team_name: "Winnipeg Jets"
```

Goal events have the following event data:

- **team**: Three letter code representing the team. This is unique within the leagues, but not unique across the leagues (i.e., 'WPG' or 'TOR').
- **team_name**: The team that scored (i.e., 'Winnipeg Jets' or 'Toronto Blue Jays').
- **team_hash**: A unique hash for the team (you can find these values on https://goalfeed.ca/get-teams).
- **league_id**: A unique number for the league.
- **league_name**: A the short name of the league (i.e., 'NHL' or 'MLB').
