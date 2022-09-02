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
    async getGalleryImages(page = 1) {
        const images = [
            {
                id: 1,
                src: require('@/assets/images/vol_3/07-min.jpg'),
                name: "«Мистический Чам»"

            },
            {
                id: 2,
                src: require('@/assets/images/vol_3/02-min.jpg'),
                name: "«Тувинское утро&nbsp;1»"
            },
            {
                id: 3,
                src: require('@/assets/images/vol_3/03-min.jpg'),
                name: "«Тувинское утро&nbsp;2»"
            },
            {
                id: 4,
                src: require('@/assets/images/vol_3/04-min.jpg'),
                name: "«Сон самурая»"
            },
            {
                id: 5,
                src: require('@/assets/images/vol_3/05-min.jpg'),
                name: "«Воин»"
            },
            {
                id: 6,
                src: require('@/assets/images/vol_3/06-min.jpg'),
                name: "«Самурай»"
            },
            {
                id: 7,
                src: require('@/assets/images/vol_3/01-min.jpg'),
                name: "«Баланс»"
            },
            {
                id: 8,
                src: require('@/assets/images/vol_3/08-min.jpg'),
                name: "«Анима»"
            },
            {
                id: 9,
                src: require('@/assets/images/vol_3/09-min.jpg'),
                name: "«Тертон&nbsp;1»"
            },
            {
                id: 10,
                src: require('@/assets/images/vol_3/10-min.jpg'),
                name: "«Тертон&nbsp;2»"
            },
            {
                id: 11,
                src: require('@/assets/images/vol_3/11-min.jpg'),
                name: "«Спрятанное Лицо»"
            },
            {
                id: 12,
                src: require('@/assets/images/vol_3/12-min.jpg'),
                name: "«Похороны на небесах»"
            },
            {
                id: 13,
                src: require('@/assets/images/vol_3/13-min.jpg'),
                name: "«Утренний Чай»"
            },
            {
                id: 14,
                src: require('@/assets/images/vol_3/14-min.jpg'),
                name: "«Созерцатель»"
            },
            // {
            //     id: 1,
            //     src: require('@/assets/images/vol_1/photo_2022-09-01_21-35-57.jpg'),
            //     name: "«Тертон 1»"
            // },
            // {
            //     id: 1,
            //     src: require('@/assets/images/vol_1/photo_2022-09-01_21-35-57.jpg'),
            //     name: "«Тертон 1»"
            // },
            // {
            //     id: 2,
            //     src: require('@/assets/images/vol_1/Ula_52800_DONE-min.jpg'),
            //     name: "«Баланс»"
            // },
            // {
            //     id: 3,
            //     src: require('@/assets/images/vol_1/Ula_52665_DONE-min.jpg'),
            //     name: "«Тувинское утро 1»"
            // },
            // {
            //     id: 4,
            //     src: require('@/assets/images/vol_2/Ula_52552_DONE-min.jpg'),
            //     name: "«Тувинское утро 1»"
            // },
            // {
            //     id: 5,
            //     src: require('@/assets/images/vol_2/Ula_52659_DONE-min.jpg'),
            //     name: "«Тувинское утро 1»"
            // },
            // {
            //     id: 6,
            //     src: require('@/assets/images/vol_2/Ula_52652_DONE-min.jpg'),
            //     name: "«Тувинское утро 1»"
            // },
            // {
            //     id: 7,
            //     src: require('@/assets/images/vol_2/Ula_52475_DONE-min.jpg'),
            //     name: "«Чам»"
            // },
            // {
            //     id: 8,
            //     src: require('@/assets/images/vol_2/Ula_52591_DONE-min.jpg'),
            //     name: "«Сон самурая»"
            // },
            // {
            //     id: 9,
            //     src: require('@/assets/images/vol_2/Ula_52642_DONE-min.jpg'),
            //     name: "«Созерцатель»"
            // },
            // {
            //     id: 10,
            //     src: require('@/assets/images/vol_1/Ula_52819_DONE-min.jpg'),
            //     name: "«Созерцатель»"
            // },
            // {
            //     id: 11,
            //     src: require('@/assets/images/vol_1/Ula_52822_DONE-min.jpg'),
            //     name: "«Созерцатель»"
            // },
            // {
            //     id: 12,
            //     src: require('@/assets/images/vol_1/Ula_52838_DONE-min.jpg'),
            //     name: "«Созерцатель»"
            // },
        ]
        if (page === 1) {
            return images.slice(0, 6);
        } else if (page === 2) {
            return images.slice(6, 12);
        }
    }
}



