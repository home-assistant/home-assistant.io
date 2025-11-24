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
---

The `vasttrafik` {% term integration %} will provide you traveling details for the larger Göteborg area in Sweden from the [Västtrafik](https://vasttrafik.se/) public transportation service.

## Prerequisites

- You must create an application [via the vasttrafik developer page](https://developer.vasttrafik.se/applications) to obtain a `key` and a `secret`. 
- Subscribe to the API by selecting **Prenumerera på nytt API**, and selecting the API **Planera Resa v4**.


{% include integrations/config_flow.md %}

### Adding departure boards

Once the main integration is configured, you can add departure boards:

1. Go to {% my integrations title="**Settings** > **Devices & services** > **Västtrafik**" domain="vasttrafik" %}.
2. Select **Add departure board**.
3. Search for your departure station (for example, "Central", "Musikvägen").
4. Select the station from the results.
5. Configure your departure board:
   - **Name**: Optional custom name for the sensor
   - **Destination**: Optional filter for specific destination (for example, "Järntorget")
   - **Lines**: Optional comma-separated list of line numbers (for example, "1, 2, 7")
   - **Tracks/Platforms**: Optional comma-separated list (for example, "A, B, 1")
   - **Delay**: Minutes to add to current time for departure lookup (default: 0)

## Troubleshooting station selection

The departure board configuration includes an interactive station search. If the wrong station is being selected during setup:

1. Try using the full station name (for example, "Musikvägen, Göteborg").
2. Use more specific search terms to narrow down results.
3. Try alternative names or spellings of the station.

If problems persist, you can find the exact station ID for troubleshooting:

1. Login to the Västtrafik API and go to ["Applikationer"](https://developer.vasttrafik.se/applications).
2. Select **\* Generera accesstoken**, then **Kopiera**.
3. Execute this `curl` command, replacing `<ACCESS_TOKEN>` and `<STATION_NAME>`:

   ```shell
   curl -H "Authorization: Bearer <ACCESS_TOKEN>" "https://ext-api.vasttrafik.se/pr/v4/locations/by-text?q=<STATION_NAME>"
   ```

4. In the output, find the "gid" for your desired stop. If the UI search doesn't work with this station name, please report the issue to the integration maintainers.

## Migration from YAML configuration

If you previously configured Västtrafik in your `configuration.yaml` file, your existing configuration will be automatically imported when you upgrade to a version that includes this feature.

After the automatic import:

1. A repair notification will be created in **Settings** > **System** > **Repairs**.
2. Your existing departure boards will be migrated as sub-entries under the main Västtrafik integration.
3. You can safely remove the YAML configuration from your `configuration.yaml` file after verifying the import was successful.
4. Restart Home Assistant to complete the migration.

The YAML configuration method is deprecated and will be removed in a future release. All new departure boards should be added through the UI as described above.

