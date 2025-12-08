---
title: NextDNS
description: Instructions on how to integrate NextDNS within Home Assistant.
ha_category:
  - Network
ha_release: 2022.8
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bieniu'
ha_domain: nextdns
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - sensor
  - switch
ha_integration_type: service
ha_quality_scale: platinum
---

NextDNS is a DNS service that protects from all kinds of security threats, blocks ADS and trackers on websites and in apps, and provides a safe and supervised Internet for kids — on all devices and on all networks. The NextDNS integration allows you to monitor NextDNS statistics and control its configuration.

## Prerequisites

To obtain API key go to the NextDNS site >> [Account section](https://my.nextdns.io/account).

{% include integrations/config_flow.md %}

{% configuration_basic %}
API Key:
    description: "The API key for your NextDNS account."
Profile:
    description: "The NextDNS configuration profile you want to integrate."
{% endconfiguration_basic %}

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}

## Supported functionality

The NextDNS integration provides the following entities.

### Binary sensors

- **Device connection status**
  - **Description**: Indicates whether the Home Assistant server is using NextDNS for DNS queries
- **Device profile connection status**
  - **Description**: Indicates whether the Home Assistant server uses the configured NextDNS profile for DNS queries

### Buttons

- **Clear logs**
  - **Description**: Triggers clearing DNS query logs on NextDNS servers

### Sensors

- **DNS queries**
  - **Description**: Shows the total number of DNS queries
- **DNS queries blocked**
  - **Description**: Shows the number of blocked DNS queries
- **DNS queries blocked ratio**
  - **Description**: Shows the percentage of blocked DNS queries
- **DNS-over-HTTP/3 queries**
  - **Description**: Shows the number of DNS queries via DNS-over-HTTP/3
  - **Remarks**: This entity is disabled by default
- **DNS-over-HTTP/3 queries ratio**
  - **Description**: Shows the percentage of DNS queries via DNS-over-HTTP/3
  - **Remarks**: This entity is disabled by default
- **DNS-over-HTTPS queries**
  - **Description**: Shows the number of DNS queries via DNS-over-HTTPS
  - **Remarks**: This entity is disabled by default
- **DNS-over-HTTPS queries ratio**
  - **Description**: Shows the percentage of DNS queries via DNS-over-HTTPS
  - **Remarks**: This entity is disabled by default
- **DNS-over-QUIC queries**
  - **Description**: Shows the number of DNS queries via DNS-over-QUIC
  - **Remarks**: This entity is disabled by default
- **DNS-over-QUIC queries ratio**
  - **Description**: Shows the percentage of DNS queries via DNS-over-QUIC
- **DNS-over-TLS queries**
  - **Description**: Shows the number of DNS queries via DNS-over-TLS
  - **Remarks**: This entity is disabled by default
- **DNS-over-TLS queries ratio**
  - **Description**: Shows the percentage of DNS queries via DNS-over-TLS
  - **Remarks**: This entity is disabled by default
- **TCP queries**
  - **Description**: Shows the number of DNS queries via TCP
  - **Remarks**: This entity is disabled by default
- **TCP queries ratio**
  - **Description**: Shows the percentage of DNS queries via TCP
  - **Remarks**: This entity is disabled by default
- **UDP queries**
  - **Description**: Shows the number of DNS queries via UDP
  - **Remarks**: This entity is disabled by default
- **UDP queries ratio**
  - **Description**: Shows the percentage of DNS queries via UDP
  - **Remarks**: This entity is disabled by default
- **Encrypted queries**
  - **Description**: Shows the number of encrypted DNS queries
  - **Remarks**: This entity is disabled by default
- **Encrypted queries ratio**
  - **Description**: Shows the percentage of encrypted DNS queries
  - **Remarks**: This entity is disabled by default
- **Unencrypted queries**
  - **Description**: Shows the number of unencrypted DNS queries
  - **Remarks**: This entity is disabled by default
- **IPv4 queries**
  - **Description**: Shows the number of DNS queries via IPv4
  - **Remarks**: This entity is disabled by default
- **IPv6 queries**
  - **Description**: Shows the number of DNS queries via IPv6
  - **Remarks**: This entity is disabled by default
- **IPv6 queries ratio**
  - **Description**: Shows the percentage of DNS queries via IPv6
  - **Remarks**: This entity is disabled by default
- **DNSSEC validated queries**
  - **Description**: Shows the number of DNS queries validated by DNSSEC
  - **Remarks**: This entity is disabled by default
