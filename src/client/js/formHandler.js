function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formtext = document.getElementById('name').value;

    console.log("::: Form Submitted :::")
   // const textified = { formtext };

    fetch('http://localhost:8081/usertext', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ formtext })
    })
    .then(res => {
        console.log(res)
         return res.json()
    })
    .then(function(data) {
        document.getElementById('results').innerHTML = data.model;
    })
}

export { handleSubmit }
