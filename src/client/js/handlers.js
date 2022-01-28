export function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.ClientcheckForName(formText)

    console.log("::: Form Submitted :::")
    fetch('http://localhost:5000/test')
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerText = res.message
    })
}

