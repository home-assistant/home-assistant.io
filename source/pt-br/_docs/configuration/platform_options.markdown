---
title: "Opções da Plataforma"
description: "Como usar as opções da plataforma em sua configuração."
---

As opções da plataforma permitem que você configure opções adicionais para plataformas de integração. Isso pode ser usado para substituir as configurações padrão ou para configurar recursos que não são expostos na interface do usuário.

## O que são opções da plataforma?

As opções da plataforma são um conjunto de pares chave-valor que você pode adicionar à configuração de uma plataforma. Por exemplo, você poderia usar as opções da plataforma para definir o intervalo de varredura para uma plataforma de sensor ou para especificar um ícone personalizado para um dispositivo.

## Usando as opções da plataforma

Você pode configurar as opções da plataforma na seção `platform_options` da configuração de uma plataforma.

Aqui está um exemplo de como usar as opções da plataforma para definir o intervalo de varredura para uma plataforma de sensor:

```yaml
sensor:
  - platform: my_sensor
    scan_interval: 60
```

Neste exemplo, o intervalo de varredura para a plataforma `my_sensor` é definido como 60 segundos.

## Opções de plataforma comuns

Existem várias opções de plataforma comuns que são suportadas por muitas integrações diferentes, incluindo:

- **scan_interval:** O número de segundos entre as atualizações.
- **icon:** O ícone a ser usado para a entidade.
- **friendly_name:** O nome amigável para a entidade.

Consulte a documentação para sua integração específica para ver quais opções de plataforma ela suporta.

## Opções de plataforma específicas da integração

Além das opções de plataforma comuns, muitas integrações também suportam suas próprias opções de plataforma específicas. Essas opções podem ser usadas para configurar recursos que são exclusivos dessa integração.

Consulte a documentação para sua integração específica para ver quais opções de plataforma específicas da integração ela suporta.

## Mais informações

A documentação do Home Assistant tem informações mais detalhadas sobre como usar as opções da plataforma, incluindo uma lista de todas as opções de plataforma comuns e como encontrar as opções de plataforma específicas da integração para suas integrações.
