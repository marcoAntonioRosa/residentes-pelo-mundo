const request = require("supertest")
const app = require('../server')

describe('Test my app server', () => {
    it('should get main route', async () => {
        const res = await request(app)
        .get('/')
        expect(res.body).toHaveProperty('message')
    })
})