---
title: ConnectedCars.io
description: Instructions on how to integrate ConnectedCars.io within Home Assistant.
ha_category:
  - Car
  - Presence Detection
  - Sensor
ha_release: 0.112
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@heslegrave'
ha_domain: connectedcars
---

The `connectedcars` integration uses the [ConnectedCars.io](https://connectedcars.io/) web service as a source for car data.
This is mainly used by the Volkswagen group in Denmark and is the backside of [MinVolkswagen](https://site.volkswagen.dk/minvolkswagen/).

Thanks to [niklascp](https://pypi.org/user/niklascp/) for creating the PyPi lib so I did not have to..

## Setup

You have to get an ConnectedCars.io account and have a connection device installed in the car. In Denmark this is free-of-charge (at moment of writing) on Volkswagen cars [MinVolkswagen](https://site.volkswagen.dk/minvolkswagen/).

## Configuration

To add ConnectedCars.io to your installation, go to **Configuration** >> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **ConnectedCars**.
Simply put you `username`, `password` and `namespace`.
The `namespace` can be found if you login to [ConnectedCars.io GraphQL](https://api.connectedcars.io/graphql/graphiql/#) - look to the upper right corner after login.
Vin is still not used, the integration adds the cars entities by itself.

<div class="note warning">

The integration is set to update every 5 minutes, there should maybe be a setting for this in the future.

</div>
