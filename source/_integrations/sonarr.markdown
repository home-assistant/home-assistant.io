---
title: Sonarr
description: Instructions on how to integrate Sonarr with Home Assistant
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

The **Sonarr** {% term integration %} pulls data from a given [Sonarr](https://sonarr.tv/) instance. This integration only supports Sonarr v3 instances.

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
  description: The IP, FQDN, or URL of your Sonarr instance including the port number if you are not using port 8989 and your custom URL base if applicable.
API Key:
  description: To retrieve your API key, open your Sonarr web interface and navigate to Settings, then the General tab. Your Sonarr API Key will be listed on this page under the Security section.
{% endconfiguration_basic %}

## Sensors

The Sonarr integration will add the following sensors:

- **Upcoming**: The number of upcoming episodes.
- **Commands**: The number of commands being run. (disabled by default)
- **Disk space**: Available disk space in gigabytes across all storage locations. (disabled by default)
- **Queue**: The number of episodes in the download queue. (disabled by default)
- **Shows**: The number of series in Sonarr. (disabled by default)
- **Wanted**: The number of episodes still wanted. (disabled by default)

For detailed information about each item (episodes, download progress, etc.), use the corresponding action described below.

## Actions

### Action `sonarr.get_series`

Get the list of all series in Sonarr with their details and statistics.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entry_id` | no | The Sonarr config entry to use. |

#### Response data

The response is a dictionary with a single key `shows` containing a dictionary of series objects indexed by series title.

| Return attribute | Description |
| ---------------------- | ----------- |
| `id` | Internal Sonarr series ID. |
| `year` | Series premiere year. |
| `tvdb_id` | TheTVDB ID. |
| `imdb_id` | IMDb ID. |
| `status` | Series status (e.g., "continuing", "ended"). |
| `monitored` | Whether the series is monitored. |
| `episode_file_count` | Number of episode files downloaded. |
| `episode_count` | Total number of episodes. |
| `episodes_info` | Formatted string showing downloaded/total episodes. |
| `images` | Dictionary of image URLs by type (poster, banner, fanart). |

#### Example action

```yaml
action: sonarr.get_series
data:
  entry_id: "01234567890abcdef1234567890abcde"
response_variable: series_data
```

#### Example response

```yaml
shows:
  "Breaking Bad":
    id: 1
    year: 2008
    tvdb_id: 81189
    imdb_id: "tt0903747"
    status: "ended"
    monitored: true
    episode_file_count: 62
    episode_count: 62
    episodes_info: "62/62 Episodes"
    images:
      poster: "https://artworks.thetvdb.com/banners/posters/81189-12.jpg"
      banner: "https://artworks.thetvdb.com/banners/graphical/81189-g11.jpg"
      fanart: "https://artworks.thetvdb.com/banners/fanart/original/81189-24.jpg"
```

### Action `sonarr.get_queue`

Get all episodes currently in the download queue with their progress and details.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entry_id` | no | The Sonarr config entry to use. |

#### Response data

The response is a dictionary with a single key `shows` containing a dictionary of queue item objects indexed by download title.

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
| `episode_identifier` | Formatted identifier (e.g., "S01E01"). |
| `progress` | Download progress percentage. |
| `size` | Total download size in bytes. |
| `size_left` | Remaining download size in bytes. |
| `status` | Download status (e.g., "downloading", "queued"). |
| `tracked_download_status` | Tracked download status. |
| `tracked_download_state` | Tracked download state. |
| `quality` | Quality profile name (e.g., "Bluray-1080p"). |
| `languages` | List of language names. |
| `download_client` | Download client name. |
| `download_id` | Download client's ID for this download. |
| `indexer` | Indexer name. |
| `protocol` | Download protocol (torrent/usenet). |
| `episode_has_file` | Whether the episode already has a file. |
| `estimated_completion_time` | Estimated completion timestamp. |
| `time_left` | Time remaining. |
| `custom_format_score` | Custom format score. |
| `images` | Dictionary of series image URLs by type. |

#### Example action

```yaml
action: sonarr.get_queue
data:
  entry_id: "01234567890abcdef1234567890abcde"
response_variable: queue_data
```

#### Example response

```yaml
shows:
  "Breaking.Bad.S01E01.1080p.BluRay.x264":
    id: 123456789
    series_id: 1
    episode_id: 101
    title: "Breaking Bad"
    download_title: "Breaking.Bad.S01E01.1080p.BluRay.x264"
    season_number: 1
    episode_number: 1
    episode_title: "Pilot"
    episode_identifier: "S01E01"
    progress: "45.32%"
    size: 2147483648
    size_left: 1073741824
    status: "downloading"
    tracked_download_status: "ok"
    tracked_download_state: "downloading"
    quality: "Bluray-1080p"
    languages:
      - "English"
    download_client: "qBittorrent"
    download_id: "ABC123DEF456"
    indexer: "My Indexer"
    protocol: "torrent"
    episode_has_file: false
    estimated_completion_time: "2024-01-15T18:30:00Z"
    time_left: "01:23:45"
    custom_format_score: 100
    images:
      poster: "https://artworks.thetvdb.com/banners/posters/81189-12.jpg"
      banner: "https://artworks.thetvdb.com/banners/graphical/81189-g11.jpg"
```

### Action `sonarr.get_upcoming` (Planned)

Get all upcoming episodes.

*Note: This action is planned for a future release.*

### Action `sonarr.get_wanted` (Planned)

Get all wanted (missing) episodes.

*Note: This action is planned for a future release.*

### Action `sonarr.get_disk_space` (Planned)

Get disk space information for all storage locations.

*Note: This action is planned for a future release.*

### Action `sonarr.get_commands` (Planned)

Get all running and recent commands.

*Note: This action is planned for a future release.*

