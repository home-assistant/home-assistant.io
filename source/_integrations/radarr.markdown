---
title: Radarr
description: Instructions on how to integrate Radarr sensors with Home Assistant
ha_category:
  - Downloading
ha_release: 0.47
ha_config_flow: true
ha_iot_class: Local Polling
ha_domain: radarr
ha_platforms:
  - binary_sensor
  - calendar
  - sensor
ha_codeowners:
  - '@tkdrob'
ha_integration_type: service
---

The **Radarr** {% term integration %} pulls data from a given [Radarr](https://radarr.video/) instance.
Your API key can be found in Settings > General in the Radarr Web UI.

{% include integrations/config_flow.md %}

## Integration entities

### Binary sensor

- **Health**: Shows if the Radarr instance is healthy. This is determined to have a problem if Radarr cannot communicate with any enabled download clients or no indexers are available for RSS feeds or searches.

### Calendar

A {% term calendar %} entity will also be created indicating the day of release and the type of release, such as Cinemas, Digital, or Physical.

A calendar entity will be created indicating the day of release and the type of release, such as Cinemas, Digital, or Physical.

### Sensors

- **Disk space**: Shows the disk space available to Radarr in gigabytes. A separate sensor is created for each storage path configured in Radarr (for example: `sensor.radarr_disk_space_movies`).
- **Movies**: Shows the number of movies in the Radarr database. (disabled by default)
- **Queue**: The number of movies in the download queue. (disabled by default)
- **Start time**: The time when Radarr was last restarted. (disabled by default)

## Actions

### Action `radarr.get_movies`

Get the list of all movies in Radarr with their details and statistics.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entry_id` | no | The Radarr config entry to use. |

#### Response data

The response is a dictionary with a single key `movies` containing a dictionary of movie objects indexed by movie title.

| Return attribute | Description |
| ---------------------- | ----------- |
| `id` | Internal Radarr movie ID. |
| `title` | Movie title. |
| `year` | Release year. |
| `tmdb_id` | The Movie Database (TMDB) ID. |
| `imdb_id` | Internet Movie Database (IMDb) ID. |
| `status` | Movie status (e.g., "released", "announced"). |
| `monitored` | Whether the movie is monitored. |
| `has_file` | Whether the movie file exists. |
| `path` | Path where the movie is stored. |
| `movie_file_count` | Number of movie files. |
| `size_on_disk` | Size of movie files in bytes. |
| `images` | Dictionary of image URLs by type (poster, fanart). |

#### Example action

```yaml
action: radarr.get_movies
data:
  entry_id: "01234567890abcdef1234567890abcde"
```

#### Example response

```yaml
movies:
  The Amateur:
    id: 3
    title: The Amateur
    year: 2025
    tmdb_id: 1087891
    imdb_id: tt0899043
    status: released
    monitored: true
    has_file: true
    size_on_disk: 0
    path: /data/media/movies/The Amateur (2025) {tmdb-1087891}
    movie_file_count: 0
    images:
      poster: https://image.tmdb.org/t/p/original/SNEoUInCa5fAgwuEBMIMBGvkkh.jpg
      fanart: https://image.tmdb.org/t/p/original/aD7FXrm2GErTmzrIFBntPyhAqS9.jpg
  The Maze Runner:
    id: 4
    title: The Maze Runner
    year: 2014
    tmdb_id: 198663
    imdb_id: tt1790864
    status: released
    monitored: true
    has_file: true
    size_on_disk: 0
    path: /data/media/movies/The Maze Runner (2014) {tmdb-198663}
    movie_file_count: 0
    images:
      poster: https://image.tmdb.org/t/p/original/ode14q7WtDugFDp78fo9lCsmay9.jpg
      fanart: https://image.tmdb.org/t/p/original/eTlcNXGv32zkVI7ZDHhfeaKHXKQ.jpg
```

### Action `radarr.get_queue`

Get all movies currently in the download queue with their progress and details.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entry_id` | no | The Radarr config entry to use. |

#### Response data

The response is a dictionary with a single key `movies` containing a dictionary of queue item objects indexed by download title.

| Return attribute | Description |
| ---------------------- | ----------- |
| `id` | Internal queue item ID. |
| `movie_id` | Internal Radarr movie ID. |
| `title` | Movie title. |
| `download_title` | Download release name. |
| `progress` | Download progress percentage. |
| `size` | Total download size in bytes. |
| `size_left` | Remaining download size in bytes. |
| `status` | Download status (e.g., "downloading", "queued"). |
| `tracked_download_status` | Tracked download status. |
| `tracked_download_state` | Tracked download state. |
| `quality` | Quality profile name (e.g., "WEBDL-1080p"). |
| `languages` | List of language names. |
| `download_client` | Download client name. |
| `download_id` | Download client's ID for this download. |
| `indexer` | Indexer name. |
| `protocol` | Download protocol (torrent/usenet). |
| `estimated_completion_time` | Estimated completion timestamp. |
| `time_left` | Time remaining. |
| `custom_format_score` | Custom format score. |

#### Example action

```yaml
action: radarr.get_queue
data:
  entry_id: "01234567890abcdef1234567890abcde"
response_variable: queue_data
```

#### Example response

```yaml
movies:
  "The.Matrix.1999.1080p.BluRay.x264":
    id: 123456789
    movie_id: 1
    title: "The Matrix"
    download_title: "The.Matrix.1999.1080p.BluRay.x264"
    progress: "45.32%"
    size: 8589934592
    size_left: 4697620070
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
    estimated_completion_time: "2024-01-15T18:30:00Z"
    time_left: "01:23:45"
    custom_format_score: 100
```
