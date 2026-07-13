---
title: Rheem EcoNet Products
description: Instructions on how to integrate Rheem EcoNet water heaters into Home Assistant.
ha_category:
  - Binary sensor
  - Climate
  - Sensor
  - Switch
  - Water heater
ha_release: 0.61
ha_iot_class: Cloud Push
ha_domain: econet
ha_codeowners:
  - '@w1ll1am23'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - climate
  - select
  - sensor
  - switch
  - water_heater
ha_integration_type: hub
---

The **EcoNet** {% term integration %} is consuming the information provided by a [EcoNet enabled Rheem water heater or thermostat](https://www.rheem.com/econet).

{% include integrations/config_flow.md %}

## Platforms

EcoNet devices may be represented by one or more platforms.

- [Binary sensor](#binary-sensor)
- [Climate](#climate)
- [Sensor](#sensor)
- [Switch](#switch)
- [Water heater](#water-heater)

### Binary sensor

The EcoNet Binary sensor platform lets you view binary states of sensors associated with your EcoNet thermostat or water heater. For example, if the device is currently running.

### Climate

The EcoNet Climate platform lets you control your EcoNet thermostat. Multi-zone HVAC systems will have 1 Climate entity per zone.

### Sensor

The EcoNet Sensor platform lets you view sensors associated with your EcoNet thermostat or water heater. For example, alert count or available hot water.

### Switch

The EcoNet Switch platform let's you control the EcoNet thermostat emergency heat.

### Water heater

The EcoNet water heater platform lets you control your EcoNet water heater. Water heaters do not report the current water temperature.

## Troubleshooting

### SSL certificate verification failed (Home Assistant Container installs)

**Symptom:** Adding the integration fails with **Unknown error occurred**. Home Assistant logs show:

```
SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify
failed: unable to get local issuer certificate
```

**Cause:** DigiCert Global Root CA (G1) was removed from Mozilla/Linux
`ca-certificates` bundles on 2026-04-15. `rheem.clearblade.com` still chains
to this root. Updated Home Assistant Container images ship the post-removal
bundle, so OpenSSL cannot verify the chain. This is a server-side issue
pending resolution by ClearBlade/Rheem
([tracking issue](https://github.com/home-assistant/core/issues/172228)).

**Workaround:** Add the G1 root to the Home Assistant container's trust store.
Run these commands on your host (replace `<ha-config-dir>` with the host path
mounted at `/config`):

```bash
# 1. Confirm the server still uses the G1 chain
#    (skip all steps if issuer is under G2/G3)
echo | openssl s_client \
  -connect rheem.clearblade.com:443 \
  -servername rheem.clearblade.com 2>/dev/null \
  | openssl x509 -noout -issuer

# 2. Fetch the G1 root and verify its fingerprint
mkdir -p <ha-config-dir>/ssl
curl -fsSL https://cacerts.digicert.com/DigiCertGlobalRootCA.crt.pem \
  -o <ha-config-dir>/ssl/digicert-global-root-ca-g1.pem
openssl x509 \
  -in <ha-config-dir>/ssl/digicert-global-root-ca-g1.pem \
  -noout -fingerprint -sha256
# Must equal:
# 43:48:A0:E9:44:4C:78:CB:26:5E:05:8D:5E:89:44:B4:D8:4F:96:62:
# BD:26:DB:25:7F:89:34:A4:43:C7:01:61

# 3. Build an augmented bundle
docker compose exec -T homeassistant \
  cat /etc/ssl/certs/ca-certificates.crt \
  > <ha-config-dir>/ssl/ca-bundle+g1.pem
cat <ha-config-dir>/ssl/digicert-global-root-ca-g1.pem \
  >> <ha-config-dir>/ssl/ca-bundle+g1.pem
```

Add to the `homeassistant` service in `docker-compose.yml`
(must recreate, not just restart):

```yaml
environment:
  - SSL_CERT_FILE=/config/ssl/ca-bundle+g1.pem
```

```bash
docker compose up -d homeassistant
```

**Rollback:** Remove the `SSL_CERT_FILE` line and the `/config/ssl/` files
once ClearBlade reissues their certificate under the G2/G3 hierarchy. After
major Home Assistant upgrades, regenerate the bundle (step 3) to keep it in
sync with the container's updated roots.
