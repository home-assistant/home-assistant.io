---
title: "Personalizando Entidades"
description: "Como personalizar suas entidades no Home Assistant."
---

Você pode personalizar suas entidades no Home Assistant para alterar sua aparência e comportamento. Isso pode ser feito através da interface do usuário ou editando seus arquivos de configuração.

## Personalizando através da interface do usuário

A maneira mais fácil de personalizar uma entidade é através da interface do usuário. Para fazer isso, vá para a seção "Entidades" em "Dispositivos & Serviços" nas configurações. A partir daqui, você pode selecionar a entidade que deseja personalizar.

No diálogo da entidade, você pode alterar o nome, o ícone e a área da entidade. Você também pode ocultar a entidade da interface do usuário.

## Personalizando através do YAML

Para personalizações mais avançadas, você pode usar YAML para personalizar suas entidades. Você pode fazer isso adicionando uma seção `homeassistant.customize` ao seu arquivo `configuration.yaml`.

Nesta seção, você pode especificar a entidade que deseja personalizar e, em seguida, fornecer uma lista de atributos para substituir. Por exemplo, você poderia usar isso para alterar a classe do dispositivo de um sensor ou para definir um ícone personalizado.

Aqui está um exemplo de como usar a personalização YAML para alterar o ícone de um sensor:

```yaml
homeassistant:
  customize:
    sensor.my_sensor:
      icon: mdi:thermometer
```

## Atributos personalizáveis

Existem muitos atributos diferentes que você pode personalizar, incluindo:

- **friendly_name:** O nome amigável da entidade, que é exibido na interface do usuário.
- **icon:** O ícone a ser usado para a entidade.
- **device_class:** A classe do dispositivo da entidade. Isso pode afetar como a entidade é exibida na interface do usuário.
- **unit_of_measurement:** A unidade de medida para a entidade.
- **assumed_state:** Se o estado da entidade deve ser assumido. Isso é útil para dispositivos que não relatam seu estado.
- **hidden:** Se a entidade deve ser oculta da interface do usuário.

Consulte a documentação do Home Assistant para obter uma lista completa de todos os atributos personalizáveis.

## Usando curingas

Você também pode usar curingas para personalizar várias entidades ao mesmo tempo. Por exemplo, você poderia usar o seguinte para definir o ícone para todos os seus sensores de temperatura:

```yaml
homeassistant:
  customize:
    "sensor.*_temperature":
      icon: mdi:thermometer
```

## Mais informações

A documentação do Home Assistant tem informações mais detalhadas sobre como personalizar entidades, incluindo uma lista completa de todos os atributos personalizáveis e como usar curingas.
