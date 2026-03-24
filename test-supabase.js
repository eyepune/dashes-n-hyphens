const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function testConnection() {
  console.log('Testing Supabase Connection...');
  const { data, error } = await supabase.from('blog_posts').select('*').limit(1);
  if (error) {
    console.error('Connection failed:', error.message);
  } else {
    console.log('Connection successful!');
    console.log('Data sample:', data);
  }
}

testConnection();
