---
title: "Dividindo a Configuração"
description: "Como dividir sua configuração em vários arquivos."
---

À medida que sua configuração do Home Assistant cresce, pode ficar difícil de gerenciar em um único arquivo. Felizmente, o Home Assistant permite que você divida sua configuração em vários arquivos, o que pode ajudar a manter as coisas organizadas.

## Usando `!include`

A maneira mais básica de dividir sua configuração é usando a diretiva `!include`. Esta diretiva permite que você inclua o conteúdo de outro arquivo em sua configuração.

Por exemplo, você poderia criar um arquivo chamado `automations.yaml` e colocar todas as suas automações nele. Então, em seu arquivo `configuration.yaml` principal, você incluiria o arquivo `automations.yaml` da seguinte forma:

```yaml
automation: !include automations.yaml
```

Isso teria o mesmo efeito que colocar todas as suas automações diretamente em seu arquivo `configuration.yaml`.

## Usando `!include_dir_list`

A diretiva `!include_dir_list` permite que você inclua um diretório inteiro de arquivos. Para cada arquivo no diretório, o conteúdo do arquivo será adicionado a uma lista.

Por exemplo, você poderia criar um diretório chamado `automations` e colocar cada uma de suas automações em seu próprio arquivo. Então, em seu arquivo `configuration.yaml` principal, você incluiria o diretório `automations` da seguinte forma:

```yaml
automation: !include_dir_list automations
```

Isso teria o mesmo efeito que colocar todas as suas automações em uma única lista em seu arquivo `configuration.yaml`.

## Usando `!include_dir_named`

A diretiva `!include_dir_named` é semelhante a `!include_dir_list`, mas usa o nome do arquivo como a chave em um dicionário.

Por exemplo, você poderia criar um diretório chamado `scenes` e colocar cada uma de suas cenas em seu próprio arquivo. O nome de cada arquivo seria o nome da cena. Então, em seu arquivo `configuration.yaml` principal, você incluiria o diretório `scenes` da seguinte forma:

```yaml
scene: !include_dir_named scenes
```

## Usando `!include_dir_merge_list`

A diretiva `!include_dir_merge_list` permite que você mescle uma lista de arquivos. Para cada arquivo no diretório, o conteúdo do arquivo será mesclado em uma única lista.

## Usando `!include_dir_merge_named`

A diretiva `!include_dir_merge_named` é semelhante a `!include_dir_merge_list`, mas mescla o conteúdo de cada arquivo em um único dicionário.

## Mais informações

A documentação do Home Assistant tem informações mais detalhadas sobre como dividir sua configuração, incluindo exemplos de como usar cada uma das diferentes diretivas de inclusão.
