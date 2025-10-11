---
title: "Tutorial de Blueprint"
description: "Um tutorial sobre como criar seu primeiro blueprint de automação."
---

Este tutorial irá guiá-lo através do processo de criação de seu primeiro blueprint de automação.

## O que é um blueprint?

Um blueprint é um modelo para uma automação. Ele define a lógica da automação, mas permite que você personalize os dispositivos e entidades que são usados.

## Criando o arquivo de blueprint

Primeiro, você precisará criar um novo arquivo YAML em seu diretório `blueprints/automation`. O nome do arquivo será o nome do seu blueprint.

Por exemplo, você poderia criar um arquivo chamado `motion_light.yaml`.

## Definindo o esquema do blueprint

Em seguida, você precisará definir o esquema do blueprint em seu arquivo YAML. O esquema define o nome, a descrição, o domínio e as entradas para seu blueprint.

Aqui está um exemplo de um esquema de blueprint para uma automação de luz de movimento:

```yaml
blueprint:
  name: Luz de movimento
  description: Liga uma luz quando o movimento é detectado.
  domain: automation
  input:
    motion_sensor:
      name: Sensor de movimento
      selector:
        entity:
          domain: binary_sensor
          device_class: motion
    target_light:
      name: Luz alvo
      selector:
        target:
          entity:
            domain: light
```

## Escrevendo a automação

Depois de definir o esquema, você pode escrever a automação. A automação usará as entradas que você definiu no esquema para especificar os dispositivos e entidades a serem usados.

Aqui está um exemplo de uma automação para o blueprint de luz de movimento:

```yaml
trigger:
  - platform: state
    entity_id: !input motion_sensor
    to: 'on'
action:
  - service: light.turn_on
    target: !input target_light
```

## Usando seu blueprint

Depois de criar seu blueprint, você pode usá-lo para criar novas automações.

Para fazer isso, vá para a seção "Automações & Cenas" de sua configuração e clique no botão "Adicionar Automação". Você será solicitado a escolher um blueprint para usar.

Depois de selecionar seu blueprint, você será solicitado a preencher quaisquer entradas necessárias. Depois de preencher as entradas, você pode salvar a automação.

## Compartilhando seu blueprint

Se você criou um blueprint que acha que seria útil para outras pessoas, você pode compartilhá-lo com a comunidade.

Você pode compartilhar seus blueprints no Fórum do Home Assistant ou no GitHub. Ao compartilhar seu blueprint, certifique-se de incluir uma boa descrição do que ele faz e como usá-lo.
