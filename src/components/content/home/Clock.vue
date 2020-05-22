<template>
    <div id="clock">
        <p class="date">{{ date }}</p>
        <p class="time">{{ time }}</p>
        <p class="text">Em construção..</p><br>
        <p class="text">Ultima atualização em: </p>
        <p class="text">22/05/2020 às 9:25</p>
    </div>
</template>

<script>
export default {
    name: 'Clock',
    data() {
        return {
            time: '',
            date: '',
            week: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            timerID: setInterval(this.updateTime, 1000)
        }
    },
    methods: {
        updateTime() {
            let cd = new Date();
            this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
            this.date = this.zeroPadding(cd.getDate(), 2) + '-' + this.zeroPadding(cd.getMonth()+1, 2) + '-' + this.zeroPadding(cd.getFullYear(), 4) + ' ' + this.week[cd.getDay()];
        },
        zeroPadding(num, digit) {
            let zero = '';
            for(let i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        }
    }
};
</script>

<style scoped>
#clock {
    font-family: "Share Tech Mono", monospace;
    text-align: center;
    text-shadow: 0 0 6px rgb(0, 134, 20, 0.6), 0 0 20px rgba(28, 230, 10, 0);
    user-select: none;
}
.time {
    letter-spacing: 0.05em;
    font-size: 75px;
    padding: 0;
    margin: 0;
}
.date {
    letter-spacing: 0.1em;
    font-size: 24px;
    margin: 0;
}
.text {
    letter-spacing: 0.1em;
    font-size: .9rem;
    padding: 0;
    margin: 0;
}
@media (max-width: 900px) {
    .time {
        font-size: 60px;
    }
    .date {
        font-size: 18px;
    }
}
</style>