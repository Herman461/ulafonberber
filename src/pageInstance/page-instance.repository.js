/**
 * ПОЛУЧАЕМ ДАННЫЕ
 *
 * Слой репозитория предназначен для получения данных с API
 * В этом слое так же реализуем кеширование, если данные есть в сторе отдаем их, если это необходимо.
 * Взаимодействие с конфигом запроса/ответа так же оставляем тут.
 *
 * Экземпляр репозитория является приватным полем сервиса, вызывать методы репозитория может только сервис.
 */
import http from '@/axiosConfig/base-axios-config'
import pageInstanceState from "@/pageInstance/page-instance.state";

export default class PageInstanceRepository {
    async getWorks() {
        const response = await http.get('/works/', {
            params: {
                lang: pageInstanceState.language
            }
        })

        return response.data.data;
    }

    async getWork(id) {
        const response = await http.get('/works/' + id + '/', {
            params: {
                lang: pageInstanceState.language
            }
        });

        return response.data;
    }
}



