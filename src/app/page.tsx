import React from 'react';
"use client";

import { FormEvent, useState } from "react";

export default function Home() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [title, setTitle] = useState("");

  const onSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSuccess(false);
    setIsError(false);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          body: 'bar',
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (!response.ok) {
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
          placeholder="Enter title"
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
