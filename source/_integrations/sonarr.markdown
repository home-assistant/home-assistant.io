---
title: Sonarr
description: Instructions on how to integrate Sonarr with Home Assistant.
ha_category:
  - Downloading
ha_release: 0.34
ha_iot_class: Local Polling
ha_domain: sonarr
ha_config_flow: true
ha_codeowners:
  - '@ctalkington'
ha_platforms:
  - sensor
ha_integration_type: integration
---

The **Sonarr** {% term integration %} pulls data from a given [Sonarr](https://sonarr.tv/) instance.

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
  description: The URL of your Sonarr instance including the port number and base path if applicable (e.g., `http://localhost:8989` or `http://192.168.1.100:8989/sonarr`).
API Key:
  description: Your Sonarr API key. To find it, open your Sonarr web interface and navigate to **Settings** > **General**. The API key is listed under the **Security** section.
{% endconfiguration_basic %}

## Sensors

The Sonarr integration will add the following sensors:

- **Upcoming**: The number of upcoming episodes.
- **Commands**: The number of commands being run. (disabled by default)
- **Disk space**: Available disk space in gigabytes. (disabled by default)
- **Queue**: The number of episodes in the download queue. (disabled by default)
- **Shows**: The number of series in Sonarr. (disabled by default)
- **Wanted**: The number of episodes still wanted. (disabled by default)

The sensors provide summary counts. For detailed information about each item, such as series details or download progress, use the corresponding {% term actions %} described below.

## Actions

### Action `sonarr.get_series`

Get the list of all series in Sonarr with their details and statistics.

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `entry_id` | No | The config entry ID to use. |
| `space_unit` | Yes | Unit for disk space values (such as kb, kib, gb, gib. default: bytes). |

#### Response data

The response contains a `shows` key with a dictionary of series keyed by series title.

| Return attribute | Description |
| ---------------------- | ----------- |
| `id` | Internal Sonarr series ID. |
| `year` | Series premiere year. |
| `tvdb_id` | TheTVDB ID. |
| `imdb_id` | IMDb ID. |
| `status` | Series status (e.g., `continuing`, `ended`). |
| `monitored` | Whether the series is monitored. |
| `episode_file_count` | Number of episode files downloaded. |
| `episode_count` | Total number of episodes. |
| `episodes_info` | Formatted string showing downloaded/total episodes. |
| `images` | Dictionary of image URLs by type (poster, banner, fanart, clearlogo). |

#### Example

```yaml
action: sonarr.get_series
data:
  entry_id: "01234567890abcdef1234567890abcde"
response_variable: series_data
```

```yaml
shows:
  "1923":
    id: 19
    year: 2022
    tvdb_id: 416491
    imdb_id: "tt18335752"
    status: "ended"
    monitored: true
    episode_file_count: 7
    episode_count: 7
    episodes_info: "7/7 Episodes"
    images:
      banner: "https://artworks.thetvdb.com/banners/v4/series/416491/banners/6393c5abdabcd.jpg"
      poster: "https://artworks.thetvdb.com/banners/v4/series/416491/posters/63aa25026aabf.jpg"
      fanart: "https://artworks.thetvdb.com/banners/v4/series/416491/backgrounds/63965fcbc0ca4.jpg"
      clearlogo: "https://artworks.thetvdb.com/banners/v4/series/416491/clearlogo/63c4f71decfab.png"
```

### Action `sonarr.get_episodes`

Get all episodes for a specific series. Useful for displaying episode details, tracking watched status, or building episode lists.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entry_id` | No | The config entry ID to use. |
| `series_id` | No | Internal Sonarr series ID (from `get_series`). |
| `season_number` | Yes | Filter to a specific season (optional). |

#### Response data

The response contains an `episodes` key with a dictionary of episodes keyed by episode identifier (e.g., `S01E01`).

| Return attribute | Description |
| ---------------------- | ----------- |
| `id` | Internal episode ID. |
| `series_id` | Internal Sonarr series ID. |
| `tvdb_id` | Episode TheTVDB ID. |
| `season_number` | Season number. |
| `episode_number` | Episode number. |
| `episode_identifier` | Formatted identifier (e.g., `S01E01`). |
| `title` | Episode title. |
| `air_date` | Air date (local). |
| `air_date_utc` | Air date (UTC). |
| `overview` | Episode overview/description (if available). |
| `has_file` | Whether the episode file exists. |
| `monitored` | Whether the episode is monitored. |
| `runtime` | Episode runtime in minutes. |
| `episode_file_id` | ID of the episode file (0 if no file). |
| `finale_type` | Finale type if applicable (e.g., `series`, `season`). |

#### Example

```yaml
action: sonarr.get_episodes
data:
  entry_id: "01234567890abcdef1234567890abcde"
  series_id: 19
  season_number: 1
response_variable: episodes_data
```

```yaml
episodes:
  "S01E01":
    id: 1001
    series_id: 19
    tvdb_id: 8765432
    season_number: 1
    episode_number: 1
    episode_identifier: "S01E01"
    title: "1923"
    air_date: "2022-12-18 00:00:00"
    air_date_utc: "2022-12-18 05:00:00+00:00"
    overview: "The Dutton family's origin story begins in 1883..."
    has_file: true
    monitored: true
    runtime: 60
    episode_file_id: 5001
  "S01E02":
    id: 1002
    series_id: 19
    tvdb_id: 8765433
    season_number: 1
    episode_number: 2
    episode_identifier: "S01E02"
    title: "Nature's Empty Throne"
    air_date: "2022-12-25 00:00:00"
    air_date_utc: "2022-12-25 05:00:00+00:00"
    overview: "Spencer embarks on a journey home..."
    has_file: true
    monitored: true
    runtime: 60
    episode_file_id: 5002
```

### Action `sonarr.get_queue`

Get all episodes currently in the download queue with their progress and details.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entry_id` | No | The config entry ID to use. |
| `max_items` | Yes | Maximum number of queue items to return (0 = no limit, max: 500, default: 0). |

#### Response data

The response contains a `shows` key with a dictionary of queue items keyed by download title.

| Return attribute | Description |
| ---------------------- | ----------- |
| `id` | Internal queue item ID. |
| `series_id` | Internal Sonarr series ID. |
| `episode_id` | Internal episode ID. |
| `title` | Series title. |
| `download_title` | Download release name. |
| `season_number` | Season number. |
| `episode_number` | Episode number. |
| `episode_title` | Episode title. |
| `episode_identifier` | Formatted identifier (e.g., `S01E01`). |
| `progress` | Download progress percentage. |
| `size` | Total download size in bytes. |
| `size_left` | Remaining download size in bytes. |
| `status` | Download status (e.g., `downloading`, `paused`). |
| `tracked_download_status` | Tracked download status (e.g., `ok`, `warning`). |
| `tracked_download_state` | Tracked download state (e.g., `downloading`). |
| `quality` | Quality profile name (e.g., `Bluray-1080p`). |
| `languages` | List of language names. |
| `download_client` | Download client name. |
| `download_id` | Download client's ID for this download. |
| `indexer` | Indexer name. |
| `protocol` | Download protocol (e.g., `ProtocolType.TORRENT`, `ProtocolType.USENET`). |
| `episode_has_file` | Whether the episode already has a file. |
| `estimated_completion_time` | Estimated completion timestamp (or `None`). |
| `time_left` | Time remaining (or `None`). |
| `images` | Dictionary of series image URLs by type (poster, banner, fanart, clearlogo). |

#### Example

```yaml
action: sonarr.get_queue
data:
  entry_id: "01234567890abcdef1234567890abcde"
  max_items: 50
response_variable: queue_data
```

```yaml
shows:
  "Homeland.S02.Bluray.EAC3.5.1.1080p.x265-iVy":
    id: 785716933
    series_id: 65
    episode_id: 2497
    title: "Homeland"
    download_title: "Homeland.S02.Bluray.EAC3.5.1.1080p.x265-iVy"
    season_number: 2
    episode_number: 12
    episode_title: "The Choice"
    episode_identifier: "S02E12"
    progress: "3.80%"
    size: 13525611258
    size_left: 13011284730
    status: "paused"
    tracked_download_status: "ok"
    tracked_download_state: "downloading"
    quality: "Bluray-1080p"
    languages:
      - "English"
    download_client: "qBittorrent"
    download_id: "CAB00BB592895242A586AD65801AF8ADF2742F47"
    indexer: "your Indexer (Prowlarr)"
    protocol: "ProtocolType.TORRENT"
    episode_has_file: false
    estimated_completion_time: null
    time_left: null
    images:
      banner: "https://artworks.thetvdb.com/banners/text/247897-3.jpg"
      poster: "https://artworks.thetvdb.com/banners/series/247897/posters/62040472.jpg"
      fanart: "https://artworks.thetvdb.com/banners/fanart/original/247897-33.jpg"
      clearlogo: "https://artworks.thetvdb.com/banners/v4/series/247897/clearlogo/611b532422f87.png"
```

### Action `sonarr.get_diskspace`

Get disk space information for all storage locations configured in Sonarr.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entry_id` | No | The config entry ID to use. |

#### Response data

The response contains a `disks` key with a dictionary of disk information keyed by path.

| Return attribute | Description |
| ---------------------- | ----------- |
| `path` | The storage path. |
| `label` | The disk label (if available). |
| `free_space_bytes` | Free space in bytes. |
| `total_space_bytes` | Total space in bytes. |
| `free_space_gb` | Free space in gigabytes. |
| `total_space_gb` | Total space in gigabytes. |
| `used_space_gb` | Used space in gigabytes. |
| `usage_percent` | Percentage of disk space used. |

#### Example

```yaml
action: sonarr.get_diskspace
data:
  entry_id: "01234567890abcdef1234567890abcde"
response_variable: disk_data
```

```yaml
disks:
  "/mnt/media":
    path: "/mnt/media"
    label: "Media Storage"
    free_space_bytes: 2000000000000
    total_space_bytes: 4000000000000
    free_space_gb: 1862.65
    total_space_gb: 3725.29
    used_space_gb: 1862.65
    usage_percent: 50.0
  "/mnt/downloads":
    path: "/mnt/downloads"
    label: ""
    free_space_bytes: 500000000000
    total_space_bytes: 1000000000000
    free_space_gb: 465.66
    total_space_gb: 931.32
    used_space_gb: 465.66
    usage_percent: 50.0
```

### Action `sonarr.get_upcoming`

Get upcoming episodes from the calendar. Episodes are returned if their air date falls between today and today plus the specified number of days.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entry_id` | No | The config entry ID to use. |
| `days` | Yes | Number of days to look ahead for upcoming episodes (1-30, default: 1). |

#### Response data

The response contains an `episodes` key with a dictionary of upcoming episodes keyed by series title and episode identifier (e.g., `Breaking Bad S01E01`).

| Return attribute | Description |
| ---------------------- | ----------- |
| `id` | Internal episode ID. |
| `series_id` | Internal Sonarr series ID. |
| `season_number` | Season number. |
| `episode_number` | Episode number. |
| `episode_identifier` | Formatted identifier (e.g., `S01E01`). |
| `title` | Episode title. |
| `air_date` | Air date (local). |
| `air_date_utc` | Air date (UTC). |
| `overview` | Episode overview/description. |
| `has_file` | Whether the episode file exists. |
| `monitored` | Whether the episode is monitored. |
| `runtime` | Episode runtime in minutes. |
| `finale_type` | Finale type if applicable (e.g., `series`, `season`). |
| `series_title` | Series title. |
| `series_year` | Series premiere year. |
| `series_tvdb_id` | Series TheTVDB ID. |
| `series_imdb_id` | Series IMDb ID. |
| `series_status` | Series status. |
| `network` | Network the series airs on. |
| `images` | Dictionary of series image URLs by type (poster, banner, fanart, clearlogo). |

#### Example

```yaml
action: sonarr.get_upcoming
data:
  entry_id: "01234567890abcdef1234567890abcde"
  days: 7
response_variable: upcoming_data
```

```yaml
episodes:
  "The Rookie S08E03":
    id: 2008
    series_id: 50
    season_number: 8
    episode_number: 3
    episode_identifier: "S08E03"
    title: "The Red Place"
    air_date: "2026-01-20 00:00:00"
    air_date_utc: "2026-01-21 03:00:00+00:00"
    overview: "Nolan makes a quiet arrest, and Lucy and Celina race to rescue a kidnapping victim."
    has_file: false
    monitored: true
    runtime: 0
    finale_type: null
    series_title: "The Rookie"
    series_year: 2018
    series_tvdb_id: 350665
    series_imdb_id: "tt7587890"
    series_status: "continuing"
    network: "ABC (US)"
    images:
      banner: "https://artworks.thetvdb.com/banners/graphical/5b808369ba86c.jpg"
      poster: "https://artworks.thetvdb.com/banners/posters/5d8a076567871.jpg"
      fanart: "https://artworks.thetvdb.com/banners/fanart/original/5b8991cac6f01.jpg"
      clearlogo: "https://artworks.thetvdb.com/banners/v4/series/350665/clearlogo/611bcbd635134.png"
```

### Action `sonarr.get_wanted`

Get wanted (missing) episodes that Sonarr is searching for.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entry_id` | No | The config entry ID to use. |
| `max_items` | Yes | Maximum number of wanted episodes to return (0 = no limit, max: 500, default: 0). |

#### Response data

The response contains an `episodes` key with a dictionary of wanted episodes keyed by series title and episode identifier (e.g., `Westworld S00E62`).

| Return attribute | Description |
| ---------------------- | ----------- |
| `id` | Internal episode ID. |
| `series_id` | Internal Sonarr series ID. |
| `season_number` | Season number. |
| `episode_number` | Episode number. |
| `episode_identifier` | Formatted identifier (e.g., `S01E01`). |
| `title` | Episode title. |
| `air_date` | Air date (local). |
| `air_date_utc` | Air date (UTC). |
| `overview` | Episode overview/description. |
| `has_file` | Whether the episode file exists. |
| `monitored` | Whether the episode is monitored. |
| `runtime` | Episode runtime in minutes. |
| `tvdb_id` | Episode TheTVDB ID. |
| `series_title` | Series title. |
| `series_year` | Series premiere year. |
| `series_tvdb_id` | Series TheTVDB ID. |
| `series_imdb_id` | Series IMDb ID. |
| `series_status` | Series status. |
| `network` | Network the series airs on. |
| `images` | Dictionary of series image URLs by type (poster, banner, fanart, clearlogo). |

#### Example

```yaml
action: sonarr.get_wanted
data:
  entry_id: "01234567890abcdef1234567890abcde"
  max_items: 100
response_variable: wanted_data
```

```yaml
episodes:
  "Westworld S00E62":
    id: 1346
    series_id: 3
    season_number: 0
    episode_number: 62
    episode_identifier: "S00E62"
    title: "Westworld: Original Movie"
    air_date: "1973-11-21 00:00:00"
    air_date_utc: "1973-11-22 02:00:00+00:00"
    overview: "In the then-future year of 1983, a high-tech, highly realistic adult amusement park called Delos features three themed worlds."
    has_file: false
    monitored: true
    runtime: 88
    tvdb_id: 11348391
    series_title: "Westworld"
    series_year: 2016
    series_tvdb_id: 296762
    series_imdb_id: "tt0475784"
    series_status: "ended"
    network: "HBO"
    images:
      banner: "https://artworks.thetvdb.com/banners/graphical/296762-g3.jpg"
      poster: "https://artworks.thetvdb.com/banners/series/296762/posters/62088687.jpg"
      fanart: "https://artworks.thetvdb.com/banners/fanart/original/296762-7.jpg"
      clearlogo: "https://artworks.thetvdb.com/banners/v4/series/296762/clearlogo/611b6e688efba.png"
```
