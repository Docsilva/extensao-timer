// Adiciona um listener de eventos ao clicar em um elemento
document.addEventListener("click", function(event) {
    // Verifica se o elemento clicado corresponde ao botão "Participar agora"
    if (event.target.matches("span[jsname='V67aGc']")) {
        // Opções de tempo predefinidas
        var options = ["5 segundos", "5 minutos", "10 minutos", "15 minutos"];

        // Cria um campo de seleção (dropdown)
        var selectBox = document.createElement("select");

        // Adiciona as opções de tempo ao campo de seleção
        options.forEach(function(option) {
            var optionElement = document.createElement("option");
            optionElement.text = option;
            selectBox.add(optionElement);
        });

        // Exibe o popup com o campo de seleção
        if (confirm("Deseja iniciar um timer para esta reunião?")) {
            var selectedOption = prompt("Selecione a duração do timer:", options[0]);

            // Converte o tempo selecionado para milissegundos
            var timerDuration;
            switch(selectedOption) {
                case "5 segundos":
                    timerDuration = 5000;
                    break;
                case "5 minutos":
                    timerDuration = 5 * 60000;
                    break;
                case "10 minutos":
                    timerDuration = 10 * 60000;
                    break;
                case "15 minutos":
                    timerDuration = 15 * 60000;
                    break;
                default:
                    timerDuration = 0;
                    break;
            }

            if (timerDuration > 0) {
                setTimeout(function() {
                    alert("O tempo acabou!");
                }, timerDuration);
            }
        }
    }
});