const request = require("supertest")
const app = require('../server')

describe('Attempt to create students without authorization', () => {
    it('should fail while trying to authorize', async () => {
        const res = await request(app)
            .post('/api/user')
            .send({
                name: 'Student 1',
                emailAddress: 'Student1@gmail.com',
                phoneNumber: '49999999999',
                password: 'password',
                userRole: 'student'
            })

        expect(res.status).toBe(401)
    })
})

// describe('Attempt to create students using wrong authorization', () => {
//     it('should fail while trying to authorize', async () => {
//         const res = await request(app)
//             .post('/api/user')
//             .set('Authorization', 'Bearer abc123')
//             .send({
//                 name: 'Student 1',
//                 emailAddress: 'Student1@gmail.com',
//                 phoneNumber: '49999999999',
//                 password: 'password',
//                 userRole: 'student'
//             })

//         expect(res.status).toBe(401)
//     })
// })

// let auth = {}

// describe('Login as admin', () => {
//     it('should return jwt', async () => {
//         const res = await request(app)
//             .post('/api/login')
//             .send({
//                 emailAddress: 'johndoe@gmail.com',
//                 password: 'password',
//             })

//         auth = res.body

//         expect(res.body.accessToken).not.toBe('');
//         expect(res.body.refreshToken).not.toBe('');
//     })
// })

// describe('Create multiple students', () => {
//     it('should create a student', async () => {

//         const res = await request(app)
//             .post('/api/user')
//             .set('Authorization', 'Bearer ' + auth.accessToken)
//             .send({
//                 name: 'Student 1',
//                 emailAddress: 'Student1@gmail.com',
//                 phoneNumber: '49999999999',
//                 password: 'password',
//                 userRole: 'student'
//             })

//         expect(res.status).toBe(201)
//     })

//     it('should create a student', async () => {
//         const res = await request(app)
//             .post('/api/user')
//             .set('Authorization', 'Bearer ' + auth.accessToken)
//             .send({
//                 name: 'Student 2',
//                 emailAddress: 'Student2@gmail.com',
//                 phoneNumber: '49999999999',
//                 password: 'password',
//                 userRole: 'student'
//             })

//         expect(res.status).toBe(201)
//     })

//     it('should create a student', async () => {
//         const res = await request(app)
//             .post('/api/user')
//             .set('Authorization', 'Bearer ' + auth.accessToken)
//             .send({
//                 name: 'Student 3',
//                 emailAddress: 'Student3@gmail.com',
//                 phoneNumber: '49999999999',
//                 password: 'password',
//                 userRole: 'student'
//             })

//         expect(res.status).toBe(201)
//     })

//     it('should create a student', async () => {
//         const res = await request(app)
//             .post('/api/user')
//             .set('Authorization', 'Bearer ' + auth.accessToken)
//             .send({
//                 name: 'Student 4',
//                 emailAddress: 'Student4@gmail.com',
//                 phoneNumber: '49999999999',
//                 password: 'password',
//                 userRole: 'student'
//             })

//         expect(res.status).toBe(201)
//     })
// })