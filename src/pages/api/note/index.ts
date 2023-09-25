import { NextApiRequest, NextApiResponse } from 'next';
import { drupal } from "lib/drupal"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'POST') {
    const { title, description } = req.body;

    const resource = await drupal.createResource("node--note", {
      data: {
        attributes: {
          title: title,
          body: {
            value: description,
            format: "plain_text",
          },
        },
      },
    })

    // TODO add logic to handle errors.

    res.status(201).json({ message: 'Note added successfully' });

  } else if (req.method == 'DELETE') {
    const { id } = req.body;

    const resource = await drupal.deleteResource("node--note", id)

    // TODO add logic to handle errors.

    res.status(201).json({ message: 'Note added successfully' });

  }

  else  {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

}
