// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // and load the index.html of the app.
    mainWindow.loadFile('index.html')

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Diable menubar in the top
    Menu.setApplicationMenu(null);

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) createWindow();

    // reset the badge count when app is opeaned
    app.setBadgeCount(0);
})
// Receive the message from the chat plugin
ipcMain.on('electron-notification', (event, arg) => {

    let notification = arg;
    let birthdayNotification = [];
    let aniversaryNotification = [];
    let selfBirthdayNotifications = [];
    let selfAniversaryNotifications = [];

    // Check if the app is minimized and increment the badge count
    if (mainWindow.isMinimized()) {
        app.setBadgeCount(notification.length);
    }

    notification.forEach(element => {
        try {
            element = JSON.parse(element);
        } catch (error) {
            // Do Nothing
        }
        if (element.title == 'aniversary')
            aniversaryNotification.push(element);
        else if (element.title == 'birthday')
            birthdayNotification.push(element);
        else if (element.title == 'self-birthday')
            selfBirthdayNotifications.push(element)
        else if (element.title == 'self-aniversary')
            selfAniversaryNotifications.push(element)
    });

    if (birthdayNotification.length > 0) {
        event.reply('birthday-notification', birthdayNotification);
    }

    if (aniversaryNotification.length > 0) {
        event.reply('aniversary-notification', aniversaryNotification);
    }

    if (selfBirthdayNotifications.length > 0) {
        event.reply('self-birthday-notification', aniversaryNotification);
    }

    if (selfAniversaryNotifications.length > 0) {
        event.reply('self-aniversary-notification', aniversaryNotification);
    }
});

// Open the app if user clicks the notification
ipcMain.on('open-app', (event, arg) => {
    mainWindow.show();
    app.setBadgeCount(0);
});

