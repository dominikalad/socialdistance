let db = {
    users: [
        {
            userId: 'CXw4H52kCZUIsRdzyaf0X3uZx8t2',
            email: 'useremail.com',
            handle: 'user',
            createdAt: '2021-01-09T19:08:36.393Z',
            imageUrl: 'image/asdfgh/asdf',
            bio: 'Yo! Nice to meet yall',
            website: 'https://usero.com',
            location: 'San Diego, CA, USA'
        }
    ],
    screams: [
        {
            userHandle: "user",
            body: "the body",
            createdAt: "2021-01-09T03:34:05.601Z",
            petCount: 5,
            commentCount: 2
        }
    ],
    comments: [
        {
            userHandle: "user",
            screamId: 'ghJHGfhJBvghN',
            body: 'Awesome!',
            createdAt: "2021-01-09T03:34:05.601Z",
        }
    ],
    notifications: [
        {
            recipient: 'user',
            sender: 'Broseph',
            read: 'true | false',
            screamId: 'HGhjfgHjhbVFgjHGFHGhHGH',
            type: 'like | comment',
            createdAt: "2021-01-09T03:34:05.601Z"
        }
    ]
};

const userDetails = {
    credentials: {
            userId: 'CXw4H52kCZUIsRdzyaf0X3uZx8t2',
            email: 'useremail.com',
            handle: 'user',
            createdAt: '2021-01-09T19:08:36.393Z',
            imageUrl: 'image/asdfgh/asdf',
            bio: 'Yo! Nice to meet yall',
            website: 'https://usero.com',
            location: 'San Diego, CA, USA'
    },
    likes: [
        {
            userHandle: 'user',
            screamId: 'nsbfskncksjbckjsdfnkus',
        },
        {
            userHandle: 'user',
            screamId: 'nsbfsknDFcGkHsDFGjbckjsds',
        }
    ]
};