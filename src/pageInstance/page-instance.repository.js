/**
 * ПОЛУЧАЕМ ДАННЫЕ
 *
 * Слой репозитория предназначен для получения данных с API
 * В этом слое так же реализуем кеширование, если данные есть в сторе отдаем их, если это необходимо.
 * Взаимодействие с конфигом запроса/ответа так же оставляем тут.
 *
 * Экземпляр репозитория является приватным полем сервиса, вызывать методы репозитория может только сервис.
 */



export default class PageInstanceRepository {
    async getGalleryImages(page = 1, count = 3) {
        const images = [
            {
                id: 1,
                src: require('@/assets/images/vol_1/Ula_52604_DONE.jpg'),
                name: "«Тертон 1»"
            },
            {
                id: 2,
                src: require('@/assets/images/vol_1/Ula_52800_DONE-min.jpg'),
                name: "«Баланс»"
            },
            {
                id: 3,
                src: require('@/assets/images/vol_1/Ula_52665_DONE-min.jpg'),
                name: "«Тувинское утро 1»"
            },
            {
                id: 4,
                src: require('@/assets/images/vol_2/Ula_52475_DONE-min.jpg'),
                name: "«Чам»"
            },
            {
                id: 5,
                src: require('@/assets/images/vol_2/Ula_52591_DONE-min.jpg'),
                name: "«Сон самурая»"
            },
            {
                id: 6,
                src: require('@/assets/images/vol_2/Ula_52642_DONE-min.jpg'),
                name: "«Созерцатель»"
            },
            {
                id: 7,
                src: require('@/assets/images/vol_1/Ula_52819_DONE-min.jpg'),
                name: "«Созерцатель»"
            },
            {
                id: 8,
                src: require('@/assets/images/vol_1/Ula_52822_DONE-min.jpg'),
                name: "«Созерцатель»"
            },
            {
                id: 9,
                src: require('@/assets/images/vol_1/Ula_52838_DONE-min.jpg'),
                name: "«Созерцатель»"
            },
        ]
        if (page === 1) {
            return images.slice(0, 3);
        } else if (page === 2) {
            return images.slice(3, 9);
        }
    }
}



