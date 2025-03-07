/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.login(data, (e)=>{
      if(e) {
        console.error(e);
        return
      }
      App.setState('user-logged');
      const modal = App.getModal('login');
      this.element.reset();
      modal.close();
    });
  };
}