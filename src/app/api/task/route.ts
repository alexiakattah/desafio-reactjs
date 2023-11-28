import { fetchApi } from '@/service/api';

export async function POST(request: Request) {
  const { title, project, tags, description } = await request.json();
  const res = await fetchApi('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      project,
      tags,
      description,
      status: 'TODO',
      createdAt: new Date().toISOString(),
    }),
  });
  return Response.json({ res });
}

export async function GET(request: Request) {
  const res = await fetchApi('/tasks', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return Response.json({ res });
}
