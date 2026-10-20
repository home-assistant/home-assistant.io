---
title: Meraki
description: Instructions on how to use Cisco Meraki networks for presence detection in Home Assistant.
ha_categories:
  - presence_location.network_presence
  - computers_network.routers_network
ha_iot_class: Cloud Polling
ha_release: '0.60'
ha_domain: meraki
ha_codeowners:
  - '@felixblang'
ha_config_flow: true
ha_platforms:
  - device_tracker
ha_integration_type: hub
related:
  - url: https://dashboard.meraki.com/
    title: Meraki Dashboard
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The **Meraki** {% term integration %} connects Home Assistant to [Cisco Meraki](https://meraki.cisco.com/) networks through the [Meraki Dashboard API](https://developer.cisco.com/meraki/api-v1/). It tracks whether the clients of your networks, such as phones and laptops on Wi-Fi or computers on a Meraki switch, are connected, and which Bluetooth devices your access points hear.

An older way of presence detection through the Meraki CMX location service is set up in YAML; see [Presence detection with the CMX location service](#presence-detection-with-the-cmx-location-service).

## Use case

- Know who is home: a phone that connects to your Wi-Fi marks its owner as home.
- Notice when a wired device, such as a NAS, drops off the network.

## Prerequisites

The integration needs a Meraki Dashboard API key with access to your organization. In the Meraki Dashboard, enable API access for the organization and create an API key, as described in Meraki's [authorization guide](https://developer.cisco.com/meraki/api-v1/authorization/). A key of an administrator with read-only access is enough.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
  description: "Your Meraki Dashboard API key."
Organization:
  description: "The Meraki organization to add. This step is only shown when the API key has access to several organizations. To add more than one organization, add the integration again for each."
{% endconfiguration_basic %}

## Supported functionality

### Device trackers

- **Clients**: A tracker for each Wi-Fi or wired client seen in the organization's networks in the last hour. It is home while Meraki reports the client online, and shows the client's IP address, MAC address and hostname.
- **Bluetooth devices**: A tracker for each named Bluetooth device the access points hear, for networks with Bluetooth scanning enabled. It is home while an access point heard it in the last five minutes.

Like other network-based trackers, new trackers are disabled until you enable them, unless another integration already knows the device by its MAC address. Client trackers are then added to that device.

## Automation example

### Turn off the lights when everyone has left

{% details "Example YAML configuration" %}

{% example %}
automation: |
  alias: "Turn off the lights when the phones leave"
  triggers:
    - trigger: state
      entity_id:
        - device_tracker.pixel_9
        - device_tracker.iphone
      to: not_home
      for: "00:10:00"
  conditions:
    - condition: state
      entity_id:
        - device_tracker.pixel_9
        - device_tracker.iphone
      state: not_home
  actions:
    - action: light.turn_off
      target:
        area_id: living_room
{% endexample %}

{% enddetails %}

## Data updates

The integration polls the Meraki Dashboard API every minute: one request for the organization's networks, plus one for the clients of each network and one for the Bluetooth devices of each network with access points. With a few networks, this stays well within Meraki's rate limit of 10 requests per second per organization.

## Known limitations

- Each organization is added as a separate entry. The same API key can be used for several organizations.
- The Dashboard API does not provide a client's position, so unlike the CMX presence detection, the trackers don't show devices on the map. They only tell whether a device is home.
- Only Bluetooth devices with a name get a tracker. Phones and many other devices use Bluetooth addresses that change every few minutes and advertise no name; these cannot be followed.

## Troubleshooting

### The API key is not accepted

- Make sure API access is enabled for the organization in the Meraki Dashboard.
- Make sure the API key belongs to an administrator of the organization you want to add.

### The integration asks to reauthenticate

The API key was revoked, or its administrator lost access to the organization. Create a new API key in the Meraki Dashboard for an administrator who has access to the organization, or restore the administrator's access first, then enter the key when Home Assistant asks for it.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

The CMX presence detection described below is set up in YAML and is removed by removing its configuration from your {% term "`configuration.yaml`" %} file.

## Presence detection with the CMX location service

Use your Meraki AP as device tracker. Note that Meraki will see all devices, not only connected to the network. This requires Home Assistant to be reachable from the internet, as Meraki sends the data to it.

### Prerequisites

1. Go to Network-wide/General page, and find the Location and scanning section.
2. Make sure analytics and Scanning API are both enabled.
3. Make note of the Validator string, which will be used in the `device_tracker` configuration.
4. Click **Add a Post URL**:
   1. Set the Post URL to `https://YOUR_HOSTNAME/api/meraki`
   2. Set the Secret to a randomly generated string, and make note of it for the `device_tracker` configuration.
   3. Make sure the API Version is set to `2.0`.
   4. Hit **Save** in the bottom right of the page.

### Configuration

After you configure access to the Meraki CMX API, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: meraki
    secret: your_secret
    validator: meraki_validator
```

{% configuration %}
  secret:
    description: Secret code added in Meraki.
    required: true
    type: string
  validator:
    description: Validation string from Meraki.
    required: true
    type: string
{% endconfiguration %}
