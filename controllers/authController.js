const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { supabase } = require('../supabaseClient');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Redirect to Google for authentication
exports.googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

// Handle the callback from Google
exports.googleAuthCallback = (req, res) => {
  // Successful authentication, generate JWT token
  const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET);
  res.redirect(`https://frontend-csre.onrender.com?token=${token}`);
};


// User signup
exports.signup = async (req, res) => {
    const { name, last_name, email, username, password, height, weight, sex } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const { data, error } = await supabase
            .from('users')
            .insert([{ name, last_name, email, username, password: hashedPassword, height, weight, sex }]);
        
        if (error) return res.status(400).json({ error: error.message });
        res.status(201).json({ message: 'User created successfully', userId: data[0].id });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// User login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error || !user) return res.status(400).json({ error: 'Invalid email or password' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ error: 'Invalid email or password' });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
