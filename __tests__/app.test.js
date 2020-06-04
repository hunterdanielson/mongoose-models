const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const app = require('../lib/app');
const Meme = require('../lib/models/Meme');

describe('app routes', () => {
    const mongodb = new MongoMemoryServer();
    beforeAll(() => {
        return mongodb.getUri()
            .then(uri => mongoose.connect(uri, {
                useUnifiedTopology: true,
                useNewUrlParser: true
            }));
    });
    beforeEach(() => {
        return mongoose.connection.dropDatabase();
    });
    afterAll(() => {
        return mongoose.connection.close();
    });

    it('can create a new meme', () => {
        return request(app)
            .post('/memes')
            .send({
                url: 'reddit.com',
                description: 'a collection of many memes'
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.anything(),
                    url: expect.any(String),
                    likes: expect.any(Number),
                    description: expect.any(String),
                    __v: 0
                });
            });
    });

    it('can get a list of all memes', async() => {
        await Meme.create({
            url: 'random.com',
            description: 'random stuff'
        });

        return request(app)
            .get('/memes')
            .then(res => {
                expect(res.body).toEqual([
                    {
                        _id: expect.anything(),
                        url: expect.any(String),
                        description: expect.any(String),
                        likes: 0,
                        __v: 0
                    }
                ]);
            });
    });
});
