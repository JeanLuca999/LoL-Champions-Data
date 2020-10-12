let xhttp = new XMLHttpRequest()
xhttp.responseType = 'json'
xhttp.onload = function(){
    try{
        useResponse(this.response)
    }
    catch{
        window.alert('Type a valid name')
        document.getElementById('github').style.position = 'absolute' //volta o footer ao lugar correto quando o conteudo eh apagado
    }
}

function useResponse(resp){ //Esta funcao eh responsavel por receber o json e utiliza-lo no html
    let dataContainer = document.getElementById('data-container')
    dataContainer.innerHTML = ''    //limpa os dados do campeao anterior

    let nameAndAlias = document.createElement('h2')
    let ChampionInformation = document.createElement('p')

    let imageChampion = document.createElement('img')
    imageChampion.setAttribute('src', resp["skins"][0])
    imageChampion.setAttribute('id', 'ChampionImage')

    for(let i = 0; i < resp["abilities"].length; i++){  //passagem dos dados do json
        ChampionInformation.innerHTML += `<strong>${resp["abilities"][i]["type"]}</strong>: ${resp["abilities"][i]["name"]}<br>`
        ChampionInformation.innerHTML += `<strong>Ability Description: </strong> ${resp["abilities"][i]["description"]} <br><br>`
    }

    nameAndAlias.innerHTML = `${resp["name"]} - ${resp["alias"]}`
    nameAndAlias.style.textTransform = 'uppercase'
    nameAndAlias.style.textAlign = 'center'
    nameAndAlias.style.marginTop = '20px'

    ChampionInformation.style.marginTop = '30px'
    ChampionInformation.style.borderTop = '2px solid black'
    ChampionInformation.style.paddingTop = '20px'
    ChampionInformation.style.textAlign = 'justify'

    dataContainer.appendChild(nameAndAlias)
    dataContainer.appendChild(imageChampion)
    dataContainer.appendChild(ChampionInformation)

    document.getElementById('github').style.position = 'relative' //isso faz com que o footer continue no fim da pagina
}

function searchName(){
    let search = document.getElementById('c-name').value
    xhttp.open('GET', `https://api-lol.herokuapp.com/api/champions/${search}`)
    xhttp.send()
}