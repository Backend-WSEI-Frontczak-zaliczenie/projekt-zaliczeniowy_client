const signUp = async (
  email: FormDataEntryValue,
  password: FormDataEntryValue
) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/Identity/Register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnUrl: "",
        }),
      }
    );

    if (response.status === 302) return;
    throw new Error("Something went wrong");
  } catch {
    console.log("error");
  }
};

export default signUp;
