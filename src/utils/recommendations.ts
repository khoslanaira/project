import { UserResponse, Perfume } from '../types';

// Backend API URL
const BACKEND_URL = 'http://127.0.0.1:5000';

export const getRecommendations = async (responses: UserResponse): Promise<Perfume[]> => {
  try {
    // Build user query from responses
    const userQuery = buildUserQuery(responses);
    
    // Call backend API
    const response = await fetch(`${BACKEND_URL}/recommend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: userQuery })
    });

    if (!response.ok) {
      throw new Error('Failed to get recommendations');
    }

    const data = await response.json();
    
    // Transform backend response to frontend format
    return data.recommendations.map((perfume: any, index: number) => {
      // Parse notes string into object structure
      const notesArray = perfume.notes.split(',').map((note: string) => note.trim());
      const notesObject = {
        top: notesArray.slice(0, 3), // First 3 notes as top
        middle: notesArray.slice(3, 6), // Next 3 as middle
        base: notesArray.slice(6) // Rest as base
      };
      
      return {
        id: `perfume-${index}`,
        name: perfume.name,
        brand: perfume.brand,
        description: perfume.description,
        notes: notesObject,
        price: '₹1000', // Default price since backend doesn't provide it
        image: perfume.image_url,
        tags: [notesArray[0] || 'fragrance'], // First note as tag
        matchReason: `Perfect match for your preferences`,
        rating: 4.5,
        reviews: 120
      };
    });
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    // Return empty array if backend fails - no fallback to mock data
    return [];
  }
};

const buildUserQuery = (responses: UserResponse): string => {
  const parts = [];
  
  if (responses.noteFamily) {
    parts.push(responses.noteFamily.split(' ')[0]);
  }
  if (responses.vibe) {
    parts.push(responses.vibe.split(' ')[0]);
  }
  if (responses.timing) {
    parts.push(responses.timing.split(' ')[0]);
  }
  if (responses.intensity) {
    parts.push(responses.intensity.split(' ')[0]);
  }
  if (responses.brand) {
    parts.push(responses.brand);
  }
  
  return parts.join(' ');
};

export const buildUserResponseObject = (responses: UserResponse) => {
  return {
    note_family: responses.noteFamily.split(' ')[0].toLowerCase(),
    vibe: responses.vibe.split(' ')[0].toLowerCase(),
    timing: responses.timing.split(' ')[0].toLowerCase(),
    intensity: responses.intensity.includes('Light') ? 'light' : 
               responses.intensity.includes('Moderate') ? 'moderate' : 
               responses.intensity.includes('Deep') ? 'intense' : 'moderate',
    brand: responses.brand || 'none'
  };
};