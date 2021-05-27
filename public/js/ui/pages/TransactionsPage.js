/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if(!element) {
      throw new Error('Элемент не существует')
    }
    this.element = element;
    this.registerEvents()
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(this.lastOptions)
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    const wrapper = document.querySelector('.content-wrapper');
    wrapper.addEventListener('click', (e)=>{
      const target = e.target
      if(target.classList.contains('transaction__remove')) {
        this.removeTransaction(target.getAttribute('data-id'))
      }
      if(target.classList.contains('remove-account')) {
        this.removeAccount()
      }
    })
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets(),
   * либо обновляйте только виджет со счетами
   * для обновления приложения
   * */
  removeAccount() {
    const areYouShure = confirm('Вы действительно хотите удалить счёт?')
    if(!this.lastOptions) {
      return
    }
    if(areYouShure) {
      const id = this.lastOptions.account_id
      console.log('Account ID at Tansactions page '+ this.lastOptions.account_id)
      Account.remove({id}, (e)=>{
        if (e) {
          console.error(e)
        }
        else {
          this.clear()
          App.updateWidgets()
        }
      });
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction( id ) {
    const areYouShure = confirm('Вы действительно хотите удалить эту транзакцию?');
    if(areYouShure) {
      Transaction.remove({id}, (e)=>{
        if(e) {
          console.error(e)
        }
        else App.update()
      })
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options){
    console.log(options)
    if(!options) {
      console.error('Options are required at TransactionsPage.render')
      return
    }
    this.lastOptions = options
    Account.get(options.account_id, (e, response)=>{
      console.log(response)
      if(response) {
        this.renderTitle(response.data.name);
      }
    Transaction.list(options, (e, response)=> {
        if (response) {
          console.log('Response at transaction page ' + response.data)
          this.renderTransactions(response.data)
        }
      })
    })
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = ''
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){
    const title = this.element.querySelector('.content-title');
    title.textContent = name
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date){
    const monthList = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
    const parsedDate = date.split(' ');
    const day = parsedDate[0].split('-');
    const month = +day[1] - 1;
    const time = parsedDate[1].split(':');
    const dateString = day[2] + ' ' + monthList[month] + ' ' + day[0] + ' г. в ' + time[0] + ':' + time[1]
    return dateString
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){
    const itemName = item.name;
    const itemTime = this.formatDate(item.created_at);
    const itemSum = item.sum
    const itemId = item.id
    const transaction = `<div class="transaction row"> 
                <div class="col-md-7 transaction__details">
              <div class="transaction__icon">
                  <span class="fa fa-money fa-2x"></span>
              </div>
              <div class="transaction__info">
                  <h4 class="transaction__title">${itemName}</h4>
                  
                  <div class="transaction__date">${itemTime}</div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="transaction__summ">     
                  ${itemSum} <span class="currency">₽</span>
              </div>
            </div>
            <div class="col-md-2 transaction__controls">
                <!-- data-id = id транзакции -->
                <button class="btn btn-danger transaction__remove" data-id="${itemId}">
                    <i class="fa fa-trash"></i>  
                </button>
            </div>
            </div>`;

    return transaction
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){
    const content = document.querySelector('.content');
    let totalHtml = ''
    for(let transaction of data) {
      const transactionHtml = this.getTransactionHTML(transaction);
      totalHtml += transactionHtml
    }
    content.innerHTML = totalHtml
  }
}