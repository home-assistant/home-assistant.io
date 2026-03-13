---
title: Freebox
description: Instructions on how to integrate Freebox routers into Home Assistant.
ha_category:
  - Alarm
  - Camera
  - Network
  - Presence detection
  - Sensor
  - Switch
ha_release: 0.85
ha_iot_class: Local Polling
ha_codeowners:
  - '@hacf-fr'
  - '@Quentame'
ha_config_flow: true
ha_domain: freebox
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - button
  - camera
  - device_tracker
  - sensor
  - switch
ha_zeroconf: true
ha_integration_type: device
---

The **Freebox** {% term integration %} allows you to observe and control [Freebox router](https://www.free.fr/freebox/).

There is currently support for the following device types within Home Assistant:

- [Sensor](#sensor) with metrics for connection speed, internal temperature, free partition space and missed calls
- [Binary sensor](#binary-sensor) for monitoring Raid arrays health
- [Device tracker](#presence-detection) for connected devices
- [Switch](#switch) to control Wi-Fi
- [Camera](#camera)
- [Binary sensors](#binary)
- [Alarm_control_panel](#alarm-control-panel)
  
{% include integrations/config_flow.md %}

You can find out your Freebox host and port by opening this address <http://mafreebox.freebox.fr/api_version> in your browser.
The returned JSON should contain an `api_domain` (`host`) and a `https_port` (`port`).
Please consult the [API documentation](https://dev.freebox.fr/sdk/os/) for more information.

{% tip %}

The `host` (ex: xxxxxxxx.fbxos.fr) and `port` given by <http://mafreebox.freebox.fr/api_version> refers to your Freebox public IP address and may not work if your Home Assistant server is located inside your local LAN. For local API access, you can alternatively use `host` = *mafreebox.freebox.fr* and `port` = *443*.

{% endtip %}

### Initial setup

{% important %}

You must have set a password for your Freebox router web administration page. Enable the option "Permettre les nouvelles demandes d'associations" and check that the option "Accès à distance sécurisé à Freebox OS" is active in "Gestion des ports" > "Connexions entrantes".

{% endimportant %}

The first time Home Assistant will connect to your Freebox, you will need to authorize it by pressing the right arrow on the facade of the Freebox when prompted to do so.

To make the Wi-Fi switch and the reboot action working, you will have to add "Modification des réglages de la Freebox" permission to Home Assistant application in "Paramètres de la Freebox" > "Gestion des accès" > "Applications".

To use cameras from the Freebox Delta, you will have to add "Gestion de l'alarme et maison connectée" permission to Home Assistant application in "Paramètres de la Freebox" > "Gestion des accès" > "Applications".

### Supported routers

Only the routers with Freebox OS are supported:

- Freebox V8 also known as Freebox Pop (France) and Iliadbox (Italy)
- Freebox V7 also known as Freebox Delta
- Freebox V6 also known as Freebox Revolution
- Freebox mini 4k

## Presence detection

This platform offers presence detection by keeping track of the devices connected to a [Freebox](https://www.free.fr/freebox/) router.

### Notes

Note that the Freebox waits for some time before marking a device as
inactive, meaning that there will be a small delay (1 or 2 minutes)
between the time you disconnect a device and the time it will appear
as "away" in Home Assistant. You should take this into account when specifying
the `consider_home` parameter.
On the contrary, the Freebox immediately reports devices newly connected, so
they should appear as "home" almost instantly, as soon as Home Assistant
refreshes the devices states.

## Sensor

This platform offers you sensors to monitor a Freebox router.
The monitored metrics are:
- Internal temperature
- Upload and download rates (in KB/s)
- Free partition space of used disks
- Number of missed calls

## Binary sensor

The health status of each RAID array can be monitored with a diagnostics binary sensor reflecting the `degraded` state (OK means not degraded, PROBLEM means degraded).

## Camera

Cameras are only available in Freebox V7 (also known as Freebox Delta).

## Binary
This platform offers you sensors to monitor:
- motion sensor
- door opener 
- plastic cover

## Alarm control panel

This integration allows you to view and control the Freebox alarm control panel.



## Action

### Action: Reboot

The `freebox.reboot` action allows you to reboot your Freebox router. It does not take any parameter. Be aware there is no confirmation.

## Switch

This platform offers you a switch to toggle the Wi-Fi on or off. This will toggle all Wi-Fi interfaces of the router (all SSID and all bands).

## Fix for Italian version (Iliadbox)

After updating the Freebox/Iliadbox to firmware 4.8.17.2 the integration will stop working due to SSL certificate issues. This can be fixed by using the [Additional CA](https://github.com/Athozs/hass-additional-ca) custom integration to load the following new CA certificates (refer to the integration's documentation for instructions), that are taken from the API manual (HTTPS access page) accessed from the Iliadbox's web interface:

ECC Root CA
```
-----BEGIN CERTIFICATE-----
MIICOjCCAcCgAwIBAgIUI0Tu7zsrBJACQIZgLMJobtbdNn4wCgYIKoZIzj0EAwIw
TDELMAkGA1UEBhMCSVQxDjAMBgNVBAgMBUl0YWx5MQ4wDAYDVQQKDAVJbGlhZDEd
MBsGA1UEAwwUSWxpYWRib3ggRUNDIFJvb3QgQ0EwHhcNMjAxMTI3MDkzODEzWhcN
NDAxMTIyMDkzODEzWjBMMQswCQYDVQQGEwJJVDEOMAwGA1UECAwFSXRhbHkxDjAM
BgNVBAoMBUlsaWFkMR0wGwYDVQQDDBRJbGlhZGJveCBFQ0MgUm9vdCBDQTB2MBAG
ByqGSM49AgEGBSuBBAAiA2IABMryJyb2loHNAioY8IztN5MI3UgbVHVP/vZwcnre
ZvJOyDvE4HJgIti5qmfswlnMzpNbwf/MkT+7HAU8jJoTorRm1wtAnQ9cWD3Ebv79
RPwtjjy3Bza3SgdVxmd6fWPUKaNjMGEwHQYDVR0OBBYEFDUij/4lpoJ+kOXRyrcM
jf2RPzOqMB8GA1UdIwQYMBaAFDUij/4lpoJ+kOXRyrcMjf2RPzOqMA8GA1UdEwEB
/wQFMAMBAf8wDgYDVR0PAQH/BAQDAgGGMAoGCCqGSM49BAMCA2gAMGUCMQC6eUV1
pFh4UpJOTc1JToztN4ttnQR6rIzxMZ6mNCe+nhjkohWp24pr7BpUYSbEizYCMAQ6
LCiBKV2j7QQGy7N1aBmdur17ZepYzR1YV0eI+Kd978aZggsmhjXENQYVTmm/XA==
-----END CERTIFICATE-----
```

RSA Root CA
```
-----BEGIN CERTIFICATE-----
MIIFiTCCA3GgAwIBAgIUTXoJE/kJnSKpxk5FjcmqmGah9zcwDQYJKoZIhvcNAQEL
BQAwTDELMAkGA1UEBhMCSVQxDjAMBgNVBAgMBUl0YWx5MQ4wDAYDVQQKDAVJbGlh
ZDEdMBsGA1UEAwwUSWxpYWRib3ggUlNBIFJvb3QgQ0EwHhcNMjAxMTI3MDkzODEy
WhcNNDAxMTIyMDkzODEyWjBMMQswCQYDVQQGEwJJVDEOMAwGA1UECAwFSXRhbHkx
DjAMBgNVBAoMBUlsaWFkMR0wGwYDVQQDDBRJbGlhZGJveCBSU0EgUm9vdCBDQTCC
AiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBANXKZSyCmix6jt7jUmaCP4XF
caF4azeYZuA8A4sWQmQXRWTDj8oNClE5w7zo5qUYzHIBOubKY7hhIU7RXYR5Bdny
arNRoo5ZBplgEkv3G00IgXY2/lCywPQ8WorAn0k/uaRce239r6EkGC3fxCA3Asnc
q9lNkUoWaf0GktJai0DuW7bNY8cq+vzZpy/36ey0LQ4OoehfiA6vlUTVWakpjecJ
ller1RfVlgEH26wnerGge3LYBZv27XiahCft54AQLxRY3H/z8XpKsPnJJrrhEvSo
2p64Bd+g7ZbzCdeakrypjVC/eWn14UzbcBVgh0p4F4990LuGxLVqyh6XcZOSSi01
4fpca5xPDCiohEX7ehMLpdURbhKzPj17IpwTmonfVmxkvV8rca1PqhDPEOouwPtc
M55eCgtwgSBeDznFKD7s+az/SZYC16GTgyXTCd2lId/J1unZ4pdzNVMAglTpnGgz
eQkHvfcVYdJj49tOtW0OpSPBiNIC6LCVY9wtH5dRMm0k+A8QDP+9HQaOs3LIUMwu
WGePw6r+eXUYw/2yO0z3zI/63hOpzZVixW+T7h3SY5B+sTrxR9fRD1oyk/rPV4I3
X5mZnyzSowjcN3+hSkGIZBleMO3CHaYleIf1/9HHhCJCVeeJ4kwEWY18Z0A+ohFh
D/dipgwmLCDH1/irDT4pAgMBAAGjYzBhMB0GA1UdDgQWBBTcW1RrTVIizaqkrkTI
CSw86qDJkTAfBgNVHSMEGDAWgBTcW1RrTVIizaqkrkTICSw86qDJkTAPBgNVHRMB
Af8EBTADAQH/MA4GA1UdDwEB/wQEAwIBhjANBgkqhkiG9w0BAQsFAAOCAgEAOfi6
fCuVLJD+vttO34cdB3i5hofmNrzgLh/spnwdm4y9EvvVqDvLdVLEIbvKf0QEcW0Y
dwP1BgmKwwHVv9YydHov8Jr4ANoGGXJnPLPcYDhRnixYEQmlTwSL/CLUcQ2hQWXx
Oc0k1jJB7uk6TPdX2YJyW4NpIcwI2sa5Dg/L8PqM0/pMYnMyG1hBwUc2M2qg3qTJ
zeiYT9zBHxS/JXA40yH4g9NzcFisVuYrfmINb11GmeqClm2OWehSdgdv9tEph3NW
ntJTENRrDvuj/pGZsnbofzgHNN6/nanymmrEPxG+xUGLIAW7zFndTKityhJ9FRqF
ultoZR2D19hh+n1277TSCPRJzUpq9rrfiqukjua3UjBzEvevnmSbLs1bXcNAxFYN
oZZ2euHoBv+E3BHjGik4RUkEJYtf5Xh+iffk4zTMfKBERn40fB7yF1xzxyoziltL
VxfueF9V6N7qjo5Ia7kiShXXsB+QdQdweuxWm1pPYmMbfTxNEqFUs3GhwEjzLaJc
cJOedwCT4ntbyCcTQaRlDL8QFjdE4gNm2ZaoG+gqGTLPS55H+ZvLsgUCiR5YY44N
G2Gkv4w/V/eB3eAvd5lgm6oOe8ehdr5JdpD6wnW2GOHs4SBdBo6yR+4RgEimNmgF
Yu11tlZsB2Iw/TT1EyPVb5z6tK4wUgWLNFAvjXU=
-----END CERTIFICATE-----
```

After load the certificates the Iliadbox can be manually added in 'Devices > Add integration > Freebox > New instance' and using 'myiliadbox.iliad.it' as the IP address and 443 as the port.
