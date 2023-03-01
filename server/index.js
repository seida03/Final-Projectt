const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { response } = require("express");
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());

const { Schema } = mongoose;

const cosmeticsSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: Number, required: true },
    prevprice: { type: Number, required: false },
    position: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true }
);
const Cosmetics = mongoose.model("cosmetics", cosmeticsSchema);
//about
const aboutSchema = new Schema({
    name: { type: String, required: true },
    byWho: { type: String, required: true },
    heading: { type: String, required: true },
    minidescription: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
}, { timestamps: true }
);
const About = mongoose.model("about", aboutSchema);
app.get("/about", (req, res) => {
    About.find({}, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            res.send(err);
        }
    });
});
app.post("/about", (req, res) => {
    const newProduct = new About({
        name: req.body.name,
        byWho: req.body.byWho,
        heading: req.body.heading,
        img: req.body.img,
        description: req.body.description,
        minidescription: req.body.minidescription,
    });
    newProduct.save();
    res.send("blog created");
});
app.get("/about/:id", (req, res) => {
    const { id } = req.params;
    About.findById(id, (err, doc) => {
        if (!err) {
            if (doc) {
                res.send(doc);
            } else res.send("blog not found");
        } else {
            res.send(err);
        }
    });
});
app.delete("/about/:id", (req, res) => {
    const { id } = req.params;
    About.findByIdAndDelete(id, (err) => {
        if (!err) {
            res.send("blog deleted");
        } else {
            res.send(err);
        }
    });
});
app.put("/about/:id", (req, res) => {
    const { id } = req.params
    About.findByIdAndUpdate(id, req.body, (err, doc) => {
        if (!err) {
            res.status(200).json({ message: "blog uptaded" })
        }
        else {
            res.status(404).json({ message: err })
        }
    })
    res.json({ message: "Successfully Updated" })
})
//register
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true, default: "user" },
    cart: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "cosmetics" },
        count: { type: Number, default: 1 },
        price: { type: Number },
        img: { type: String }
    }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'cosmetics' }],
}, { timestamps: true }
)
const User = mongoose.model("User", userSchema)


app.get("/", (req, res) => {
    res.send("<h1>Cosmetics</h1>");
});

app.get("/cosmetics", (req, res) => {
    Cosmetics.find({}, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            res.send(err);
        }
    });
});

app.get("/cosmetics/:id", (req, res) => {
    const { id } = req.params;
    Cosmetics.findById(id, (err, doc) => {
        if (!err) {
            if (doc) {
                res.send(doc);
            } else res.send("product not found");
        } else {
            res.send(err);
        }
    });
});

app.delete("/cosmetics/:id", (req, res) => {
    const { id } = req.params;
    Cosmetics.findByIdAndDelete(id, (err) => {
        if (!err) {
            res.send("product deleted");
        } else {
            res.send(err);
        }
    });
});

app.post("/cosmetics", (req, res) => {
    const newProduct = new Cosmetics({
        name: req.body.name,
        category: req.body.category,
        img: req.body.img,
        price: req.body.price,
        position: req.body.position,
        prevprice: req.body.prevprice,
        description: req.body.description,
    });
    newProduct.save();
    res.send("product created");
});

app.put("/cosmetics/:id", (req, res) => {
    const { id } = req.params
    Cosmetics.findByIdAndUpdate(id, req.body, (err, doc) => {
        if (!err) {
            res.status(200).json({ message: "product uptaded" })
        }
        else {
            res.status(404).json({ message: err })
        }
    })
})

app.get("/users", (req, res) => {
    User.find({}, (err, docs) => {
        if (!err) {
            res.send(docs)
        }
        else {
            res.status(404).json("Problem var")
        }
    })
})
//register
app.post("/register", async (req, res) => {
    try {
        const { username, password, email } = req.body
        const isUsed = await User.findOne({ username })
        if (isUsed) {
            return res.json({ message: "This user exists!" })
        }
        const newUser = new User({
            username,
            password,
            email,
        })
        await newUser.save()
        res.json({
            newUser,
            message: "Registration is successfull"
        })
    } catch (error) {
        res.json({ message: "create user error" })
    }
})

//login
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) {
            return res.json({ message: "This user doesn't exist!" })
        }
        if (password !== user.password) {
            return res.json({ message: "password is not correct" })
        }
        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )
        res.json({
            user,
            token,
            message: "you logged in",
        })
    } catch (error) {
        res.json({ message: "login error" })
    }
})

app.get("/me", (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.userId = decoded.id

            next()
        } catch (error) {
            return res.json({ message: "No access!" })
        }
    }
    else {
        return res.json({ message: "No access!" })
    }
}, async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if (!user) {
            return res.json({ message: "This user doesn't exist!" })
        }
        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.json({
            user,
            token
        })

    } catch (error) {
        res.json({ message: "Error getting user data!" })
    }
})

