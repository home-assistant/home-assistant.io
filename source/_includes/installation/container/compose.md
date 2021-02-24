```yaml
  version: '3'
  services:
    homeassistant:
      container_name: homeassistant
      image: {{ include.image }}
      volumes:
        - /PATH_TO_YOUR_CONFIG:/config
        - /etc/localtime:/etc/localtime:ro
      restart: unless-stopped
      network_mode: host
```