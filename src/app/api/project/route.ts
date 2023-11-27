import { fetchApi } from '@/service/api';

export async function POST(request: Request) {
  const { title, project, tags, description } = await request.json();
  const res = await fetchApi('/projects', {
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
    }),
  });
  return Response.json({ res });
}

export async function GET(request: Request) {
  const res = await fetchApi('/projects', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log('🚀 ~ file: route.ts:29 ~ GET ~ json:', res);

  return Response.json({ res });
}
