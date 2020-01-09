let ipcRenderer = window.ipcRenderer;

// Send the birthday notifications of the colleagues
ipcRenderer.on('birthday-notification', (event, arg) => {
    let birthdayNotification = arg;
    let body;
    if (birthdayNotification.length == 1) {
        body = `It's ${birthdayNotification[0].body.from.name} birthday today. Convey your wishes!`;
    } else if (birthdayNotification.length == 2) {
        body = `${birthdayNotification[0].body.from.name} and ${birthdayNotification[1].body.from.name} are celebrating birthday today. Send them good thoughts!`;
    } else {
        body = `${birthdayNotification[0].body.from.name} and ${birthdayNotification.length - 1} other colleague(s) are celebrating birthday today. Send them good thoughts!`;
    }

    let myNotitication = new window.Notification('Birthday Notifications', { body });
    myNotitication.addEventListener("click", function (event) {
        event.preventDefault();
        ipcRenderer.send('open-app', 'open');
    })
})

// send the aniversary notifications of the colleagues
ipcRenderer.on('aniversary-notification', (event, arg) => {
    let aniversaryNotification = arg;
    let body;
    if (aniversaryNotification.length == 1) {
        body = `It's ${aniversaryNotification[0].body.from.name} work anniversary today. Send your best wishes!`;
    } else {
        body = `It's${aniversaryNotification[0].body.from.name} and ${aniversaryNotification.length - 2} other colleague(s) are celebrating their work anniversary today. Congratulate them!`;
    }
    let myNotitication = new window.Notification('Work Aniversary Notifications', { body });
    myNotitication.addEventListener("click", function (event) {
        ipcRenderer.send('open-app', 'open');
        event.preventDefault();
    })
})

// send the birthday notification of the employee
ipcRenderer.on('self-birthday-notification', (event, arg) => {
    let myNotitication = new window.Notification('Birthday Notifications', {
        body: `Happy birthday ${arg[0].body.from.name}`
    });
    myNotitication.addEventListener("click", function (event) {
        ipcRenderer.send('open-app', 'open');
        event.preventDefault();
    })
})

// send the aniversary notification of the employee
ipcRenderer.on('self-aniversary-notification', (event, arg) => {
    let myNotitication = new window.Notification('Work Aniversary Notifications', {
        body: `Happy Work Aniversary to ${arg[0].body.from.name}`
    });
    myNotitication.addEventListener("click", function (event) {
        ipcRenderer.send('open-app', 'open');
        event.preventDefault();
    })
})