- **DNSSEC validated queries ratio**
  - **Description**: Shows the percentage of DNS queries validated by DNSSEC
  - **Remarks**: This entity is disabled by default
- **DNSSEC not validated queries**
  - **Description**: Shows the number of DNS queries not validated by DNSSEC
  - **Remarks**: This entity is disabled by default
- **DNS queries relayed**
  - **Description**: Shows the number of relayed DNS queries

### Switches

- **AI-Driven threat detection**
  - **Description**: Controls AI-driven threat detection
- **Allow affiliate & tracking links**
  - **Description**: Controls affiliate and tracking links
- **Anonymized EDNS client subnet**
  - **Description**: Controls anonymized EDNS client subnet
- **Bypass age verification**
  - **Description**: Controls bypass of age verification pages
- **CNAME flattening**
  - **Description**: Controls CNAME flattening
- **Cryptojacking protection**
  - **Description**: Controls cryptojacking protection
- **Domain generation algorithms protection**
  - **Description**: Controls protection against domain generation algorithms
- **DNS rebinding protection**
  - **Description**: Controls DNS rebinding protection
- **Google safe browsing**
  - **Description**: Controls Google Safe Browsing protection
- **IDN homograph attacks protection**
  - **Description**: Controls protection against IDN homograph attacks
- **Logs**
  - **Description**: Controls log collection
- **Force SafeSearch**
  - **Description**: Controls SafeSearch enforcement
- **Typosquatting protection**
  - **Description**: Controls protection against typosquatting domains
- **Web3**
  - **Description**: Controls access to Web3 and crypto domains
- **Force YouTube restricted mode**
  - **Description**: Controls YouTube Restricted Mode enforcement
- **Block newly registered domains**
  - **Description**: Controls blocking of newly registered domains
- **Block bypass methods**
  - **Description**: Controls blocking of filter bypass methods
- **Block child sexual abuse material**
  - **Description**: Controls blocking of child sexual abuse material
- **Block dynamic DNS hostnames**
  - **Description**: Controls blocking of dynamic DNS hostnames
- **Block disguised third-party trackers**
  - **Description**: Controls blocking of disguised third-party trackers
- **Block page**
  - **Description**: Controls the display of the blocking page
- **Block online gaming**
  - **Description**: Controls blocking of online gaming
- **Block parked domains**
  - **Description**: Controls blocking of parked domains
- **Block piracy**
  - **Description**: Controls blocking of piracy websites
  - **Remarks**: This entity is disabled by default
- **Block porn**
  - **Description**: Controls blocking of pornographic content
  - **Remarks**: This entity is disabled by default
- **Block social networks**
  - **Description**: Controls blocking of social networks
  - **Remarks**: This entity is disabled by default
- **Block video streaming**
  - **Description**: Controls blocking of video streaming websites
  - **Remarks**: This entity is disabled by default
- **Block dating**
  - **Description**: Controls blocking of dating websites
  - **Remarks**: This entity is disabled by default
- **Block gambling**
  - **Description**: Controls blocking of gambling websites
  - **Remarks**: This entity is disabled by default
- **Block 9GAG**
  - **Description**: Controls 9GAG access
  - **Remarks**: This entity is disabled by default
- **Block Amazon**
  - **Description**: Controls Amazon access
  - **Remarks**: This entity is disabled by default
- **Block BeReal**
  - **Description**: Controls BeReal access
  - **Remarks**: This entity is disabled by default
- **Block Blizzard**
  - **Description**: Controls Blizzard access
  - **Remarks**: This entity is disabled by default
- **Block ChatGPT**
  - **Description**: Controls ChatGPT access
  - **Remarks**: This entity is disabled by default
- **Block Dailymotion**
  - **Description**: Controls Dailymotion access
  - **Remarks**: This entity is disabled by default
- **Block Discord**
  - **Description**: Controls Discord access
  - **Remarks**: This entity is disabled by default
- **Block Disney Plus**
  - **Description**: Controls Disney Plus access
  - **Remarks**: This entity is disabled by default
- **Block eBay**
  - **Description**: Controls eBay access
  - **Remarks**: This entity is disabled by default
- **Block Facebook**
  - **Description**: Controls Facebook access
  - **Remarks**: This entity is disabled by default
- **Block Fortnite**
  - **Description**: Controls Fortnite access
  - **Remarks**: This entity is disabled by default
- **Block Google Chat**
  - **Description**: Controls Google Chat access
  - **Remarks**: This entity is disabled by default
- **Block HBO Max**
  - **Description**: Controls HBO Max access
  - **Remarks**: This entity is disabled by default
