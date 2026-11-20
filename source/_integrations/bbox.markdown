---
title: Bbox
description: Instructions on how to integrate Bouygues Bbox routers into Home Assistant.
ha_release: 2027.1
ha_domain: bbox
ha_iot_class: local_polling
ha_integration_type: hub
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **Bbox** {% term integration %} lets you monitor your [Bbox Modem Router](https://www.bouyguestelecom.fr/offres-internet/bbox-fit) from Bouygues Telecom, a French Internet provider, and provides presence detection based on connected devices.

With this integration, you can track network bandwidth usage and detect which devices are present on your local network.

{% note %}
The integration is only available if Home Assistant and the Bbox are on the same local area network. You can check this by going to [mabbox.bytel.fr](https://mabbox.bytel.fr) with your web browser.
{% endnote %}

## Prerequisites

The admin password of your Bbox web interface is required. Recent firmware versions require an authenticated session to access the API.

{% include integrations/config_flow.md %}

The integration provides the following configuration options:

{% configuration_basic %}
Host:
  description: The hostname or IP address of your Bbox, for example `mabbox.bytel.fr` or `192.168.1.1`. The `mabbox.bytel.fr` domain name resolves to the router on your local network.
  required: true
  type: string
  default: mabbox.bytel.fr
Password:
  description: The admin password of your Bbox web interface.
  required: true
  type: string
Verify SSL:
  description: Verify the SSL certificate of the device. Disable only when connecting by IP address, because the Bbox certificate is issued for `mabbox.bytel.fr`.
  required: false
  type: boolean
  default: true
{% endconfiguration_basic %}

## Data updates

The **Bbox** integration {% term polling polls %} data from the device every 60 seconds by default.

## Supported functionality

The **Bbox** integration provides the following entities.

### Sensor

The integration provides sensors for monitoring your Bbox bandwidth:

- **Maximum Download Bandwidth**: The maximum bandwidth available for download.
- **Maximum Upload Bandwidth**: The maximum bandwidth available for upload.
- **Currently Used Download Bandwidth**: Instant measure of the current used bandwidth for download.
- **Currently Used Upload Bandwidth**: Instant measure of the current used bandwidth for upload.
- **Uptime**: Uptime since the last boot.
- **Number of reboot**: Number of reboots since the initial configuration of the router.

### Device Tracker

The integration can track devices connected to your Bbox router for presence detection. Device trackers are created disabled by default; enable the ones you want to keep.

## Migrating from YAML configuration

{% important %}
Configuring the **Bbox** integration using YAML is deprecated. Your existing `sensor` YAML configuration is imported into the UI automatically. Remove the `bbox` platform from the `sensor` section of your {% term "`configuration.yaml`" %} after the import to fix the repair issue. The `device_tracker` YAML platform keeps working until Home Assistant 2027.5 but is not imported automatically; it has its own migration repair.
{% endimportant %}

### Migrating sensors

When Home Assistant starts, your `sensor` YAML configuration is imported automatically into a config entry, including the `name` and `monitored_variables` options. Because the imported entry has no password, Home Assistant then asks you to reauthenticate and enter the admin password of your Bbox web interface.

To complete the migration:

1. Restart Home Assistant to trigger the automatic import.
2. Go to {% my integrations title="**Settings** > **Devices & services**" %} and confirm that your Bbox entry has been created.
3. When prompted, enter the admin password of your Bbox web interface (reauthentication).
4. Remove the `bbox` platform from the `sensor` section of {% term "`configuration.yaml`" %} and restart Home Assistant.

### Migrating device tracking

The `device_tracker` YAML configuration is not imported automatically because the trackers in `known_devices.yaml` keep their entity IDs until they are removed. A repair issue guides you through the manual migration before Home Assistant 2027.5:

1. Remove the `bbox` platform from the `device_tracker` section of {% term "`configuration.yaml`" %}.
2. Remove its tracked-device entries from `known_devices.yaml`, then restart Home Assistant.
3. Remove the existing Bbox entry under **Settings** > **Devices & services** and set the integration up again through the UI (you will be asked for the admin password).
4. Enable the device trackers you want to keep (they are created disabled by default). If an entity ID got suffixed, rename it back to the original one in the entity registry so automations and history keep working.

## Legacy YAML configuration (deprecated)

{% details "Deprecated YAML configuration" %}

### Device tracker

See the [device tracker integration page](/integrations/device_tracker/) for instructions on how to configure the people to be tracked.

{% example %}
device_tracker: |
  - platform: bbox
    host: mabbox.bytel.fr
    password: YOUR_BBOX_PASSWORD
    verify_ssl: true
{% endexample %}

### Sensor

{% example %}
sensor: |
  - platform: bbox
    host: mabbox.bytel.fr
    name: Bbox
    monitored_variables:
      - down_max_bandwidth
      - up_max_bandwidth
      - current_down_bandwidth
      - current_up_bandwidth
      - uptime
      - number_of_reboots
{% endexample %}

The available `monitored_variables` are:

- `down_max_bandwidth`: Maximum bandwidth available for download.
- `up_max_bandwidth`: Maximum bandwidth available for upload.
- `current_down_bandwidth`: Instant measure of the current used bandwidth for download.
- `current_up_bandwidth`: Instant measure of the current used bandwidth for upload.
- `uptime`: Uptime since the last boot.
- `number_of_reboots`: Number of reboots since the initial configuration of the router.

{% enddetails %}

## Supported devices

This integration has been tested with:

- Sagemcom F@st5688b (firmware 25.1.22)

## Known limitations

This integration only works if Home Assistant and the Bbox router are on the same local area network. Access from outside the local network is not supported.

The integration relies on the Bbox local API, which Bouygues Telecom may change in a firmware update without notice. If the integration stops working after a firmware update, check for a Home Assistant update.

## Troubleshooting

{% details "Cannot connect to the Bbox router" %}

### Symptom: "This device can't be reached"

When trying to set up the integration, the form shows the message "This device can't be reached".

#### Description

This usually means Home Assistant cannot reach your Bbox router on the local network.

#### Resolution

1. Verify your Bbox router is powered on and connected to your local network.
2. Try accessing [mabbox.bytel.fr](https://mabbox.bytel.fr) from a browser on the same device running Home Assistant to confirm local network access.
3. Ensure the correct admin password is provided in the integration configuration.
4. Check that your firewall or network configuration is not blocking access to the router.

{% enddetails %}

{% details "SSL certificate verification fails" %}

### Symptom: SSL errors when connecting to the Bbox

The integration fails with SSL certificate verification errors.

#### Description

The Bbox certificate is issued for `mabbox.bytel.fr`. When you connect by IP address (for example `192.168.1.1`), the certificate does not match.

#### Resolution

Disable **Verify SSL** in the integration configuration when connecting by IP address. Note that this reduces security and should only be done on trusted local networks.

{% enddetails %}

{% details "Invalid admin password" %}

### Symptom: "Invalid authentication"

When trying to set up the integration, the form shows the message "Invalid authentication".

#### Description

The admin password of the Bbox web interface is incorrect. The integration validates the password against the router, which rejects wrong credentials.

#### Resolution

1. Verify the admin password of your Bbox web interface.
2. Make sure the password is the one used to log in to the Bbox web interface, not your Bouygues Telecom account password.

{% enddetails %}

{% details "Too many attempts on the Bbox" %}

### Symptom: "Too many attempts on the Bbox, it temporarily blocks authentication"

After several failed attempts, the Bbox temporarily blocks authentication (HTTP 429).

#### Resolution

Wait a few minutes before trying again. Avoid repeated attempts, as each one extends the block.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
