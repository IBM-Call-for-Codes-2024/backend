const { supabase } = require('../supabaseClient');

// Add other user model functions if needed
exports.createUser = async (userData) => {
    return await supabase.from('users').insert([userData]);
};

exports.findUserByEmail = async (email) => {
    return await supabase.from('users').select('*').eq('email', email).single();
};
