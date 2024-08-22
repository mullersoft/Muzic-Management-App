// src/api.ts

export const fetchGenres = async (): Promise<any[]> => {
  try {
    const response = await fetch('/api/genres');
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch genres:', error);
    return [];
  }
};

export const deleteGenre = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`/api/genres/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
  } catch (error) {
    console.error('Failed to delete genre:', error);
  }
};
