---
title: Västtrafik
description: Instructions on how to integrate timetable data for traveling in Sweden within Home Assistant.
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: '0.30'
ha_domain: vasttrafik
ha_platforms:
  - sensor
ha_integration_type: service
ha_config_flow: true
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `vasttrafik` {% term integration %} will provide you traveling details for the larger Göteborg area in Sweden from the [Västtrafik](https://vasttrafik.se/) public transportation service.

You must create an application [here](https://developer.vasttrafik.se/applications) to obtain a `key` and a `secret`. Make sure to also subscribe to the API by clicking on `Prenumerera på nytt API`, and selecting the API `Planera Resa v4`.

## Configuration

Västtrafik is configured via the UI. Go to **Settings** → **Devices & Services** → **Add Integration** and search for "Västtrafik".

You will need your API credentials obtained in the prerequisites section above.

### Initial Setup

1. Add the Västtrafik integration from **Settings** → **Devices & Services**
2. Enter your API key and secret when prompted
3. The integration will be added as a service

### Adding Departure Boards

Once the main integration is configured, you can add departure boards:

1. Go to **Settings** → **Devices & Services** → **Västtrafik**
2. Click **"Add departure board"**
3. Search for your departure station (e.g., "Central", "Musikvägen")
4. Select the station from the results
5. Configure your departure board:
   - **Name**: Optional custom name for the sensor
   - **Destination**: Optional filter for specific destination (e.g., "Järntorget")
   - **Lines**: Optional comma-separated list of line numbers (e.g., "1, 2, 7")
   - **Tracks/Platforms**: Optional comma-separated list (e.g., "A, B, 1")
   - **Delay**: Minutes to add to current time for departure lookup (default: 0)

## Troubleshooting Station Selection

The departure board configuration includes an interactive station search. If the wrong station is being selected during setup:

1. Try using the full station name (e.g., "Musikvägen, Göteborg")
2. Use more specific search terms to narrow down results
3. Try alternative names or spellings of the station

If problems persist, you can find the exact station ID for troubleshooting:

1. Login to the Västtrafik API and go to ["Applikationer"](https://developer.vasttrafik.se/applications)
2. Click "* Generera accesstoken", then "Kopiera"
3. Execute this `curl` command, replacing `<ACCESS_TOKEN>` and `<STATION_NAME>`:

   ```shell
   curl -H "Authorization: Bearer <ACCESS_TOKEN>" "https://ext-api.vasttrafik.se/pr/v4/locations/by-text?q=<STATION_NAME>"
   ```

4. In the output, find the "gid" for your desired stop. If the UI search doesn't work with this station name, please report the issue to the integration maintainers.

## Migration from YAML Configuration

If you previously configured Västtrafik in your `configuration.yaml` file, you should:

1. Remove the YAML configuration from your `configuration.yaml`
2. Restart Home Assistant
3. Add the integration via the UI as described above
4. Reconfigure your departure boards using the new UI flow

The old YAML configuration method is still supported but deprecated.
