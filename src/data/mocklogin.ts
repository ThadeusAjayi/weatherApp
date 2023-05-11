// A mock function to mimic making an async request for data
export async function login<T>({
  email,
}: {
  email: string;
  password?: string;
}): Promise<T> {
  return new Promise<T>(resolve => {
    const res = {data: {email: email}}.data as T;
    setTimeout(() => resolve(res), 500);
  });
}
