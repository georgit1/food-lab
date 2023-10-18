import type { IncomingHttpHeaders } from 'http';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { WebhookRequiredHeaders } from 'svix';
import type { WebhookEvent } from '@clerk/nextjs/server';
import { Webhook } from 'svix';
import { db } from '@/lib/db';

const webhookSecret: string = process.env.WEBHOOK_SECRET;

export default async function handler(
  req: NextApiRequestWithSvixRequiredHeaders,
  res: NextApiResponse
) {
  console.log('###################1');

  const payload = JSON.stringify(req.body);
  const headers = req.headers;
  // Create a new Webhook instance with your webhook secret
  const wh = new Webhook(webhookSecret);

  let evt: WebhookEvent;
  try {
    // Verify the webhook payload and headers
    console.log('###################2');
    evt = wh.verify(payload, headers) as WebhookEvent;
  } catch (_) {
    // If the verification fails, return a 400 error
    console.log('###################3');

    return res.status(400).json({});
  }
  const { id } = evt.data;
  console.log('###################4');

  const eventType = evt.type;
  if (id) {
    console.log('###################5');

    try {
      console.log('###################6');

      const user = await db.user.create({
        data: {
          userId: id,
        },
      });

      console.log(`User ${id} was ${eventType}`);
      res.status(201).json({});
    } catch (error) {
      console.log('###################7');

      console.log('Error creating user', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    console.log('###################8');

    console.log('Error: User ID is undefined');
    res.status(400).json({ error: 'User ID is missing' });
  }
}

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};
