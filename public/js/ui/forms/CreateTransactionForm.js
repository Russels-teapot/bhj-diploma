/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList()
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const AccountsList = this.element.querySelector('.accounts-select')
    Account.list(undefined, (e, response)=>{
        if(e){
            console.error(e);
            return
        }
        else {
            let items = ''
            for(let item of response.data) {
                let listItem = `<option value="${item.id}">${item.name}</option>)`
                items += listItem
            }
            AccountsList.innerHTML = items
        }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (e)=>{
      if(e) {
        console.error(e)
        return
      }
     else {
          App.update();
          this.element.reset();
          let modalName;
          if(this.element.id === 'modal-new-income'){
              modalName = 'newIncome'
          }
          if(this.element.id === 'modal-new-expense') {
              modalName = 'newExpense'
          }
          const modal = App.getModal(modalName);
          modal.close()
      }
    });
  }
}