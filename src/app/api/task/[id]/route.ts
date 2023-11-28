import { fetchApi } from '@/service/api';

export async function PUT(request: Request) {
  const data = await request.json();
  const res = await fetchApi(`/tasks/${data.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      updatedAt: new Date().toISOString(),
    }),
  });
  return Response.json({ res });
}