//cart
app.post("/cart/:id", (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.userId = decoded.id

            next()
        } catch (error) {
            return res.json({ message: "No access!" })
        }
    }
    else {
        return res.json({ message: "No access!" })
    }
}, async (req, res) => {
    try {
        const { id } = req.params
        const product = await Cosmetics.findById(id)
        if (!product) {
            return res.json({ message: "product does not exist" })
        }
        const user = await User.findById(req.body.userId)
        let newProd = {};
        if (user?.cart.find(x => x.productId == id)) {
            user?.cart.forEach(element => {
                if (element.productId == id) {
                    element.count += 1
                }
            });
        }
        else {
            let price = await Cosmetics.findById(id)
            newProd = {
                productId: id,
                count: 1,
                price: price.price,
                img: price.img
            }
            user?.cart.push(newProd)
        }
        await User.findByIdAndUpdate(req.body.userId, user)
        res.json({ user })
    } catch (error) {
        res.json({ message: "error happened" })
    }
})

app.get('/cart', (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.userId = decoded.id
            next()
        } catch (error) {
            return res.json({ message: "No access!" })
        }
    }
    else {
        return res.json({ message: "No access!" })
    }
}, async (req, res) => {
    try {
        // const cartPreview = await .find().limit(12)
        const user = await User.findById(req.userId)
        if (!user) {
            return res.json({ message: "user not found" })
        }
        const usersCart = user.cart
        res.json(usersCart)
    } catch (error) {
        res.json({ message: "error" })
    }
})


app.get('/cart/:id', (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.userId = decoded.id
            next()
        } catch (error) {
            return res.json({ message: "No access!" })
        }
    }
    else {
        return res.json({ message: "No access!" })
    }
}, async (req, res) => {
    try {
        // const cartPreview = await .find().limit(12)
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.json({ message: "user not found" })
        }
        let userCart = user.cart
        console.log(userCart.filter(x => x.productId == "63ebd1f28ccce50024ab302f"));
        const list = await Promise.all(
            user.cart.map(item => {
                return Cosmetics.findById(item.productId)
            }),
        )
        res.json({
            list, userCart
        })
    } catch (error) {
        res.json({ message: "error" })
    }
})


app.delete('/cart/:id', (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.userId = decoded.id
            next()
        } catch (error) {
            return res.json({ message: "No access!" })
        }
    }
    else {
        return res.json({ message: "No access!" })
    }
}, async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.userId, {
            $pull: {
                cart: {
                    productId: req.params.id
                }
            }
        })
        const Id = req.params.id
        res.json({
            Id,
            message: "product was deleted",
        })
    } catch (error) {
        res.json({ message: "error" })
    }
})
//wishlist
app.post("/wish/:id", (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.userId = decoded.id

            next()
        } catch (error) {
            return res.json({ message: "No access!" })
        }
    }
    else {
        return res.json({ message: "No access!" })
    }
}, async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        const { id } = req.params
        if (user?.wishlist.find(x => String(x) == id)) {
            return res.json({ message: "product exists" })
        }
        console.log(id);
        await User.findByIdAndUpdate(req.userId, {
            $push: {
                wishlist: id,
            }
        })
        res.json({ message: "succesfull" })

    } catch (error) {
        res.json({ message: "error happened" })
    }
})
app.get('/wish/:id', (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.userId = decoded.id
            next()
        } catch (error) {
            return res.json({ message: "No access!" })
        }
    }
    else {
        return res.json({ message: "No access!" })
    }
}, async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        const list = await Promise.all(
            user.wishlist.map(item => {
                return Cosmetics.findById(item._id)
            }),
        )
        res.json({
            list,
        })
    } catch (error) {
        res.json({ message: "error" })
    }
})

app.delete('/wish/:id', (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.userId = decoded.id
            next()
        } catch (error) {
            return res.json({ message: "No access!" })
        }
    }
    else {
        return res.json({ message: "No access!" })
    }
}, async (req, res) => {
    try {
        console.log(req.params.id);
        await User.findByIdAndUpdate(req.userId, {
            $pull: {
                wishlist: req.params.id
            }
        })
        res.json({
            message: "product was deleted"
        })
    } catch (error) {
        res.json({ message: "error" })
    }
})




const URL = process.env.url;
const PORT = process.env.port;
mongoose.set("strictQuery", true);

mongoose.connect(URL, (err) => {
    if (!err) {
        console.log("database is working");
        app.listen(PORT, () => {
            console.log("server is working");
        });
    }
});
