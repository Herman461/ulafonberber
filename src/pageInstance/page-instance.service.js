/**
 * ОБРАБАТЫВАЕМ ДАННЫЕ В НУЖНЫЙ ВИД ДЛЯ ПРИЛОЖЕНИЯ И СОХРАНЯЕМ
 *
 * Слой сервиса предназначен для обработки данных полученных репозиторием или выполнения бизнес-логики.
 *
 * В этом слое преобразуем данные, которые пришли из репозитория в нужный вид.
 * Взаиможействие со стором (сохранение, удаление, преобразование данных) так же происходит тут.
 * Обработка специфических ошибок, которые не может обработать стандартный обработчик HTTP-ошибок
 * так же производятся тут.
 *
 * Экземпляр сервиса является приватным полем контроллера, вызывать методы сервиса может только контроллер.
 */


import PageInstanceRepository from "@/pageInstance/page-instance.repository";
import pageInstanceState from "@/pageInstance/page-instance.state";
import http from "@/axiosConfig/base-axios-config";

export default class PageInstanceService {

    #repository = new PageInstanceRepository()

    async getWorks() {
        pageInstanceState.works = await this.#repository.getWorks()
        // pageInstanceState.verticalWorks = works.filter(work => work.orientation === 'vertical')
        // pageInstanceState.horizontalWorks = works.filter(work => work.orientation === 'horizontal')

        return pageInstanceState.works
    }

    async getWork(id) {
        const work = await this.#repository.getWork(id)

        pageInstanceState.activeWork = work

        return work;
    }
    async getLanguage() {
        const response = await this.#repository.getLanguages()

        return response;
    }

    async getLocalization() {
        pageInstanceState.content = await this.#repository.getLocalization()
        return await this.#repository.getLocalization();
    }
}
