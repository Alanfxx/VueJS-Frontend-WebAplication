export default {
    state: {
        ctrlGlobal: {
            reduce: false,
            isMenuVisible: false,
            processing: false
        },
        formatarData(timestamp) {
            let a = new Date(timestamp);
            let months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho',
                'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
            let year = a.getFullYear();
            let month = months[a.getMonth()];
            let date = a.getDate();
            let hour = a.getHours();
            let min = a.getMinutes();
            // let sec = a.getSeconds();
            let time = date + ' de ' + month + ' de ' + year + ' - ' + hour + ':' + min;
            return time;
        }
    }
}