export const fetchApi = async (url: string, options: any) => {
  const res = await fetch('http://localhost:3001' + url, options);
  const data = await res.json();
  return data;
};
