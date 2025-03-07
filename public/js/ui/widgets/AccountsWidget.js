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
  constructor(element) {
    if(!element) {
      throw new Error('Элемент не существует');
    }
    this.element = element;
    this.registerEvents();
    this.update();
  };

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    const createAccButton = document.querySelector('.create-account');
    createAccButton.addEventListener('click', ()=>{
     const modal = App.getModal('createAccount');
     modal.open();
    });
    const accountsList = document.querySelector('.accounts-panel');
    accountsList.addEventListener('click', (e)=>{
      const selectedAcc = e.target;
      const targetAcc = selectedAcc.closest('.account');
      if(!targetAcc) {
        return
      }
      e.preventDefault();
      this.onSelectAccount(targetAcc);
    });
  };

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
    const user = User.current();
    if(user) {
      Account.list(undefined, (err, response)=>{
        if(err) {
          console.error(err);
          return
        }
        this.clear();
        this.renderItem(response.data);
      });
    }
  };

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const accounts = document.querySelectorAll('.accounts-panel .account');
    for(let account of accounts) {
      account.remove();
    }
  };

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount(account) {
    const activeAccount = document.querySelector('.accounts-panel .active');
    const accountId = account.getAttribute('data-id');
    if(activeAccount) {
      activeAccount.classList.remove('active');
    }
    account.classList.add('active');
    App.showPage('transactions', {account_id: accountId});
  };

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    const itemID = item.id;
    const itemName = item.name;
    const itemSum = item.sum;
    const newAccount = document.createElement('li');
    newAccount.classList.add('account');
    newAccount.setAttribute('data-id',itemID)
    newAccount.innerHTML = `<a href="#">
        <span>${itemName}</span> 
        <span>${itemSum} ₽</span>
    </a>`;
    return newAccount
  };

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data) {
    data.forEach((item) => {
      this.element.append(this.getAccountHTML(item));
    });
  }
}
