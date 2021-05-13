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
    User.login();
    if(User.register.success) {
      App.setState('user-logged');
      const modal = App.getModal('login');
      const modalFields = modal.querySelectorAll('.form-control');
      for(let field of modalFields) {
        field.value = ''
      }
      modal.close()
    }
  }
}