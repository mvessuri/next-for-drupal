import { useState } from 'react';
import { DrupalNode } from "next-drupal"
import { drupal } from "lib/drupal"
import { GetStaticPropsResult } from "next"
import { Layout } from "components/layout"
import Link from 'next/link';

interface NotePageProps {
  nodes: DrupalNode[]
}

interface Props {
  notes: DrupalNode[];
}

type Note = {
  id: string;
  title: string;
  content: string;
};

export default function NotesTable({ nodes }: NotePageProps) {

  const [notes, setNotes] = useState<DrupalNode[]>(nodes);

  async function handleDelete(id: string) {
    console.log('delete', id);
    console.log(nodes)

    console.log(notes)

    try {
      const response = await fetch('/api/note', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id }),
      });
      if (response.ok) {
        // handle success
        setNotes(notes.filter((node) => node.id !== id));
      } else {
        // handle error
        console.log('Error deleting note')
      }
    } catch (error) {
      // handle error
      console.log('Unknown error deleting note')
    }
  };

  return (
    <Layout>
      <Link href="/notes/add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block">
        Create New Note
      </Link>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Content</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((node, index) => (
            <tr key={node.id}>
              <td className="border px-4 py-2">{node.id}</td>
              <td className="border px-4 py-2">{node.title}</td>
              <td className="border px-4 py-2">{node.body.value}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(node.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export async function getServerSideProps(
  context
): Promise<GetStaticPropsResult<NotePageProps>> {
  const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--note",
    context,
    {
      params: {
        "filter[status]": 1,
        "fields[node--note]": "title,uid,body",
        sort: "-created",
      },
    }
  )

  return {
    props: {
      nodes,
    },
  }
}
