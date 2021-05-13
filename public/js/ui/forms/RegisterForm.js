/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.register();
    if(User.register.success) {
      App.setState('user-logged');
      const modal = App.getModal('register');
      const modalFields = modal.querySelectorAll('.form-control');
      for(let field of modalFields) {
        field.value = ''
      }
      modal.close()
    }
  }
}