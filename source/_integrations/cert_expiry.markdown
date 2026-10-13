---
title: Certificate Expiry
description: Instructions on how to set up HTTPS (SSL) certificate expiry sensors within Home Assistant.
ha_category:
  - Network
ha_release: 0.44
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@jjlawren'
ha_domain: cert_expiry
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
---

The **Certificate Expiry** {% term integration %} monitors the expiration date of an SSL/TLS certificate for a configured host. This is useful for keeping track of when certificates need to be renewed, for example, for your own website or Home Assistant's remote access certificate.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname to check the certificate for, for example, `home-assistant.io`. Do not include `https://` or a path to a file on your computer."
Port:
  description: "The port to connect to. The default is `443`."
Verify certificate:
  description: "Check that the certificate is trusted, matches the host, and is within its validity period. Enabled by default. Turn this off to monitor self-signed, expired, or not yet valid certificates. When verification is disabled, Home Assistant cannot confirm the server's identity."
Additional trusted certificates:
  description: "Optional certificates in PEM format, such as your private certificate authority's root certificate. These add to the certificates Home Assistant already trusts, only for this integration instance. Paste certificates only, without private keys. This field is empty by default, and its certificates are used only when verification is enabled."
{% endconfiguration_basic %}

## Reconfiguration

To change the host, port, certificate verification setting, or additional trusted certificates after setup:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select **Certificate Expiry**.
2. Open the three dots {% icon "mdi:dots-vertical" %} menu next to the configured host and select **Reconfigure**.
3. Update the settings and select **Submit**.

Clear **Additional trusted certificates** to stop using the certificates you added.

## Supported functionality

### Sensors

The integration creates a single sensor for each configured host.

- **Certificate expiry**
  - **Description**: The expiration date and time of the host's SSL/TLS certificate.
  - **Device class**: Timestamp. The state is a UTC datetime, not a number of days. The Home Assistant UI might display it as "in X days," but this is only a display format.

The sensor also provides the following attributes:

- **`is_valid`**: Whether the certificate passed verification. Always `false` when verification is disabled, even if an expiry date is available.
- **`error`**: A description of a TLS, certificate verification, or certificate parsing error, or `None` after a successful read.

{% tip %}
To calculate the number of days until the certificate expires in a template or automation, use `as_datetime()` to convert the state and subtract `now()`. For example:

{% raw %}

```yaml
value_template: >
  {{
    (as_datetime(states('sensor.cert_expiry_timestamp_example_com'))
    - now()).days
  }}
```

{% endraw %}
{% endtip %}

### Sensor behavior

TLS or certificate errors make the sensor state `unknown`. You can finish setting up the integration even if certificate verification fails.

Connection failures make the sensor `unavailable`. The `is_valid` and `error` attributes keep their previous values.

## Data updates

The integration {% term polling polls %} the certificate every 12 hours. To trigger an immediate check, use the [`homeassistant.update_entity` action](/integrations/homeassistant/#action-update-entity).

## Known limitations

The integration only provides the certificate expiration date. It does not provide the issue date, certificate lifetime, renewal window, or any ACME-specific information.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
