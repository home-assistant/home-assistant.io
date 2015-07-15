# Home Assistant website

### Jekyll project to generate and deploy [Home-Assistant.io](https://home-assistant.io)

| Command | Action |
|---|---|
| `rake preview` | Preview site on [http://127.0.0.1:4000](http://127.0.0.1:4000)
| `rake generate` | Generate new version of the site
| `rake deploy` | Deploy a new version of the site

## Setup local environment

_You need to have Ruby installed._

```bash
git clone --recursive https://github.com/balloob/home-assistant.io.git
cd home-assistant.io
bundle
rake preview
```
