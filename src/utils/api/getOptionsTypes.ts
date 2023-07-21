const getOptionsTypes = async (): Promise<
  {
    id: number;
    name: string;
  }[]
> => {
  const result = await fetch(`${import.meta.env.VITE_API_URL}/types/getAll`, {
    credentials: "include",
  });
  if (result.status === 200) return result.json();
  throw new Error(`Unable to get OptionsTypes.`);
};

export default getOptionsTypes;
