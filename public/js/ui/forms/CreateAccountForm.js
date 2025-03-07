/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    Account.create(data, (e)=>{
      if(e){
        console.error(e);
        return
      }
      App.update();
      App.getModal('createAccount').close();
      this.element.reset();
    });
  }
}