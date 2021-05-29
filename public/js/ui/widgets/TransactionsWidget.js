/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if(!element) {
      throw new Error('Элемент не существует');
    }
    this.element = element;
    this.registerEvents();
  };
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const newIncome = document.querySelector('.create-income-button');
    const newExpense = document.querySelector('.create-expense-button');
    newIncome.addEventListener('click', () => {
      const modal = App.getModal('newIncome');
      modal.open();
    });
    newExpense.addEventListener('click', ()=>{
      const modal = App.getModal('newExpense');
      modal.open();
    });
  };
}
