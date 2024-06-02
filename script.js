let status = {
    1: "one",
    2: "two",
    3: "three",
    4: "four",
};

let users = JSON.parse(localStorage.getItem('users')) || [
    {
        "userId": "USRO0001",
        "name": "Andrew Grudde",
        "profilePicture": "https://mir-s3-cdn-cf.behance.net/project_modules/fs/6a3f5237411193.573f25019c8bf.jpg",
        "statusMessage": "We become what we think about!",
        "presence": 1
    },
    {
        "userId": "USR00002",
        "name": "Steve Hughes",
        "profilePicture": "https://images.nightcafe.studio/jobs/mWfF1s7OOVg5DMTYiNZ8/mWfF1s7OOVg5DMTYiNZ8--4--qccau.jpg?tr=w-1600,c-at_max",
        "statusMessage": "A positive mindset brings positive things.",
        "presence": 2
    },
    {
        "userId": "USRO0003",
        "name": "Kathy Smiley",
        "profilePicture": "https://preview.redd.it/hlxen8gtwpm01.jpg?width=640&crop=smart&auto=webp&v=enabled&s=a3c43bcbfc1db31d542ef67071559264358b3d2b",
        "statusMessage": "One small positive thought can change your whole day",
        "presence": 3
    },
    {
        "userId": "USR00004",
        "name": "Steve Dunk",
        "profilePicture": "https://64.media.tumblr.com/21de4501827aba1c6463ce2ae6a36780/tumblr_ps5le9xxRb1w9a5vgo1_1280.jpg",
        "statusMessage": "I am a rock star",
        "presence": 1
    },
    {
        "userId": "USR00005",
        "name": "Maria Dropola",
        "profilePicture": "https://img-new.cgtrader.com/uploads/blog/169bc420-9275-4f67-9ecf-e0f5b9aa614e.jpg",
        "statusMessage": "I am using Gradious messenger",
        "presence": 4
    }
];

async function display() {
    let rt = document.getElementById('root');
    rt.innerHTML = '';
    users.forEach(user => {
        let usd = document.createElement('div');
        let imdi = document.createElement('div');
        let img = document.createElement('img');
        let usinfo = document.createElement('div');
        let usname = document.createElement('p');
        let usmsg = document.createElement('p');
        let btun = document.createElement('div');
        let ddiv = document.createElement('div');
        let dda = document.createElement('a');
        let ddi = document.createElement('i');
        let dul = document.createElement('ul');
        let dli = document.createElement('li');
        let delbt = document.createElement('button');
        let upli = document.createElement('li');
        let upbt = document.createElement('button');
        usd.classList.add('user');
        imdi.classList.add('img-container');
        img.src = user.profilePicture;
        img.classList.add('user-image', status[user.presence]);
        img.alt = "user image";
        imdi.appendChild(img);
        usinfo.classList.add('user-detail');
        usname.classList.add('user-name');
        usname.textContent = user.name;
        usmsg.classList.add('user-message');
        usmsg.textContent = user.statusMessage;
        usinfo.appendChild(usname);
        usinfo.appendChild(usmsg);
        btun.classList.add('three-btn');
        ddiv.classList.add('dropdown');
        dda.href = "#";
        dda.role = "button";
        dda.dataset.bsToggle = "dropdown";
        dda.setAttribute('aria-expanded', 'false');
        ddi.classList.add('bi', 'bi-three-dots-vertical');
        dda.appendChild(ddi);
        dul.classList.add('dropdown-menu');
        delbt.id = user.userId;
        delbt.onclick = () => deleteBuddy(user.userId);
        delbt.classList.add('dropdown-item');
        delbt.textContent = "Delete";
        dli.appendChild(delbt);
        upbt.id = 'update-' + user.userId;
        upbt.onclick = () => editBuddy(user.userId);
        upbt.classList.add('dropdown-item');
        upbt.textContent = "Update";
        upli.appendChild(upbt);
        dul.appendChild(dli);
        dul.appendChild(upli);
        ddiv.appendChild(dda);
        ddiv.appendChild(dul);
        btun.appendChild(ddiv);
        usd.appendChild(imdi);
        usd.appendChild(usinfo);
        usd.appendChild(btun);
        rt.appendChild(usd);
    });
}

async function visibileUserForm() {
    let fm = document.getElementById('addUserForm');
    if (fm.style.display === "none") {
        fm.style.display = "block";
    } else {
        fm.style.display = "none";
    }
}

async function addBuddy() {
    return new Promise((resolve, reject) => {
        let nam = document.getElementById('name').value;
        let msg = document.getElementById('smess').value;
        let pic = document.getElementById('dplink').value;
        let pres = document.getElementById('presence').value;
        let userId = "USR" + (users.length + 1).toString().padStart(4, '0');
        if (nam.trim() !== '' && msg.trim() !== '' && pic.trim() !== '') {
            let newUser = {
                "userId": userId,
                "name": nam,
                "profilePicture": pic,
                "statusMessage": msg,
                "presence": parseInt(pres)
            };
            users.unshift(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            display().then(() => {
                document.getElementById('name').value = '';
                document.getElementById('smess').value = '';
                document.getElementById('dplink').value = '';
                document.getElementById('presence').selectedIndex = 0;
                alert("User added Successfully!");
                visibileUserForm(); 
                resolve();
            }).catch(error => reject(error));
        } 
		else {
            reject("Please fill out all fields!");
        }
    });
}


document.getElementById('addUserForm').addEventListener('submit', function (event) {
    event.preventDefault();
    addBuddy().catch(error => alert(error));
});

async function editBuddy(userId) {
    let usr = users.find(u => u.userId === userId);
    if (usr) {
        document.getElementById('editUserForm').style.display = "block";
        document.getElementById('upid').value = userId;
        document.getElementById('upna').value = usr.name;    
        document.getElementById('upsmes').value = usr.statusMessage;
        document.getElementById('upppic').value = usr.profilePicture;
        document.getElementById('uppres').value = usr.presence;
    }
}

async function updateBuddy(event) {
    event.preventDefault();
    return new Promise((resolve, reject) => {
        let userId = document.getElementById('upid').value;
        let idx = users.findIndex(u => u.userId === userId);
        if (idx !== -1) {
            let name = document.getElementById('upna').value;
            let stamess = document.getElementById('upsmes').value;
            let propic = document.getElementById('upppic').value;
            let presence = document.getElementById('uppres').value;
            if (name.trim() !== '' && stamess.trim() !== '' && propic.trim() !== '') {
                users[idx].name = name;
                users[idx].statusMessage = stamess;
                users[idx].profilePicture = propic;
                users[idx].presence = parseInt(presence);
                localStorage.setItem('users', JSON.stringify(users));
                display().then(() => {
                    document.getElementById('editUserForm').style.display = "none";
                    alert("User updated Successfully!");
                    resolve();
                }).catch(error => reject(error));
            } 
			else {
                reject("Please fill out all fields!");
            }
        }
    });
}

document.getElementById('editUserForm').addEventListener('submit', function (event) {
    event.preventDefault();
    updateBuddy(event).catch(error => alert(error));
});

async function deleteBuddy(userId) {
    return new Promise((resolve, reject) => {
        users = users.filter(user => user.userId !== userId);
        localStorage.setItem('users', JSON.stringify(users));
        try {
            display();
            resolve();
        } 
        catch (error) {
            reject(error);
        }
        
    });
}

window.onload = function() {
    display();
};


