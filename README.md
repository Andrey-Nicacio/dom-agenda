# DOM Agenda · Ministério de Mídia IBNB

Portal onde os membros marcam os dias em que estão indisponíveis e o coordenador gera a escala dos cultos automaticamente.

- **Site:** GitHub Pages (grátis)
- **Banco de dados e login:** Supabase (plano gratuito)

Você vai levar uns 20 minutos para colocar no ar. Não precisa instalar nada no computador.

---

## 1. Criar o banco no Supabase

1. Acesse **https://supabase.com**, clique em **Start your project** e entre com sua conta do GitHub.
2. Clique em **New project**:
   - **Name:** `dom-agenda`
   - **Database password:** crie uma senha forte e guarde-a
   - **Region:** `South America (São Paulo)`
3. Espere 1 a 2 minutos até o projeto ficar pronto.
4. No menu lateral, abra **SQL Editor** → **New query**.
5. Abra o arquivo `schema.sql` deste projeto, copie **todo** o conteúdo, cole no editor e clique em **Run**. Deve aparecer `Success`.

## 2. Configurar o login

1. Abra **Authentication** → **Sign In / Providers** → **Email**.
2. **Recomendado:** desligue **Confirm email** e salve. Assim os membros entram logo depois de criar a conta.
   O plano gratuito do Supabase envia poucos e-mails por hora, então a confirmação por e-mail pode travar quando muita gente se cadastrar no mesmo dia.
3. O passo **URL Configuration** é feito depois que o site estiver no ar (passo 5).

## 3. Colocar as chaves no projeto

1. No Supabase, abra **Project Settings** → **API** (ou **Data API**).
2. Copie a **Project URL** e a chave **anon public**.
3. Abra o arquivo `config.js` e troque os valores:

```js
window.DOM_CONFIG = {
  SUPABASE_URL: "https://abcdefgh.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOi...",
  GOOGLE_LOGIN: false
};
```

> A chave **anon** pode ficar no código público. Quem protege os dados são as regras de segurança criadas pelo `schema.sql`.
> **Nunca** coloque a chave `service_role` neste arquivo.

## 4. Publicar no GitHub Pages

1. No GitHub, clique em **New repository**, dê o nome `dom-agenda` e deixe como **Public**. Clique em **Create repository**.
2. Na página do repositório, clique em **uploading an existing file**.
3. Arraste **todos** os arquivos e a pasta `supabase` deste projeto e clique em **Commit changes**.
4. Abra **Settings** → **Pages**. Em **Branch**, escolha `main` e a pasta `/ (root)` e clique em **Save**.
5. Depois de 1 a 2 minutos o site estará em:
   `https://SEU-USUARIO.github.io/dom-agenda/`

## 5. Avisar o Supabase sobre o endereço do site

No Supabase, abra **Authentication** → **URL Configuration**:

- **Site URL:** `https://SEU-USUARIO.github.io/dom-agenda/`
- **Redirect URLs:** adicione o mesmo endereço

Sem isso, os links de "esqueci minha senha" não voltam para o portal.

## 6. Primeiro acesso (você, coordenador)

1. Abra o site e clique em **Criar conta**.
2. No Início, clique em **Sou o coordenador**. Esse botão só aparece enquanto ninguém for coordenador.
3. Preencha seu nome e suas funções e clique em **Entrar na equipe**.
4. Em **Configurações**, confira os cultos (domingo às 09:00 e às 19:00), as funções e quantas pessoas cada função precisa por culto.

## 7. Chamar a equipe

Mande o link no grupo do ministério. Cada membro:

1. cria a conta;
2. escolhe as funções (Iluminação, Stories, Foto, Projeção);
3. em **Minha Agenda**, toca nos dias em que **não** pode servir.

Quem não usa celular você cadastra em **Equipe** → **Adicionar membro** e marca a agenda por essa pessoa.

## 8. Gerar a escala

1. Abra **Escalas**, avance para o mês desejado e clique em **Gerar escala**.
2. Ajuste o que precisar. Vagas sem ninguém disponível ficam em amarelo e conflitos com indisponibilidade ficam em vermelho.
3. Clique em **Publicar**. Só a partir daí a equipe vê a escala.
4. Use **Copiar texto** para mandar no WhatsApp.

**Como a escala é montada:** ninguém é escalado num culto em que marcou indisponibilidade. A escala divide os cultos por igual entre a equipe, evita escalar a mesma pessoa de manhã e de noite no mesmo domingo e evita escalar alguém em semanas seguidas. As funções com menos pessoas são preenchidas primeiro.

## Outros coordenadores

Em **Equipe** → **Editar** num membro que já criou conta, ligue **Coordenador**.

## Login com Google (opcional)

1. No Supabase, ative **Authentication** → **Sign In / Providers** → **Google**. Siga o guia que aparece na tela para criar as credenciais no Google Cloud.
2. Em `config.js`, mude para `GOOGLE_LOGIN: true`.

## Backup

No Supabase, abra **Table Editor**, escolha a tabela e clique em **Export to CSV**.

## Arquivos do projeto

| Arquivo | O que é |
|---|---|
| `index.html` | Estrutura das telas |
| `style.css` | Visual (cores, claro/escuro, celular) |
| `app.js` | Lógica do portal e da escala automática |
| `config.js` | Endereço e chave do seu Supabase |
| `schema.sql` | Tabelas e regras de segurança do banco |
