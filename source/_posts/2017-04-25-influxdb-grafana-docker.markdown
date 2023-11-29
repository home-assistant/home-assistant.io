---
title: "Setting up InfluxDB and Grafana using Docker"
description: "Use this tutorial to setup InfluxDB and Grafana in a Docker container and use it with Home Assistant."
date: 2017-04-25 08:04:05 +0000
date_formatted: "April 25, 2017"
author: Alok Saboo
author_twitter: alokrsaboo
categories: How-To
og_image: /images/blog/2017-04-influxdb-grafana/influxdb-grafana-ha.png
---

Home Assistant collects volumes of (time series) data that are well suited for some fancy graphs. Although the [History](/integrations/history/) component provides some nice plots, I am sure you have always wanted those fancy [Grafana](https://grafana.com/) plots. The problem, however, is that low-powered device such as Raspberry Pi that most of us use for our Home Assistant setup are not well suited for such operation.

Instead of running [InfluxDB](https://www.influxdata.com/) and Grafana on a Raspberry Pi or a different system and go through the [classic approach of installing both tools separately](/blog/2015/12/07/influxdb-and-grafana/), you can run them in a Docker container on another machine. For this tutorial, I am using a Synology NAS, but the instructions should apply to other devices that can run Docker. Just follow the steps below:

1.	SSH into your NAS. You may have to run `sudo su` if you are getting permission errors.
2.	Download the [docker-statsd-influxdb-grafana]( https://hub.docker.com/r/samuelebistoletti/docker-statsd-influxdb-grafana/) image using the command:
`docker pull samuelebistoletti/docker-statsd-influxdb-grafana`
3.	To start the container for the first-time launch:
    ```bash
    docker run -d \
      --name docker-statsd-influxdb-grafana \
      -p 3003:3003 \
      -p 3004:8083 \
      -p 8086:8086 \
      -p 22022:22 \
      -p 8125:8125/udp \
      samuelebistoletti/docker-statsd-influxdb-grafana:latest
    ```
4.	The image should now be running and both InfluxBD and Grafana should be now up and running.
5.	You can access InfluxDB at http://NAS_IP_ADDRESS:3004/ and Grafana at http://NAS_IP_ADDRESS:3003/
6.	Navigate to http://NAS_IP_ADDRESS:3004/ and create the database `home_assistant` using the command `CREATE DATABASE home_assistant`.
    <p class='img'>
      <img src='/images/blog/2017-04-influxdb-grafana/create_HA_database.png' />
    </p>
7.	Now, you need to configure Home Assistant to use InfluxDB. Since, we did not add any username/password to our database, we can simply add the following to our configuration.yaml (replace the IP address with that of the device running Docker) and restart Home Assistant to setup InfluxDB (you will have to fine tune it based on your preferences):
    ```yaml
    influxdb:
      host: 192.168.2.113
    ```
8.	Next, we need to configure Grafana to use InfluxDB. Navigate to http://NAS_IP_ADDRESS:3003/ to access Grafana (login with username and password `root`) and add your first data source. Here’s how you can configure Grafana to use InfluxDB database. Note that 192.168.2.113 is the IP address of my NAS.
    <p class='img'>
      <img src='/images/blog/2017-04-influxdb-grafana/add_data_source.png' />
    </p>
9.	You should see `Data source is working` if you have configured everything correctly.
10.	With all that configured, you are now ready for the fun stuff. You can create as many dashboards as you want and then import the same in Home Assistant.
11.	To add the Grafana dashboard in HA, use the following config:
    ```yaml
    panel_iframe:
      router:
        title: "Temperature"
        url: "http://192.168.2.113:3003/dashboard/db/temperature?edit&tab=time%20range"
    ```
    The URL can be obtained by clicking Share Dashboard link on your dashboard:
    <p class='img'>
      <img src='/images/blog/2017-04-influxdb-grafana/share_dashboard.png' />
    </p>
