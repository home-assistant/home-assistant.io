---
description: Instructions on how to integrate Bouygues Bbox routers into Home Assistant.
ha_release: 0.31
ha_domain: bbox
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **Bbox** {% term integration %} uses the [Bbox Modem Router](https://www.bouyguestelecom.fr/offres-internet/bbox-fit) from the French Internet provider Bouygues Telecom. Sensors are mainly bandwidth measures.

There is currently support for the following device types within Home Assistant:

- [Presence Detection](#presence-detection)
- [Sensor](#sensor)

{% note %}
Due to third party limitation, the sensors will only be available if Home Assistant and the Bbox are on the same local area network. You can check this by going to [mabbox.bytel.fr](https://mabbox.bytel.fr) with your web browser.
{% endnote %}

## Presence detection

The `bbox` {% term integration %} offers presence detection by looking at connected devices to a [Bbox](https://www.bouyguestelecom.fr/offres-internet/bbox-fit) based router from [Bouygues](https://www.bouyguestelecom.fr/), which is one of the main Internet provider in France.

Bbox is a generic name for different hardware routers. The {% term integration %} has been tested with the following devices:

- Sagemcom F@st5688b

### Configuration

To use a Bbox router in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: bbox
    password: YOUR_BBOX_PASSWORD
```

{% configuration %}
host:
  description: The domain name or IP address of your Bbox device. The `mabbox.bytel.fr` domain name resolves to the router on your local network.
  required: false
  type: string
  default: mabbox.bytel.fr
password:
  description: The password of your Bbox router (the same one used for the Bbox web interface). Recent firmwares require an authenticated session to list the connected devices.
  required: true
  type: string
scan_interval:
  description: Time between device list scans.
  required: false
  type: time_period
  default: 60 seconds
{% endconfiguration %}

{% important %}
For now and due to third party limitation, the Bbox must be on the same local network as the Home Assistant installation.
{% endimportant %}

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.

## Sensor

To add Bbox sensors to your installation, add the following to your {% term "`configuration.yaml`" %} file. The sensors only need access to the Bbox, no password is required.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: bbox
    monitored_variables:
      - down_max_bandwidth
      - up_max_bandwidth
      - current_down_bandwidth
      - current_up_bandwidth
      - uptime
      - number_of_reboots
```

{% configuration %}
host:
  description: The domain name or IP address of your Bbox device. The `mabbox.bytel.fr` domain name resolves to the router on your local network.
  required: false
  type: string
  default: mabbox.bytel.fr
password:
  description: The password of your Bbox router. It is only required for endpoints needing an authenticated session, such as the connected devices list used by the presence detection.
  required: false
  type: string
  default: ""
name:
  description: Name to display in the frontend.
  required: false
  default: Bbox
  type: string
monitored_variables:
  description: Sensors to display in the frontend.
  required: true
  type: list
  keys:
    down_max_bandwidth:
      description: Maximum bandwidth available for download.
    up_max_bandwidth:
      description: Maximum bandwidth available for upload.
    current_down_bandwidth:
      description: Instant measure of the current used bandwidth for download.
    current_up_bandwidth:
      description: Instant measure of the current used bandwidth for upload.
    uptime:
      description: Uptime since the last boot.
    number_of_reboots:
      description: Number of reboot since the initial configuration of the router.
{% endconfiguration %}
