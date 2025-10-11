---
title: "Autenticação"
description: "Documentação sobre autenticação no Home Assistant."
---

O sistema de autenticação protege o acesso ao Home Assistant.

## Tela de login

Você é recebido com uma tela de login, pedindo seu nome de usuário e senha.

<img src='/images/docs/authentication/login-outside-local-network.png' alt='Captura de tela da tela de login, ao fazer login de dentro da rede local' style='border: 0;box-shadow: none;'>

## Contas de usuário

Quando você inicia o Home Assistant pela primeira vez, a conta de usuário do _proprietário_ é criada. Esta conta tem alguns privilégios especiais e pode:

- Criar e gerenciar outras contas de usuário.
- Configurar integrações e outras configurações (em breve).

{% warning %}
Por enquanto, outras contas de usuário terão o mesmo acesso que a conta do proprietário. No futuro, contas que não são de proprietário poderão ter restrições aplicadas.
{% endwarning %}

{% note %}
Se você deseja gerenciar usuários e é um proprietário, mas não vê "Usuários" no menu principal de configuração, certifique-se de que o **Modo Avançado** está ativado para o seu usuário em seu perfil.
{% endnote %}

### O perfil da sua conta

Depois de fazer o login, você pode ver os detalhes da sua conta na página {% my profile title="**Perfil do usuário**" %} selecionando o círculo na parte inferior da barra lateral.

<img src='/images/docs/authentication/profile.png' alt='Captura de tela da página de perfil' style='border: 0;box-shadow: none;'>

Você pode:

- Alterar sua senha.
- Ativar ou desativar a [autenticação de múltiplos fatores](/docs/authentication/multi-factor-auth/).
- Excluir _Tokens de Atualização_. Eles são criados quando você faz login de um dispositivo. Exclua-os se quiser forçar o logout do dispositivo.
- Criar [Tokens de Acesso de Longa Duração](https://developers.home-assistant.io/docs/auth_api/#long-lived-access-token) para que scripts possam interagir com segurança com o Home Assistant.
- Definir idioma e outras configurações de localidade.
- Sair do Home Assistant.

{% note %}
Tokens de atualização não utilizados serão removidos automaticamente. Um token de atualização é considerado não utilizado se não for usado para um login dentro de 90 dias. Se você precisar de um token permanente, recomendamos o uso de [Tokens de Acesso de Longa Duração](https://developers.home-assistant.io/docs/auth_api/#long-lived-access-token).
{% endnote %}

### Protegendo seu login

_Certifique-se de escolher uma senha segura!_ Em algum momento no futuro, você provavelmente desejará acessar o Home Assistant de fora da sua rede local. Isso significa que você também está exposto a hackers aleatórios tentando fazer o mesmo. Trate a senha como a chave da sua casa.

Como um nível extra de segurança, você pode ativar a [autenticação de múltiplos fatores](/docs/authentication/multi-factor-auth/).

## Adicionando uma pessoa ao Home Assistant

Se você tiver direitos de administrador, pode [adicionar uma pessoa ao Home Assistant](/integrations/person/#adding-a-person-to-home-assistant) e criar uma conta de usuário para ela.

## Alterando a exibição ou o nome de usuário

Para saber como alterar um nome de exibição ou de usuário, consulte [configurando informações básicas](/docs/configuration/basic/).

## Outras técnicas de autenticação

O Home Assistant oferece várias maneiras de autenticar. Consulte a seção [Provedores de autenticação](/docs/authentication/providers/).

## Solução de problemas

### Falhas de autenticação de `127.0.0.1`

Se você estiver vendo falhas de autenticação de `127.0.0.1` e estiver usando o rastreador de dispositivos `nmap`, você deve [excluir o IP do Home Assistant](/integrations/nmap_tracker#exclude) de ser escaneado.

### Avisos de token Bearer

No novo sistema de autenticação, você verá o seguinte aviso registrado quando a [senha da API legada](/docs/authentication/providers/#legacy-api-password) for fornecida, mas não configurada no Home Assistant:

```txt
WARNING (MainThread) [homeassistant.components.http.auth] Você precisa usar um token bearer para acessar /blah/blah de 192.0.2.4
```

Se você vir isso, precisará adicionar uma [`api_password`](/integrations/http/#api_password) à sua configuração `http:`.

### Mensagens informativas de token Bearer

Se você vir o seguinte, esta é uma mensagem para os desenvolvedores de integração, para informá-los que eles precisam atualizar como eles se autenticam no Home Assistant. Como usuário final, você não precisa fazer nada:

```txt
INFO (MainThread) [homeassistant.components.http.auth] Você precisa usar um token bearer para acessar /blah/blah de 192.0.2.4
```

### Senha do proprietário perdida

Se você perder a senha associada à conta do proprietário, precisará [iniciar um novo processo de integração](/docs/locked_out/#to-prepare-the-system-to-start-a-new-onboarding-process).

### Erro: id de cliente ou URL de redirecionamento inválido

<img src='/images/docs/authentication/error-invalid-client-id.png' alt='Captura de tela do Erro: id de cliente ou url de redirecionamento inválido'>

Você deve usar um nome de domínio, não um endereço IP, para acesso remoto ao Home Assistant, caso contrário, você receberá o erro `Erro: id de cliente ou url de redirecionamento inválido` no formulário de login. No entanto, você pode usar o endereço IP para acessar o Home Assistant em sua rede doméstica.

Isso ocorre porque só permitimos um endereço IP como ID do cliente quando seu endereço IP é um endereço de rede interno (por exemplo, `192.168.0.1`) ou endereço de loopback (por exemplo, `127.0.0.1`).

Se você não tiver um nome de domínio válido para sua instância do Home Assistant, poderá modificar o arquivo `hosts` em seu computador para simular um.
No Linux, edite o arquivo `/etc/hosts` e adicione a seguinte entrada:

```text
12.34.56.78 homeassistant.home
```

Substitua `12.34.56.78` pelo endereço IP público do seu Home Assistant.

Isso permitirá que você abra o Home Assistant em `http://homeassistant.home:8123/`

### Travado no carregamento de dados

Alguns softwares de bloqueio de anúncios, como o Wipr, também bloqueiam WebSockets. Se você estiver travado na tela Carregando dados, tente desativar seu bloqueador de anúncios.
