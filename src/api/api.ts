export const fetchArtworks = async (page: number = 1) => {
  const response = await fetch(
    `https://api.artic.edu/api/v1/artworks?page=${page}&fields=id,title,place_of_origin,artist_display,inscriptions,date_start,date_end`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();
  
  return {
    data: data.data.map((item: any) => ({
      id: item.id,
      title: item.title || 'Untitled',
      place_of_origin: item.place_of_origin || 'Unknown',
      artist_display: item.artist_display || 'Unknown',
      inscriptions: item.inscriptions || 'None',
      date_start: item.date_start || 0,
      date_end: item.date_end || 0,
    })),
    pagination: data.pagination,
  };
};