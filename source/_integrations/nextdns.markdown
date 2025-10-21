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
ha_quality_scale: bronze
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
- **DNS-over-HTTP/3 queries ratio**
  - **Description**: Shows the percentage of DNS queries via DNS-over-HTTP/3
- **DNS-over-HTTPS queries**
  - **Description**: Shows the number of DNS queries via DNS-over-HTTPS
- **DNS-over-HTTPS queries ratio**
  - **Description**: Shows the percentage of DNS queries via DNS-over-HTTPS
- **DNS-over-QUIC queries**
  - **Description**: Shows the number of DNS queries via DNS-over-QUIC
- **DNS-over-QUIC queries ratio**
  - **Description**: Shows the percentage of DNS queries via DNS-over-QUIC
- **DNS-over-TLS queries**
  - **Description**: Shows the number of DNS queries via DNS-over-TLS
- **DNS-over-TLS queries ratio**
  - **Description**: Shows the percentage of DNS queries via DNS-over-TLS
- **TCP queries**
  - **Description**: Shows the number of DNS queries via TCP
- **TCP queries ratio**
  - **Description**: Shows the percentage of DNS queries via TCP
- **UDP queries**
  - **Description**: Shows the number of DNS queries via UDP
- **UDP queries ratio**
  - **Description**: Shows the percentage of DNS queries via UDP
- **Encrypted queries**
  - **Description**: Shows the number of encrypted DNS queries
- **Encrypted queries ratio**
  - **Description**: Shows the percentage of encrypted DNS queries
- **Unencrypted queries**
  - **Description**: Shows the number of unencrypted DNS queries
- **IPv4 queries**
  - **Description**: Shows the number of DNS queries via IPv4
- **IPv6 queries**
  - **Description**: Shows the number of DNS queries via IPv6
- **IPv6 queries ratio**
  - **Description**: Shows the percentage of DNS queries via IPv6
- **DNSSEC validated queries**
  - **Description**: Shows the number of DNS queries validated by DNSSEC
- **DNSSEC validated queries ratio**
  - **Description**: Shows the percentage of DNS queries validated by DNSSEC
- **DNSSEC not validated queries**
  - **Description**: Shows the number of DNS queries not validated by DNSSEC
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
- **Block porn**
  - **Description**: Controls blocking of pornographic content
- **Block social networks**
  - **Description**: Controls blocking of social networks
- **Block video streaming**
  - **Description**: Controls blocking of video streaming websites
- **Block dating**
  - **Description**: Controls blocking of dating websites
- **Block gambling**
  - **Description**: Controls blocking of gambling websites
- **Block 9GAG**
  - **Description**: Controls 9GAG access
- **Block Amazon**
  - **Description**: Controls Amazon access
- **Block BeReal**
  - **Description**: Controls BeReal access
- **Block Blizzard**
  - **Description**: Controls Blizzard access
- **Block ChatGPT**
  - **Description**: Controls ChatGPT access
- **Block Dailymotion**
  - **Description**: Controls Dailymotion access
- **Block Discord**
  - **Description**: Controls Discord access
- **Block Disney Plus**
  - **Description**: Controls Disney Plus access
- **Block eBay**
  - **Description**: Controls eBay access
- **Block Facebook**
  - **Description**: Controls Facebook access
- **Block Fortnite**
  - **Description**: Controls Fortnite access
- **Block Google Chat**
  - **Description**: Controls Google Chat access
- **Block HBO Max**
  - **Description**: Controls HBO Max access
- **Block Hulu**
  - **Description**: Controls Hulu access
- **Block Imgur**
  - **Description**: Controls Imgur access
- **Block Instagram**
  - **Description**: Controls Instagram access
- **Block League of Legends**
  - **Description**: Controls League of Legends access
- **Block Mastodon**
  - **Description**: Controls Mastodon access
- **Block Messenger**
  - **Description**: Controls Facebook Messenger access
- **Block Minecraft**
  - **Description**: Controls Minecraft access
- **Block Netflix**
  - **Description**: Controls Netflix access
- **Block Pinterest**
  - **Description**: Controls Pinterest access
- **Block PlayStation Network**
  - **Description**: Controls PlayStation Network access
- **Block Prime Video**
  - **Description**: Controls Prime Video access
- **Block Reddit**
  - **Description**: Controls Reddit access
- **Block Roblox**
  - **Description**: Controls Roblox access
- **Block Signal**
  - **Description**: Controls Signal access
- **Block Skype**
  - **Description**: Controls Skype access
- **Block Snapchat**
  - **Description**: Controls Snapchat access
- **Block Spotify**
  - **Description**: Controls Spotify access
- **Block Steam**
  - **Description**: Controls Steam access
- **Block Telegram**
  - **Description**: Controls Telegram access
- **Block TikTok**
  - **Description**: Controls TikTok access
- **Block Tinder**
  - **Description**: Controls Tinder access
- **Block Tumblr**
  - **Description**: Controls Tumblr access
- **Block Twitch**
  - **Description**: Controls Twitch access
- **Block X (formerly Twitter)**
  - **Description**: Controls X access
- **Block Vimeo**
  - **Description**: Controls Vimeo access
- **Block VK**
  - **Description**: Controls VK access
- **Block WhatsApp**
  - **Description**: Controls WhatsApp access
- **Block Xbox Network**
  - **Description**: Controls Xbox Network access
- **Block YouTube**
  - **Description**: Controls YouTube access
- **Block Zoom**
  - **Description**: Controls Zoom access

## Data updates

By default, the integration {% term polling polls %} data from the NextDNS API:
- Every 5 minutes for connection status data
- Every 10 minutes for analytics data
- Every 1 minute for settings

## Possible use-cases

- Monitor the number of DNS queries from your local network or from individual devices.
- Monitor the type of protocol used for DNS queries.
- Take care of your children's mental health by allowing them access to social media, games, and streaming services only during select time slots.

## Examples

### Block social media for kids

These two automations are responsible for blocking access to social media for the "kids" profile during the night and school hours.

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
  - alias: Unblock social media for kids after the school
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