## Follow next steps to start the application

Create an account at https://platform.openai.com/ if not already registered, go to next page https://platform.openai.com/account/api-keys and create an API key, save secret from created key.

Navigate and run next commands from your terminal:

```bash
cd backend
npm i
cp .env.dist .env
```

Paste saved secret into .env file as value of `OPENAI_API_KEY` key.

Run:

```bash
npm run start
```

After that open another terminal (tab or window), navigate to app's root folder and run following commands:

```bash
cd frontend
npm i
cp .env.dist .env
npm run dev
```

Now you can open http://localhost:3000 and use the app.
