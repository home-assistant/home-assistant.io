---
title: Legrand Home+ Control
description: Instructions on how to integrate Legrand Home+ Control into Home Assistant.
ha_category:
  - Switch
ha_release: '2021.03'
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@chemaaa'
ha_config_flow: true
ha_domain: home_plus_control
---

The Home+ Control integration platform allows you to control a range of Legrand in-wall switches and power outlets that have smart home functionality thanks to their "with Netatmo" capabilities. 

This integration works against the Home+ Control API, which is one of the many APIs offered through the [*Works with Legrand*](https://developer.legrand.com/) program. The API is capable of managing "Legrand/Btcino with Netatmo" devices, such as light switches, power outlets and rolling shutters.

The devices that this API can manage are offered in different designs across different countries. The details of these can be found [here](https://developer.legrand.com/solutions/wiring-devices-with-netatmo/).

This Home+ Control integration for Home Assistant currently has support for the following devices: 
- Light switches
- Power outlets

In both cases, the devices are modeled as on/off switches within Home Assistant.

This integration has been tested to work with the following range of Legrand products:
- Valena Next™ with Netatmo


## Authentication

Before you are able to configure the Legrand Home + Control integration into Home Assistant, you must register with the *Works with Legrand* platform.

These Legrand APIs rely on Oauth2 authentication, so you must follow these steps to obtain the necessary authentication parameters:

1. Register an account at <https://developer.legrand.com>.
2. Create a subscription to the *Starter Kit* (currently the only subscription available) and this will generate your `SUBSCRIPTION_KEY`.
3. Register an application, where you will have to define a name, a redirect URL and the scopes of your application. When selecting the scopes, be sure to include all of the `.read` scopes, as well as the `light.write` and `plug.write` scopes to be able to control these modules from the integration.

Once the registered application is confirmed, you should receive an email containing the `CLIENT_IDENTIFIER` and the `CLIENT_SECRET` which you will be using to set up the authentication flows. The application confirmation email is usually received within a few hours of having issued the request.

Finally, to set up Oauth2 authentication in Home Assistant you should add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
home_plus_control:
  client_id: CLIENT_IDENTIFIER
  client_secret: CLIENT_SECRET
  subscription_key: SUBSCRIPTION_KEY
```

{% configuration %}
client_id:
  description: Client identifier for your registered application on the *Works with Legrand* platform. Received via email.
  required: true
  type: string
client_secret:
  description: Client secret for your registered application on the *Works with Legrand* platform. Received via email.
  required: true
  type: string
subscription_key:
  description: Subscription identifier for your registered account on the *Works with Legrand* platform. Provided upon registration.
  required: true
  type: string
{% endconfiguration %}


At this point, you are now ready to add the Home+ Control integration to your Home Assistant instance as described in the [Configuration](#configuration) section.


{% include integrations/config_flow.md %}


## Polling Intervals

The Legrand Home+ Control API is a cloud-based polling interface. This Home Assistant integration presents 3 different polling intervals:

- Plant information request
- Plant topology request
- Module status request

Refer to the [nomenclature](#api-nomenclature) section for details of what these names mean.
Refer to the [API limitations](#api-limitations) section to better understand the reason for these polling intervals.

The polling intervals can be [configured](#polling-interval-configuration) via the integration's `OPTIONS` in the Home Assistant UI.

### Plant Information Request

This call retrieves the information of the plants that are associated with a user. It is assumed that this information does not change very often. For the most part, a user will have a single *Legrand Home+ Control* gateway in their home, i.e., a single *plant*, and this will not change frequently.

For this reason, the default polling interval for the plant information is set to a large value: 7200 seconds (2 hours).

### Plant Topology Request

This call retrieves the *layout* of the devices that make up a *plant*. This provides the list of devices, their names and some additional information about the devices (but not their status).

It is assumed that plant topology is not changing very often, so the default polling interval for this information is set to a default value of 3600 seconds (1 hour).

### Module Status Request

This call retrieves the current operating status of the devices that make up the plant's topology - this includes the *reachability* of the device and its on/off status. 

This information is expected to change frequently, so the polling interval is set to a lower default value of 300 seconds (5 minutes). This is still not as frequent as would be ideal, but is still reasonable considering the API calls-per-day limitation.

### Polling Interval Configuration

The polling intervals can be configured via the integration's `OPTIONS` in the Home Assistant UI.

{% configuration_basic %}
Plant Information:
  description: Number of seconds between polling intervals of the plant information.
Plant Topology:
  description: Number of seconds between polling intervals of the plant topology data.
Module Status:
  description: Number of seconds between polling intervals of the module status information.
{% endconfiguration_basic %}

## API Nomenclature

Within the context of the Home+ Control API you may come across the following terms:

* *Plant*: This is the term used to represent a *home* that holds the Legrand devices. In practice, a *plant* is represented by the *Legrand Home+ Control* gateway that acts as the central hub of the rest of the devices in the home network (uses Zigbee).
* *Module*: This is the term used to represent a generic device within the *plant*, i.e., a light, a plug, a remote, etc.
* *Light*: This is the term used to represent a light switch (or a micro-module). It is not modeled as your usual light entity because there are no brightness, color, etc. controls. It is modeled as an on/off switch.
* *Plug*: This is the term used to represent a power outlet.

Other devices that are mentioned in the API, but that are not currently supported by this integration are: *remotes* (wireless switches), *heaters* and *automations*.

## API Limitations

As mentioned in the [authentication](#authentication) section, this integration requires you to set up a subscription in the *Works with Legrand* platform. 

Currently, end-users only have access to the *Starter Kit* subscription which has a major limitation in the number of allowed API requests that are allowed - only 500 API calls per day (counter is reset at 00:00 every day).

This means that the integration has to set default polling intervals that are considerably larger than one would want for a Home Assistant integration. These intervals are [configurable](#polling-interval-configuration), but take care not to exceed the daily quota to prevent the integration from failing with `403 Forbidden` HTTP responses.
