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
ha_integration_type: service
---

The **Sonarr** {% term integration %} pulls data from a given [Sonarr](https://sonarr.tv/) instance.

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
  description: The URL of your Sonarr instance, including the port number and base path if applicable (for example, `http://localhost:8989` or `http://192.168.1.100:8989/sonarr`).
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

### Action: Get series

The `sonarr.get_series` action retrieves the list of all series in your Sonarr library with their details and statistics.

- **Data attribute**: `entry_id`
  - **Description**: The config entry ID to use.
  - **Optional**: No

#### Response data

The response contains a `shows` key with a dictionary of series keyed by series title.

- **id**: Internal Sonarr series ID
- **year**: Series premiere year
- **tvdb_id**: TheTVDB ID
- **imdb_id**: IMDb ID
- **status**: Series status, such as `continuing` or `ended`
- **monitored**: Whether the series is monitored
- **episode_file_count**: Number of episode files downloaded
- **episode_count**: Total number of episodes
- **episodes_info**: Formatted string showing downloaded/total episodes
- **images**: Dictionary of image URLs by type, including poster, banner, fanart, and clearlogo

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
      banner: "https://artworks.thetvdb.com/banners/416491/banner.jpg"
      poster: "https://artworks.thetvdb.com/banners/416491/poster.jpg"
      fanart: "https://artworks.thetvdb.com/banners/416491/fanart.jpg"
      clearlogo: "https://artworks.thetvdb.com/banners/416491/clearlogo.png"
```

### Action: Get episodes

The `sonarr.get_episodes` action retrieves all episodes for a specific series. Useful for displaying episode details, tracking watched status, or building episode lists.

- **entry_id** (required): The config entry ID to use.
- **series_id** (required): Internal Sonarr series ID from `sonarr.get_series`.
- **season_number** (optional): Filter to a specific season.

#### Response data

The response contains an `episodes` key with a dictionary of episodes keyed by episode identifier (for example, `S01E01`).

- **id**: Internal episode ID
- **series_id**: Internal Sonarr series ID
- **tvdb_id**: Episode TheTVDB ID
- **season_number**: Season number
- **episode_number**: Episode number
- **episode_identifier**: Formatted identifier like `S01E01`
- **title**: Episode title
- **air_date**: Air date in local time
- **air_date_utc**: Air date in UTC
- **overview**: Episode overview or description if available
- **has_file**: Whether the episode file exists
- **monitored**: Whether the episode is monitored
- **runtime**: Episode runtime in minutes
- **episode_file_id**: ID of the episode file, or 0 if no file exists
- **finale_type**: Finale type if applicable, such as `series` or `season`

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

### Action: Get queue

The `sonarr.get_queue` action retrieves all episodes currently in the download queue with their progress and details.

- **entry_id** (required): The config entry ID to use.
- **max_items** (optional): Maximum number of queue items to return. Use 0 for no limit, maximum is 500, default is 0.

#### Response data

The response contains a `shows` key with a dictionary of queue items keyed by download title.

- **id**: Internal queue item ID
- **series_id**: Internal Sonarr series ID
- **episode_id**: Internal episode ID
- **title**: Series title
- **download_title**: Download release name
- **season_number**: Season number
- **episode_number**: Episode number
- **episode_title**: Episode title
- **episode_identifier**: Formatted identifier like `S01E01`
- **progress**: Download progress percentage
- **size**: Total download size in bytes
- **size_left**: Remaining download size in bytes
- **status**: Download status, such as `downloading` or `paused`
- **tracked_download_status**: Tracked download status, such as `ok` or `warning`
- **tracked_download_state**: Tracked download state like `downloading`
- **quality**: Quality profile name, such as `Bluray-1080p`
- **languages**: List of language names
- **download_client**: Download client name
- **download_id**: Download client's ID for this download
- **indexer**: Indexer name
- **protocol**: Download protocol like `ProtocolType.TORRENT` or `ProtocolType.USENET`
- **episode_has_file**: Whether the episode already has a file
- **estimated_completion_time**: Estimated completion timestamp, or `None`
- **time_left**: Time remaining, or `None`
- **images**: Dictionary of series image URLs by type including poster, banner, fanart, and clearlogo

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
      banner: "https://artworks.thetvdb.com/banners/247897/banner.jpg"
      poster: "https://artworks.thetvdb.com/banners/247897/poster.jpg"
      fanart: "https://artworks.thetvdb.com/banners/247897/fanart.jpg"
      clearlogo: "https://artworks.thetvdb.com/banners/247897/clearlogo.png"
```

### Action: Get disk space

The `sonarr.get_diskspace` action retrieves the disk space information for all storage locations configured in Sonarr.

- **entry_id** (required): The config entry ID to use.
- **space_unit** (optional): Unit for disk space values, such as KB, KiB, GB, GiB, PB, and PiB. Default is bytes.

#### Response data

The response contains a `disks` key with a dictionary of disk information keyed by path.

- **path**: The storage path
- **label**: The disk label if available
- **free_space**: Free space in the selected unit
- **total_space**: Total space in the selected unit
- **unit**: The unit being used for the space values
- **usage_percent**: Percentage of disk space used

#### Example

```yaml
action: sonarr.get_diskspace
data:
  entry_id: "01234567890abcdef1234567890abcde"
  space_unit: "GB"
response_variable: disk_data
```

```yaml
disks:
  "/mnt/media":
    path: "/mnt/media"
    label: "Media Storage"
    free_space: 1862.65
    total_space: 3725.29
    unit: "GB"
    usage_percent: 50.0
  "/mnt/downloads":
    path: "/mnt/downloads"
    label: ""
    free_space: 465.66
    total_space: 931.32
    unit: "GB"
    usage_percent: 50.0
```

### Action: Get upcoming

The `sonarr.get_upcoming` action retrieves upcoming episodes from the calendar. Episodes are returned if their air date falls between today and today plus the specified number of days.

- **entry_id** (required): The config entry ID to use.
- **days** (optional): Number of days to look ahead for upcoming episodes. Valid range is 1-30, default is 1.

#### Response data

The response contains an `episodes` key with a dictionary of upcoming episodes keyed by series title and episode identifier (for example, `Breaking Bad S01E01`).

- **id**: Internal episode ID
- **series_id**: Internal Sonarr series ID
- **season_number**: Season number
- **episode_number**: Episode number
- **episode_identifier**: Formatted identifier like `S01E01`
- **title**: Episode title
- **air_date**: Air date in local time
- **air_date_utc**: Air date in UTC
- **overview**: Episode overview or description
- **has_file**: Whether the episode file exists
- **monitored**: Whether the episode is monitored
- **runtime**: Episode runtime in minutes
- **finale_type**: Finale type if applicable, such as `series` or `season`
- **series_title**: Series title
- **series_year**: Series premiere year
- **series_tvdb_id**: Series TheTVDB ID
- **series_imdb_id**: Series IMDb ID
- **series_status**: Series status
- **network**: Network the series airs on
- **images**: Dictionary of series image URLs by type including poster, banner, fanart, and clearlogo

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
      banner: "https://artworks.thetvdb.com/banners/350665/banner.jpg"
      poster: "https://artworks.thetvdb.com/banners/350665/poster.jpg"
      fanart: "https://artworks.thetvdb.com/banners/350665/fanart.jpg"
      clearlogo: "https://artworks.thetvdb.com/banners/350665/clearlogo.png"
```

### Action: Get wanted

The `sonarr.get_wanted` action retrieves wanted (missing) episodes that Sonarr is searching for.

- **entry_id** (required): The config entry ID to use.
- **max_items** (optional): Maximum number of wanted episodes to return. 0 = no limit, max: 500, default: 0.

#### Response data

The response contains an `episodes` key with a dictionary of wanted episodes keyed by series title and episode identifier (for example, `Westworld S00E62`).

- **id**: Internal episode ID
- **series_id**: Internal Sonarr series ID
- **season_number**: Season number
- **episode_number**: Episode number
- **episode_identifier**: Formatted identifier like `S01E01`
- **title**: Episode title
- **air_date**: Air date in local time
- **air_date_utc**: Air date in UTC
- **overview**: Episode overview or description
- **has_file**: Whether the episode file exists
- **monitored**: Whether the episode is monitored
- **runtime**: Episode runtime in minutes
- **tvdb_id**: Episode TheTVDB ID
- **series_title**: Series title
- **series_year**: Series premiere year
- **series_tvdb_id**: Series TheTVDB ID
- **series_imdb_id**: Series IMDb ID
- **series_status**: Series status
- **network**: Network the series airs on
- **images**: Dictionary of series image URLs by type including poster, banner, fanart, and clearlogo

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
      banner: "https://artworks.thetvdb.com/banners/296762/banner.jpg"
      poster: "https://artworks.thetvdb.com/banners/296762/poster.jpg"
      fanart: "https://artworks.thetvdb.com/banners/296762/fanart.jpg"
      clearlogo: "https://artworks.thetvdb.com/banners/296762/clearlogo.png"
```
