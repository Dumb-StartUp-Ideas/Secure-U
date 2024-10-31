import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yeavrdjpakjxpdelxmob.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllYXZyZGpwYWtqeHBkZWx4bW9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAzMDc0NjIsImV4cCI6MjA0NTg4MzQ2Mn0.AVvZLHbLP_6W0CdLICYhY6g-VCvxCSx2Qa0MUsaJvto';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to fetch comments for a specific post
export const fetchComments = async (postId) => {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId) // Fetch comments for the specific post
    .order('created_at', { ascending: true }); // Order comments by creation time

  if (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
  return data;
};

// Function to add a new comment to a post
export const addComment = async (postId, username, avatar, commentText) => {
  const { data, error } = await supabase
    .from('comments')
    .insert([
      {
        post_id: postId,
        username,
        avatar,
        comment_text: commentText,
      }
    ]);

  if (error) {
    console.error("Error adding comment:", error);
    return null;
  }
  return data;
};
