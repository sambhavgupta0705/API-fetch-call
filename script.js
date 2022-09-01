document.getElementById('fetchUserDataBtn').addEventListener('click', fetchUserData);
    
document.getElementById('addPostForm').addEventListener('submit', addPost);

function fetchUserData(){
    fetch('https://jsonplaceholder.typicode.com/users/')
    
        .then(response => response.json())
        .then(users => {

            let output = '<h2>Lists of Users</h2>';
            output += '<ul>';
            users.forEach(function(user) {
                output += `
                    <li>
                        ${user.name}
                    </li>
                `;
            });
            output += '</ul>'
            document.getElementById("response").innerHTML = output;
        });
}

function addPost(event) {

    event.preventDefault();
    
    let title = document.getElementById('title').value;

    let body = document.getElementById('body').value;

    const myPost = {
        title: title,
        body: body
    };

    fetch('https://jsonplaceholder.typicode.com/postsERROR', {
        method: 'POST',
        headers: {

            'Content-Type': 'application/json'
        },
        body: JSON.stringify(myPost)
    })
        .then((res) => {
            if (res.ok) {
              
                return res.json() 
            } else {


                return Promise.reject({ 
                    status: res.status, statusText: res.statusText });
            }   
            
        })
        .then((data) => console.log(data))
        .catch(err => console.log('Error message:', err.statusText));
}