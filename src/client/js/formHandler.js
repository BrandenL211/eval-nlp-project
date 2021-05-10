function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value;

    console.log("::: Form Submitted :::")
   // const textified = { formtext };

    fetch('http://localhost:8081/usertext', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ formText })
    })
    .then(res => {
        console.log(res)
        res.json()
    })
    .then(function(response) {
        document.getElementById('results').innerHTML = response.model;
    })
}

export { handleSubmit }
