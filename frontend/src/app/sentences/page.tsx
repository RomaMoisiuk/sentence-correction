'use client';
import { SingleSentece } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import dotenv from 'dotenv';

dotenv.config();

export default function Sentence() {
  const [sentences, setSentences] = useState<Array<SingleSentece>>([]);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/corrections`;
    
    fetch(url, {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((data) => {
      setSentences(data.data);
    });;

  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h3>All sentences:</h3>
        {
          sentences.map((sentence) => (
            <div key={sentence.id}>
              <p>Id: {sentence.id}</p>
              <p>Original: {sentence.original}</p>
              <p>Corrected: {sentence.corrected}</p>
            </div>
          ))
        }
      </div>
      <div className="flex flex-col justify-between">
        <Link href="/random">Get random sentence with correction</Link>
        <Link href="/">Home</Link>
      </div>
    </main>
  )
}
