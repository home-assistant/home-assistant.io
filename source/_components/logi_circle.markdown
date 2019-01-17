---
layout: page
title: "Logi Circle"
description: "Instructions on how to integrate your Logi Circle cameras within Home Assistant."
date: 2018-09-08 11:00
sidebar: true
comments: false
sharing: true
footer: true
logo: logi_circle.png
ha_category: Camera
ha_release: 0.79
ha_iot_class: "Cloud Push"
---

The `logi_circle` implementation allows you to integrate your [Logi Circle](https://circle.logi.com/) cameras in Home Assistant. To connect Logi Circle, you will have to [sign up for API access](#requesting-api-access) and get a `client_id`, `client_secret` and `api_key`.

<p class='note warning'>
The camera's live stream does not function with FFMPEG 3.2 - which is distributed by default with Home Assistant's docker container. Refer to [Resolving FFMPEG issues](/components/camera.logi_circle/#resolving-ffmpeg-issues) for instructions on updating FFMPEG.
</p>

### {% linkable_title Requesting API access %}

1. Navigate to the [Circle OAuth2 Client Request Form](https://docs.google.com/forms/d/184FUILJ10rVxotyOQR5DAiu6GcCbK31AZszUdzT1ybs).
2. Fill out your contact name and e-mail address.
3. For the User Visible Client Name, specify "Home Assistant"
3. Request the following scopes:
    * `circle:activities`
    * `circle:accessories`
    * `circle:live_image`
    * `circle:live`
    * `circle:notifications`
    * `circle:summaries`
4. Request the `authorization_code` grant type.
5. For the redirect URI, specify your Home Assistant URL followed by `/api/logi_circle`. For example, if your Home Assistant URL is `https://homeassistant.local`, then request `https://homeassistant.local/api/logi_circle`. The redirect URI _must_ be HTTPS.

Please note that the turn-around time for API access takes a few business days after which you will be contacted by Logitech using the email address you provided in the form.

### {% linkable_title Configuration %}

To integrate cameras linked with your [Logi Circle](https://circle.logi.com/) account, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
logi_circle:
  client_id: YOUR_CLIENT_ID
  client_secret: YOUR_CLIENT_SECRET
  api_key: YOUR_API_KEY
  redirect_uri: YOUR_REDIRECT_URI
```

{% configuration %}
client_id:
  description: The client ID issued to you by Logitech.
  required: true
  type: string
client_secret:
  description: The client secret issued to you by Logitech.
  required: true
  type: string
api_key:
  description: The API key issued to you by Logitech.
  required: true
  type: string
redirect_uri:
  description: > 
    The redirect URI that corresponds to your Home Assistant instance.
    It must match one of the redirect URIs specified when you requested API
    access from Logitech.
  required: true
  type: string
{% endconfiguration %}