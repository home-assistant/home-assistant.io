---
title: "MQTT Certificate"
description: "Instructions on how to setup MQTT with a certificate in Home Assistant."
logo: mqtt.png
---

Using certificates will give you an additional layer of security for your MQTT communication. 

To integrate MQTT with certificate into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
mqtt:
  certificate: /home/paulus/dev/addtrustexternalcaroot.crt
```

{% configuration %}
certificate:
  description: "'auto' or the certificate authority certificate file that is to be treated as trusted by this client. To enable a secure (TLS) connection to your server you must define the 'certificate' configuration parameter. 'auto' uses the certifite CAs bundled certificates. If a file is specified the file should contain the root certificate of the certificate authority that signed your broker's certificate, but may contain multiple certificates. Example: `/home/user/identrust-root.pem`."
  required: false
  type: string
client_key:
  description: Client key, e.g., `/home/user/owntracks/cookie.key`.
  required: false
  type: string
client_cert:
  description: Client certificate, e.g., `/home/user/owntracks/cookie.crt`.
  required: false
  type: string
{% endconfiguration %}
