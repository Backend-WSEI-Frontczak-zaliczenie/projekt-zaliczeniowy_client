const getOptionsRegions = async (): Promise<
  {
    id: number;
    name: string;
  }[]
> => {
  const result = await fetch(`${import.meta.env.VITE_API_URL}/regions/getAll`);
  if (result.status === 200) return result.json();
  throw new Error(`Unable to get OptionsRegions.`);
};

export default getOptionsRegions;
