

export const fetchApi = async () => {
  const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=1`)

  if(!response.ok) {
    throw new Error("Failed to fetching data")
  }

  return response.json()
}