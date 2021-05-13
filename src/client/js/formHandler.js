import checkUrl from './urlChecker';

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    const formText = document.getElementById('name').value;
    const e = document.getElementById('error');

    console.log("::: Form Submitted :::")

if(Client.checkUrl(formText)) {

    e.innerHTML = '';
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
        return res.json()
    })
    .then(function(response) {
        document.getElementById('model').innerHTML = "model: " + response.model;
        document.getElementById('score').innerHTML = "score tag: " + response.score_tag;
        document.getElementById('agreement').innerHTML = "agreement: " + response.agreement;
        document.getElementById('subject').innerHTML = "subject: " + response.subjectivity;
        document.getElementById('confidence').innerHTML = "confidence: " + response.confidence;
        document.getElementById('irony').innerHTML = "irony: " + response.irony;
    })
} else {
    e.innerHTML = "Please input a valid URL";
}

}
export { handleSubmit }
