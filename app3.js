const keys = Object.keys(localStorage);
for (let key of keys) {
    if (key !== "algoliasearch-client-js" && key !== "") {
        let node = document.createElement("li");
        let nodeText = document.createTextNode(`${key} : ${localStorage.getItem(key)}`);
        node.appendChild(nodeText);
        document.getElementById('scoreBoard').appendChild(node);
    }
}