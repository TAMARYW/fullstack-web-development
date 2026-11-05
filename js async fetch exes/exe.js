
const baseUrl = 'https://jsonplaceholder.typicode.com';

//1
const getUser = (userID) => {
    return fetch(`${baseUrl}/users/${userID}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to load the data.');
            }
            return response.json();
        });
};

getUser(1)
    .then((user) => {
        console.log(`User's name: ${user.name}`);
    })
    .catch((err) => {
        console.log('Error:', err.message);
    });

//2
const getPost = (postID) => {
    return fetch(`${baseUrl}/posts/${postID}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to load the data.');
            }
            return response.json();
        });
};

getPost(1)
    .then((post) => {
        console.log(`Post's title: ${post.title}`);
    })
    .catch((err) => {
        console.log('Error:', err.message);
    });

//3
const getUserEmail = (userID) => {
    return getUser(userID);
}

getUserEmail(1)
    .then((user) => {
        console.log(`User's email: ${user.email}`);
    })
    .catch((err) => {
        console.log('Error:', err.message);
    });

//4
const listUserTodos = (userId) => {
    return fetch(`${baseUrl}/todos?userId=${userId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to load todos from server.');
            }
            return response.json();
        })
}

listUserTodos(1)
    .then((todos) => {
        console.log(`User ${todos.userId} has ${todos.length} todos.`);
    })
    .catch((err) => {
        console.log('Error:', err.message)
    })

//5
const checkPostExists = (postID) => {
    return fetch(`${baseUrl}/posts/${postID}`)
        .then((response) => {
            return response.ok;
        })
        .catch(() => false);
}

checkPostExists(1)
    .then((exists) => {
        if (exists)
            console.log(`Post exists!`);
        else {
            console.log('Post does not exist.');
        }
    });

//6
const fetchWithDelay = (url, delay) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fetch(url));
        }, delay);
    })
    .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch data.');
        return response.text(); 
    });
};

fetchWithDelay(`${baseUrl}/posts/1`, 1000)
    .then((text) => {
        console.log(`First 50 chars: ${text.substring(0, 50)}...`);
    })
    .catch((err) => console.log('Error 6:', err.message));


//7
const showKeys = (url) => {
    return fetch(url)
        .then((response) => {
            if (!response.ok) throw new Error('Failed to fetch data.');
            return response.json();
        })
        .then((data) => {
            return Object.keys(data);
        });
};

showKeys(`${baseUrl}/todos/1`)
    .then((keys) => {
        console.log('Keys:', keys);
    })
    .catch((err) => console.log('Error 7:', err.message));


//8
const getUserFirstPostDirect = (userId) => {
    return fetch(`${baseUrl}/posts?userId=${userId}`)
        .then((response) => {
            if (!response.ok) throw new Error('Failed to load posts.');
            return response.json();
        })
        .then((posts) => {
            if (posts.length === 0) throw new Error('No posts found for this user.');
            return posts[0].title;
        });
};

getUserFirstPost(1)
    .then((title) => {
        console.log(`First post title: ${title}`);
    })
    .catch((err) => console.log('Error 8:', err.message));


//9
    const getPostCommentsCount = (postId) => {
    return fetch(`${baseUrl}/posts/${postId}`)
        .then((response) => {
            if (!response.ok) throw new Error('Post not found.');
            return response.json();
        })
        .then((post) => {
            return fetch(`${baseUrl}/comments?postId=${post.id}`);
        })
        .then((response) => {
            if (!response.ok) throw new Error('Failed to load comments.');
            return response.json();
        })
        .then((comments) => {
            return comments.length;
        });
};

getPostCommentsCount(1)
    .then((count) => {
        console.log(`Post has ${count} comments`);
    })
    .catch((err) => console.log('Error 9:', err.message));


//10
    const todoAndUser = (todoId) => {
    return fetch(`${baseUrl}/todos/${todoId}`)
        .then((response) => {
            if (!response.ok) throw new Error('Todo not found.');
            return response.json();
        })
        .then((todo) => {
            return fetch(`${baseUrl}/users/${todo.userId}`)
                .then((response) => {
                    if (!response.ok) throw new Error('User not found.');
                    return response.json();
                })
                .then((user) => {
                    return {
                        todoTitle: todo.title,
                        userName: user.name
                    };
                });
        });
};

todoAndUser(1)
    .then((result) => {
        console.log(`Todo title: ${result.todoTitle}`);
        console.log(`User name: ${result.userName}`);
    })
    .catch((err) => console.log('Error 10:', err.message));