- **Block Hulu**
  - **Description**: Controls Hulu access
  - **Remarks**: This entity is disabled by default
- **Block Imgur**
  - **Description**: Controls Imgur access
  - **Remarks**: This entity is disabled by default
- **Block Instagram**
  - **Description**: Controls Instagram access
  - **Remarks**: This entity is disabled by default
- **Block League of Legends**
  - **Description**: Controls League of Legends access
  - **Remarks**: This entity is disabled by default
- **Block Mastodon**
  - **Description**: Controls Mastodon access
  - **Remarks**: This entity is disabled by default
- **Block Messenger**
  - **Description**: Controls Facebook Messenger access
  - **Remarks**: This entity is disabled by default
- **Block Minecraft**
  - **Description**: Controls Minecraft access
  - **Remarks**: This entity is disabled by default
- **Block Netflix**
  - **Description**: Controls Netflix access
  - **Remarks**: This entity is disabled by default
- **Block Pinterest**
  - **Description**: Controls Pinterest access
  - **Remarks**: This entity is disabled by default
- **Block PlayStation Network**
  - **Description**: Controls PlayStation Network access
  - **Remarks**: This entity is disabled by default
- **Block Prime Video**
  - **Description**: Controls Prime Video access
  - **Remarks**: This entity is disabled by default
- **Block Reddit**
  - **Description**: Controls Reddit access
  - **Remarks**: This entity is disabled by default
- **Block Roblox**
  - **Description**: Controls Roblox access
  - **Remarks**: This entity is disabled by default
- **Block Signal**
  - **Description**: Controls Signal access
  - **Remarks**: This entity is disabled by default
- **Block Skype**
  - **Description**: Controls Skype access
  - **Remarks**: This entity is disabled by default
- **Block Snapchat**
  - **Description**: Controls Snapchat access
  - **Remarks**: This entity is disabled by default
- **Block Spotify**
  - **Description**: Controls Spotify access
  - **Remarks**: This entity is disabled by default
- **Block Steam**
  - **Description**: Controls Steam access
  - **Remarks**: This entity is disabled by default
- **Block Telegram**
  - **Description**: Controls Telegram access
  - **Remarks**: This entity is disabled by default
- **Block TikTok**
  - **Description**: Controls TikTok access
  - **Remarks**: This entity is disabled by default
- **Block Tinder**
  - **Description**: Controls Tinder access
  - **Remarks**: This entity is disabled by default
- **Block Tumblr**
  - **Description**: Controls Tumblr access
  - **Remarks**: This entity is disabled by default
- **Block Twitch**
  - **Description**: Controls Twitch access
  - **Remarks**: This entity is disabled by default
- **Block X (formerly Twitter)**
  - **Description**: Controls X (formerly Twitter) access
  - **Remarks**: This entity is disabled by default
- **Block Vimeo**
  - **Description**: Controls Vimeo access
  - **Remarks**: This entity is disabled by default
- **Block VK**
  - **Description**: Controls VK access
  - **Remarks**: This entity is disabled by default
- **Block WhatsApp**
  - **Description**: Controls WhatsApp access
  - **Remarks**: This entity is disabled by default
- **Block Xbox Network**
  - **Description**: Controls Xbox Network access
  - **Remarks**: This entity is disabled by default
- **Block YouTube**
  - **Description**: Controls YouTube access
  - **Remarks**: This entity is disabled by default
- **Block Zoom**
  - **Description**: Controls Zoom access
  - **Remarks**: This entity is disabled by default

## Data updates

By default, the integration {% term polling polls %} data from the NextDNS API:
- Every 5 minutes for connection status data
- Every 10 minutes for analytics data
- Every 1 minute for settings

## Possible use-cases

- Monitor DNS queries from your local network or individual devices.
- Track DNS query protocols to understand connection security.
- Manage children's screen time by scheduling access to social media, games, and streaming services.

## Examples

### Block social media for kids

These automations block social media access for the kids profile during evening hours and unblock it after school.

```yaml
automation:
  - alias: Block social media for kids in the evening
    triggers:
      - trigger: time
        at: "20:00:00"
    actions:
      - action: switch.turn_off
        target:
          entity_id: switch.kids_block_social_networks
  - alias: Unblock social media for kids after school
    triggers:
      - trigger: time
        at: "16:00:00"
    actions:
      - action: switch.turn_on
        target:
          entity_id: switch.kids_block_social_networks
```

## Known limitations

There are no known limitations.
