const services = {
  characters: (url: string, options: RequestInit | undefined) =>
    fetch(url, options).then((response) => {
      if (response.ok) {
        return response.json();
      }
      if (response.status === 404) {
        throw new Error('No results found. Please try another search.');
      }
      throw new Error('Something went wrong. Please try again later.');
    }),
};

export default services;
