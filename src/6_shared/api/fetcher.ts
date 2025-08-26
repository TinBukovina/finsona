class CustomError extends Error {
  info: string;
  status: number;

  constructor(message: string, info: string, status: number) {
    super(message);
    this.info = info;
    this.status = status;
  }
}

export const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    let errorInfo;

    try {
      errorInfo = await res.json();
    } catch (e) {
      errorInfo = { message: await res.text() };
    }

    throw new CustomError(
      "An error occurred while fetching data.",
      errorInfo,
      res.status
    );
  }

  return res.json();
};
