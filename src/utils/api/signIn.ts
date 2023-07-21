const signIn = async (
  email: FormDataEntryValue,
  password: FormDataEntryValue
) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/Identity/Login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        rememberMe: true,
        returnUrl: "",
      }),
      credentials: "include",
    }
  );
  if (response.status === 400) throw new Error("Invalid credentials");
  if (response.status === 200) return;
  throw new Error("Something went wrong");
};

export default signIn;
