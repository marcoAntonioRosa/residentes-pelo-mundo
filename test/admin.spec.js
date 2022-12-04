const request = require("supertest")
const app = require('../server')

// Students
    // Attempt to create students without authorization
    // Attempt to create students using wrong authorization
    // Login as admin
    // Create multiple students

// Login
    // Login with the wrong credentials
    // Login as admin 
        // Attempt to update another admin
        // Update a student
        // Attempt to delete another admin
        // Delete a student
        // Edit self
        // Delete self (When deleted account should be disconnected)
        // Attempt to edit self
    // Login as student
        // Attempt to create a student
        // Attempt to update a admin
        // Attempt to update a student
        // Attempt to delete a admin
        // Attempt to delete a student
        // Edit self
        // Delete self (When deleted account should be disconnected)
        // Attempt to edit self
    // Attempt to refresh token with wrong refresh token
    // Refresh token

    // Login as admin 
        // Retrieve all using wrong authorization
        // Retrieve by using wrong authorization
        // Retrieve all users (no password should be in res)
        // Retrieve by id (no password should be in res)



// Create first admin 
// describe('Create first admin', () => {
//     it('should create a admin', async () => {
//         const res = await request(app)
//         .post('/api/user')
//         .send( {
//             name: 'John Doe',
//             emailAddress: 'johndoe@gmail.com',
//             phoneNumber: '49999999999',
//             password: 'password',
//             userRole: 'admin'
//         })

//         expect(res.status).toBe(201)
//     })
// })

// describe('Attempt to create admin without authorization', () => {
//     it('should fail while trying to authorize', async () => {
//         const res = await request(app)
//         .post('/api/user')
//         .send( {
//             name: 'Admin 2',
//             emailAddress: 'Admin 2@gmail.com',
//             phoneNumber: '49999999999',
//             password: 'password',
//             userRole: 'admin'
//         })

//         expect(res.status).toBe(401)
//     })
// })


describe('Attempt to create admin using wrong authorization', () => {
    it('should fail while trying to authorize', async () => {
        const res = await request(app)
        .post('/api/user')
        .set('Authorization', 'Bearer abc123')
        .send( {
            name: 'Admin 2',
            emailAddress: 'Admin 2@gmail.com',
            phoneNumber: '49999999999',
            password: 'password',
            userRole: 'admin'
        })

        expect(res.status).toBe(401)
    })
})

// let auth = {}

// describe('Login as admin', () => {
//     it('should return jwt', async () => {
//         const res = await request(app)
//         .post('/api/login')
//         .send( {
//             emailAddress: 'johndoe@gmail.com',
//             password: 'password',
//         })

//         auth = res.body

//         expect(res.body.accessToken).not.toBe('');
//         expect(res.body.refreshToken).not.toBe('');
//     })
// })

// describe('Create multiple admin', () => {
//     it('should create a admin', async () => {

//         const res = await request(app)
//         .post('/api/user')
//         .set('Authorization', 'Bearer ' + auth.accessToken)
//         .send( {
//             name: 'Admin 2',
//             emailAddress: 'Admin 2@gmail.com',
//             phoneNumber: '49999999999',
//             password: 'password',
//             userRole: 'admin'
//         })

//         expect(res.status).toBe(201)
//     })

//     it('should create a admin', async () => {
//         const res = await request(app)
//         .post('/api/user')
//         .set('Authorization', 'Bearer ' + auth.accessToken)
//         .send( {
//             name: 'Admin 3',
//             emailAddress: 'Admin3@gmail.com',
//             phoneNumber: '49999999999',
//             password: 'password',
//             userRole: 'admin'
//         })

//         expect(res.status).toBe(201)
//     })

//     it('should create a admin', async () => {
//         const res = await request(app)
//         .post('/api/user')
//         .set('Authorization', 'Bearer ' + auth.accessToken)
//         .send( {
//             name: 'Admin 4',
//             emailAddress: 'Admin4@gmail.com',
//             phoneNumber: '49999999999',
//             password: 'password',
//             userRole: 'admin'
//         })

//         expect(res.status).toBe(201)
//     })
// })