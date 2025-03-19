

// استيراد المكتبات اللازمة
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// الاتصال بقاعدة بيانات MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/speedDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected successfully');
    seedGames(); // إضافة الألعاب عند بدء التشغيل
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// تعريف هيكل بيانات المستخدم
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
const User = mongoose.model('User', userSchema);

// تعريف هيكل بيانات الألعاب
const gameSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String
});
const Game = mongoose.model('Game', gameSchema);

// وظيفة لإضافة الألعاب إلى قاعدة البيانات تلقائيًا إذا كانت فارغة
async function seedGames() {
    const existingGames = await Game.find();
    if (existingGames.length === 0) {
        const sampleGames = [
            {
                name: "Elden Ring",
                description: "Experience the epic fantasy world.",
                price: 49.99,
                image: "/images/eldenring.jpg"
            },
            {
                name: "Hogwarts Legacy",
                description: "Live your wizarding world adventure.",
                price: 69.99,
                image: "/images/hogwartslegacy.jpg"
            },
            {
                name: "Red Dead Redemption 2",
                description: "Outlaw life in the Wild West.",
                price: 39.99,
                image: "/images/reddeadredemption2.jpg"
            },
            {
                name: "The Witcher 3",
                description: "Embark on an epic journey through a beautiful, war-torn world.",
                price: 39.99,
                image: "/images/thewitcher3.jpg"
            },
            {
                name: "Grand Theft Auto V",
                description: "A fast-paced action game set in the fictional city of Los Santos.",
                price: 29.99,
                image: "/images/gta5.jpg"
            },
            {
                name: "Minecraft",
                description: "Build and explore in an infinite world.",
                price: 19.99,
                image: "/images/minecraft.jpg"
            },
            {
                name: "Fortnite",
                description: "Survive in the battle royale game with creative mechanics.",
                price: 0.00, // Fortnite مجاني
                image: "/images/fortnite.jpg"
            },
            {
                name: "Call of Duty: Warzone",
                description: "A free battle royale game with intense combat action.",
                price: 20.0, 
                image: "/images/coodwarzone.jpg"
            },
            {
                name: "Assassin's Creed Valhalla",
                description: "Explore and conquer the Viking world in this epic action RPG.",
                price: 59.99,
                image: "/images/assassinscreedvalhalla.jpg"
            },
            {
                name: "Cyberpunk 2077",
                description: "Explore the open world of Night City.",
                price: 59.99,
                image: "/images/cyberpunk2077.jpg"
            },
            {
                name: "FIFA 22",
                description: "The latest edition of the popular football simulation game.",
                price: 59.99,
                image: "/images/fifa22.jpg"
            },
            {
                name: "The Last of Us Part II",
                description: "A gripping story of survival in a post-apocalyptic world.",
                price: 49.99,
                image: "/images/lastofus2.jpg"
            }
        ];
        await Game.insertMany(sampleGames);
        console.log("Sample games added to the database.");
    }
}


// إعداد الملفات الثابتة
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve the game.html page dynamically
app.get('/game/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'game.html'));
});

// Provide game details as JSON for API calls
app.get('/api/game/:id', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ error: 'Game not found' });
        }
        res.json(game);
    } catch (err) {
        res.status(500).json({ error: 'Error retrieving game', details: err.message });
    }
});
// المسار الرئيسي لعرض صفحة تسجيل الدخول
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'speed_h.html'));
});

// مسار لعرض واجهة الإدارة
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html')); // إرسال صفحة إدارة المستخدمين
});

// مسار لعرض صفحة Home
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html')); // إرسال صفحة Home
});

app.get('/images/:imageName', (req, res) => {
    const imagePath = path.join(__dirname, 'public/images', req.params.imageName);
    res.sendFile(imagePath);
});
// مسار لعرض صفحة إدارة الألعاب
app.get('/admin-games', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin-games.html')); // إرسال صفحة إدارة الألعاب
});

// مسار لجلب الألعاب من قاعدة البيانات
app.get('/games', async (req, res) => {
    try {
        const games = await Game.find();
        res.json(games);
    } catch (err) {
        res.status(500).json({ error: 'Error retrieving games', details: err.message });
    }
});

app.post('/games', async (req, res) => {
    const { name, description, price, image } = req.body;

    try {
        const newGame = new Game({ name, description, price, image });
        await newGame.save();
        res.json({ message: 'Game added successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Error adding game', details: err.message });
    }
});
// مسار لعرض تفاصيل لعبة معينة
app.get('/game/:id', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ error: 'Game not found' });
        }
        res.json(game); // إرسال تفاصيل اللعبة بصيغة JSON
    } catch (err) {
        res.status(500).json({ error: 'Error retrieving game', details: err.message });
    }
});

app.put('/games/:id', async (req, res) => {
    const { name, description, price, image } = req.body;

    try {
        const updatedGame = await Game.findByIdAndUpdate(
            req.params.id,
            { name, description, price, image },
            { new: true }
        );
        if (!updatedGame) {
            return res.status(404).json({ error: 'Game not found' });
        }
        res.json({ message: 'Game updated successfully!', updatedGame });
    } catch (err) {
        res.status(500).json({ error: 'Error updating game', details: err.message });
    }
});
app.get('/games', async (req, res) => {
    const query = req.query.query || '';
    try {
        const games = await Game.find({ 
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        });
        res.json(games);
    } catch (err) {
        res.status(500).json({ error: 'Error retrieving games', details: err.message });
    }
});

app.delete('/games/:id', async (req, res) => {
    try {
        const deletedGame = await Game.findByIdAndDelete(req.params.id);
        if (!deletedGame) {
            return res.status(404).json({ error: 'Game not found' });
        }
        res.json({ message: 'Game deleted successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting game', details: err.message });
    }
});

app.get('/games/:id', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ error: 'Game not found' });
        }
        res.json(game);
    } catch (err) {
        res.status(500).json({ error: 'Error retrieving game', details: err.message });
    }
});

// جلب جميع المستخدمين
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Error retrieving users', details: err.message });
    }
});

// مسار للبحث عن المستخدمين
app.get('/search', async (req, res) => {
    const { query } = req.query; // استلام كلمة البحث من query string

    try {
        const users = await User.find({ username: { $regex: query, $options: 'i' } });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Error searching users', details: err.message });
    }
});

// إضافة مستخدم جديد
app.post('/add', async (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });

    try {
        await newUser.save();
        res.json({ message: 'User added successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Error adding user', details: err.message });
    }
});

// عرض بيانات مستخدم واحد
app.get('/view/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Error retrieving user', details: err.message });
    }
});

// تحديث بيانات مستخدم
app.put('/update/:id', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findByIdAndUpdate(req.params.id, { username, password }, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User updated successfully!', user });
    } catch (err) {
        res.status(500).json({ error: 'Error updating user', details: err.message });
    }
});

// حذف مستخدم
app.delete('/delete/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting user', details: err.message });
    }
});

// مسار لتسجيل الدخول (Login)
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // البحث عن المستخدم في قاعدة البيانات
        const user = await User.findOne({ username });

        // التحقق من صحة كلمة المرور
        if (!user || user.password !== password) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // إعادة التوجيه إلى صفحة الألعاب بعد تسجيل الدخول
        res.redirect('/home'); // توجيه المستخدم إلى صفحة Home
    } catch (err) {
        res.status(500).json({ error: 'Error logging in', details: err.message });
    }
});

// تشغيل الخادم على المنفذ 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
