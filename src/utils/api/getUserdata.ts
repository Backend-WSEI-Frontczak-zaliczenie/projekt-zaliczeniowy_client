const getCurrentUserData = async () =>
  new Promise<{ name: string; role: string }>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: "John Doe",
        role: "user",
      });
    }, 1000);
  });

export default getCurrentUserData;
