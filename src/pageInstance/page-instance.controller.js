/**
 * МАНИПУЛЯЦИИ СО СЛОЕМ VIEW
 *
 * Слой контроллер, содержит приватным полем экземпляр сервиса.
 * Контроллер импортируется в слой view.
 *
 * Минимальная реализация контроллера - повторяем все методы сервиса, вызывая их, и возвращая полученное значение.
 *
 * В этом слое можно создавать специфические методы для обработки произвольных событий из слоя view.
 */

import PageInstanceService from "@/pageInstance/page-instance.service";

class PageInstanceController {

    #service = new PageInstanceService()

    async getGalleryImages(page) {
        return await this.#service.getGalleryImages(page)
    }

}

export default new PageInstanceController()
