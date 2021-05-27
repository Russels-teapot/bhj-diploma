/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  /**
   * Получает информацию о счёте
   * */
  static URL = '/account'
  static get(id, callback){
      if(!id) {
          throw new Error('ID is required in Account.get')
      }
      console.log('id из Account.js ' + id)
      const url = this.URL + '/' + id
      createRequest({url:url, method:'GET', data:{}, callback})
  }
}
