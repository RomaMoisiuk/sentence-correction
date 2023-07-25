'use client';
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import dotenv from 'dotenv';

dotenv.config();

export default function Home() {
  const [sentence, setSentence] = useState<string>('');
  const [corrected, setCorrected] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const url = `${process.env.NEXT_PUBLIC_API_URL}/corrections`;

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({ sentence }),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      return res.json();
    }).then((res) => {
      setCorrected(res.data)
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSentence(e.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleInputChange} value={sentence} className="border border-black" />
        <button type="submit">
          Get correct value
        </button>
      </form>
      <div>
        <h3>Corrected sentence:</h3>
        <p>{corrected}</p>
      </div>
      <div className="flex flex-col justify-between">
        <Link href="/sentences">Get all sentences with corrections</Link>
        <Link href="/random">Get random sentence with correction</Link>
      </div>
    </main>
  )
}
