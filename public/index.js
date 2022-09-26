if (true === true) {
    buildApplication()
}



function buildApplication() {
    makeXmlHttpRequest("/conf.json")
        .then((result) => {
            let container = document.querySelector("#container_app")
            let sectionsList = result["order_pages"];
            let stylesList = result["styles_pages"]
            container.innerHTML = ""
            sectionsList.map((sectionPage, index) => {
                makeXmlHttpRequest(`/src/pages/${sectionPage}`).then((result) => {
                    addStyle(stylesList[index])
                    container.innerHTML += result
                    referenciesImageSource()
                })
            })

        })

}

function makeXmlHttpRequest(request) {
    return new Promise((resolve, reject) => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                try {
                    const result = JSON.parse(this.response)
                    resolve(result);
                } catch (error) {
                    const result = this.response
                    resolve(result)
                }
            }
        };
        xhttp.open("GET", request, true);
        xhttp.send();
    })
}

function addStyle(pathName) {
    return document.head.innerHTML += `<link rel="stylesheet" href="../src/assets/css/${pathName}"></link>`
}

function referenciesImageSource() {
    images = document.querySelectorAll(".print-image");
    for (image of images) {
        let fileName = image.attributes["src"].value;
        fileName = fileName.split("/")
        image.setAttribute("src", `../src/assets/img/${fileName[fileName.length - 1]}`)
    }
}