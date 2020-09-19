'use strict';

class CardList {


    constructor(cardContainer, createCard, api, template, openPicturePopup) {
        this._view = cardContainer;
        this._createCard = createCard;
        this.api = api;
        this.template = template;
        this.openPicturePopup = openPicturePopup;
    }

    /** добавляет элемент карточки в контейнер*/
    addCard(name, link, likes, idName, idOwner, hasLike, userInfoId) {
        this.newCard = this._createCard(this.template, name, link, likes, idName, idOwner, hasLike, this.api, userInfoId, this.openPicturePopup).create();
        this._view.append(this.newCard);
    }

    /**проверка, лайкнута ли уже карточка*/
    checkLike(likesArr, userInfoId) {
        for (let i = 0; i < likesArr.length; i++) {
            if (userInfoId === likesArr[i]._id) {
                return true;
            }
        }
    }

    /** Отрисовывает карточки при первоначальной загрузке*/
    render(array, userInfoId) {
        this.array = array;
        this.array.forEach((value, index) => {
            this.likesArr = this.array[index]["likes"];
            /*
             Можно лучше:
             - Воспользуйтесь value, вместо  this.array[index]
            */
            this.hasLike = this.checkLike(this.likesArr, userInfoId);
            this.newCard = this.addCard(this.array[index]["name"], this.array[index]["link"], this.array[index]["likes"].length, this.array[index]["_id"], this.array[index]["owner"]["_id"], this.hasLike, userInfoId)
        });
    }
}
