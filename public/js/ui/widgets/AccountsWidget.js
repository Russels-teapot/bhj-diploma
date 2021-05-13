/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if(!element) {
      throw new Error('Элемент не существует')
    } else this.element = element
      this.registerEvents();
      this.update()
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    const createAccButton = document.querySelector('.create-account');
    const accounts = document.querySelectorAll('.accounts-panel .account')
    createAccButton.addEventListener('click', ()=>{
     const modal = App.getModal('createAccount');
     modal.open()
    });
    for(let account of accounts) {
      account.addEventListener('click', ()=>{
        this.onSelectAccount(account)
      })
    }
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    User.current()
    if(User.current) {
      Account.list()
      if(Account.list) {
        this.clear();
        this.renderItem(Account.list)
      }
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const accounts = document.querySelectorAll('.accounts-panel .account');
    for(let account of accounts) {
      account.remove()
    }
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    const activeAccount = document.querySelector('.accounts-panel .active');
    activeAccount.classList.remove('active');
    element.classList.add('active');
    App.showPage()
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    const newAccount = document.createElement('li');
    newAccount.classList.add('active', 'account');
    newAccount.setAttribute('data-id', item.id)
    const accHref = document.createElement('a');
    accHref.setAttribute('href', '#');
    const accName = document.createElement('span');
    accName.innerText = item.name;
    const accAmount = document.createElement('span');
    accAmount.innerText = item.sum;
    accHref.append(accName);
    accHref.append(accAmount);
    newAccount.append(accHref);
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    this.element.append(this.getAccountHTML(data))
  }
}
