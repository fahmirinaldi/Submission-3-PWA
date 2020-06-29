import database from './database.js'

const getAllTeam = () => {
    //Get All Favourite Team From Database
    database.getTeam()
        .then(data => {
            let teamsHTML = ''
            data.forEach(team => {
                teamsHTML  +=
                `
                <div class="col s12 z-depth-2">
                    <div class="card">
                    <div class="card-content row valign-wrapper">
                        <div class="col s4" class="logo-team">
                            <img src="${team.logo}" alt="${team.name}" class="responsive-img center-align" width="70%" >
                        </div>
                        <div class="col s8 information-team">
                        <span class="badge-blue"><strong>${team.name}</strong></span>
                        <span>${team.venue}</span>
                        <span>${team.clubColors}</span>
                        </div>
                    </div>
                    <div class="card-action right-align">
                        <a href="${team.website}" target="_blank" class="website-action">WEBSITE</a>
                        <button onclick="deleteFavouriteTeam(${team.id},'${team.name}')" class="waves-effect waves-light btn red accent-3">REMOVE</button>
                    </div>
                    </div>
                </div>
                `
            })
            if(data.length == 0) teamsHTML += '<h6 class="center-align h6war">Tidak ada Team yang di favoritkan di Halaman ini!</6>'
            //insert All Team in Database to DOM
            document.getElementById('progress').style.display = 'none'
            document.getElementById('favouriteTeams').innerHTML = teamsHTML
        })
}

const pushNotification = msg => {
    const title = 'Notifikasi';
    const options = {
        body: msg,
        icon: '/images/logo192.png',
        image: '/images/logo512.png',
        badge: '/images/logo192.png',
    };
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(regis => {
            regis.showNotification(title, options);
        });
    }
}

const addFavouriteTeam = (id,logo,name,venue,clubColors,website) => {
    //Add To Database
    database.addTeam({id,logo,name,venue,clubColors,website})
    //Display Toast
    M.toast({html: `Berhasil Favourite ${name}`, classes: 'rounded'});
}

const deleteFavouriteTeam = (id,name) => {
    //Conform Delete Favourite ?
    let imSure = confirm(`Apakah Anda Yakin ingin menghapus ${name} dari Favourite ?`)
    if(imSure){
        //Delete Team From Database
        database.deleteTeam(id)
        //Fetch All Team
        getAllTeam()
        //Display Toast
        M.toast({html: `Berhasil Menghapus ${name}`, classes: 'rounded'})
        //Push Notification
        pushNotification(`Berhasil Menghapus ${name}`)
    }
    
}

export default {
    addFavouriteTeam,
    getAllTeam,
    deleteFavouriteTeam
}