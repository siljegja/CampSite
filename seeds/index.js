const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/camp-site');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({}); 
    for(let i = 0; i < 21; i++) {
        const random1000 = Math.floor(Math.random() * 1000); 
        const price = Math.floor(Math.random() * 20) + 10; 
        const camp = new Campground({
            author: '64006e2a54554f2b42e7e6fe',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis iusto eum repudiandae animi, repellat voluptatum autem? Quae delectus sit veniam accusamus quas asperiores eaque cumque nemo officiis culpa? In, quae?',
            price, 
            geometry: { /
                type : 'Point', 
                coordinates : [
                    cities[random1000].longitude, 
                    cities[random1000].latitude
                ] 
            },
            images: [
                { 
                    url : 'https://res.cloudinary.com/dmhlzrw28/image/upload/v1675941830/YelpCamp/khlz15p0f7bckn8hozk6.jpg', 
                    filename : 'YelpCamp/khlz15p0f7bckn8hozk6',
                },
                {
                    url: 'https://res.cloudinary.com/dmhlzrw28/image/upload/v1675771504/YelpCamp/fzy2tlbmi1rengv9ymbu.jpg',
                    filename: 'YelpCamp/fzy2tlbmi1rengv9ymbu',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

