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
        },
        formatarParaDataInput(timestamp) {
            let a = new Date(timestamp);
            let year = a.getFullYear();
            const monthSoma = a.getMonth() + 1;
            let month = "0" + monthSoma;
            let date = "0" + a.getDate();
            let hour = "0" + a.getHours();
            let min = "0" + a.getMinutes();
            // let sec = a.getSeconds();
            let time = year + '-' 
                + month.substr(-2) + '-' 
                + date.substr(-2) + 'T' 
                + hour.substr(-2) + ':' 
                + min.substr(-2);
            return time;
        }
    }
}