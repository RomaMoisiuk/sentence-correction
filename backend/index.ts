import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { openai } from './services/openai';
import { db } from './services/db';
import bodyParser from 'body-parser';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.send('Ok');
});

app.post('/corrections', bodyParser.json(), async (req: Request, res: Response) => {
  const { sentence = null } = req.body;

  if (!sentence) {
    return res.status(400).json({ message: 'Sentence must exist' });
  }

  if (typeof sentence !== 'string') {
    return res.status(400).json({ message: 'Sentence must be string' });
  }

  try {
    const { data } = await openai.createChatCompletion({
      model: process.env.OPENAPI_MODEL || 'gpt-3.5-turbo',
      messages: [
        {
          "role": "system",
          "content": "You will be provided with statements, and your task is to convert them to standard English.",
        },
        {
          "role": "user",
          "content": sentence,
        }
      ],
      temperature: 0,
      max_tokens: 256,
    });

    const corrected = data.choices[0]?.message?.content || sentence;

    db.run('INSERT INTO corrections (original, corrected) VALUES (?, ?);', [sentence, corrected], (err: any, result: any) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      return res.json({ success: true, data: corrected });
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: 'Internal Server Error' });
  }

});

app.get('/corrections', async (req: Request, res: Response) => {
  db.all(`SELECT * FROM corrections;`, [], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    }

    res.json({ success: true, data: result });
  });
});

app.get('/random', (req: Request, res: Response) => {
  db.all(`SELECT * FROM corrections ORDER BY RANDOM() LIMIT 1;`, [], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    }

    res.json({ success: true, data: result[0] });
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
