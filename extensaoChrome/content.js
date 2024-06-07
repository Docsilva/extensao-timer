const crisisTypes = ["SITES P1", "SITES P2/P3"];
const timersP1 = [
    { duration: 5, message: "NATIS N2 / NATIS NOC" },
    { duration: 10, message: "Net N2 y N3, NATS N2 / PLs (Net e NATIS) / IS Ops Analista" },
    { duration: 30, message: "Network TLS / IS OPS Leaders" },
    { duration: 40, message: "Managers Infra / Sustentación e NATIS Manager" }
];
const timersP2P3 = [
    { duration: 5, message: "NATIS N2 \\ NATIS NOC" },
    { duration: 10, message: "Net N1, NATS N2 / NATIS PLS / IS Ops Analistas" },
    { duration: 25, message: "Network N2" },
    { duration: 40, message: "Network N3 / Net PLs / IS OPS Leaders" },
    { duration: 55, message: "NATIS Manager / Network TLs" },
    { duration: 70, message: "Managers e Infra / Sustentación" }
];

function createInitialPopup() {
    const popup = document.createElement('div');
    popup.id = 'initial-popup';
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.padding = '20px';
    popup.style.backgroundColor = '#fff';
    popup.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
    popup.style.zIndex = '1000';

    const question = document.createElement('p');
    question.textContent = 'Essa reunião será usada para um incidente Crítico?';
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
        createCrisisTypePopup();
    });
}

function createCrisisTypePopup() {
    const popup = document.createElement('div');
    popup.id = 'crisis-popup';
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.padding = '20px';
    popup.style.backgroundColor = '#fff';
    popup.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
    popup.style.zIndex = '1000';

    const question = document.createElement('p');
    question.textContent = 'Escolha o Tipo de Crise';
    popup.appendChild(question);

    const select = document.createElement('select');
    crisisTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        select.appendChild(option);
    });
    popup.appendChild(select);

    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'Confirmar';
    confirmButton.style.marginTop = '10px';
    popup.appendChild(confirmButton);

    document.body.appendChild(popup);

    confirmButton.addEventListener('click', () => {
        const selectedCrisis = select.value;
        document.body.removeChild(popup);
        if (selectedCrisis === 'SITES P1') {
            showTimerOptionsPopup(timersP1);
        } else if (selectedCrisis === 'SITES P2/P3') {
            showTimerOptionsPopup(timersP2P3);
        }
    });
}

function showTimerOptionsPopup(timers) {
    const popup = document.createElement('div');
    popup.id = 'timer-popup';
    popup.style.position = 'fixed';
    popup.style.top = '55%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.padding = '20px';
    popup.style.backgroundColor = '#fff';
    popup.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
    popup.style.zIndex = '1000';

    const title = document.createElement('h3');
    title.textContent = 'Lista de Temporizadores e Equipes';
    popup.appendChild(title);

    const list = document.createElement('ul');
    timers.forEach(timer => {
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

function showTimerEndedNotification(currentIndex, timers) {
    const notificationPopup = document.createElement('div');
    notificationPopup.id = 'notification-popup';
    notificationPopup.style.position = 'fixed';
    notificationPopup.style.top = '50%';
    notificationPopup.style.left = '50%';
    notificationPopup.style.transform = 'translate(-50%, -50%)';
    notificationPopup.style.padding = '20px';
    notificationPopup.style.backgroundColor = '#fff';
    notificationPopup.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
    notificationPopup.style.zIndex = '1000';

    const notificationTitle = document.createElement('h3');
    notificationTitle.textContent = `${currentIndex + 1}º Temporizador Acabou`;
    notificationPopup.appendChild(notificationTitle);

    const notificationContent = document.createElement('p');
    notificationContent.textContent = `Acione a equipe: ${timers[currentIndex].message}.`;
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
    } else {
        const endMessage = document.createElement('p');
        endMessage.textContent = 'Todos os temporizadores foram concluídos.';
        notificationPopup.appendChild(endMessage);

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Fechar';
        closeButton.addEventListener('click', () => {
            document.body.removeChild(notificationPopup);
        });
        notificationPopup.appendChild(closeButton);
    }

    document.body.appendChild(notificationPopup);
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
