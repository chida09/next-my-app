import React from 'react';
"use client";

import { FormEvent, useState } from "react";
import axios from 'axios';

export default function Home() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [title, setTitle] = useState("");

  const onSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSuccess(false);
    setIsError(false);

    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        title,
        body: 'bar',
        userId: 1,
      });

      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }

      setIsSuccess(true);
      setTitle("");
    } catch (error) {
      setIsError(true);
    }
  }

  return (
    <main>
      <form onSubmit={onSave}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
      {isSuccess && (
        <p>登録しました</p>
      )}
      {isError && (
        <p>登録に失敗しました</p>
      )}
    </main>
  );
}
