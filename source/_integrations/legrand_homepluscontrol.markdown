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
ha_domain: homepluscontrol
---

The `Home+ Control` integration platform allows you to control a range of Legrand in-wall switches and power outlets that have smarthome functionality thanks to their "with Netatmo" capabilities. 

This integration works against the `Home+ Control` API, which is one of the many APIs offered through the *Works with Legrand* program (https://developer.legrand.com/). The API is capable of managing "Legrand/Btcino with Netatmo" devices, such as light switches, power outlets and rolling shutters.

The devices that this API can manage are offered in different designs across different countries. The details of these can be found in the following page: https://developer.legrand.com/solutions/wiring-devices-with-netatmo/

Legrand offers the Home+ Control smartphone app to manage these devices. You can find this app in the Google Play and Apple App stores.

This `Home+ Control` integration for Home Assitant currently has support for the following devices: 
- Light switches
- Power outlets

In both cases, the devices are modelled as simple on/off switches within Home Assistant.

This integration has been tested to work with the following range of Legrand products:
- Valena Next™ with Netatmo

{% include integrations/config_flow.md %}

## Authentication
Before you are able to configure the Legrand `Home + Control` integration into Home Assistant, you must register with the *Works with Legrand* platform.

These Legrand APIs rely on Oauth2 authentication, so you must follow these steps to obtain the necessary authentication parameters:

1) Register an account at https://developer.legrand.com/
2) Create a subscription to the *Starter Kit* (currently the only subscription available) and this will generate your SUBSCRIPTION_KEY.
3) Register an Application, where you will have to define a name, a redirect URL and the scopes of your application (for simplicity you can mark all scopes). 

Once the registered Application is confirmed, you should receive an email containing the CLIENT_IDENTIFIER and the CLIENT_SECRET which you will be using to set up the authentication flows. The Application confirmation email is usually received within a few hours of having issued the request.

### Authentication Flow
Communication with the API, first requires Oauth2 authentication to obtain an access and a refresh token. Subsequent requests to the API, require the use of the SUBSCRIPTION_KEY in addition to the access token.

Information about the Oauth2 exchange is provided here: https://developer.legrand.com/tutorials/0auth2-end-point-url/

As part of the authentication exchange, a callback request is made to the REDIRECT_URL that was entered when you registered the application with the *Works with Legrand* platform. This redirect URL will take on the default value of your Home Assistant instance URL, but because this could differ from the URL that you entered in the Legrand registration form, the integration allows you to explicitly specify the redirect URL parameter that you would like to use.

## Polling Interval Configuration
The Legrand `Home+ Control` API is a cloud-based polling interface. This Home Assistant integration presents 3 different polling intervals:
1) Plant information request
2) Plant topology request
3) Module status request

Refer to the [nomenclature](#api-nomenclature) section for details of what these names mean.
Refer to the [API limitations](#api-limitations) section to better understand the reason for these polling intervals.

### Plant Information Request
This call retrieves the information of the plants that are associated to a user. It is assumed that this information does not change very often. For the most part, a user will have a single *Legrand Home+ Control* gateway in their home, i.e. a single *plant*, and this will not change frequently.

For this reason, the default polling interval for the plant information is set to a large value: 7200 seconds (2 hours).

### Plant Topology Request
This call retrieves the *layout* of the devices that make up a *plant*. This provide the list of device, their names and some additional information of the devices (but not their status).

It is assumed that plant topology is not changing very often, so the default polling interval for this information is set to a default value of 3600 seconds (1 hour).

### Module Status Request
This call retrieves the current operating status of the devices that make up the plant's topology - this includes the *reachability* of the device and its on/off status. 

This information is expected to change frequently, so the polling interval is set to a lower default value of 300 seconds (5 minutes). This is still not as frequent as would be ideal, but is still reasonable considering the API's calls-per-day limitation.


## API Nomenclature
Within the context of the `Home+ Control` API you may come across the following terms:
* *Plant*: This is the term used to represent a *home* that holds the Legrand devices. In practice, a *plant* is represented by the *Legrand Home+ Control* gateway that acts as the central hub of the rest of the devices in the home network (uses Zigbee).
* *Module*: This is the term used to represent a generic device within the *plant*, i.e. a light, a plug, a remote, etc.
* *Light*: This is the term used to represent a light switch (or a micro-module). It is not modeled as your usual light entity because there are no brightness, color, etc. controls. It is modeled as a simple on/off switch component.
* *Plug*: This is the term used to represent a power outlet.

Other devices that are mentioned in the API, but that are not currently supported by this integration are: *remotes* (wireless switches), *heaters* and *automations*.

## API Limitations
As mentioned in the [authentication](#authentication) section, this integration requires you to set up a subscription in the *Works with Legrand* platform. 

Currently, end-users only have access to the *Starter Kit* subscription which has a major limitation in the number of allowed API requests that are allowed - only 500 API calls per day (counter is reset at 00:00 every day).

This means that the integration has to set default polling intervals that are considerably larger than one would want for a Home Assistant integration. These intervals are [configurable](#polling-interval-configuration), but take care not to exceed the daily quota to prevent the integration from failing with `403 Forbidden` HTTP responses.






