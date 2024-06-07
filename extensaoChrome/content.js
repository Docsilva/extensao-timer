const crisisTypes = ["SITES P1", "SITES P2/P3"];

const timersP1 = [
    { duration: 5, message: "NATIS N2 / NATIS NOC" },
    { duration: 10, message: "Net N2 y N3, NATS N2 / PLs (Net e NATIS) / IS Ops Analista" },
    { duration: 30, message: "Network TLS / IS OPS Leaders" },
    { duration: 40, message: "Managers Infra / Sustentación e NATIS Manager" }
];

const timersP2P3 = [
    { duration: 5, message: "NATIS N2 / NATIS NOC" },
    { duration: 10, message: "Net N1, NATS N2 / NATIS PLS / IS Ops Analistas" },
    { duration: 25, message: "Network N2" },
    { duration: 40, message: "Network N3 / Net PLs / IS OPS Leaders" },
    { duration: 55, message: "NATIS Manager / Network TLs" },
    { duration: 70, message: "Managers e Infra / Sustentación" }
];

function addStyles() {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = chrome.runtime.getURL('content.css');
    document.head.appendChild(style);
}

function showTimerOptionsPopup(timers) {
    const popup = document.createElement('div');
    popup.id = 'timer-popup';

    popup.style.position = 'fixed';
    popup.style.top = '10px';
    popup.style.right = '10px';
    popup.style.padding = '20px';
    popup.style.backgroundColor = 'white';
    popup.style.border = '1px solid #ccc';
    popup.style.zIndex = '1000';
    popup.style.width = '300px';

    const title = document.createElement('h3');
    title.textContent = 'Lista de Temporizadores e Equipes';
    popup.appendChild(title);

    const list = document.createElement('ul');
    timers.forEach((timer, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${timer.duration} segundos - ${timer.message}`;
        list.appendChild(listItem);
    });
    popup.appendChild(list);

    const startButton = document.createElement('button');
    startButton.textContent = 'Iniciar';
    startButton.style.marginTop = '10px';
    popup.appendChild(startButton);

    document.body.appendChild(popup);

    startButton.addEventListener('click', () => {
        document.body.removeChild(popup);
        startTimers(timers, 0);
    });
}

function createInitialPopup() {
    addStyles();

    const popup = document.createElement('div');
    popup.id = 'initial-popup';

    popup.style.position = 'fixed';
    popup.style.top = '10px';
    popup.style.right = '10px';
    popup.style.padding = '20px';
    popup.style.backgroundColor = 'white';
    popup.style.border = '1px solid #ccc';
    popup.style.zIndex = '1000';
    popup.style.width = '300px';

    const title = document.createElement('h3');
    title.textContent = 'Iniciar Temporizador';
    popup.appendChild(title);

    const question = document.createElement('p');
    question.textContent = 'Essa reunião será usada para um incidente Critico?';
    popup.appendChild(question);

    const yesButton = document.createElement('button');
    yesButton.textContent = 'Sim';
    yesButton.style.marginRight = '10px';
    popup.appendChild(yesButton);

    const noButton = document.createElement('button');
    noButton.textContent = 'Não';
    popup.appendChild(noButton);

    document.body.appendChild(popup);

    noButton.addEventListener('click', () => {
        document.body.removeChild(popup);
    });

    yesButton.addEventListener('click', () => {
        document.body.removeChild(popup);

        const crisisSelectBox = document.createElement('select');
        crisisTypes.forEach(crisis => {
            const optionElement = document.createElement('option');
            optionElement.text = crisis;
            crisisSelectBox.add(optionElement);
        });

        const crisisPopup = document.createElement('div');
        crisisPopup.id = 'crisis-popup';

        crisisPopup.style.position = 'fixed';
        crisisPopup.style.top = '10px';
        crisisPopup.style.right = '10px';
        crisisPopup.style.padding = '20px';
        crisisPopup.style.backgroundColor = 'white';
        crisisPopup.style.border = '1px solid #ccc';
        crisisPopup.style.zIndex = '1000';
        crisisPopup.style.width = '300px';

        const crisisTitle = document.createElement('h3');
        crisisTitle.textContent = 'Escolha o Tipo de Crise';
        crisisPopup.appendChild(crisisTitle);

        crisisPopup.appendChild(crisisSelectBox);

        const confirmButton = document.createElement('button');
        confirmButton.textContent = 'Confirmar';
        confirmButton.style.marginTop = '10px';
        crisisPopup.appendChild(confirmButton);

        document.body.appendChild(crisisPopup);

        confirmButton.addEventListener('click', () => {
            const selectedCrisis = crisisSelectBox.value;
            document.body.removeChild(crisisPopup);

            if (selectedCrisis === 'SITES P1') {
                showTimerOptionsPopup(timersP1);
            } else if (selectedCrisis === 'SITES P2/P3') {
                showTimerOptionsPopup(timersP2P3);
            }
        });
    });
}

function showTimerEndedNotification(currentIndex, timers) {
    const notificationPopup = document.createElement('div');
    notificationPopup.id = 'notification-popup';

    notificationPopup.style.position = 'fixed';
    notificationPopup.style.top = '10px';
    notificationPopup.style.right = '10px';
    notificationPopup.style.padding = '20px';
    notificationPopup.style.backgroundColor = 'white';
    notificationPopup.style.border = '1px solid #ccc';
    notificationPopup.style.zIndex = '1001';
    notificationPopup.style.width = '300px';

    const notificationContent = document.createElement('p');
    notificationContent.textContent = `O tempo do temporizador ${currentIndex + 1} acabou! Acione a equipe: ${timers[currentIndex].message}.`;
    notificationPopup.appendChild(notificationContent);

    if (currentIndex < timers.length - 1) {
        const remainingTimers = document.createElement('p');
        remainingTimers.textContent = 'Temporizadores restantes:';
        notificationPopup.appendChild(remainingTimers);

        const list = document.createElement('ul');
        for (let i = currentIndex + 1; i < timers.length; i++) {
            const listItem = document.createElement('li');
            listItem.textContent = `${timers[i].duration} segundos - ${timers[i].message}`;
            list.appendChild(listItem);
        }
        notificationPopup.appendChild(list);

        const question = document.createElement('p');
        question.textContent = 'Deseja iniciar o próximo temporizador?';
        notificationPopup.appendChild(question);

        const yesButton = document.createElement('button');
        yesButton.textContent = 'Sim';
        yesButton.style.marginRight = '10px';
        notificationPopup.appendChild(yesButton);

        const noButton = document.createElement('button');
        noButton.textContent = 'Não';
        notificationPopup.appendChild(noButton);

        yesButton.addEventListener('click', () => {
            document.body.removeChild(notificationPopup);
            startTimers(timers, currentIndex + 1);
        });

        noButton.addEventListener('click', () => {
            document.body.removeChild(notificationPopup);
        });

        document.body.appendChild(notificationPopup);
    } else {
        const endMessage = document.createElement('p');
        endMessage.textContent = 'Todos os temporizadores foram concluídos.';
        notificationPopup.appendChild(endMessage);

        const okButton = document.createElement('button');
        okButton.textContent = 'Ok';
        notificationPopup.appendChild(okButton);

        okButton.addEventListener('click', () => {
            document.body.removeChild(notificationPopup);
        });

        document.body.appendChild(notificationPopup);
    }
}

function startTimers(timers, currentIndex) {
    if (currentIndex < timers.length) {
        setTimeout(() => {
            showTimerEndedNotification(currentIndex, timers);
        }, timers[currentIndex].duration * 1000);
    }
}

function isMeetingActive() {
    return !!document.querySelector('[data-self-name]') || !!document.querySelector('[data-meeting-code]');
}

function monitorUserActions() {
    document.addEventListener('click', (event) => {
        if (event.target.matches("span[jsname='V67aGc']") || event.target.matches("span[jsname='K4r5Ff']")) {
            setTimeout(() => {
                if (isMeetingActive()) {
                    createInitialPopup();
                }
            }, 3000);
        }
    });
}

if (Notification.permission !== "granted") {
    Notification.requestPermission();
}

monitorUserActions();
