'use client';
import { SingleSentece } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import dotenv from 'dotenv';

dotenv.config();

export default function Random() {
  const [sentence, setSentence] = useState<SingleSentece | null>(null);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/random`;
    
    fetch(url, {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((response) => {
      setSentence({ ...response.data });
    });

  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h3>Random sentence:</h3>
        <div>
          <p>Id: {sentence?.id}</p>
          <p>Original: {sentence?.original}</p>
          <p>Corrected: {sentence?.corrected}</p>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <Link href="/sentences">Get all sentences with corrections</Link>
        <Link href="/">Home</Link>
      </div>
    </main>
  )
}
