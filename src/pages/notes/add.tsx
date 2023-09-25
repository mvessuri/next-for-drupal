import { useState } from 'react';
import { useRouter } from 'next/router';
import { Layout } from "components/layout"

interface Note {
  title: string;
  description: string;
}

export async function createNote(note: Note): Promise<void> {
  const response = await fetch('/api/note', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

  if (!response.ok) {
    throw new Error('Failed to create note');
  }
}

export default function CreateNotePage() {
  const [note, setNote] = useState<Note>({ title: '', description: '' });
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createNote(note);
    router.push('/notes');
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote((prevNote) => ({ ...prevNote, title: event.target.value }));
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote((prevNote) => ({ ...prevNote, description: event.target.value }));
  };

  return (
    <Layout>
      <h1 className="mb-10 text-6xl font-black">Create Note</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={note.title}
            onChange={handleTitleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
            Description:
          </label>
          <textarea
            id="description"
            value={note.description}
            onChange={handleDescriptionChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Note
          </button>
        </div>
      </form>
    </Layout>
  );
}
