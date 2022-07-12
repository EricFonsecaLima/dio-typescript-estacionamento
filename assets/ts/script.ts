interface Vaga {
    veiculo: string;
    placa: string;
    entrada: Date;
}

(function () {
    const $ = (query: string): HTMLInputElement | null => document.querySelector(query);

    function formatarData(data: Date){
        const entrada = new Date(data);
        const dateString = ('0' + entrada.getDate()).slice(-2) + '/' + ('0'+(entrada.getMonth()+1)).slice(-2) + '/' +
        entrada.getFullYear() + ' às ' + ('0' + entrada.getHours()).slice(-2) + ':' + ('0' + entrada.getMinutes()).slice(-2);
        return dateString;
    }

    function calcularTempo(dataEntrada: Date) {
        const entrada = new Date(dataEntrada);
        const dataAtual = new Date();
        const sec = (dataAtual.getTime() - entrada.getTime()) / 1000;
        const hours   = Math.floor(sec / 3600);
        const minutes = Math.floor((sec - (hours * 3600)) / 60);
        const seconds = Math.floor(sec - (hours * 3600) - (minutes * 60));
    return hours + ' hora(s), ' + minutes + ' minuto(s) e ' + seconds + ' segundo(s)';
    }

    function patio() {
        function create(entry: Vaga) {
            update([...read(), entry]);
        }
        function read(): Vaga[] {
            return localStorage.entries ? JSON.parse(localStorage.entries) : [];
        }
        function update(entries: Vaga[]) {
            localStorage.setItem('entries', JSON.stringify(entries));
        }
        function deleteEntry(entry: Vaga) {
            localStorage.setItem('entries', JSON.stringify(entries.filter(item => item.placa !== entry.placa)));
            alert(`O veículo ${entry.veiculo}, placa ${entry.placa}, permaneceu por ${calcularTempo(entry.entrada)}.`);
            window.location.reload();
         }
        return { create, read, update, deleteEntry };
    }

    $('#cadastrar')?.addEventListener('click', () => {
        const veiculo = $('#veiculo')?.value;
        const placa = $('#placa')?.value;

        if (!veiculo || !placa) {
            alert('Os campos veículo e placa são obrigatórios!');
        } else {
            patio().create({ veiculo, placa, entrada: new Date() });
        }
    });

    const entries = patio().read();
    if(entries.length){
        entries.forEach((entry) => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${entry.veiculo}</td>
            <td>${entry.placa}</td>
            <td>${formatarData(entry.entrada)}</td>
            <td><button id="${entry.placa}" title="Liberar">X</button></td>
            `;
            $('#entries')?.appendChild(row);
            $(`#${entry.placa}`)?.addEventListener('click', () => {patio().deleteEntry(entry)});
        });
    }
})();