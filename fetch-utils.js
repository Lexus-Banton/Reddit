const SUPABASE_URL = 'https://sgsqhdtlconmltdgcqzd.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnc3FoZHRsY29ubWx0ZGdjcXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjUwODAzNzMsImV4cCI6MTk4MDY1NjM3M30.nIbCKve45Pb2NvJSQTpQlTkkQ2S8mpK6Ull7zd4lNQg';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */
export async function createPost(post) {
    return await client.from('reddit').insert(post);
}

export async function getPosts() {
    return await client.from('reddit').select('*');
}

export async function getPost(id) {
    return await client
        .from('reddit')
        .select('*, rcomments(*)')
        .eq('id', id)
        .order('created_at', { foreignTable: 'rcomments', ascending: false })
        .single();
}

export async function createComment(comment) {
    return await client.from('rcomments').insert(comment).single();
}

export async function uploadImage(bucketName, imagePath, imageFile) {
    const bucket = client.storage.from(bucketName);

    const response = await bucket.upload(imagePath, imageFile, {
        cacheControl: '3600',

        upsert: true,
    });
    if (response.error) {
        // eslint-disable-next-line no-console
        console.log(response.error);
        return null;
    }

    const url = `${SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;

    return url;
}
