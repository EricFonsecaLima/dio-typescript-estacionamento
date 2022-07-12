"use strict";
(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    function formatarData(data) {
        const entrada = new Date(data);
        const dateString = ('0' + entrada.getDate()).slice(-2) + '/' + ('0' + (entrada.getMonth() + 1)).slice(-2) + '/' +
            entrada.getFullYear() + ' às ' + ('0' + entrada.getHours()).slice(-2) + ':' + ('0' + entrada.getMinutes()).slice(-2);
        return dateString;
    }
    function calcularTempo(dataEntrada) {
        const entrada = new Date(dataEntrada);
        const dataAtual = new Date();
        const sec = (dataAtual.getTime() - entrada.getTime()) / 1000;
        const hours = Math.floor(sec / 3600);
        const minutes = Math.floor((sec - (hours * 3600)) / 60);
        const seconds = Math.floor(sec - (hours * 3600) - (minutes * 60));
        return hours + ' hora(s), ' + minutes + ' minuto(s) e ' + seconds + ' segundo(s)';
    }
    function patio() {
        function create(entry) {
            update([...read(), entry]);
        }
        function read() {
            return localStorage.entries ? JSON.parse(localStorage.entries) : [];
        }
        function update(entries) {
            localStorage.setItem('entries', JSON.stringify(entries));
        }
        function deleteEntry(entry) {
            localStorage.setItem('entries', JSON.stringify(entries.filter(item => item.placa !== entry.placa)));
            alert(`O veículo ${entry.veiculo}, placa ${entry.placa}, permaneceu por ${calcularTempo(entry.entrada)}.`);
            window.location.reload();
        }
        return { create, read, update, deleteEntry };
    }
    (_a = $('#cadastrar')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        var _a, _b;
        const veiculo = (_a = $('#veiculo')) === null || _a === void 0 ? void 0 : _a.value;
        const placa = (_b = $('#placa')) === null || _b === void 0 ? void 0 : _b.value;
        if (!veiculo || !placa) {
            alert('Os campos veículo e placa são obrigatórios!');
        }
        else {
            patio().create({ veiculo, placa, entrada: new Date() });
        }
    });
    const entries = patio().read();
    if (entries.length) {
        entries.forEach((entry) => {
            var _a, _b;
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${entry.veiculo}</td>
            <td>${entry.placa}</td>
            <td>${formatarData(entry.entrada)}</td>
            <td><button id="${entry.placa}" title="Liberar">X</button></td>
            `;
            (_a = $('#entries')) === null || _a === void 0 ? void 0 : _a.appendChild(row);
            (_b = $(`#${entry.placa}`)) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => { patio().deleteEntry(entry); });
        });
    }
})();
