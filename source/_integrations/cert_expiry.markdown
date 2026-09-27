---
description: Instructions on how to set up HTTPS (SSL) certificate expiry sensors within Home Assistant.
ha_release: 0.44
ha_domain: cert_expiry
---

The **Certificate Expiry** {% term integration %} monitors the SSL/TLS certificate of a configured host. It reports when the certificate expires, and it checks whether the certificate is trusted and whether the server uses a TLS version and cipher that Home Assistant accepts.

## Use cases

- **Never miss a renewal** - Get notified days or weeks before the certificate on your website, NAS, router, or Home Assistant's own remote access expires.
- **Catch broken automatic renewal** - If a Let's Encrypt or other ACME renewal silently fails, the expiry date stops moving forward. An automation that alerts you when fewer than 14 days remain catches this before visitors see a warning.
- **Spot misconfigured servers** - Find out when a server stops sending its intermediate certificate, serves a certificate for the wrong hostname, or only offers outdated TLS versions or ciphers.
- **Monitor devices with self-signed certificates** - Printers, switches, and other network devices often use self-signed certificates. The integration still reports when they expire.

## Supported devices

Any server that accepts a TLS connection directly on a TCP port and presents a certificate is supported. This includes HTTPS websites, and services that use implicit TLS on their own port, such as IMAPS (port 993), SMTPS (port 465), or LDAPS (port 636).

{% include integrations/config_flow.md %}

### Configuration parameters

{% configuration_basic %}
Host:
  description: "The hostname or IP address of the server to check, for example, `home-assistant.io`. Do not include `https://` or a path."
Port:
  description: "The port to connect to. The default is `443`."
{% endconfiguration_basic %}

The above configuration can also be adjusted later via {% my integrations title="**Settings** > **Devices & services**" %}, click {% icon "mdi:dots-vertical" %} and select **Reconfigure**.

## Supported functionality

The integration creates a service device for each configured host. The examples on this page use the entity IDs for a host named `example.com`.

### Sensors

- **Cert expiry**
  - **Description**: The date and time the certificate expires.
  - **Device class**: Timestamp. The state is a UTC datetime, not a number of days. The Home Assistant UI might display it as "in X days," but this is only a display format.
  - **Attributes**:
    - **`is_valid`**: Whether the current date is within the certificate's validity period (`true` or `false`).
    - **`error`**: Each failed check (trust, TLS version, cipher), one per line, or `None` when all checks pass.

The following diagnostic sensors are disabled by default. To use them, [enable the entities](/common-tasks/general/#enabling-entities).

- **Serial number**: The certificate's serial number, in hexadecimal.
- **Certificate version**: The X.509 version of the certificate (Version 1 or Version 3).
- **Fingerprint**: The certificate's SHA-256 fingerprint.
- **Common name**, **Organization**, and **Organizational unit**: The certificate's subject.
- **Issuer common name** and **Issuer organization**: The certificate authority that issued the certificate.
- **TLS version**: The TLS version negotiated with the server (TLS 1.0 to TLS 1.3).
- **Cipher suite**: The cipher suite negotiated with the server.

### Binary sensors

All binary sensors use the problem device class: they are on when there is a problem.

- **Problem**: On when any of the checks below fails, or when the current date is outside the certificate's validity period.
- **Certificate invalid**: On when the current date is outside the certificate's validity period. The **`reason`** attribute is `expired` or `not_yet_valid`.

The following diagnostic binary sensors report the individual checks:

- **Certificate untrusted**: On when the certificate chain doesn't lead to a trusted certificate authority, or the certificate doesn't match the host.
- **TLS version unsupported**: On when the negotiated TLS version is outside the range Home Assistant allows for its own outgoing connections.
- **Cipher unsupported**: On when the negotiated cipher is not one Home Assistant enables for its own outgoing connections.

These checks use the same policy Home Assistant uses for its own outgoing HTTPS connections, including its bundle of trusted certificate authorities.

## Examples

### Notify when a certificate is about to expire

The following example sends a notification when fewer than 14 days remain before the certificate expires.

{% raw %}

```yaml
automation:
  - alias: "Certificate expiring soon"
    triggers:
      - trigger: template
        value_template: >
          {{
            states('sensor.example_com_cert_expiry') not in ['unknown', 'unavailable']
            and as_datetime(states('sensor.example_com_cert_expiry')) - now()
              < timedelta(days=14)
          }}
    actions:
      - action: notify.send_message
        target:
          entity_id: notify.my_device
        data:
          title: "Certificate expiring soon"
          message: >
            The certificate for example.com expires in
            {{ (as_datetime(states('sensor.example_com_cert_expiry')) - now()).days }}
            days.
```

{% endraw %}

### Notify when a certificate problem is detected

The following example sends a notification when any check fails, and includes the reason.

{% raw %}

```yaml
automation:
  - alias: "Certificate problem detected"
    triggers:
      - trigger: state
        entity_id: binary_sensor.example_com_problem
        from: "off"
        to: "on"
    actions:
      - action: notify.send_message
        target:
          entity_id: notify.my_device
        data:
          title: "Certificate problem for example.com"
          message: >
            {{ state_attr('sensor.example_com_cert_expiry', 'error')
               or 'The certificate is outside its validity period.' }}
```

{% endraw %}

### Show the number of days until expiry

To calculate the number of days until the certificate expires in a template, use `as_datetime()` to convert the state and subtract `now()`:

{% raw %}

```yaml
value_template: >
  {{ (as_datetime(states('sensor.example_com_cert_expiry')) - now()).days }}
```

{% endraw %}

## Data updates

The integration {% term polling polls %} the certificate every 12 hours. To trigger an immediate check, use the [`homeassistant.update_entity` action](/integrations/homeassistant/#action-update-entity).

When Home Assistant starts, the first check waits until startup has finished. This allows you to monitor Home Assistant's own certificate, which is only served once startup is complete. If the server can't be reached, the entities become unavailable until the next successful check.

When you add or reload the integration while Home Assistant is running, the server is checked immediately. If it can't be reached, Home Assistant retries setting up the integration.

## Known limitations

- Only implicit TLS is supported. Services that upgrade a plain-text connection with STARTTLS, such as SMTP on port 587 or IMAP on port 143, can't be checked.
- When the host is an IP address, no server name (SNI) is sent. A server that hosts several sites might return a default certificate, which is reported as untrusted unless it lists that IP address.
- Only the certificates the server sends are checked. The integration doesn't download missing intermediate certificates, follow HTTP redirects, or connect through a proxy.
- Self-signed certificates and certificates issued by a private certificate authority are reported as untrusted, because the integration only trusts Home Assistant's bundle of certificate authorities.
- The integration doesn't provide ACME-specific information such as the renewal window.

## Troubleshooting

### Setup fails with "This host cannot be resolved"

Home Assistant can't look up the hostname. Check the spelling, and make sure the hostname resolves from the machine running Home Assistant, not only from your computer.

### Setup fails with a timeout, connection refused, or connection reset error

Home Assistant reached the host but couldn't complete a TLS connection on the configured port. Check that the port is correct, that the service uses implicit TLS on that port (see [Known limitations](#known-limitations)), and that no firewall blocks connections from Home Assistant.

### Certificate untrusted is on

Check the **`error`** attribute of the **Cert expiry** sensor for the reason. Common causes are:

- The server doesn't send its intermediate certificate. Browsers often hide this problem because they download the missing certificate themselves. Configure the server to send its full certificate chain.
- The certificate doesn't cover the configured host. Reconfigure the integration with a hostname the certificate covers.
- The certificate is self-signed or issued by a private certificate authority. This is expected, and the other sensors keep working.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
