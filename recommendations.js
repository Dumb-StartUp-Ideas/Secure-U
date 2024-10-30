
// Import Supabase client
import { supabase } from './supabaseClient';

// Function to get recommendations based on user interactions
export async function getRecommendations(userId) {
    // Fetch the user's interactions
    const { data: userInteractions, error: userError } = await supabase
        .from('user_interactions')
        .select('tag')
        .eq('user_id', userId);

    console.log('User Interactions:', userInteractions); // Temporary log for testing
    
    try {
        // Fetch the user's interactions
        const { data: userInteractions, error: userError } = await supabase
            .from('user_interactions')
            .select('tag')
            .eq('user_id', userId);

        if (userError) {
            console.error('Error fetching user interactions:', userError);
            return [];
        }

        // Extract unique tags from user interactions
        const tags = [...new Set(userInteractions.map(interaction => interaction.tag))];

        // Fetch popular interactions by these tags from other users
        const { data: recommendedInteractions, error: recommendError } = await supabase
            .from('user_interactions')
            .select('*')
            .in('tag', tags)
            .neq('user_id', userId) // Exclude the current user's interactions
            .limit(10);

        if (recommendError) {
            console.error('Error fetching recommendations:', recommendError);
            return [];
        }

        // Format the recommendations (e.g., content IDs or tags)
        const recommendations = recommendedInteractions.map(interaction => interaction.content_id);

        return recommendations;

    } catch (error) {
        console.error('Unexpected error in getting recommendations:', error);
        return [];
    }
}

